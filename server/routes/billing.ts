
import { Router } from 'express';
import { storage } from '../storage';
import axios from 'axios';

const router = Router();

const SUBSCRIPTION_PLANS = {
  basic: {
    name: 'Basic Plan',
    price: 29.00,
    trialDays: 7,
    returnUrl: process.env.APP_URL + '/app/settings/subscription',
    test: process.env.NODE_ENV !== 'production',
  },
  premium: {
    name: 'Premium Plan',
    price: 79.00,
    trialDays: 7,
    returnUrl: process.env.APP_URL + '/app/settings/subscription',
    test: process.env.NODE_ENV !== 'production',
  }
};

// Create subscription
router.post('/subscribe', async (req, res) => {
  try {
    const { planId } = req.body;
    const shop = await storage.getShop(req.session.shopId);
    
    if (!shop || !shop.accessToken) {
      return res.status(401).json({ message: 'Shop not authenticated' });
    }

    const plan = SUBSCRIPTION_PLANS[planId];
    if (!plan) {
      return res.status(400).json({ message: 'Invalid plan' });
    }

    // Create recurring application charge
    const response = await axios.post(
      `https://${shop.shopifyDomain}/admin/api/2023-04/recurring_application_charges.json`,
      {
        recurring_application_charge: {
          name: plan.name,
          price: plan.price,
          return_url: plan.returnUrl,
          trial_days: plan.trialDays,
          test: plan.test
        }
      },
      {
        headers: { 'X-Shopify-Access-Token': shop.accessToken }
      }
    );

    // Store charge ID
    await storage.updateShop(shop.id, {
      billingId: response.data.recurring_application_charge.id,
      subscriptionTier: planId,
      subscriptionStatus: 'pending'
    });

    res.json({
      confirmationUrl: response.data.recurring_application_charge.confirmation_url
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Failed to create subscription' });
  }
});

// Handle subscription callback
router.get('/callback', async (req, res) => {
  try {
    const { charge_id } = req.query;
    const shop = await storage.getShop(req.session.shopId);
    
    if (!shop || !shop.accessToken) {
      return res.status(401).json({ message: 'Shop not authenticated' });
    }

    // Verify charge
    const response = await axios.get(
      `https://${shop.shopifyDomain}/admin/api/2023-04/recurring_application_charges/${charge_id}.json`,
      {
        headers: { 'X-Shopify-Access-Token': shop.accessToken }
      }
    );

    const charge = response.data.recurring_application_charge;
    
    // Update subscription status
    await storage.updateShop(shop.id, {
      subscriptionStatus: charge.status
    });

    res.redirect('/app/settings/subscription');
  } catch (error) {
    console.error('Subscription callback error:', error);
    res.redirect('/app/settings/subscription?error=1');
  }
});

// Cancel subscription
router.post('/cancel', async (req, res) => {
  try {
    const shop = await storage.getShop(req.session.shopId);
    
    if (!shop || !shop.accessToken || !shop.billingId) {
      return res.status(401).json({ message: 'Invalid subscription' });
    }

    // Cancel charge in Shopify
    await axios.delete(
      `https://${shop.shopifyDomain}/admin/api/2023-04/recurring_application_charges/${shop.billingId}.json`,
      {
        headers: { 'X-Shopify-Access-Token': shop.accessToken }
      }
    );

    // Update shop subscription status
    await storage.updateShop(shop.id, {
      subscriptionStatus: 'canceled',
      subscriptionTier: 'free'
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Subscription cancellation error:', error);
    res.status(500).json({ message: 'Failed to cancel subscription' });
  }
});

export default router;
