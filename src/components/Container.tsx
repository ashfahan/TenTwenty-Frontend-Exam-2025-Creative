import { cn } from "@/utils/cn"
import { forwardRef, type ComponentProps, type ElementType } from "react"

type ContainerProps = ComponentProps<"div"> & {
  as?: ElementType
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Tag = "div", className, children, ...props }, ref) => (
    <Tag ref={ref} className={cn("mx-auto max-w-360 px-4 lg:px-12", className)} {...props}>
      {children}
    </Tag>
  )
)
Container.displayName = "Container"
