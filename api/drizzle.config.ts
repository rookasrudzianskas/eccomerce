import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: ['./src/db/productsSchema.ts', './src/db/usersSchema.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://admin:qd9czgeC8EKG@ep-calm-violet-a213pa97-pooler.eu-central-1.aws.neon.tech/ecom?sslmode=require",
  },
  verbose: true,
  strict: true,
});