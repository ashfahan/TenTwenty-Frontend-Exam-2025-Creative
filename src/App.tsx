import { HeroSection } from "@/containers/HeroSection"
import { QualityProductsSection } from "@/containers/QualityProductsSection"
import { JsonLd } from "@/JsonLd"
import { Header } from "@/layout/Header"

export const App = () => (
  <>
    <JsonLd />
    <div id="top" className="min-h-dvh">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <QualityProductsSection />
      </main>
    </div>
  </>
)
