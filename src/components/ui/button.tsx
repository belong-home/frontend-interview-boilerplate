import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type ButtonVariant = 'solid' | 'outline';
type ButtonSize = 'small' | 'medium';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  solid: 'bg-navy text-white hover:bg-navy/90',
  outline: 'border border-navy text-navy hover:bg-navy/5',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  small: 'px-3 py-1.5 text-sm',
  medium: 'px-4 py-2 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = 'solid', size = 'medium', className, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className,
        )}
        {...props}
      />
    );
  },
);
