import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { 
  insertUserSchema, insertShopSchema, insertEmailCampaignSchema, 
  insertEmailTemplateSchema, insertSmsCampaignSchema, insertSocialAccountSchema,
  insertSocialPostSchema, insertPopupSchema, insertLeadSchema,
  insertCampaignStatSchema, insertSeoSettingSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import session from 'express-session';
import MemoryStore from 'memorystore';
import crypto from 'crypto';
import axios from 'axios';

// Import custom type declarations
import './types';

// Import route modules
import shopifyRoutes from './routes/shopify';

// Environment variables
const APP_URL = process.env.APP_URL || 'https://localhost:5000';
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY || '';
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET || '';
const SHOPIFY_SCOPES = 'read_products,write_products,read_customers,write_customers,read_orders,write_orders,read_content,write_content';

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up session middleware
  const MemoryStoreSession = MemoryStore(session);
  app.use(session({
    cookie: { 
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: process.env.NODE_ENV === 'production'
    },
    store: new MemoryStoreSession({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'shopify-marketing-automation-secret'
  }));

  // Error handling middleware
  const handleError = (err: any, res: Response) => {
    console.error('API Error:', err);
    
    if (err instanceof ZodError) {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: fromZodError(err).message
      });
    }
    
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    
    return res.status(status).json({ message });
  };

  // Authenticate middleware - verify user is logged in
  const authenticate = async (req: Request, res: Response, next: Function) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      req.user = user;
      next();
    } catch (err) {
      handleError(err, res);
    }
  };

  // Check shop is authenticated with Shopify
  const verifyShopify = async (req: Request, res: Response, next: Function) => {
    try {
      if (!req.session.shopId) {
        return res.status(401).json({ message: 'Shopify store not connected' });
      }
      const shop = await storage.getShop(req.session.shopId);
      if (!shop || !shop.accessToken) {
        return res.status(401).json({ message: 'Shopify store not properly authenticated' });
      }
      req.shop = shop;
      next();
    } catch (err) {
      handleError(err, res);
    }
  };

  // ===== SHOPIFY ROUTES =====
  // Use the shopify routes module
  app.use('/api/shopify', shopifyRoutes);
  
  // ===== WEBHOOK ROUTES =====
  
  app.post('/api/webhooks', async (req, res) => {
    try {
      // Verify webhook signature (in production)
      const hmacHeader = req.header('X-Shopify-Hmac-Sha256');
      
      // For now, just log the received webhook data
      console.log('Webhook received:', req.body);
      
      // Return a 200 status to acknowledge receipt
      res.status(200).send('Webhook received');
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // ===== DASHBOARD ROUTES =====
  
  app.get('/api/dashboard', verifyShopify, async (req, res) => {
    try {
      const shopId = req.shop.id;
      
      // Get dashboard stats
      const stats = await storage.getDashboardStats(shopId);
      
      // Get recent campaigns
      const recentCampaigns = await storage.getRecentCampaigns(shopId, 5);
      
      // Get lead acquisition data (simplified)
      // In production, this would be a more complex query
      const leadSourceData = {
        emailCampaigns: 40,
        popups: 25,
        socialMedia: 15,
        smsCampaigns: 20,
        totalLeads: 873
      };
      
      res.json({
        stats,
        recentCampaigns,
        leadSourceData
      });
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // ===== EMAIL ROUTES =====
  
  // Get all email campaigns
  app.get('/api/emails/campaigns', verifyShopify, async (req, res) => {
    try {
      const campaigns = await storage.getEmailCampaignsByShop(req.shop.id);
      res.json(campaigns);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Get a single email campaign
  app.get('/api/emails/campaigns/:id', verifyShopify, async (req, res) => {
    try {
      const campaign = await storage.getEmailCampaign(Number(req.params.id));
      if (!campaign || campaign.shopId !== req.shop.id) {
        return res.status(404).json({ message: 'Campaign not found' });
      }
      res.json(campaign);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Create email campaign
  app.post('/api/emails/campaigns', verifyShopify, async (req, res) => {
    try {
      const data = insertEmailCampaignSchema.parse({
        ...req.body,
        shopId: req.shop.id
      });
      
      const campaign = await storage.createEmailCampaign(data);
      res.status(201).json(campaign);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Update email campaign
  app.patch('/api/emails/campaigns/:id', verifyShopify, async (req, res) => {
    try {
      const id = Number(req.params.id);
      
      // Verify ownership
      const campaign = await storage.getEmailCampaign(id);
      if (!campaign || campaign.shopId !== req.shop.id) {
        return res.status(404).json({ message: 'Campaign not found' });
      }
      
      const data = req.body;
      const updatedCampaign = await storage.updateEmailCampaign(id, data);
      res.json(updatedCampaign);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Get all email templates
  app.get('/api/emails/templates', verifyShopify, async (req, res) => {
    try {
      const templates = await storage.getEmailTemplatesByShop(req.shop.id);
      res.json(templates);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Create email template
  app.post('/api/emails/templates', verifyShopify, async (req, res) => {
    try {
      const data = insertEmailTemplateSchema.parse({
        ...req.body,
        shopId: req.shop.id
      });
      
      const template = await storage.createEmailTemplate(data);
      res.status(201).json(template);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // ===== SMS ROUTES =====
  
  // Get all SMS campaigns
  app.get('/api/sms/campaigns', verifyShopify, async (req, res) => {
    try {
      const campaigns = await storage.getSmsCampaignsByShop(req.shop.id);
      res.json(campaigns);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Create SMS campaign
  app.post('/api/sms/campaigns', verifyShopify, async (req, res) => {
    try {
      const data = insertSmsCampaignSchema.parse({
        ...req.body,
        shopId: req.shop.id
      });
      
      const campaign = await storage.createSmsCampaign(data);
      res.status(201).json(campaign);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // ===== SOCIAL MEDIA ROUTES =====
  
  // Get all social accounts
  app.get('/api/social/accounts', verifyShopify, async (req, res) => {
    try {
      const accounts = await storage.getSocialAccountsByShop(req.shop.id);
      res.json(accounts);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Create social account
  app.post('/api/social/accounts', verifyShopify, async (req, res) => {
    try {
      const data = insertSocialAccountSchema.parse({
        ...req.body,
        shopId: req.shop.id
      });
      
      const account = await storage.createSocialAccount(data);
      res.status(201).json(account);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Get social posts for an account
  app.get('/api/social/accounts/:accountId/posts', verifyShopify, async (req, res) => {
    try {
      const accountId = Number(req.params.accountId);
      
      // Verify ownership
      const account = await storage.getSocialAccount(accountId);
      if (!account || account.shopId !== req.shop.id) {
        return res.status(404).json({ message: 'Account not found' });
      }
      
      const posts = await storage.getSocialPostsByAccount(accountId);
      res.json(posts);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Create social post
  app.post('/api/social/posts', verifyShopify, async (req, res) => {
    try {
      // Verify account ownership
      const account = await storage.getSocialAccount(req.body.socialAccountId);
      if (!account || account.shopId !== req.shop.id) {
        return res.status(404).json({ message: 'Account not found' });
      }
      
      const data = insertSocialPostSchema.parse(req.body);
      const post = await storage.createSocialPost(data);
      res.status(201).json(post);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // ===== POPUP ROUTES =====
  
  // Get all popups
  app.get('/api/popups', verifyShopify, async (req, res) => {
    try {
      const popups = await storage.getPopupsByShop(req.shop.id);
      res.json(popups);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Create popup
  app.post('/api/popups', verifyShopify, async (req, res) => {
    try {
      const data = insertPopupSchema.parse({
        ...req.body,
        shopId: req.shop.id
      });
      
      const popup = await storage.createPopup(data);
      res.status(201).json(popup);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Update popup
  app.patch('/api/popups/:id', verifyShopify, async (req, res) => {
    try {
      const id = Number(req.params.id);
      
      // Verify ownership
      const popup = await storage.getPopup(id);
      if (!popup || popup.shopId !== req.shop.id) {
        return res.status(404).json({ message: 'Popup not found' });
      }
      
      const data = req.body;
      const updatedPopup = await storage.updatePopup(id, data);
      res.json(updatedPopup);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // ===== LEAD ROUTES =====
  
  // Create lead
  app.post('/api/leads', async (req, res) => {
    try {
      const data = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(data);
      res.status(201).json(lead);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Get leads for a shop
  app.get('/api/leads', verifyShopify, async (req, res) => {
    try {
      const leads = await storage.getLeadsByShop(req.shop.id);
      res.json(leads);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // ===== SEO ROUTES =====
  
  // Get SEO settings
  app.get('/api/seo', verifyShopify, async (req, res) => {
    try {
      const settings = await storage.getSeoSettings(req.shop.id);
      res.json(settings || {});
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Update SEO settings
  app.patch('/api/seo', verifyShopify, async (req, res) => {
    try {
      const data = req.body;
      const settings = await storage.updateSeoSettings(req.shop.id, data);
      res.json(settings);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // ===== SETTINGS ROUTES =====
  
  // Get current user
  app.get('/api/users/me', authenticate, async (req, res) => {
    try {
      res.json(req.user);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Update user
  app.patch('/api/users/:id', authenticate, async (req, res) => {
    try {
      // Simple authorization - users can only edit themselves
      if (req.user.id !== Number(req.params.id)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      const data = req.body;
      const updatedUser = await storage.updateUser(req.user.id, data);
      res.json(updatedUser);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Register user
  app.post('/api/users/register', async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.status(409).json({ message: 'Username already taken' });
      }
      
      // In production, hash the password
      const user = await storage.createUser(data);
      
      // Start session
      req.session.userId = user.id;
      
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName
      });
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Login
  app.post('/api/users/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Start session
      req.session.userId = user.id;
      
      // Set shop ID if user is associated with a shop
      if (user.shopId) {
        req.session.shopId = user.shopId;
      }
      
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName
      });
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Logout
  app.post('/api/users/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Failed to logout' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
