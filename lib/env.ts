import { z } from 'zod'

const envSchema = z.object({
  // App
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  // Auth
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),
  AUTH_GITHUB_ID: z.string().optional(),
  AUTH_GITHUB_SECRET: z.string().optional(),
  AUTH_SECRET: z.string().min(1).default('fallback-secret-for-dev-only'),

  // Database
  DATABASE_URL: z.string().default('file:./dev.db'),

  // Webhooks
  WEBHOOK_SECRET: z.string().optional(),
  WEBHOOK_SECRET_N8N: z.string().min(16),
  WEBHOOK_SECRET_EVOLUTION: z.string().min(16).optional(),
  WEBHOOK_SECRET_META: z.string().min(16).optional(),

  // Email
  RESEND_API_KEY: z.string().startsWith('re_').optional(),
  EMAIL_FROM: z.string().email().optional(),

  // Rate Limiting
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_RECAPTCHA: z.coerce.boolean().default(false),
  NEXT_PUBLIC_ENABLE_2FA: z.coerce.boolean().default(false),
})

export const env = envSchema.parse(process.env)
