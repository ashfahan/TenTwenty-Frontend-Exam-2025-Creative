import { DragIcon } from "@/components/Icons"
import { useDrag } from "@/hooks/useDrag"
import type { QualityCarouselProps, QualitySlide } from "@/types"
import { useCallback, useEffect, useRef, useState, type CSSProperties, type FC } from "react"

const DRAG_THRESHOLD = 90
const DRAG_RUBBER = 300
const SIDE_TILT = 11
const CENTER_W = 0.4
const SIDE_W = 0.2
const CARD_SCALE = 1.35
const ASPECT_RATIO = 4 / 3
const MOBILE_BREAKPOINT = 1024
const MOBILE_SPACING = 120
const DESKTOP_SPACING_FACTOR = (CENTER_W / 2 + SIDE_W / 2) * CARD_SCALE

// Position cards in carousel slot: t=0 (center), t=−1 (left), t=+1 (right)
// All cards anchored at left:50% and use transform-only positioning for GPU acceleration
function slotTransform(t: number, cardSpacing: number, carouselHeight: number, isDragging: boolean): CSSProperties {
  const absT = Math.abs(t)
  const x = t * cardSpacing
  const sideH = carouselHeight * (SIDE_W / CENTER_W)
  const centerY = (absT * (carouselHeight - sideH)) / 2
  const rotate = t * SIDE_TILT

  return {
    position: "absolute",
    left: "50%",
    top: 0,
    willChange: "transform",
    zIndex: Math.round(100 - absT * 30),
    transform: `translate(calc(-50% + ${x}px), ${centerY}px) rotate(${rotate}deg)`,
    transition: isDragging ? "none" : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
  }
}

function SlideImg({
  slide,
  sizes,
  className,
  imgKey,
}: {
  slide: QualitySlide
  sizes: string
  className?: string
  imgKey?: string
}) {
  return (
    <img
      key={imgKey}
      src={slide.src}
      alt={slide.alt}
      className={`aspect-[3/4] w-full object-cover ${className ?? ""}`}
      sizes={sizes}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  )
}

export const QualityCarousel: FC<QualityCarouselProps> = ({ slides, active, setActive }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerCardRef = useRef<HTMLDivElement>(null)

  const [cardSpacing, setCardSpacing] = useState(270)
  const [carouselHeight, setCarouselHeight] = useState(480)
  const [dragIconPos, setDragIconPos] = useState({ x: 0, y: 0 })
  const [isPointerOverCenter, setIsPointerOverCenter] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      const mobile = w < MOBILE_BREAKPOINT

      // Only update if state would actually change
      setIsMobile((prev) => (prev !== mobile ? mobile : prev))

      if (mobile) {
        const h = Math.round(w * 0.5 * ASPECT_RATIO)
        setCardSpacing((prev) => (prev !== MOBILE_SPACING ? MOBILE_SPACING : prev))
        setCarouselHeight((prev) => (prev !== h ? h : prev))
      } else {
        const spacing = w * DESKTOP_SPACING_FACTOR
        const h = Math.round(w * CENTER_W * ASPECT_RATIO * CARD_SCALE)
        setCardSpacing((prev) => (prev !== spacing ? spacing : prev))
        setCarouselHeight((prev) => (prev !== h ? h : prev))
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const nextSlide = useCallback(() => setActive((i) => (i + 1) % slides.length), [slides.length])
  const prevSlide = useCallback(() => setActive((i) => (i - 1 + slides.length) % slides.length), [slides.length])

  const { dragOffset, isDragging, pointerHandlers, stopPropagation } = useDrag({
    threshold: DRAG_THRESHOLD,
    rubber: DRAG_RUBBER,
    onSwipe: (dir) => (dir === "left" ? nextSlide() : prevSlide()),
  })

  const handleCenterMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!centerCardRef.current) return
    const rect = centerCardRef.current.getBoundingClientRect()
    setDragIconPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const slide = slides[active]
  const leftSlide = slides[(active - 1 + slides.length) % slides.length]
  const rightSlide = slides[(active + 1) % slides.length]

  const dragProgress = dragOffset / cardSpacing
  const leftPos = -1 + dragProgress
  const centerPos = 0 + dragProgress
  const rightPos = 1 + dragProgress

  const sideWidth = isMobile ? "20%" : "30%"
  const centerWidth = isMobile ? "52%" : "50%"
  const showIcon = isPointerOverCenter || isDragging

  const dragAttrs = {
    ...pointerHandlers,
    role: "group" as const,
    "aria-roledescription": "carousel",
    "aria-label": "Quality products gallery. Drag horizontally to change slide.",
  }

  return (
    <figure className="relative mx-auto mt-12 max-w-5xl">
      <div
        ref={containerRef}
        className="relative cursor-grab touch-pan-y select-none active:cursor-grabbing"
        style={{ height: carouselHeight }}
        {...dragAttrs}
      >
        <button
          type="button"
          aria-label="Previous slide"
          onPointerDown={stopPropagation}
          onClick={prevSlide}
          className="overflow-hidden rounded-xl shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 lg:rounded-2xl lg:shadow-xl"
          style={{ ...slotTransform(leftPos, cardSpacing, carouselHeight, isDragging), width: sideWidth }}
        >
          <SlideImg slide={leftSlide} sizes="20vw lg:22vw" />
        </button>

        <div
          ref={centerCardRef}
          className="overflow-hidden rounded-xl shadow-lg lg:rounded-2xl lg:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.35)] border-2 border-accent-ring lg:border-0"
          style={{ ...slotTransform(centerPos, cardSpacing, carouselHeight, isDragging), width: centerWidth }}
          onPointerMove={handleCenterMove}
          onPointerEnter={() => setIsPointerOverCenter(true)}
          onPointerLeave={() => setIsPointerOverCenter(false)}
        >
          <img
            key={slide.id}
            src={slide.src}
            alt={slide.alt}
            className="quality-center-animate aspect-3/4 w-full object-cover"
            width={480}
            height={640}
            sizes="(min-width: 64rem) 38vw, 52vw"
            loading="lazy"
            decoding="async"
            draggable={false}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute flex h-14 w-14 items-center justify-center rounded-full bg-white select-none lg:h-20 lg:w-20"
            style={{
              mixBlendMode: "difference",
              left: 0,
              top: 0,
              transform: `translate(calc(${dragIconPos.x}px - 50%), calc(${dragIconPos.y}px - 50%))`,
              transition: "opacity 150ms ease",
              opacity: showIcon ? 1 : 0,
            }}
          >
            <DragIcon className="h-6 w-6 text-white lg:h-7 lg:w-7" />
          </div>
        </div>

        <button
          type="button"
          aria-label="Next slide"
          onPointerDown={stopPropagation}
          onClick={nextSlide}
          className="overflow-hidden rounded-xl shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 lg:rounded-2xl lg:shadow-xl"
          style={{ ...slotTransform(rightPos, cardSpacing, carouselHeight, isDragging), width: sideWidth }}
        >
          <SlideImg slide={rightSlide} sizes="20vw lg:22vw" />
        </button>
      </div>

      <figcaption className="mt-8 text-center" aria-live="polite" aria-atomic="true">
        {/* key forces remount on slide change so CSS animations replay from scratch */}
        <span key={slide.id} className="block">
          <span className="quality-eyebrow-animate block text-sm tracking-widest text-neutral-500 uppercase">
            {slide.category}
          </span>
          <span className="quality-title-animate mt-2 block text-lg font-semibold text-neutral-900">
            {slide.title}
          </span>
          <span className="quality-desc-animate mt-1 block text-sm whitespace-pre-line text-neutral-600">
            {slide.description}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
