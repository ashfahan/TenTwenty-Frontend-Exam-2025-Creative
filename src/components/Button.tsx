import { cn } from "@/utils/cn"
import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode, type Ref } from "react"

const variants = {
  outline:
    "inline-flex items-center gap-2 border border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white",
  ghost: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition hover:bg-neutral-100",
  solid:
    "inline-flex items-center gap-2 bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700",
} as const

type Variant = keyof typeof variants

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & { href?: never; variant?: Variant }
type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: Variant }

export type ButtonProps = (ButtonAsButton | ButtonAsAnchor) & { children?: ReactNode }

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "outline", className, children, ...props }, ref) => {
    const classes = cn(variants[variant], className)

    if ("href" in props && props.href != null) {
      const { href, ...rest } = props as ButtonAsAnchor
      return (
        <a ref={ref as Ref<HTMLAnchorElement>} href={href} className={classes} {...rest}>
          {children}
        </a>
      )
    }

    return (
      <button ref={ref as Ref<HTMLButtonElement>} type="button" className={classes} {...(props as ButtonAsButton)}>
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
