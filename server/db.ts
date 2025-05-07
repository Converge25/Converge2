import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Use the custom database URL if present, otherwise fallback to environment variable
const dbUrl = "postgresql://neondb_owner:npg_RWGt92LJejcF@ep-round-block-a12g57tq-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
export const pool = new Pool({ connectionString: dbUrl });
export const db = drizzle(pool, { schema });
