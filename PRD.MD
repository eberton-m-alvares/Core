# PRD — Next.js Production Boilerplate
**Versão:** 1.0.0  
**Status:** Draft  
**Autor:** Eber  
**Licença:** MIT (Open Source)

---

## 1. Visão Geral

### 1.1 Problema
Cada projeto novo começa do zero com as mesmas decisões repetidas: configurar SEO, montar segurança de headers, criar camada de webhook, implementar autenticação, integrar shadcn/ui, configurar variáveis de ambiente — tudo isso consome tempo valioso que deveria ir para a lógica de negócio.

### 1.2 Solução
Um boilerplate **production-ready** construído em Next.js 15 (App Router), shadcn/ui e Context7, projetado para ser a base de qualquer projeto — desde uma landing page simples até um portal multi-página complexo — com performance, SEO, segurança e integrações nativas já configuradas e documentadas.

### 1.3 Princípios Guia
- **Zero Configuração Repetida** — tudo que todo projeto precisa já está pronto
- **Segurança First** — headers, CSRF, validação de webhook e auth robustos por padrão
- **Performance First** — Core Web Vitals no green desde o primeiro deploy
- **SEO First** — metadata dinâmica, sitemap, Open Graph e Schema.org prontos
- **Developer Experience** — comandos simples, documentação clara, fácil de extender

---

## 2. Objetivos e Métricas de Sucesso

| Objetivo | Métrica | Meta |
|----------|---------|------|
| Velocidade de inicio | Tempo até ter um projeto rodando localmente | < 5 minutos |
| Performance | Lighthouse Score (Performance) | ≥ 95 |
| SEO | Lighthouse Score (SEO) | 100 |
| Acessibilidade | Lighthouse Score (A11y) | ≥ 90 |
| Segurança | Headers Security Grade (securityheaders.com) | A+ |
| DX | Tempo para adicionar uma nova página | < 2 minutos |

---

## 3. Público-Alvo

### Usuário Primário
Desenvolvedor solo ou pequena equipe que precisa lançar LPs, sites institucionais, blogs e portais com velocidade e qualidade profissional.

### Personas
- **Dev de Agência** — precisa de velocidade e entrega consistente
- **Dev Freelancer** — precisa de segurança e manutenibilidade
- **Dev de Produto** — precisa de fundação sólida para escalar

---

## 4. Escopo Funcional

### 4.1 Módulos In-Scope

#### M01 — Fundação (Core)
- Next.js 15 com App Router + TypeScript strict
- shadcn/ui com tema configurável (CSS variables)
- Tailwind CSS 4 com design tokens customizados
- Context7 para documentação contextual em desenvolvimento
- ESLint + Prettier + Husky (pre-commit)
- Path aliases configurados (`@/components`, `@/lib`, etc.)

#### M02 — Autenticação Avançada
- **Provider:** Auth.js v5 (NextAuth v5) — mais avançado disponível para Next.js
- **Strategies suportadas:**
  - Email/Senha com bcrypt + salt
  - OAuth: Google, GitHub (extensível)
  - Magic Link (email passwordless)
  - Credentials customizadas
- **Segurança:**
  - JWT com rotação automática (sliding sessions)
  - CSRF protection nativo
  - Rate limiting no endpoint de login
  - Session invalidation por dispositivo
  - 2FA via TOTP (configurável)
- **RBAC básico:** roles (`admin`, `user`, `guest`) com middleware de proteção de rotas
- **UI:** páginas de login, registro, forgot-password, reset-password prontas com shadcn/ui

#### M03 — SEO & Metadata
- Sistema de metadata centralizado com `generateMetadata()` por rota
- Open Graph completo (título, descrição, imagem, type)
- Twitter Cards automáticos
- Schema.org (JSON-LD) configurável por página: `WebSite`, `Organization`, `Article`, `BreadcrumbList`
- `sitemap.xml` dinâmico (gerado automaticamente a partir das rotas)
- `robots.txt` configurável via env
- Canonical URLs automáticos
- Breadcrumbs acessíveis com JSON-LD
- `<head>` otimizado sem duplicação de tags

#### M04 — Performance
- Next.js Image Optimization configurado
- Font Optimization com `next/font` (zero layout shift)
- Bundle Analyzer integrado (script `analyze`)
- Lazy loading automático de componentes pesados
- Prefetch estratégico de rotas
- Cache headers HTTP configurados para assets estáticos
- Edge Runtime opcional para rotas críticas

#### M05 — Segurança
- **HTTP Headers** (via `next.config.ts`):
  - `Content-Security-Policy` com nonces
  - `Strict-Transport-Security` (HSTS)
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - `X-XSS-Protection`
- **Middleware global:** rate limiting, bot detection básico
- **Variáveis de ambiente:** validação com Zod no startup (app não sobe com env inválida)
- **Secrets:** rotação via env sem rebuild
- **Dependências:** audit automático no CI

