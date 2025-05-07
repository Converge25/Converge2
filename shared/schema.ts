import { pgTable, text, serial, integer, boolean, timestamp, jsonb, foreignKey, real, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User/account management tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow(),
  roleId: integer("role_id").references(() => roles.id),
  shopId: integer("shop_id").references(() => shops.id),
});

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  permissions: jsonb("permissions").notNull(),
});

// Shopify store information
export const shops = pgTable("shops", {
  id: serial("id").primaryKey(),
  shopifyDomain: text("shopify_domain").notNull().unique(),
  shopName: text("shop_name"),
  accessToken: text("access_token"),
  scopes: text("scopes"),
  installedAt: timestamp("installed_at").defaultNow(),
  subscriptionTier: text("subscription_tier").default("free"),
  subscriptionStatus: text("subscription_status").default("active"),
  billingId: text("billing_id"),
});

// Email campaigns
export const emailCampaigns = pgTable("email_campaigns", {
  id: serial("id").primaryKey(),
  shopId: integer("shop_id").notNull().references(() => shops.id),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  status: text("status").default("draft"), // draft, scheduled, sent, canceled
  scheduledFor: timestamp("scheduled_for"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  templateId: integer("template_id").references(() => emailTemplates.id),
  openRate: real("open_rate"),
  clickRate: real("click_rate"),
});

export const emailTemplates = pgTable("email_templates", {
  id: serial("id").primaryKey(),
  shopId: integer("shop_id").notNull().references(() => shops.id),
  name: text("name").notNull(),
  subject: text("subject"),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// SMS campaigns
export const smsCampaigns = pgTable("sms_campaigns", {
  id: serial("id").primaryKey(),
  shopId: integer("shop_id").notNull().references(() => shops.id),
  name: text("name").notNull(),
  message: text("message").notNull(),
  status: text("status").default("draft"), // draft, scheduled, sent, canceled
  scheduledFor: timestamp("scheduled_for"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  clickRate: real("click_rate"),
});

// Social media
export const socialAccounts = pgTable("social_accounts", {
  id: serial("id").primaryKey(),
  shopId: integer("shop_id").notNull().references(() => shops.id),
  platform: text("platform").notNull(), // facebook, instagram, twitter, etc.
  accountId: text("account_id").notNull(),
  accountName: text("account_name"),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const socialPosts = pgTable("social_posts", {
  id: serial("id").primaryKey(),
  socialAccountId: integer("social_account_id").notNull().references(() => socialAccounts.id),
  content: text("content").notNull(),
  mediaUrls: jsonb("media_urls"),
  status: text("status").default("draft"), // draft, scheduled, posted, failed
  scheduledFor: timestamp("scheduled_for"),
  postedAt: timestamp("posted_at"),
  platformPostId: text("platform_post_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  engagementRate: real("engagement_rate"),
});

// Popups
export const popups = pgTable("popups", {
  id: serial("id").primaryKey(),
  shopId: integer("shop_id").notNull().references(() => shops.id),
  name: text("name").notNull(),
  title: text("title"),
  content: text("content"),
  type: text("type").notNull(), // newsletter, discount, exit-intent, etc.
  design: jsonb("design"), // JSON with styling options
  trigger: jsonb("trigger"), // JSON with trigger conditions
  active: boolean("active").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  conversionRate: real("conversion_rate"),
});

// Leads from popups and other sources
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  shopId: integer("shop_id").notNull().references(() => shops.id),
  email: text("email").notNull(),
  phone: text("phone"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  source: text("source"), // popup, email, sms, social, etc.
  sourceId: integer("source_id"), // ID of the source (e.g., popup ID)
  createdAt: timestamp("created_at").defaultNow(),
  metadata: jsonb("metadata"), // Additional data about the lead
});

// Analytics
export const campaignStats = pgTable("campaign_stats", {
  id: serial("id").primaryKey(),
  shopId: integer("shop_id").notNull().references(() => shops.id),
  campaignType: text("campaign_type").notNull(), // email, sms, social, popup
  campaignId: integer("campaign_id").notNull(),
  date: timestamp("date").notNull(),
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  conversions: integer("conversions").default(0),
  revenue: real("revenue").default(0),
});

// SEO features
export const seoSettings = pgTable("seo_settings", {
  id: serial("id").primaryKey(),
  shopId: integer("shop_id").notNull().references(() => shops.id),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  twitterTitle: text("twitter_title"),
  twitterDescription: text("twitter_description"),
  twitterImage: text("twitter_image"),
  structuredData: jsonb("structured_data"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  shop: one(shops, {
    fields: [users.shopId],
    references: [shops.id],
  }),
}));

export const shopsRelations = relations(shops, ({ many }) => ({
  users: many(users),
  emailCampaigns: many(emailCampaigns),
  emailTemplates: many(emailTemplates),
  smsCampaigns: many(smsCampaigns),
  socialAccounts: many(socialAccounts),
  popups: many(popups),
  leads: many(leads),
  campaignStats: many(campaignStats),
  seoSettings: many(seoSettings),
}));

export const emailCampaignsRelations = relations(emailCampaigns, ({ one }) => ({
  shop: one(shops, {
    fields: [emailCampaigns.shopId],
    references: [shops.id],
  }),
  template: one(emailTemplates, {
    fields: [emailCampaigns.templateId],
    references: [emailTemplates.id],
  }),
}));

export const socialAccountsRelations = relations(socialAccounts, ({ one, many }) => ({
  shop: one(shops, {
    fields: [socialAccounts.shopId],
    references: [shops.id],
  }),
  posts: many(socialPosts),
}));

export const socialPostsRelations = relations(socialPosts, ({ one }) => ({
  socialAccount: one(socialAccounts, {
    fields: [socialPosts.socialAccountId],
    references: [socialAccounts.id],
  }),
}));

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  roleId: true,
  shopId: true,
});

export const insertRoleSchema = createInsertSchema(roles);
export const insertShopSchema = createInsertSchema(shops);
export const insertEmailCampaignSchema = createInsertSchema(emailCampaigns);
export const insertEmailTemplateSchema = createInsertSchema(emailTemplates);
export const insertSmsCampaignSchema = createInsertSchema(smsCampaigns);
export const insertSocialAccountSchema = createInsertSchema(socialAccounts);
export const insertSocialPostSchema = createInsertSchema(socialPosts);
export const insertPopupSchema = createInsertSchema(popups);
export const insertLeadSchema = createInsertSchema(leads);
export const insertCampaignStatSchema = createInsertSchema(campaignStats);
export const insertSeoSettingSchema = createInsertSchema(seoSettings);

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertRole = z.infer<typeof insertRoleSchema>;
export type Role = typeof roles.$inferSelect;

export type InsertShop = z.infer<typeof insertShopSchema>;
export type Shop = typeof shops.$inferSelect;

export type InsertEmailCampaign = z.infer<typeof insertEmailCampaignSchema>;
export type EmailCampaign = typeof emailCampaigns.$inferSelect;

export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;
export type EmailTemplate = typeof emailTemplates.$inferSelect;

export type InsertSmsCampaign = z.infer<typeof insertSmsCampaignSchema>;
export type SmsCampaign = typeof smsCampaigns.$inferSelect;

export type InsertSocialAccount = z.infer<typeof insertSocialAccountSchema>;
export type SocialAccount = typeof socialAccounts.$inferSelect;

export type InsertSocialPost = z.infer<typeof insertSocialPostSchema>;
export type SocialPost = typeof socialPosts.$inferSelect;

export type InsertPopup = z.infer<typeof insertPopupSchema>;
export type Popup = typeof popups.$inferSelect;

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export type InsertCampaignStat = z.infer<typeof insertCampaignStatSchema>;
export type CampaignStat = typeof campaignStats.$inferSelect;

export type InsertSeoSetting = z.infer<typeof insertSeoSettingSchema>;
export type SeoSetting = typeof seoSettings.$inferSelect;
