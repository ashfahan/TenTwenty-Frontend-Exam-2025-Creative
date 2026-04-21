import type React from "react"
import { useCallback, useRef, useState } from "react"

type UseDragOptions = {
  threshold: number
  rubber: number
  onSwipe: (dir: "left" | "right") => void
}

type DragHandlers = {
  onPointerDown: (e: React.PointerEvent) => void
  onPointerMove: (e: React.PointerEvent) => void
  onPointerUp: (e: React.PointerEvent) => void
  onPointerCancel: (e: React.PointerEvent) => void
  onPointerEnter: (e: React.PointerEvent) => void
  onPointerLeave: (e: React.PointerEvent) => void
}

export function useDrag({ threshold, rubber, onSwipe }: UseDragOptions): {
  dragOffset: number
  isDragging: boolean
  isHovering: boolean
  pointerPos: { x: number; y: number }
  pointerHandlers: DragHandlers
  stopPropagation: (e: React.PointerEvent) => void
} {
  const dragState = useRef({ active: false, pointerId: -1, startX: 0 })
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 })
  // ref keeps the latest onSwipe without adding it to callback deps (avoids stale closure)
  const onSwipeRef = useRef(onSwipe)
  onSwipeRef.current = onSwipe

  // || 1 prevents Math.sign(0) = 0 collapsing the offset when drag starts at exactly 0
  const constrainDrag = useCallback((distance: number) => Math.sign(distance || 1) * Math.min(Math.abs(distance), rubber), [rubber])

  const endDrag = useCallback(
    (clientX: number) => {
      if (!dragState.current.active) return
      dragState.current.active = false
      setIsDragging(false)
      const distance = clientX - dragState.current.startX
      setDragOffset(0)
      if (distance < -threshold) onSwipeRef.current("left")
      else if (distance > threshold) onSwipeRef.current("right")
    },
    [threshold]
  )

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return
    // capture ensures pointermove/up keep firing even if pointer leaves the element
    e.currentTarget.setPointerCapture(e.pointerId)
    dragState.current = { active: true, pointerId: e.pointerId, startX: e.clientX }
    setIsDragging(true)
    setDragOffset(0)
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const rect = e.currentTarget.getBoundingClientRect()
      setPointerPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      if (!dragState.current.active || e.pointerId !== dragState.current.pointerId) return
      setDragOffset(constrainDrag(e.clientX - dragState.current.startX))
    },
    [constrainDrag]
  )

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerId !== dragState.current.pointerId) return
      // release can throw if the element was removed mid-drag
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {}
      endDrag(e.clientX)
    },
    [endDrag]
  )

  const onPointerCancel = useCallback((e: React.PointerEvent) => {
    if (e.pointerId !== dragState.current.pointerId) return
    dragState.current.active = false
    setIsDragging(false)
    setDragOffset(0)
  }, [])

  const onPointerEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const onPointerLeave = useCallback(() => {
    // keep hover state active while a drag is in progress (pointer may leave briefly)
    if (!dragState.current.active) setIsHovering(false)
  }, [])

  const stopPropagation = useCallback((e: React.PointerEvent) => e.stopPropagation(), [])

  return {
    dragOffset,
    isDragging,
    isHovering,
    pointerPos,
    pointerHandlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onPointerEnter, onPointerLeave },
    stopPropagation,
  }
}
