import { qualitySlides } from "@/constants/qualitySlides"
import { QualityCarousel } from "@/containers/QualityCarousel"
import { useCarousel } from "@/hooks/useCarousel"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { cn } from "@/utils/cn"
import { useEffect, useRef, useState, type FC } from "react"

const loremShort =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."

const IO_OPTIONS = { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }

export const QualityProductsSection: FC = () => {
  const { active, setActive } = useCarousel(qualitySlides.length)
  const sectionRef = useRef<HTMLElement>(null)
  const triggered = useRef(false)
  const [introPhase, setIntroPhase] = useState<"idle" | "title" | "copy">("idle")

  const isVisible = useIntersectionObserver(sectionRef, IO_OPTIONS)

  useEffect(() => {
    // triggered ref prevents re-animating if the section scrolls out and back in
    if (!isVisible || triggered.current) return
    triggered.current = true
    setIntroPhase("title")
    const t = window.setTimeout(() => setIntroPhase("copy"), 380)
    return () => clearTimeout(t)
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      id="quality-products"
      className="bg-(--color-surface-muted) px-4 py-16 lg:py-24"
      aria-labelledby="quality-heading"
      aria-describedby="quality-intro"
    >
      <div className="mx-auto max-w-360">
        <h2
          id="quality-heading"
          className={cn(
            "text-center text-3xl font-semibold tracking-tight text-neutral-900 lg:text-4xl",
            introPhase === "idle" ? "opacity-0" : "quality-intro-title"
          )}
        >
          Quality Products
        </h2>
        <p
          id="quality-intro"
          className={cn(
            "mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-neutral-600 lg:text-lg",
            introPhase === "copy" ? "quality-intro-copy [animation-delay:0.38s]" : "opacity-0"
          )}
        >
          {loremShort}
        </p>
        <QualityCarousel slides={qualitySlides} active={active} setActive={setActive} />
      </div>
    </section>
  )
}
