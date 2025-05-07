import { User, Shop } from '@shared/schema';
import { Session } from 'express-session';

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: User;
      shop?: Shop;
    }
  }
}

// Extend the Session interface
declare module 'express-session' {
  interface Session {
    userId?: number;
    shopId?: number;
    shopifyNonce?: string;
    shopifyShop?: string;
  }
}

export {};