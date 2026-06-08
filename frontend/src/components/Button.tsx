import React from 'react'
import clsx from 'clsx'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  isFullWidth?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    isFullWidth = false,
    className,
    children,
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = 'font-medium rounded-lg transition duration-200 ease-in-out'
    
    const variants = {
      primary: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
    }

    const sizes = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed'
    const fullWidthClasses = isFullWidth ? 'w-full' : ''

    return (
      <button
        ref={ref}
        disabled={loading || disabled}
        className={clsx(
          baseClasses,
          variants[variant],
          sizes[size],
          disabledClasses,
          fullWidthClasses,
          className
        )}
        {...props}
      >
        {loading ? 'Chargement...' : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
