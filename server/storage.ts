import { 
  users, shops, roles, emailCampaigns, emailTemplates, smsCampaigns, 
  socialAccounts, socialPosts, popups, leads, campaignStats, seoSettings,
  type User, type InsertUser, type Shop, type InsertShop, type Role, type InsertRole,
  type EmailCampaign, type InsertEmailCampaign, type EmailTemplate, type InsertEmailTemplate,
  type SmsCampaign, type InsertSmsCampaign, type SocialAccount, type InsertSocialAccount,
  type SocialPost, type InsertSocialPost, type Popup, type InsertPopup,
  type Lead, type InsertLead, type CampaignStat, type InsertCampaignStat,
  type SeoSetting, type InsertSeoSetting
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined>;
  
  // Shop operations
  getShop(id: number): Promise<Shop | undefined>;
  getShopByDomain(domain: string): Promise<Shop | undefined>;
  createShop(shop: InsertShop): Promise<Shop>;
  updateShop(id: number, data: Partial<InsertShop>): Promise<Shop | undefined>;
  
  // Role operations
  getRole(id: number): Promise<Role | undefined>;
  getRoleByName(name: string): Promise<Role | undefined>;
  createRole(role: InsertRole): Promise<Role>;
  
  // Email campaign operations
  getEmailCampaign(id: number): Promise<EmailCampaign | undefined>;
  getEmailCampaignsByShop(shopId: number): Promise<EmailCampaign[]>;
  createEmailCampaign(campaign: InsertEmailCampaign): Promise<EmailCampaign>;
  updateEmailCampaign(id: number, data: Partial<InsertEmailCampaign>): Promise<EmailCampaign | undefined>;
  
  // Email template operations
  getEmailTemplate(id: number): Promise<EmailTemplate | undefined>;
  getEmailTemplatesByShop(shopId: number): Promise<EmailTemplate[]>;
  createEmailTemplate(template: InsertEmailTemplate): Promise<EmailTemplate>;
  updateEmailTemplate(id: number, data: Partial<InsertEmailTemplate>): Promise<EmailTemplate | undefined>;
  
  // SMS campaign operations
  getSmsCampaign(id: number): Promise<SmsCampaign | undefined>;
  getSmsCampaignsByShop(shopId: number): Promise<SmsCampaign[]>;
  createSmsCampaign(campaign: InsertSmsCampaign): Promise<SmsCampaign>;
  updateSmsCampaign(id: number, data: Partial<InsertSmsCampaign>): Promise<SmsCampaign | undefined>;
  
  // Social account operations
  getSocialAccount(id: number): Promise<SocialAccount | undefined>;
  getSocialAccountsByShop(shopId: number): Promise<SocialAccount[]>;
  createSocialAccount(account: InsertSocialAccount): Promise<SocialAccount>;
  updateSocialAccount(id: number, data: Partial<InsertSocialAccount>): Promise<SocialAccount | undefined>;
  
  // Social post operations
  getSocialPost(id: number): Promise<SocialPost | undefined>;
  getSocialPostsByAccount(accountId: number): Promise<SocialPost[]>;
  createSocialPost(post: InsertSocialPost): Promise<SocialPost>;
  updateSocialPost(id: number, data: Partial<InsertSocialPost>): Promise<SocialPost | undefined>;
  
  // Popup operations
  getPopup(id: number): Promise<Popup | undefined>;
  getPopupsByShop(shopId: number): Promise<Popup[]>;
  createPopup(popup: InsertPopup): Promise<Popup>;
  updatePopup(id: number, data: Partial<InsertPopup>): Promise<Popup | undefined>;
  
  // Lead operations
  getLead(id: number): Promise<Lead | undefined>;
  getLeadsByShop(shopId: number): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  
  // Campaign stats operations
  getCampaignStat(id: number): Promise<CampaignStat | undefined>;
  getCampaignStatsByCampaign(campaignType: string, campaignId: number): Promise<CampaignStat[]>;
  createCampaignStat(stat: InsertCampaignStat): Promise<CampaignStat>;
  
  // SEO settings operations
  getSeoSettings(shopId: number): Promise<SeoSetting | undefined>;
  updateSeoSettings(shopId: number, data: Partial<InsertSeoSetting>): Promise<SeoSetting | undefined>;
  
  // Dashboard data
  getDashboardStats(shopId: number): Promise<any>;
  getRecentCampaigns(shopId: number, limit: number): Promise<any[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }
  
  // Shop operations
  async getShop(id: number): Promise<Shop | undefined> {
    const [shop] = await db.select().from(shops).where(eq(shops.id, id));
    return shop;
  }

  async getShopByDomain(domain: string): Promise<Shop | undefined> {
    const [shop] = await db.select().from(shops).where(eq(shops.shopifyDomain, domain));
    return shop;
  }

  async createShop(shop: InsertShop): Promise<Shop> {
    const [newShop] = await db.insert(shops).values(shop).returning();
    return newShop;
  }

  async updateShop(id: number, data: Partial<InsertShop>): Promise<Shop | undefined> {
    const [updatedShop] = await db
      .update(shops)
      .set(data)
      .where(eq(shops.id, id))
      .returning();
    return updatedShop;
  }
  
  // Role operations
  async getRole(id: number): Promise<Role | undefined> {
    const [role] = await db.select().from(roles).where(eq(roles.id, id));
    return role;
  }

  async getRoleByName(name: string): Promise<Role | undefined> {
    const [role] = await db.select().from(roles).where(eq(roles.name, name));
    return role;
  }

  async createRole(role: InsertRole): Promise<Role> {
    const [newRole] = await db.insert(roles).values(role).returning();
    return newRole;
  }
  
  // Email campaign operations
  async getEmailCampaign(id: number): Promise<EmailCampaign | undefined> {
    const [campaign] = await db.select().from(emailCampaigns).where(eq(emailCampaigns.id, id));
    return campaign;
  }

  async getEmailCampaignsByShop(shopId: number): Promise<EmailCampaign[]> {
    return db.select().from(emailCampaigns).where(eq(emailCampaigns.shopId, shopId));
  }

  async createEmailCampaign(campaign: InsertEmailCampaign): Promise<EmailCampaign> {
    const [newCampaign] = await db.insert(emailCampaigns).values(campaign).returning();
    return newCampaign;
  }

  async updateEmailCampaign(id: number, data: Partial<InsertEmailCampaign>): Promise<EmailCampaign | undefined> {
    const [updatedCampaign] = await db
      .update(emailCampaigns)
      .set(data)
      .where(eq(emailCampaigns.id, id))
      .returning();
    return updatedCampaign;
  }
  
  // Email template operations
  async getEmailTemplate(id: number): Promise<EmailTemplate | undefined> {
    const [template] = await db.select().from(emailTemplates).where(eq(emailTemplates.id, id));
    return template;
  }

  async getEmailTemplatesByShop(shopId: number): Promise<EmailTemplate[]> {
    return db.select().from(emailTemplates).where(eq(emailTemplates.shopId, shopId));
  }

  async createEmailTemplate(template: InsertEmailTemplate): Promise<EmailTemplate> {
    const [newTemplate] = await db.insert(emailTemplates).values(template).returning();
    return newTemplate;
  }

  async updateEmailTemplate(id: number, data: Partial<InsertEmailTemplate>): Promise<EmailTemplate | undefined> {
    const [updatedTemplate] = await db
      .update(emailTemplates)
      .set(data)
      .where(eq(emailTemplates.id, id))
      .returning();
    return updatedTemplate;
  }
  
  // SMS campaign operations
  async getSmsCampaign(id: number): Promise<SmsCampaign | undefined> {
    const [campaign] = await db.select().from(smsCampaigns).where(eq(smsCampaigns.id, id));
    return campaign;
  }

  async getSmsCampaignsByShop(shopId: number): Promise<SmsCampaign[]> {
    return db.select().from(smsCampaigns).where(eq(smsCampaigns.shopId, shopId));
  }

  async createSmsCampaign(campaign: InsertSmsCampaign): Promise<SmsCampaign> {
    const [newCampaign] = await db.insert(smsCampaigns).values(campaign).returning();
    return newCampaign;
  }

  async updateSmsCampaign(id: number, data: Partial<InsertSmsCampaign>): Promise<SmsCampaign | undefined> {
    const [updatedCampaign] = await db
      .update(smsCampaigns)
      .set(data)
      .where(eq(smsCampaigns.id, id))
      .returning();
    return updatedCampaign;
  }
  
  // Social account operations
  async getSocialAccount(id: number): Promise<SocialAccount | undefined> {
    const [account] = await db.select().from(socialAccounts).where(eq(socialAccounts.id, id));
    return account;
  }

  async getSocialAccountsByShop(shopId: number): Promise<SocialAccount[]> {
    return db.select().from(socialAccounts).where(eq(socialAccounts.shopId, shopId));
  }

  async createSocialAccount(account: InsertSocialAccount): Promise<SocialAccount> {
    const [newAccount] = await db.insert(socialAccounts).values(account).returning();
    return newAccount;
  }

  async updateSocialAccount(id: number, data: Partial<InsertSocialAccount>): Promise<SocialAccount | undefined> {
    const [updatedAccount] = await db
      .update(socialAccounts)
      .set(data)
      .where(eq(socialAccounts.id, id))
      .returning();
    return updatedAccount;
  }
  
  // Social post operations
  async getSocialPost(id: number): Promise<SocialPost | undefined> {
    const [post] = await db.select().from(socialPosts).where(eq(socialPosts.id, id));
    return post;
  }

  async getSocialPostsByAccount(accountId: number): Promise<SocialPost[]> {
    return db.select().from(socialPosts).where(eq(socialPosts.socialAccountId, accountId));
  }

  async createSocialPost(post: InsertSocialPost): Promise<SocialPost> {
    const [newPost] = await db.insert(socialPosts).values(post).returning();
    return newPost;
  }

  async updateSocialPost(id: number, data: Partial<InsertSocialPost>): Promise<SocialPost | undefined> {
    const [updatedPost] = await db
      .update(socialPosts)
      .set(data)
      .where(eq(socialPosts.id, id))
      .returning();
    return updatedPost;
  }
  
  // Popup operations
  async getPopup(id: number): Promise<Popup | undefined> {
    const [popup] = await db.select().from(popups).where(eq(popups.id, id));
    return popup;
  }

  async getPopupsByShop(shopId: number): Promise<Popup[]> {
    return db.select().from(popups).where(eq(popups.shopId, shopId));
  }

  async createPopup(popup: InsertPopup): Promise<Popup> {
    const [newPopup] = await db.insert(popups).values(popup).returning();
    return newPopup;
  }

  async updatePopup(id: number, data: Partial<InsertPopup>): Promise<Popup | undefined> {
    const [updatedPopup] = await db
      .update(popups)
      .set(data)
      .where(eq(popups.id, id))
      .returning();
    return updatedPopup;
  }
  
  // Lead operations
  async getLead(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async getLeadsByShop(shopId: number): Promise<Lead[]> {
    return db.select().from(leads).where(eq(leads.shopId, shopId));
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }
  
  // Campaign stats operations
  async getCampaignStat(id: number): Promise<CampaignStat | undefined> {
    const [stat] = await db.select().from(campaignStats).where(eq(campaignStats.id, id));
    return stat;
  }

  async getCampaignStatsByCampaign(campaignType: string, campaignId: number): Promise<CampaignStat[]> {
    return db
      .select()
      .from(campaignStats)
      .where(
        and(
          eq(campaignStats.campaignType, campaignType),
          eq(campaignStats.campaignId, campaignId)
        )
      );
  }

  async createCampaignStat(stat: InsertCampaignStat): Promise<CampaignStat> {
    const [newStat] = await db.insert(campaignStats).values(stat).returning();
    return newStat;
  }
  
  // SEO settings operations
  async getSeoSettings(shopId: number): Promise<SeoSetting | undefined> {
    const [settings] = await db.select().from(seoSettings).where(eq(seoSettings.shopId, shopId));
    return settings;
  }

  async updateSeoSettings(shopId: number, data: Partial<InsertSeoSetting>): Promise<SeoSetting | undefined> {
    // Check if settings exist
    const existing = await this.getSeoSettings(shopId);
    
    if (existing) {
      // Update existing settings
      const [updated] = await db
        .update(seoSettings)
        .set(data)
        .where(eq(seoSettings.shopId, shopId))
        .returning();
      return updated;
    } else {
      // Create new settings
      const [newSettings] = await db
        .insert(seoSettings)
        .values({ ...data, shopId } as InsertSeoSetting)
        .returning();
      return newSettings;
    }
  }
  
  // Dashboard data
  async getDashboardStats(shopId: number): Promise<any> {
    // Get email stats
    const emailStats = await db.execute(sql`
      SELECT AVG(open_rate) as email_open_rate
      FROM email_campaigns
      WHERE shop_id = ${shopId}
    `);
    
    // Get SMS stats
    const smsStats = await db.execute(sql`
      SELECT AVG(click_rate) as sms_click_rate
      FROM sms_campaigns
      WHERE shop_id = ${shopId}
    `);
    
    // Get social stats
    const socialStats = await db.execute(sql`
      SELECT AVG(engagement_rate) as social_engagement
      FROM social_posts sp
      JOIN social_accounts sa ON sp.social_account_id = sa.id
      WHERE sa.shop_id = ${shopId}
    `);
    
    // Get popup stats
    const popupStats = await db.execute(sql`
      SELECT AVG(conversion_rate) as popup_conversion
      FROM popups
      WHERE shop_id = ${shopId}
    `);
    
    return {
      emailOpenRate: emailStats[0]?.email_open_rate || 0,
      smsClickRate: smsStats[0]?.sms_click_rate || 0,
      socialEngagement: socialStats[0]?.social_engagement || 0,
      popupConversion: popupStats[0]?.popup_conversion || 0
    };
  }
  
  async getRecentCampaigns(shopId: number, limit: number): Promise<any[]> {
    // Get recent email campaigns
    const emailCampaignsResult = await db
      .select({
        id: emailCampaigns.id,
        type: sql`'email'::text`,
        name: emailCampaigns.name,
        sentAt: emailCampaigns.sentAt,
        openRate: emailCampaigns.openRate,
      })
      .from(emailCampaigns)
      .where(eq(emailCampaigns.shopId, shopId))
      .orderBy(desc(emailCampaigns.sentAt));
    
    // Get recent SMS campaigns
    const smsCampaignsResult = await db
      .select({
        id: smsCampaigns.id,
        type: sql`'sms'::text`,
        name: smsCampaigns.name,
        sentAt: smsCampaigns.sentAt,
        clickRate: smsCampaigns.clickRate,
      })
      .from(smsCampaigns)
      .where(eq(smsCampaigns.shopId, shopId))
      .orderBy(desc(smsCampaigns.sentAt));
    
    // Get recent social posts
    const socialPostsResult = await db
      .select({
        id: socialPosts.id,
        type: sql`'social'::text`,
        content: socialPosts.content,
        postedAt: socialPosts.postedAt,
        engagementRate: socialPosts.engagementRate,
      })
      .from(socialPosts)
      .innerJoin(
        socialAccounts,
        eq(socialPosts.socialAccountId, socialAccounts.id)
      )
      .where(eq(socialAccounts.shopId, shopId))
      .orderBy(desc(socialPosts.postedAt));
    
    // Combine and sort by date
    const allCampaigns = [
      ...emailCampaignsResult.map(campaign => ({
        ...campaign,
        title: campaign.name,
        date: campaign.sentAt,
        rate: campaign.openRate,
        rateType: 'Open rate'
      })),
      ...smsCampaignsResult.map(campaign => ({
        ...campaign,
        title: campaign.name,
        date: campaign.sentAt,
        rate: campaign.clickRate,
        rateType: 'Click rate'
      })),
      ...socialPostsResult.map(post => ({
        ...post,
        title: post.content?.substring(0, 30) + '...',
        date: post.postedAt,
        rate: post.engagementRate,
        rateType: 'Engagements'
      }))
    ]
    .filter(item => item.date) // Filter out items without a date
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
    
    return allCampaigns;
  }
}

export const storage = new DatabaseStorage();
