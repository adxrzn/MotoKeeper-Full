import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-neutral-950 hover:bg-orange-600 font-semibold",
        outline: "border border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800",
        secondary: "bg-neutral-800 text-neutral-200 hover:bg-neutral-700",
        ghost: "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200",
        destructive: "bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30",
        link: "text-orange-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 rounded-sm px-2 text-xs",
        sm: "h-9 rounded-sm px-3 text-sm",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        "icon-xs": "h-6 w-6 rounded-sm",
        "icon-sm": "h-8 w-8 rounded-sm",
        "icon-lg": "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }