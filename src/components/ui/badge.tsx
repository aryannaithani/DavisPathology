import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-none border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground',
        secondary:
          'border-neutral-900 bg-secondary text-neutral-950',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground',
        outline: 'border-neutral-400 text-foreground bg-white',
        dark: 'border-transparent bg-[#171717] text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
