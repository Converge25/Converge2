import { Router, Request, Response } from 'express';
import axios from 'axios';
import crypto from 'crypto';
import { storage } from '../storage';

const router = Router();

// Environment variables for Shopify API
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY || '';
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET || '';
const SHOPIFY_SCOPES = 'read_products,write_products,read_customers,write_customers,read_orders,write_orders,read_content,write_content';
const APP_URL = process.env.APP_URL || 'https://localhost:5000';

// Check if Shopify API keys are set
if (!SHOPIFY_API_KEY || !SHOPIFY_API_SECRET) {
  console.warn('Warning: Shopify API keys are not set. OAuth flow will not work correctly.');
}

// Step 1: Initiate Shopify OAuth
router.get('/auth', async (req: Request, res: Response) => {
  try {
    const { shop } = req.query;
    
    if (!shop || typeof shop !== 'string') {
      return res.status(400).json({ message: 'Shop parameter required' });
    }
    
    // Generate a random nonce for CSRF protection
    const nonce = crypto.randomBytes(16).toString('hex');
    req.session.shopifyNonce = nonce;
    req.session.shopifyShop = shop;
    
    // Construct the authorization URL
    const redirectUri = `${APP_URL}/api/shopify/callback`;
    const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_SCOPES}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${nonce}`;
    
    res.redirect(authUrl);
  } catch (err) {
    console.error('Shopify auth error:', err);
    res.status(500).json({ message: 'Authentication error' });
  }
});

// Step 2: Handle OAuth callback
router.get('/callback', async (req: Request, res: Response) => {
  try {
    const { code, shop: shopDomain, state } = req.query;
    
    // Verify the nonce to prevent CSRF attacks
    if (state !== req.session.shopifyNonce || shopDomain !== req.session.shopifyShop) {
      return res.status(403).json({ message: 'OAuth state validation failed' });
    }
    
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(`https://${shopDomain}/admin/oauth/access_token`, {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code
    });
    
    const { access_token, scope } = tokenResponse.data;
    
    // Check if this shop already exists in our database
    let shop = await storage.getShopByDomain(shopDomain as string);
    
    if (shop) {
      // Update existing shop
      shop = await storage.updateShop(shop.id, {
        accessToken: access_token,
        scopes: scope,
        installedAt: new Date()
      });
    } else {
      // Create new shop
      shop = await storage.createShop({
        shopifyDomain: shopDomain as string,
        shopName: shopDomain as string,
        accessToken: access_token,
        scopes: scope,
        installedAt: new Date(),
        subscriptionTier: 'free',
        subscriptionStatus: 'active'
      });
    }
    
    // Store shop ID in session
    req.session.shopId = shop.id;
    
    // Redirect to app dashboard
    res.redirect('/app/dashboard');
  } catch (err) {
    console.error('Shopify callback error:', err);
    res.status(500).json({ message: 'Authentication callback error' });
  }
});

// Get shop info
router.get('/shop', async (req: Request, res: Response) => {
  try {
    if (!req.session.shopId) {
      return res.status(401).json({ message: 'Not authenticated with a Shopify store' });
    }
    
    const shop = await storage.getShop(req.session.shopId);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    
    // Return shop info without sensitive data
    res.json({
      id: shop.id,
      domain: shop.shopifyDomain,
      name: shop.shopName,
      installedAt: shop.installedAt,
      subscriptionTier: shop.subscriptionTier,
      subscriptionStatus: shop.subscriptionStatus
    });
  } catch (err) {
    console.error('Error fetching shop info:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Check connection status
router.get('/status', async (req: Request, res: Response) => {
  try {
    const connected = !!req.session.shopId;
    let shop = null;
    
    if (connected && req.session.shopId) {
      shop = await storage.getShop(req.session.shopId);
    }
    
    res.json({
      connected,
      shop: shop ? {
        domain: shop.shopifyDomain,
        name: shop.shopName
      } : null
    });
  } catch (err) {
    console.error('Error checking connection status:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch products
router.get('/products', async (req: Request, res: Response) => {
  try {
    if (!req.session.shopId) {
      return res.status(401).json({ message: 'Not authenticated with a Shopify store' });
    }
    
    const shop = await storage.getShop(req.session.shopId);
    if (!shop || !shop.accessToken) {
      return res.status(401).json({ message: 'Shop has no valid access token' });
    }
    
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    // Call Shopify API to get products
    const response = await axios.get(`https://${shop.shopifyDomain}/admin/api/2023-04/products.json?limit=${limit}`, {
      headers: {
        'X-Shopify-Access-Token': shop.accessToken
      }
    });
    
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Fetch customers
router.get('/customers', async (req: Request, res: Response) => {
  try {
    if (!req.session.shopId) {
      return res.status(401).json({ message: 'Not authenticated with a Shopify store' });
    }
    
    const shop = await storage.getShop(req.session.shopId);
    if (!shop || !shop.accessToken) {
      return res.status(401).json({ message: 'Shop has no valid access token' });
    }
    
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    // Call Shopify API to get customers
    const response = await axios.get(`https://${shop.shopifyDomain}/admin/api/2023-04/customers.json?limit=${limit}`, {
      headers: {
        'X-Shopify-Access-Token': shop.accessToken
      }
    });
    
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ message: 'Error fetching customers' });
  }
});

// Fetch orders
router.get('/orders', async (req: Request, res: Response) => {
  try {
    if (!req.session.shopId) {
      return res.status(401).json({ message: 'Not authenticated with a Shopify store' });
    }
    
    const shop = await storage.getShop(req.session.shopId);
    if (!shop || !shop.accessToken) {
      return res.status(401).json({ message: 'Shop has no valid access token' });
    }
    
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    // Call Shopify API to get orders
    const response = await axios.get(`https://${shop.shopifyDomain}/admin/api/2023-04/orders.json?limit=${limit}&status=any`, {
      headers: {
        'X-Shopify-Access-Token': shop.accessToken
      }
    });
    
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Create webhook
router.post('/webhooks', async (req: Request, res: Response) => {
  try {
    if (!req.session.shopId) {
      return res.status(401).json({ message: 'Not authenticated with a Shopify store' });
    }
    
    const shop = await storage.getShop(req.session.shopId);
    if (!shop || !shop.accessToken) {
      return res.status(401).json({ message: 'Shop has no valid access token' });
    }
    
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }
    
    // Define the webhook
    const webhookData = {
      webhook: {
        topic,
        address: `${APP_URL}/api/webhooks`,
        format: 'json'
      }
    };
    
    // Create the webhook in Shopify
    const response = await axios.post(
      `https://${shop.shopifyDomain}/admin/api/2023-04/webhooks.json`,
      webhookData,
      {
        headers: {
          'X-Shopify-Access-Token': shop.accessToken,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json(response.data);
  } catch (err) {
    console.error('Error creating webhook:', err);
    res.status(500).json({ message: 'Error creating webhook' });
  }
});

export default router;