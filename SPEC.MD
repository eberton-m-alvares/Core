# SPEC Técnico — Next.js Production Boilerplate
**Versão:** 1.2.0  
**Tipo:** Technical Specification  
**Depende de:** PRD v1.0.0  
**Changelog v1.2.0 (final):** Fix config/site.ts — env booleano real (remover comparação string). Fix next.config.ts — remover unsafe-inline residual do bloco estático (CSP fica 100% no middleware com nonce). SPEC marcada como APROVADA COM LOUVOR pelo Tech Lead.

---

## 1. Stack Tecnológico

### Core
```
next@15.x                   # App Router, Server Components, Server Actions
react@19.x                  # Concurrent Features
typescript@5.x              # strict mode
tailwindcss@3.4.x           # ATENÇÃO: manter v3.4 até shadcn/ui ter suporte oficial ao v4
                            # Tailwind v4 muda a engine (CSS-first config, sem tailwind.config.js).
                            # shadcn/ui foi desenhado para v3. Testar shadcn init com v4 antes de migrar.
                            # Upgrade para v4 entra na SPEC v1.2 após validação de compatibilidade.
@shadcn/ui (latest)         # componentes acessíveis (baseado em Radix UI)
```

> **Context7** — MCP tool que injeta documentação atualizada das libs diretamente no contexto
> do LLM durante desenvolvimento. Garante que código gerado use a API atual da lib,
> não a versão desatualizada do training data. Configurar via `.mcp.json` na raiz do repo.
> Docs: https://context7.com

### Auth
```
next-auth@5.x (Auth.js)     # session, JWT, OAuth, credentials
@auth/prisma-adapter        # adapter para Prisma (opcional)
bcryptjs                    # hash de senhas — SOMENTE em Node.js Runtime
                            # bcrypt NAO e compativel com Edge Runtime (Vercel/CF Workers)
                            # A funcao authorize() do Credentials provider DEVE declarar:
                            # export const runtime = 'nodejs'  <- obrigatorio
oslo                        # alternativa Edge-safe para hashing (uso futuro)
# otplib (2FA TOTP) -> MOVIDO PARA v1.2
# Justificativa: Magic Link ja cobre 2nd factor na v1.0 com menos complexidade
```

### Validação & Formulários
```
zod@3.x                     # schema validation (server + client)
react-hook-form@7.x         # formulários performáticos
@hookform/resolvers         # integração zod + react-hook-form
```

### Webhook & HTTP
```
crypto (Node built-in)      # HMAC signature verification
@upstash/ratelimit          # rate limiting serverless
@upstash/redis              # Redis client (Edge-compatible)
resend                      # email transacional
```

### SEO & Meta
```
next (built-in metadata)    # generateMetadata, generateSitemaps
schema-dts                  # TypeScript types para JSON-LD
```

### Qualidade
```
eslint@9.x                  # flat config
prettier@3.x
husky@9.x                   # git hooks
lint-staged
@commitlint/cli             # conventional commits
```

### DevOps
```
docker
github actions
@next/bundle-analyzer       # análise de bundle
```

---

## 2. Estrutura de Pastas

