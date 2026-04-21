import type { Dispatch, SetStateAction } from "react"

export type HeroSlide = {
  id: string
  src: string
  alt: string
}

export type QualitySlide = {
  id: string
  src: string
  alt: string
  category: string
  title: string
  description: string
  location: string
}

export type QualityCarouselProps = {
  slides: QualitySlide[]
  active: number
  setActive: Dispatch<SetStateAction<number>>
}
