import { SITE_DESC, SITE_NAME } from "@/constants/site"

export const JsonLd = () => {
  const origin = typeof window !== "undefined" && window.location?.origin ? window.location.origin : ""

  const websiteId = origin ? `${origin}#website` : "#website"
  const webPageId = origin ? `${origin}#webpage` : "#webpage"

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": websiteId,
    name: SITE_NAME,
    description: SITE_DESC,
    inLanguage: "en-US",
    publisher: { "@id": "#organization" },
  }
  if (origin) {
    website.url = origin
  }

  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": "#organization",
    name: SITE_NAME,
    description: SITE_DESC,
  }
  if (origin) {
    organization.url = origin
    organization.logo = {
      "@type": "ImageObject",
      url: `${origin}/favicon.svg`,
    }
  }

  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": webPageId,
    name: SITE_NAME,
    description: SITE_DESC,
    inLanguage: "en-US",
    isPartOf: { "@id": websiteId },
    about: { "@id": "#organization" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    },
  }
  if (origin) {
    webPage.url = `${origin}/`
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [website, organization, webPage],
        }),
      }}
    />
  )
}
