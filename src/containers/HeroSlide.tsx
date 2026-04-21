import type { HeroSlide as HeroSlideType } from "@/types"
import type { FC } from "react"

type HeroSlideProps = {
  slides: HeroSlideType[]
  activeIndex: number
}

export const HeroSlide: FC<HeroSlideProps> = ({ slides, activeIndex }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, i) => {
        const isActive = i === activeIndex
        return (
          <div

            key={isActive ? `active-${activeIndex}` : slide.id}
            className={isActive ? "hero-slide-reveal absolute inset-0 z-10" : "absolute inset-0 z-0"}
          >
            <img
              src={slide.src}
              alt={isActive ? slide.alt : ""}
              aria-hidden={!isActive}
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
              sizes="100vw"
              width={1920}
              height={1080}
              decoding="async"
            />
          </div>
        )
      })}
      <div className="absolute inset-0 z-20 bg-linear-to-b from-black/40 via-transparent to-black/60" />
    </div>
  )
}
