# 🧩 Core: The Ultimate Next.js 15 Production Boilerplate

[![Stock: Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind: v3.4](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Auth: Auth.js v5](https://img.shields.io/badge/Auth.js-v5-FF4500?style=for-the-badge&logo=next.js)](https://authjs.dev/)
[![Security: CSP+Nonces](https://img.shields.io/badge/Security-Hardened-green?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

**Core** is a high-performance, security-first boilerplate designed for building scalable SaaS applications. It removes the friction of initial setup by providing a battle-tested architecture, strict environment validation, and production-ready security patterns.

---

## 🌎 Languages / Idiomas

- [English (#en)](#-english-version)
- [Português Brasil (#pt)](#-versão-em-português)

---

## 🇺🇸 English Version

### 🔥 Core Features

- **Next.js 15 (App Router)**: Utilizing Turbopack for lightning-fast development.
- **Auth.js v5 (Beta)**: Fully integrated with Prisma Adapter, support for Roles, and dynamic session handling.
- **The Shield (Security)**: Advanced Content Security Policy (CSP) with dynamic nonces, HSTS, and XSS protection.
- **Strict Env Validation**: Zod-powered fail-fast environment variable checking.
- **Robust Webhooks**: Secure signature validation infrastructure using Svix.
- **Audit Logs**: Built-in system to track critical user and system actions.
- **Developer Experience**: Conventional Commits, Husky, Lint-staged, and Prettier configured out of the box.

### 🛠️ Tech Stack

- **Database**: Prisma 7 (SQLite/PostgreSQL ready).
- **UI Components**: Shadcn UI + Tailwind CSS v3.4.
- **Validation**: Zod (Schema first).
- **DevOps**: Multi-stage Dockerfile + Standalone output.

### 🚀 Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/eberton-m-alvares/Core.git
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Setup environment:**
   ```bash
   cp .env.example .env.local
   ```
4. **Run migrations:**
   ```bash
   npx prisma migrate dev
   ```
5. **Start dev server:**
   ```bash
   pnpm dev
   ```

---

## 🇧🇷 Versão em Português

### 🔥 Diferenciais do Core

- **Next.js 15 (App Router)**: Próxima geração do framework com Turbopack.
- **Auth.js v5 (Beta)**: Autenticação moderna com Suporte a Roles e JWT/Database sessions.
- **The Shield (Segurança)**: CSP avançado com Nonces, proteção contra XSS e injeção de scripts.
- **Validação Estrita via Zod**: O sistema trava no boot se faltar qualquer variável de ambiente.
- **Webhooks Seguros**: Infraestrutura pronta para validar assinaturas externas (Stripe, Resend, etc).
- **Logs de Auditoria**: Rastreabilidade total de ações críticas no banco de dados.
- **DevEx Pro**: Husky, Commitlint e Prettier configurados para manter o código limpo.

### 🛠️ Tecnologias

- **Banco de Dados**: Prisma 7 (Preparado para SQLite ou PostgreSQL).
- **Interface**: Shadcn UI + Tailwind CSS v3.4.
- **Validação**: Zod para esquemas e tipos.
- **DevOps**: Dockerfile multi-estágio otimizado para produção.

### 🚀 Começando

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/eberton-m-alvares/Core.git
   ```
2. **Instale as dependências:**
   ```bash
   pnpm install
   ```
3. **Configure o ambiente:**
   ```bash
   cp .env.example .env.local
   ```
4. **Rode as migrações:**
   ```bash
   npx prisma migrate dev
   ```
5. **Inicie o servidor:**
   ```bash
   pnpm dev
   ```

---

## 🛡️ Security First

This boilerplate implements **Dynamic Nonces** for CSP, ensuring that even inline scripts are verified before execution. This significantly reduces the risk of XSS attacks in production environments.

## 📄 License

MIT License. Created by [Eberton Alvares](https://github.com/eberton-m-alvares).
