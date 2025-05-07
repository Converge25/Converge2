import { apiRequest } from "./queryClient";

/**
 * Helper functions for interacting with the Shopify API
 */
export const shopify = {
  /**
   * Start the OAuth process to connect a Shopify store
   * @param shopDomain The myshopify.com domain of the store
   */
  startAuth: (shopDomain: string) => {
    // Clean the domain to ensure format is correct
    const domain = cleanShopDomain(shopDomain);
    
    // Redirect to our backend which will redirect to Shopify's OAuth page
    window.location.href = `/api/shopify/auth?shop=${domain}`;
  },
  
  /**
   * Get the current shop information
   * @returns Promise containing shop data
   */
  getShopInfo: async () => {
    try {
      const response = await apiRequest('GET', '/api/shopify/shop', undefined);
      return await response.json();
    } catch (error) {
      console.error('Error fetching shop info:', error);
      throw error;
    }
  },
  
  /**
   * Check if the user has a connected Shopify store
   * @returns Promise<boolean>
   */
  isConnected: async (): Promise<boolean> => {
    try {
      const response = await apiRequest('GET', '/api/shopify/status', undefined);
      const data = await response.json();
      return !!data.connected;
    } catch (error) {
      return false;
    }
  },
  
  /**
   * Fetch products from the connected Shopify store
   * @param limit Number of products to fetch
   * @returns Promise containing products data
   */
  getProducts: async (limit = 10) => {
    try {
      const response = await apiRequest('GET', `/api/shopify/products?limit=${limit}`, undefined);
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  /**
   * Fetch customers from the connected Shopify store
   * @param limit Number of customers to fetch
   * @returns Promise containing customers data
   */
  getCustomers: async (limit = 10) => {
    try {
      const response = await apiRequest('GET', `/api/shopify/customers?limit=${limit}`, undefined);
      return await response.json();
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },
  
  /**
   * Fetch orders from the connected Shopify store
   * @param limit Number of orders to fetch
   * @returns Promise containing orders data
   */
  getOrders: async (limit = 10) => {
    try {
      const response = await apiRequest('GET', `/api/shopify/orders?limit=${limit}`, undefined);
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },
  
  /**
   * Create a webhook in the Shopify store
   * @param topic The webhook topic (e.g., 'orders/create')
   * @returns Promise containing webhook data
   */
  createWebhook: async (topic: string) => {
    try {
      const response = await apiRequest('POST', '/api/shopify/webhooks', { topic });
      return await response.json();
    } catch (error) {
      console.error('Error creating webhook:', error);
      throw error;
    }
  },
  
  /**
   * Redirect to Shopify billing page to purchase a subscription
   * @param planId The ID of the subscription plan
   */
  subscribeToPlan: async (planId: string) => {
    try {
      const response = await apiRequest('POST', '/api/billing/subscribe', { planId });
      const data = await response.json();
      
      // Redirect to Shopify's billing screen
      if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
      }
      
      return data;
    } catch (error) {
      console.error('Error subscribing to plan:', error);
      throw error;
    }
  },

  cancelSubscription: async () => {
    try {
      const response = await apiRequest('POST', '/api/billing/cancel');
      return response.json();
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }
};

/**
 * Helper function to clean and validate a Shopify domain
 * @param domain The domain to clean
 * @returns The cleaned domain
 */
function cleanShopDomain(domain: string): string {
  // Remove https://, http://, or www. if present
  let cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
  
  // Ensure domain ends with .myshopify.com
  if (!cleanDomain.endsWith('.myshopify.com')) {
    cleanDomain = `${cleanDomain}.myshopify.com`;
  }
  
  return cleanDomain;
}