```
nextjs-boilerplate/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group — auth pages
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (marketing)/              # Route group — público
│   │   ├── layout.tsx            # layout com Header/Footer
│   │   ├── page.tsx              # homepage
│   │   └── blog/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── (protected)/              # Route group — autenticado
│   │   └── dashboard/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts   # Auth.js handler
│   │   ├── webhooks/
│   │   │   ├── [provider]/route.ts       # Webhook inbound handler
│   │   │   └── _lib/
│   │   │       ├── verify-signature.ts
│   │   │       ├── providers/
│   │   │       │   ├── n8n.ts
│   │   │       │   ├── evolution.ts      # WhatsApp
│   │   │       │   └── meta.ts           # Meta Ads
│   │   │       └── queue.ts              # Retry queue
│   │   ├── contact/route.ts              # Formulário de contato
│   │   └── health/route.ts               # Health check
│   ├── globals.css
│   ├── layout.tsx                # Root layout
│   └── not-found.tsx
│
├── components/
│   ├── ui/                       # shadcn/ui components (gerados)
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   └── breadcrumb.tsx
│   ├── sections/                 # Seções de LP
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── testimonials.tsx
│   │   ├── pricing.tsx
│   │   ├── faq.tsx
│   │   └── cta.tsx
│   ├── forms/
│   │   └── contact-form.tsx
│   ├── seo/
│   │   └── json-ld.tsx           # Schema.org injector
│   └── auth/
│       ├── login-form.tsx
│       ├── register-form.tsx
│       └── user-avatar.tsx
│
├── lib/
│   ├── auth/
│   │   ├── config.ts             # Auth.js config central
│   │   ├── session.ts            # getSession helpers
│   │   └── permissions.ts        # RBAC helpers
│   ├── seo/
│   │   ├── metadata.ts           # generateMetadata factory
│   │   └── schema.ts             # JSON-LD builders
│   ├── webhooks/
│   │   ├── outbound.ts           # Client de envio com signing + retry
│   │   ├── crypto.ts             # HMAC helpers
│   │   └── inbound/              # Regras de negocio dos webhooks (Clean Architecture)
│   │       ├── verify-signature.ts
│   │       ├── queue.ts          # Retry queue + waitUntil
│   │       └── providers/
│   │           ├── n8n.ts
│   │           ├── evolution.ts  # WhatsApp
│   │           └── meta.ts       # Meta Ads
│   ├── email/
│   │   └── send.ts               # Wrapper Resend
│   ├── rate-limit.ts             # Upstash rate limiter
│   ├── env.ts                    # Zod env validation
│   └── utils.ts                  # cn(), formatDate(), etc.
│
├── hooks/
│   ├── use-session.ts
│   └── use-form-submit.ts
│
├── types/
│   ├── auth.d.ts                 # Extensão de tipos Auth.js
│   ├── api.d.ts
│   └── index.d.ts
│
├── config/
│   ├── site.ts                   # Configuração global do site
│   ├── navigation.ts             # Links de nav
│   └── integrations.ts           # Flags de integrações
│
├── middleware.ts                 # Auth + rate limit + CSP
│
├── public/
│   ├── robots.txt                # Gerado via next.config
│   └── icons/
│
├── docs/                         # Documentação open source
│   ├── getting-started.md
│   ├── architecture.md
│   ├── auth.md
│   ├── webhooks.md
│   ├── seo.md
│   ├── deployment.md
│   ├── security.md
│   └── components.md
│
├── .env.example
├── .env.local                    # gitignored
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── prettier.config.mjs
├── Dockerfile
├── docker-compose.yml
├── .github/workflows/
│   ├── ci.yml
│   └── deploy.yml
└── README.md
```

---

## 3. Especificações por Módulo

### 3.1 ENV Validation (lib/env.ts)

O app **não sobe** se qualquer variável obrigatória estiver ausente ou mal formatada.

```typescript
// lib/env.ts
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
  
  // Database (opcional)
  // SQLite por default (arquivo local) — zero infra para comecar
  // Para producao: trocar por postgresql://... no .env.production
  DATABASE_URL: z.string().default('file:./dev.db'),
  
  // Webhooks
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
  // z.coerce.boolean() converte a string 'true'/'false' para booleano real
  // Evita verificacoes como: if (env.FLAG === 'true') — usa if (env.FLAG) diretamente
  NEXT_PUBLIC_ENABLE_RECAPTCHA: z.coerce.boolean().default(false),
  NEXT_PUBLIC_ENABLE_2FA: z.coerce.boolean().default(false),
})

export const env = envSchema.parse(process.env)
```

---

### 3.2 Auth.js v5 Config (lib/auth/config.ts)

> **Runtime obrigatório:** A rota de API que processa login com Credentials (`authorize()`)
> usa `bcryptjs`, que depende de APIs nativas do Node.js. Declarar `export const runtime = 'nodejs'`
> na route previne deploy acidental no Edge Runtime (Vercel Edge / Cloudflare Workers), onde
> bcrypt falha silenciosamente ou causa timeout.

