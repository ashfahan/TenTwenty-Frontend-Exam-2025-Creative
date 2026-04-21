import { useEffect, useRef, useState, type FC } from "react"

type HeroCounterProps = {
  current: number
  total: number
  progress: number
}

export const HeroProgressBar: FC<HeroCounterProps> = ({ current, total, progress }) => {
  const mounted = useRef(false)
  const [animKey, setAnimKey] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)

  useEffect(() => {
    // skip on first mount — no previous number to animate out
    if (!mounted.current) {
      mounted.current = true
      return
    }
    setPrev((previousState) =>
      previousState !== current ? (current <= 1 ? total : current - 1) : previousState
    )
    // bumping animKey gives exit/enter spans unique keys so React remounts them, restarting the CSS animation
    setAnimKey((k) => k + 1)
    // 2100ms matches the counter-exit animation duration in global.css
    const t = setTimeout(() => setPrev(null), 2100)
    return () => clearTimeout(t)
  }, [current, total])

  return (
    <div className="flex items-center gap-4 text-white lg:pb-2" role="status" aria-atomic="true">
      <span className="sr-only">
        Slide {current} of {total}
      </span>

      <div className="relative h-[1.25em] w-[2ch] overflow-hidden font-medium tabular-nums" aria-hidden="true">
        {prev !== null && (
          <span key={`exit-${animKey}`} className="counter-exit absolute inset-x-0">
            {String(prev).padStart(2, "0")}
          </span>
        )}
        <span key={`enter-${animKey}`} className={`absolute inset-x-0 ${animKey > 0 ? "counter-enter" : ""}`}>
          {String(current).padStart(2, "0")}
        </span>
      </div>

      <div className="relative h-px w-24 overflow-hidden bg-white/35 lg:w-40" role="presentation">
        <div
          className="absolute inset-y-0 left-0 bg-white transition-[width] duration-100 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <span className="font-medium text-white/70 tabular-nums" aria-hidden="true">
        {String(total).padStart(2, "0")}
      </span>
    </div>
  )
}
