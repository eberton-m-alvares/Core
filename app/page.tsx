export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Next.js Boilerplate
        </h1>
        <p className="text-muted-foreground text-lg">
          Production-ready. Auth, SEO, Webhooks, Security — tudo configurado.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          Milestone 1 — Fundação ativa
        </div>
      </div>
    </main>
  )
}
