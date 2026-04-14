"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Lock } from "lucide-react"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(24,24,27,0.05)_0%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(45%_40%_at_50%_50%,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_100%)]" />

        <section className="container mx-auto px-4 pt-32 pb-20 text-center lg:pt-48">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-500">
              The Foundation for <br /> Your Next Big Idea
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400 mb-10 leading-relaxed">
              A high-performance, security-first boilerplate built with Next.js 15, Auth.js v5, and Prisma. Ready for production, out of the box.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 min-w-[200px]">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 min-w-[200px]">
                View Documentation
              </Button>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3 text-left max-w-5xl mx-auto"
          >
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <Zap className="h-10 w-10 mb-4 text-yellow-500" />
              <h3 className="text-xl font-bold mb-2">Maximum Performance</h3>
              <p className="text-sm text-muted-foreground">Built with Next.js 15 and Turbopack for near-instant load times.</p>
            </div>
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <Shield className="h-10 w-10 mb-4 text-green-500" />
              <h3 className="text-xl font-bold mb-2">Secure by Default</h3>
              <p className="text-sm text-muted-foreground">Hardened CSP, Nonces, and audited webhook infrastructure.</p>
            </div>
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <Lock className="h-10 w-10 mb-4 text-blue-500" />
              <h3 className="text-xl font-bold mb-2">Auth.js v5 Ready</h3>
              <p className="text-sm text-muted-foreground">Modern authentication with role-based access control built in.</p>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t py-12 bg-zinc-50 dark:bg-zinc-950/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Core Boilerplate. Built with precision for developers.
          </p>
        </div>
      </footer>
    </div>
  )
}
