import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
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
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    // Ensure children are wrapped correctly if asChild is true and children is an array (e.g. icon + text)
    // However, Radix Slot handles this internally by expecting a single child.
    // If asChild is true, the immediate child of Button (e.g., <a>) will receive the props.
    // If that child itself has multiple children (icon + text), it's fine.
    // The error "React.Children.only expected to receive a single React element child"
    // usually occurs if <Slot> itself is passed multiple direct children.
    // The way it's used with an <a> tag containing an icon and text is typically fine.
    // The key is that the direct child passed to <Comp> (which is <Slot> when asChild is true) must be a single element.
    // If 'children' passed to Button is an array when asChild=true, that's the problem.
    // But usually, it's <Button asChild><a ...><Icon/> Text</a></Button> - here <a> is the single child of Slot.
    
    // The previous fix attempt of wrapping `children` in `React.Fragment` when `asChild` is true
    // and `children` is an array might be incorrect. `Slot` expects its direct child
    // to be the one that receives the props.
    // If `Comp` is `Slot`, then `children` should be a single React element that `Slot` can clone.

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
