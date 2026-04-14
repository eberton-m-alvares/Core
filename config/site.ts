import { env } from '@/lib/env'

export const siteConfig = {
  name: 'Next.js Boilerplate',
  description: 'Production-ready Next.js boilerplate with Auth, SEO, Webhooks, and Security.',
  url: process.env.NEXT_PUBLIC_APP_URL!,
  ogImage: '/og-image.png',
  logoUrl: '/logo.png',
  twitterHandle: '@handle',
  socialLinks: [
    'https://github.com/',
  ],

  contact: {
    email: 'contato@site.com',
    whatsapp: '',
    address: '',
  },

  features: {
    blog: true,
    auth: true,
    recaptcha: env.NEXT_PUBLIC_ENABLE_RECAPTCHA,
    twoFactor: env.NEXT_PUBLIC_ENABLE_2FA,
  },
} as const
