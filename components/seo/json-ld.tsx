import { siteConfig } from "@/config/site"

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": siteConfig.name,
    "description": siteConfig.description,
    "url": siteConfig.url,
    "author": {
      "@type": "Person",
      "name": "Eberton Alvares"
    },
    "programmingLanguage": {
      "@type": "ComputerLanguage",
      "name": "TypeScript"
    },
    "runtimePlatform": "Next.js 15"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
