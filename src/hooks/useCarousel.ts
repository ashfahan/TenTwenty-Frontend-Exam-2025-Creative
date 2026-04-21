import { useCallback, useState } from "react"

export function useCarousel(length: number) {
  const [active, setActive] = useState(0)

  const next = useCallback(() => setActive((i) => (i + 1) % length), [length])
  const prev = useCallback(() => setActive((i) => (i - 1 + length) % length), [length])
  const goTo = useCallback((i: number) => setActive(i), [])

  return { active, setActive, next, prev, goTo }
}