#### M06 — Webhooks Nativos
Sistema de webhook de *entrada e saída* com segurança de nível production.

**Webhooks de entrada (inbound):**
- Endpoint genérico: `POST /api/webhooks/[provider]`
- Verificação de assinatura HMAC-SHA256 por provider
- Providers pré-configurados: **n8n**, **WhatsApp/Evolution API**, **Meta Ads**
- Fila interna com retry (3x exponential backoff)
- Log de eventos com status (received, processing, success, failed)
- Idempotency key para evitar double-processing

**Webhooks de saída (outbound):**
- Client utilitário com retry automático
- Signing de payload com shared secret
- Timeout e circuit breaker configuráveis

#### M07 — Formulários & Leads
- Componente `<ContactForm>` pronto com shadcn/ui
- Validação client + server com Zod + React Hook Form
- Proteção anti-spam: Honeypot + rate limiting por IP
- reCAPTCHA v3 (opcional via env flag)
- Integração nativa com webhook de saída (envia lead para n8n/CRM)
- Email transacional via Resend (ou SMTP genérico)
- Feedback visual states: idle, loading, success, error

#### M08 — Componentes Base de UI/LP
Biblioteca de seções prontas para LPs e sites, todas com shadcn/ui + Tailwind:
- `Hero` — variantes: centered, split, with-video
- `Features` — grid, alternating, icons
- `Testimonials` — cards, carousel
- `Pricing` — tabela comparativa, toggle mensal/anual
- `FAQ` — accordion com Schema.org
- `CTA` — banner, inline, sticky
- `Header` — com nav mobile, mega menu opcional
- `Footer` — colunas, links legais
- `BlogList` + `BlogPost` — layout editorial
- Todos com props TypeScript e stories básicos

#### M09 — DevOps & Deploy
- `Dockerfile` production-ready (multi-stage, non-root user)
- `docker-compose.yml` para desenvolvimento local (app + banco + redis)
- GitHub Actions CI:
  - Lint + typecheck + tests em cada PR
  - Build check
  - Security audit
- Deploy scripts para VPS via SSH + Docker
- `.env.example` completo e comentado
- Health check endpoint: `GET /api/health`

---

## 5. Escopo Fora-de-Escopo (v1.0)

| Item | Motivo |
|------|--------|
| CMS headless integrado | Adiciona complexidade; documentado como extensão |
| Multi-tenant | Fora do padrão do boilerplate; extensão futura |
| E-commerce / pagamentos | Escopo separado |
| Dashboard de admin | Módulo separado |
| Testes E2E (Playwright) | v1.1 |
| Internacionalização (i18n) | v1.1 |

---

## 6. Requisitos Não-Funcionais

### Performance
- LCP < 2.5s em conexão 4G
- CLS = 0 (zero layout shift)
- FID / INP < 100ms
- TTFB < 800ms

### Segurança
- OWASP Top 10 cobertos
- Secrets nunca no client bundle
- Zero vulnerabilidades críticas nas dependências

### Manutenibilidade
- TypeScript strict em 100% do código
- Sem any implícito
- Documentação inline com JSDoc nos utilitários principais

### Compatibilidade
- Node.js ≥ 20 LTS
- Deploy: Vercel, VPS (Docker), Netlify, Railway
- Browsers: últimas 2 versões + Safari 14+

---

## 7. Estrutura de Documentação (Open Source)

```
docs/
  getting-started.md      — Setup em 5 minutos
  architecture.md         — Decisões e justificativas
  auth.md                 — Como usar e estender auth
  webhooks.md             — Configurar n8n, WhatsApp, Meta
  seo.md                  — Guia de metadata e Schema.org
  deployment.md           — VPS, Vercel, Docker
  security.md             — Checklist e configurações
  components.md           — Galeria de componentes LP
  contributing.md         — Como contribuir
  changelog.md            — Histórico de versões
```

---

## 8. Roadmap

| Versão | Conteúdo | Prazo |
|--------|----------|-------|
| v1.0.0 | Módulos M01–M09 | Lançamento |
| v1.1.0 | i18n, Playwright E2E, Storybook | +30 dias |
| v1.2.0 | Dashboard admin opcional | +60 dias |
| v2.0.0 | Multi-tenant support | TBD |

---

## 9. Decisões Abertas

| Decisão | Opções | Recomendação |
|---------|--------|-------------|
| Banco de dados default | PostgreSQL, SQLite, sem banco | PostgreSQL via Prisma (opcional, feature-flag) |
| Email provider | Resend, Nodemailer, AWS SES | Resend (melhor DX, free tier generoso) |
| Rate limiting storage | In-memory, Redis, Upstash | Upstash Redis (zero infra adicional) |
| 2FA library | otplib, speakeasy | otplib (mais mantido) |