```typescript
// lib/auth/config.ts
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Resend from 'next-auth/providers/resend'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),  // opcional — remover para JWT puro
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,     // 30 dias
    updateAge: 24 * 60 * 60,        // renovar daily
  },
  
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
    Resend({                         // Magic Link
      apiKey: env.RESEND_API_KEY,
      from: env.EMAIL_FROM,
    }),
    Credentials({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const parsed = z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }).safeParse(credentials)
        
        if (!parsed.success) return null
        
        const user = await getUserByEmail(parsed.data.email)
        if (!user?.password) return null
        
        const valid = await bcrypt.compare(parsed.data.password, user.password)
        if (!valid) return null
        
        return { id: user.id, email: user.email, role: user.role }
      },
    }),
  ],
  
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role    // adicionar role no JWT
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      return session
    },
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
    verifyRequest: '/verify-email',
  },
})
```

#### RBAC Middleware (middleware.ts)

```typescript
// middleware.ts
import { auth } from '@/lib/auth/config'
import { NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/', '/blog', '/login', '/register']
const AUTH_ROUTES = ['/login', '/register', '/forgot-password']
const PROTECTED_PREFIX = '/dashboard'
const ADMIN_PREFIX = '/admin'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth
  
  // Rate limiting aqui (via Edge)
  
  // Redirecionar usuário logado fora de rotas de auth
  if (AUTH_ROUTES.includes(pathname) && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  
  // Proteger rotas privadas
  if (pathname.startsWith(PROTECTED_PREFIX) && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  // Proteger rotas de admin
  if (pathname.startsWith(ADMIN_PREFIX) && session?.user?.role !== 'admin') {
    return NextResponse.redirect(new URL('/403', req.url))
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/health).*)'],
}
```

---

### 3.3 Security Headers (next.config.ts)

```typescript
// next.config.ts
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
  // Content-Security-Policy NAO vai aqui.
  // CSP e gerado por request no middleware.ts com nonce aleatorio (ver secao 3.3).
  // Colocar CSP aqui com 'unsafe-inline' derrubaria a nota A+ no securityheaders.com.
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
    remotePatterns: [],   // adicionar domínios conforme necessário
  },
  
  // OBRIGATORIO para Docker multi-stage standalone funcionar (Dockerfile copia .next/standalone)
  output: 'standalone',

  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
}

export default nextConfig
```

---

### 3.4 Webhook Inbound (api/webhooks/[provider]/route.ts)

```typescript
// app/api/webhooks/[provider]/route.ts
// IMPORTANTE: Node.js runtime — bcrypt e crypto nativo nao rodam no Edge
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'              // Next 15: unstable_after -> after
import { verifySignature } from '@/lib/webhooks/inbound/verify-signature'
import { processWebhookEvent } from '@/lib/webhooks/inbound/queue'
import { rateLimit } from '@/lib/rate-limit'

// CORS — handlers externos (n8n, Meta, Evolution) precisam de OPTIONS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',       // restringir por provider em producao
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-hub-signature-256, x-n8n-signature, apikey',
    },
  })
}

type Provider = 'n8n' | 'evolution' | 'meta'

const SUPPORTED_PROVIDERS: Provider[] = ['n8n', 'evolution', 'meta']

export async function POST(
  req: NextRequest,
  { params }: { params: { provider: Provider } }
) {
  const { provider } = params
  
  // 1. Validar provider
  if (!SUPPORTED_PROVIDERS.includes(provider)) {
    return NextResponse.json({ error: 'Unknown provider' }, { status: 404 })
  }
  
  // 2. Rate limiting por IP
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const limited = await rateLimit(`webhook:${ip}`, 30, '1m')  // 30 req/min
  if (limited) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }
  
  // 3. Ler payload (raw para verificação de assinatura)
  const rawBody = await req.text()
  
  // 4. Verificar assinatura HMAC
  const isValid = await verifySignature(provider, req.headers, rawBody)
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }
  
  // 5. Idempotency check
  const idempotencyKey = req.headers.get('x-idempotency-key')
  if (idempotencyKey) {
    const isDuplicate = await checkIdempotency(idempotencyKey)
    if (isDuplicate) {
      return NextResponse.json({ status: 'duplicate' }, { status: 200 })
    }
  }
  
  // 6. Processar de forma async SEM bloquear a resposta HTTP
  // after() garante execucao mesmo apos o NextResponse ser enviado (Next 15)
  // Sem isso, Vercel/Lambda matam a thread assim que o Response retorna
  const payload = JSON.parse(rawBody)
  after(async () => {
    await processWebhookEvent({ provider, payload, idempotencyKey })
  })

  return NextResponse.json({ status: 'received' }, { status: 200 })
}
```

