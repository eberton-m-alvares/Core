import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Implementação temporária para o Milestone 2
        if (credentials.email === "test@example.com" && credentials.password === "password123") {
          return { id: "1", name: "Test User", email: "test@example.com", role: "ADMIN" }
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
