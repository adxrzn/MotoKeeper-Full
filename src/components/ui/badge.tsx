import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import * as Slot from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-orange-500 text-neutral-950 hover:bg-orange-600",
        secondary:
          "border-neutral-800 bg-neutral-800 text-neutral-200 hover:bg-neutral-700",
        destructive:
          "border-transparent bg-red-600/20 text-red-400 border border-red-500/30",
        outline: "text-neutral-200 border-neutral-800 bg-neutral-900/50",
        ghost: "hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200",
        link: "text-orange-500 underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      className={cn(badgeVariants({ variant }), className)}
      data-slot="badge"
      {...props}
    />
  )
}

export { Badge, badgeVariants }