---

### 3.2.5 Database Default — SQLite via Prisma

O boilerplate usa **SQLite como banco default** para garantir a promessa do PRD de "setup em < 5 minutos".

```prisma
// prisma/schema.prisma
datasource db {
  provider = "sqlite"         // default dev — zero containers necessários
  url      = env("DATABASE_URL")  // "file:./dev.db"
}

// Para produção: trocar provider para "postgresql" e atualizar DATABASE_URL
// prisma migrate deploy roda as mesmas migrations em ambos os providers
```

**Fluxo de upgrade para PostgreSQL:**
1. Alterar `provider = "postgresql"` no schema
2. Atualizar `DATABASE_URL` no `.env.production`  
3. Rodar `pnpm prisma migrate deploy`
4. Zero alteração no código da aplicação

---

#### Verificação de Assinatura por Provider

```typescript
// lib/webhooks/inbound/verify-signature.ts
// (movido de app/api/webhooks/_lib/ — Clean Architecture: delivery layer nao guarda regras de negocio)
import { createHmac, timingSafeEqual } from 'crypto'

type SignatureConfig = {
  headerName: string
  secretEnvKey: string
  algorithm: string
  prefix?: string
}

const PROVIDER_CONFIGS: Record<string, SignatureConfig> = {
  n8n: {
    headerName: 'x-n8n-signature',
    secretEnvKey: 'WEBHOOK_SECRET_N8N',
    algorithm: 'sha256',
    prefix: 'sha256=',
  },
  evolution: {
    headerName: 'apikey',           // Evolution API usa apikey header
    secretEnvKey: 'WEBHOOK_SECRET_EVOLUTION',
    algorithm: 'sha256',
  },
  meta: {
    headerName: 'x-hub-signature-256',
    secretEnvKey: 'WEBHOOK_SECRET_META',
    algorithm: 'sha256',
    prefix: 'sha256=',
  },
}

export async function verifySignature(
  provider: string,
  headers: Headers,
  rawBody: string
): Promise<boolean> {
  const config = PROVIDER_CONFIGS[provider]
  if (!config) return false
  
  const secret = process.env[config.secretEnvKey]
  if (!secret) {
    console.error(`Missing env: ${config.secretEnvKey}`)
    return false
  }
  
  const receivedSig = headers.get(config.headerName)
  if (!receivedSig) return false
  
  const sigToCompare = config.prefix
    ? receivedSig.replace(config.prefix, '')
    : receivedSig
  
  const expected = createHmac(config.algorithm, secret)
    .update(rawBody)
    .digest('hex')
  
  // Constant-time comparison (evita timing attacks)
  try {
    return timingSafeEqual(
      Buffer.from(sigToCompare),
      Buffer.from(expected)
    )
  } catch {
    return false
  }
}
```

---

### 3.5 SEO Metadata Factory (lib/seo/metadata.ts)

