"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
    >
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl tracking-tight">
              {siteConfig.name}
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </Link>
        </nav>
      </div>
    </motion.header>
  )
}
