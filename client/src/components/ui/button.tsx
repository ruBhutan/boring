import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#065f46] to-[#047857] text-white hover:from-[#047857] hover:to-[#064e3b] shadow-lg shadow-emerald-500/25 transform hover:scale-105 !text-white hover:!text-white",
        destructive:
          "bg-[#991b1b] hover:bg-[#7f1d1d] text-white shadow-lg shadow-red-500/25",
        outline:
          "border-2 border-[#065f46] text-[#065f46] bg-transparent hover:bg-[#065f46] hover:text-white !text-[#065f46] hover:!text-white",
        secondary:
          "bg-gradient-to-r from-[#d97706] to-[#b45309] text-white hover:from-[#b45309] hover:to-[#92400e] shadow-lg shadow-amber-500/25 transform hover:scale-105 !text-white hover:!text-white",
        ghost: "text-[#065f46] hover:bg-emerald-50 hover:text-[#047857] !text-[#065f46] hover:!text-[#047857]",
        link: "text-[#065f46] underline-offset-4 hover:underline !text-[#065f46]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
