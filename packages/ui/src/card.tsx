import * as React from 'react'
import { cn } from './utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'compact'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'card bg-base-100',
          variant === 'bordered' && 'card-bordered',
          variant === 'compact' && 'card-compact',
          variant === 'default' && 'shadow-xl',
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('card-body', className)} {...props} />
))
CardBody.displayName = 'CardBody'

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn('card-title', className)} {...props} />
))
CardTitle.displayName = 'CardTitle'

const CardActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('card-actions justify-end', className)} {...props} />
))
CardActions.displayName = 'CardActions'

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  figure?: boolean
}

const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ className, figure = true, alt = '', ...props }, ref) => {
    const img = <img ref={ref} className={className} alt={alt} {...props} />

    if (figure) {
      return <figure>{img}</figure>
    }
    return img
  }
)
CardImage.displayName = 'CardImage'

export { Card, CardBody, CardTitle, CardActions, CardImage }