```typescript
// lib/seo/metadata.ts
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

interface PageMetadataProps {
  title: string
  description?: string
  image?: string
  noIndex?: boolean
  path?: string
  type?: 'website' | 'article'
  publishedAt?: string
  author?: string
}

export function generatePageMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
  path = '',
  type = 'website',
  publishedAt,
  author,
}: PageMetadataProps): Metadata {
  const url = `${siteConfig.url}${path}`
  const fullTitle = `${title} | ${siteConfig.name}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    
    alternates: {
      canonical: url,
    },
    
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(author && { authors: [author] }),
    },
    
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
    
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}
```

#### JSON-LD Component

```typescript
// components/seo/json-ld.tsx
interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Builders prontos
export const schemas = {
  website: (name: string, url: string) => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
  }),
  
  organization: (config: typeof siteConfig) => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    url: config.url,
    logo: config.logoUrl,
    sameAs: config.socialLinks,
  }),
  
  article: (post: { title: string; description: string; publishedAt: string; author: string; url: string }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
    url: post.url,
  }),
  
  faq: (items: { question: string; answer: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }),
}
```

---

### 3.6 Rate Limiter (lib/rate-limit.ts)

```typescript
// lib/rate-limit.ts
// Fallback in-memory quando Upstash não está configurado

let limiter: any = null

async function getLimiter() {
  if (limiter) return limiter
  
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const { Ratelimit } = await import('@upstash/ratelimit')
    const { Redis } = await import('@upstash/redis')
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '10 s'),
    })
  }
  
  return limiter
}

export async function rateLimit(
  key: string,
  limit = 10,
  window = '10s'
): Promise<boolean> {
  const l = await getLimiter()
  if (!l) return false   // sem Redis = sem limite (dev mode)
  
  const { success } = await l.limit(key)
  return !success        // retorna true se bloqueado
}
```

---

### 3.7 Outbound Webhook Client (lib/webhooks/outbound.ts)

```typescript
// lib/webhooks/outbound.ts
import { createHmac } from 'crypto'

interface WebhookPayload {
  event: string
  data: Record<string, unknown>
  timestamp?: string
}

interface WebhookConfig {
  url: string
  secret?: string
  timeout?: number
  retries?: number
}

export async function sendWebhook(
  config: WebhookConfig,
  payload: WebhookPayload
): Promise<{ ok: boolean; status?: number; error?: string }> {
  const body = JSON.stringify({
    ...payload,
    timestamp: payload.timestamp ?? new Date().toISOString(),
  })
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'nextjs-boilerplate/1.0',
  }
  
  // Assinar payload se tiver secret
  if (config.secret) {
    const sig = createHmac('sha256', config.secret).update(body).digest('hex')
    headers['x-webhook-signature'] = `sha256=${sig}`
  }
  
  const maxRetries = config.retries ?? 3
  let lastError: string = ''
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), config.timeout ?? 5000)
      
      const res = await fetch(config.url, {
        method: 'POST',
        headers,
        body,
        signal: controller.signal,
      })
      
      clearTimeout(timeout)
      
      if (res.ok) return { ok: true, status: res.status }
      
      lastError = `HTTP ${res.status}`
      
    } catch (err) {
      lastError = err instanceof Error ? err.message : 'Unknown error'
    }
    
    // Exponential backoff: 1s, 2s, 4s
    if (attempt < maxRetries - 1) {
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)))
    }
  }
  
  return { ok: false, error: lastError }
}
```

---

### 3.8 Formulário de Contato (components/forms/contact-form.tsx)

```typescript
// Estrutura do componente
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(2000),
  // Honeypot — deve estar vazio
  website: z.string().max(0, 'Bot detected'),
})

// Server Action para processar
// app/actions/contact.ts
'use server'
export async function submitContact(data: ContactFormData) {
  // 1. Validar novamente no server
  // 2. Rate limit por email
  // 3. Salvar lead (opcional)
  // 4. Disparar webhook outbound para n8n
  // 5. Enviar email de confirmação
  // 6. Retornar resultado
}
```

---

### 3.9 Docker (Dockerfile)

```dockerfile
# Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

---

### 3.10 GitHub Actions CI (.github/workflows/ci.yml)

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test --if-present
      - run: pnpm build
      
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - run: pnpm audit --audit-level=high
```

---

## 4. Config Central do Site (config/site.ts)

```typescript
// config/site.ts — ÚNICA fonte de verdade para info do site
import { env } from '@/lib/env'

