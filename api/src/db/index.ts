
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://admin:qd9czgeC8EKG@ep-calm-violet-a213pa97-pooler.eu-central-1.aws.neon.tech/ecom?sslmode=require",
});

export const db = drizzle(pool);