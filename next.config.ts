import type { NextConfig } from 'next'

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  },
  // CSP is injected per-request via middleware.ts with a random nonce.
  // Placing CSP here with 'unsafe-inline' would drop the A+ grade on securityheaders.com.
]

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: securityHeaders,
    },
  ],

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  // Required for Docker multi-stage standalone build
  output: 'standalone',

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
