import type { HeroSlide } from "@/types"
import type { FC } from "react"

type HeroNavProps = {
  nextSlide: HeroSlide
  progress: number
  onNext: () => void
}

const TRACK_W = 1
const BAR_W = 5
const SIZE = 100

const INSET = BAR_W / 2
const RECT_W = SIZE - BAR_W
const RECT_H = SIZE - BAR_W
const PERIMETER = 2 * (RECT_W + RECT_H)

export const HeroButton: FC<HeroNavProps> = ({ nextSlide, progress, onNext }) => {
  const dashOffset = PERIMETER * (1 - progress)

  return (
    <button
      type="button"
      onClick={onNext}
      className="group relative shrink-0 p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
      aria-label={`Next slide: ${nextSlide.alt}`}
    >
      <div className="relative w-32 lg:w-36">
        <img
          src={nextSlide.src}
          alt=""
          className="aspect-square w-full object-cover"
          width={200}
          height={200}
          loading="lazy"
          decoding="async"
        />
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-medium tracking-widest text-white uppercase"
          aria-hidden="true"
        >
          Next
        </span>
      </div>

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        fill="none"
        aria-hidden="true"
      >
        <rect x={INSET} y={INSET} width={RECT_W} height={RECT_H} stroke="rgba(255,255,255,0.3)" strokeWidth={TRACK_W} />

        <rect
          x={INSET}
          y={INSET}
          width={RECT_W}
          height={RECT_H}
          stroke="white"
          strokeWidth={BAR_W}
          strokeDasharray={PERIMETER}
          strokeDashoffset={dashOffset}
          strokeLinecap="square"
        />
      </svg>
    </button>
  )
}
