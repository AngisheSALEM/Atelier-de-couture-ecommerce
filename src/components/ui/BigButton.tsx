import React from 'react';
import { cn } from '@/lib/utils';

interface BigButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success';
  fullWidth?: boolean;
}

export const BigButton = React.forwardRef<HTMLButtonElement, BigButtonProps>(
  ({ className, variant = 'primary', fullWidth = true, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-rose-600 text-white hover:bg-rose-700',
      secondary: 'bg-amber-500 text-white hover:bg-amber-600',
      outline: 'border-4 border-rose-600 text-rose-600 hover:bg-rose-50',
      success: 'bg-green-600 text-white hover:bg-green-700',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'flex items-center justify-center gap-3 px-8 py-6 text-2xl font-bold transition-all active:scale-95 shadow-xl',
          'rounded-2xl min-h-[80px]',
          variants[variant],
          fullWidth ? 'w-full' : 'w-auto',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

BigButton.displayName = 'BigButton';
