import { useEffect, useRef, useState } from "react"

// key: pass any changing value (e.g. slide id) to restart the animation from 0
export function useAnimationProgress(duration: number, key: unknown, onComplete?: () => void): number {
  const [progress, setProgress] = useState(0)
  // ref avoids stale closure — onComplete can change without restarting the animation
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    setProgress(0)
    let frameId = 0
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      setProgress(Math.min(1, elapsed / duration))
      if (elapsed >= duration) {
        onCompleteRef.current?.()
        return
      }
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [duration, key])

  return progress
}