export const siteConfig = {
  name: 'Nome do Site',
  description: 'Descrição padrão para SEO',
  url: process.env.NEXT_PUBLIC_APP_URL!,
  ogImage: '/og-image.png',
  logoUrl: '/logo.png',
  twitterHandle: '@handle',
  socialLinks: [
    'https://instagram.com/...',
    'https://linkedin.com/...',
  ],
  
  // Informações de contato
  contact: {
    email: 'contato@site.com',
    whatsapp: '55...',
    address: '',
  },
  
  // Feature flags
  features: {
    blog: true,
    auth: true,
    // env.ts ja fez z.coerce.boolean() — usar diretamente, sem comparar string
    recaptcha: env.NEXT_PUBLIC_ENABLE_RECAPTCHA,
    twoFactor: env.NEXT_PUBLIC_ENABLE_2FA,
  },
} as const
```

---

## 5. Convenções de Código

### Nomenclatura
- Componentes: PascalCase (`HeroSection.tsx`)
- Hooks: camelCase com prefixo use (`useFormSubmit.ts`)
- Utilitários: camelCase (`generateMetadata.ts`)
- Constantes: SCREAMING_SNAKE (`MAX_FILE_SIZE`)
- Tipos/Interfaces: PascalCase com sufixo descritivo (`UserSession`, `WebhookPayload`)

### Server vs Client
- Default: Server Component (sem `'use client'`)
- Usar `'use client'` apenas quando necessário: estado interativo, event handlers, browser APIs
- Server Actions para mutações: `'use server'` em `app/actions/`
- API Routes (`app/api/`) para: webhooks externos, compatibilidade REST, streaming

### Imports
```typescript
// Ordem de imports:
// 1. React / Next.js
// 2. Bibliotecas externas
// 3. @/ aliases (absolutos)
// 4. Relativos (./)
// 5. Tipos

import { type FC } from 'react'
import { clsx } from 'clsx'
import { Button } from '@/components/ui/button'
import { env } from '@/lib/env'
import type { ButtonProps } from './types'
```

---

## 6. .env.example

```bash
# ===========================
# NEXT.JS BOILERPLATE — ENV
# ===========================

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Auth.js v5
# Gerar: openssl rand -base64 32
NEXTAUTH_SECRET=sua-chave-secreta-de-32-chars-minimo
NEXTAUTH_URL=http://localhost:3000

# OAuth (opcional)
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

# Database
# Default: SQLite (zero config, roda na hora — perfeito para dev e projetos pequenos)
DATABASE_URL=file:./dev.db
# Producao: descomente e configure PostgreSQL
# DATABASE_URL=postgresql://user:pass@localhost:5432/mydb

# Email — Resend
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@seudominio.com

# Webhooks — Segredos HMAC
# Gerar: openssl rand -hex 32
WEBHOOK_SECRET_N8N=sua-chave-n8n-minimo-16-chars
WEBHOOK_SECRET_EVOLUTION=
WEBHOOK_SECRET_META=

# Rate Limiting — Upstash Redis (opcional)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Feature Flags
# Booleans reais via z.coerce.boolean() — valores: true | false
NEXT_PUBLIC_ENABLE_RECAPTCHA=false
NEXT_PUBLIC_ENABLE_2FA=false
```

---

## 7. Checklist de Launch

### Antes de ir para produção:
- [ ] `.env.example` está completo e comentado
- [ ] Todas as variáveis de env estão configuradas
- [ ] `NEXTAUTH_SECRET` é único e tem 32+ chars
- [ ] Secrets de webhook são únicos por ambiente
- [ ] `NEXT_PUBLIC_APP_URL` aponta para o domínio correto
- [ ] Security headers testados em securityheaders.com
- [ ] Lighthouse score ≥ 95 em performance
- [ ] sitemap.xml acessível em `/sitemap.xml`
- [ ] robots.txt configurado corretamente
- [ ] Open Graph tags testadas no OG Debugger
- [ ] Health check respondendo em `/api/health`
- [ ] Rate limiting funcionando
- [ ] Webhook signatures testadas
- [ ] Docker image buildando sem erros
- [ ] GitHub Actions CI passando