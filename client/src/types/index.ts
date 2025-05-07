// Shop-related types
export interface Shop {
  id: number;
  shopifyDomain: string;
  shopName: string;
  accessToken: string;
  scopes: string;
  installedAt: string; // Date as ISO string
  subscriptionTier: 'free' | 'basic' | 'premium';
  subscriptionStatus: 'active' | 'pending' | 'canceled' | 'past_due';
  billingId?: string;
}

// User-related types
export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  createdAt: string; // Date as ISO string
  roleId?: number;
  shopId?: number;
}

export interface Role {
  id: number;
  name: string;
  permissions: {
    [key: string]: boolean;
  };
}

// Campaign types
export interface EmailCampaign {
  id: number;
  shopId: number;
  name: string;
  subject: string;
  body: string;
  status: 'draft' | 'scheduled' | 'sent' | 'canceled';
  scheduledFor?: string; // Date as ISO string
  sentAt?: string; // Date as ISO string
  createdAt: string; // Date as ISO string
  updatedAt: string; // Date as ISO string
  templateId?: number;
  openRate?: number;
  clickRate?: number;
}

export interface EmailTemplate {
  id: number;
  shopId: number;
  name: string;
  subject?: string;
  body: string;
  createdAt: string; // Date as ISO string
  updatedAt: string; // Date as ISO string
}

// Social media types
export interface SocialAccount {
  id: number;
  shopId: number;
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'pinterest';
  accountId: string;
  accountName?: string;
  accessToken: string;
  refreshToken?: string;
  createdAt: string; // Date as ISO string
  updatedAt: string; // Date as ISO string
}

export interface SocialPost {
  id: number;
  socialAccountId: number;
  content: string;
  mediaUrls?: string[]; // Array of media URLs
  status: 'draft' | 'scheduled' | 'posted' | 'failed';
  scheduledFor?: string; // Date as ISO string
  postedAt?: string; // Date as ISO string
  platformPostId?: string;
  createdAt: string; // Date as ISO string
  updatedAt: string; // Date as ISO string
  engagementRate?: number;
}

// Popup types
export interface Popup {
  id: number;
  shopId: number;
  name: string;
  title?: string;
  content?: string;
  type: 'newsletter' | 'discount' | 'exit-intent' | 'announcement';
  design?: PopupDesign;
  trigger?: PopupTrigger;
  active: boolean;
  createdAt: string; // Date as ISO string
  updatedAt: string; // Date as ISO string
  conversionRate?: number;
}

export interface PopupDesign {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  borderColor?: string;
  borderRadius?: number;
  width?: number;
  height?: number;
  fontFamily?: string;
  customCss?: string;
}

export interface PopupTrigger {
  timing?: number; // Delay in seconds
  scrollPercentage?: number;
  exitIntent?: boolean;
  urlPattern?: string;
  frequency?: 'once' | 'every_visit' | 'once_per_session';
  displayLimit?: number;
}

// Lead types
export interface Lead {
  id: number;
  shopId: number;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  source: 'popup' | 'email' | 'sms' | 'social' | 'other';
  sourceId?: number;
  createdAt: string; // Date as ISO string
  metadata?: any; // Additional data
}

// Analytics types
export interface CampaignStat {
  id: number;
  shopId: number;
  campaignType: 'email' | 'sms' | 'social' | 'popup';
  campaignId: number;
  date: string; // Date as ISO string
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

// SEO types
export interface SeoSetting {
  id: number;
  shopId: number;
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: any; // JSON-LD schema
  createdAt: string; // Date as ISO string
  updatedAt: string; // Date as ISO string
}

// Dashboard types
export interface DashboardStats {
  emailOpenRate: number;
  smsClickRate: number;
  socialEngagement: number;
  popupConversion: number;
}

export interface RecentCampaign {
  id: number;
  type: 'email' | 'sms' | 'social' | 'popup';
  title: string;
  date: string; // Date as ISO string
  rate: number;
  rateType: string;
}

export interface LeadSourceData {
  emailCampaigns: number;
  popups: number;
  socialMedia: number;
  smsCampaigns: number;
  totalLeads: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentCampaigns: RecentCampaign[];
  leadSourceData: LeadSourceData;
}

// Utility type for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}
