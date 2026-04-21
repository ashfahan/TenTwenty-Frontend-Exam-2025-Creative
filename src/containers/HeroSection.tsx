import { Container } from "@/components/Container"
import { heroSlides } from "@/constants/heroSlides"
import { HeroButton } from "@/containers/HeroButton"
import { HeroProgressBar } from "@/containers/HeroProgressBar"
import { HeroSlide } from "@/containers/HeroSlide"
import { useAnimationProgress } from "@/hooks/useAnimationProgress"
import { useCarousel } from "@/hooks/useCarousel"
import type { FC } from "react"

const SLIDE_MS = 6_000

export const HeroSection: FC = () => {
  const { active, next } = useCarousel(heroSlides.length)
  const progress = useAnimationProgress(SLIDE_MS, active, next)

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[min(100dvh,56rem)] flex-col overflow-hidden bg-neutral-900 lg:min-h-[min(100dvh,56.25rem)]"
      aria-labelledby="hero-heading"
    >
      <HeroSlide slides={heroSlides} activeIndex={active} />

      <Container className="relative z-30 flex w-full flex-1 flex-col justify-center pt-16 pb-24 lg:pt-20 lg:pb-40">
        <header key={active}>
          <p
            id="hero-eyebrow"
            className="hero-eyebrow-animate text-sm font-medium tracking-[0.2em] text-white/90 uppercase lg:text-base"
          >
            Welcome To TenTwenty Farms
          </p>
          <h1
            id="hero-heading"
            aria-describedby="hero-eyebrow"
            className="hero-title-animate mt-4 max-w-[20ch] text-4xl leading-[1.1] font-medium tracking-tight text-white lg:max-w-[18ch] lg:text-7xl"
          >
            From Our Farms To Your Hands.
          </h1>
        </header>
      </Container>

      <Container className="relative z-30 flex w-full flex-row items-center gap-4 pb-8 lg:pb-10">
        <HeroButton nextSlide={heroSlides[(active + 1) % heroSlides.length]} progress={progress} onNext={next} />
        <HeroProgressBar current={active + 1} total={heroSlides.length} progress={progress} />
      </Container>
    </section>
  )
}
