# UI Components Instructions
## Design System & Component Guide

---

## Design Tokens

### Colors

```typescript
// tailwind.config.ts
const colors = {
  // Primary (Green)
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Main
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  // Neutral (Gray/Black/White)
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
}
```

### Typography

```css
/* Base styles */
--font-sans: 'Inter', -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Scale */
.text-xs    { font-size: 0.75rem; }   /* 12px */
.text-sm    { font-size: 0.875rem; }  /* 14px */
.text-base  { font-size: 1rem; }      /* 16px */
.text-lg    { font-size: 1.125rem; }  /* 18px */
.text-xl    { font-size: 1.25rem; }   /* 20px */
.text-2xl   { font-size: 1.5rem; }    /* 24px */
.text-3xl   { font-size: 1.875rem; }  /* 30px */
.text-4xl   { font-size: 2.25rem; }   /* 36px */
.text-5xl   { font-size: 3rem; }      /* 48px */
```

### Spacing

```css
/* Consistent spacing scale */
.space-1  { 0.25rem }  /* 4px */
.space-2  { 0.5rem }   /* 8px */
.space-3  { 0.75rem }  /* 12px */
.space-4  { 1rem }     /* 16px */
.space-6  { 1.5rem }   /* 24px */
.space-8  { 2rem }     /* 32px */
.space-12 { 3rem }     /* 48px */
.space-16 { 4rem }     /* 64px */
.space-24 { 6rem }     /* 96px */
```

---

## Base Components

### Button

```typescript
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-neutral-900 text-white hover:bg-neutral-800',
        outline: 'border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-100',
        ghost: 'text-neutral-900 hover:bg-neutral-100',
        link: 'text-primary-600 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

export function Button({
  className,
  variant,
  size,
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  )
}
```

### Input

```typescript
// components/ui/input.tsx
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ className, label, error, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full rounded-md border border-neutral-300 px-4 py-2.5',
          'text-neutral-900 placeholder:text-neutral-400',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
          'disabled:cursor-not-allowed disabled:bg-neutral-100',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
```

### Card

```typescript
// components/ui/card.tsx
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated'
}

export function Card({ className, variant = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-white',
        variant === 'default' && 'border border-neutral-200',
        variant === 'bordered' && 'border-2 border-neutral-900',
        variant === 'elevated' && 'shadow-lg',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pb-0', className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}
```

---

## Section Components

### Hero

```typescript
// components/sections/hero.tsx
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface HeroProps {
  headline: string
  subheadline?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  backgroundImage?: string
  alignment?: 'left' | 'center' | 'right'
}

export function Hero({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  alignment = 'left',
}: HeroProps) {
  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-neutral-900/70" />

      {/* Content */}
      <div className="container relative mx-auto px-4">
        <div
          className={cn(
            'max-w-2xl',
            alignment === 'center' && 'mx-auto text-center',
            alignment === 'right' && 'ml-auto text-right'
          )}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-xl text-neutral-200 mb-8">{subheadline}</p>
          )}
          <div className="flex gap-4 flex-wrap">
            {primaryCTA && (
              <Button asChild size="lg">
                <a href={primaryCTA.href}>{primaryCTA.label}</a>
              </Button>
            )}
            {secondaryCTA && (
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                <a href={secondaryCTA.href}>{secondaryCTA.label}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Service Card

```typescript
// components/sections/service-card.tsx
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  href: string
}

export function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:border-primary-500 hover:shadow-lg group">
        <CardContent className="p-6">
          <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
            <Icon name={icon} className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            {title}
          </h3>
          <p className="text-neutral-600 mb-4">{description}</p>
          <span className="inline-flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
            Learn more
            <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
```

### Stats Section

```typescript
// components/sections/stats.tsx
'use client'

import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from '@react-spring/web'

interface Stat {
  value: number
  suffix?: string
  label: string
}

interface StatsProps {
  stats: Stat[]
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  const { number } = useSpring({
    number: inView ? value : 0,
    config: { duration: 2000 },
  })

  return (
    <animated.span ref={ref}>
      {number.to((n) => `${Math.floor(n)}${suffix}`)}
    </animated.span>
  )
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="bg-neutral-900 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Navigation Components

### Mega Menu

```typescript
// components/navigation/mega-menu.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MenuItem {
  label: string
  href?: string
  description?: string
  children?: MenuItem[]
}

interface MegaMenuProps {
  items: MenuItem[]
}

export function MegaMenu({ items }: MegaMenuProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {items.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => setOpenMenu(item.label)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          {item.children ? (
            <>
              <button className="flex items-center gap-1 px-4 py-2 text-neutral-700 hover:text-neutral-900">
                {item.label}
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {openMenu === item.label && (
                <div className="absolute top-full left-0 w-[600px] bg-white border border-neutral-200 rounded-lg shadow-xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href || '#'}
                        className="block p-3 rounded-lg hover:bg-neutral-50"
                      >
                        <div className="font-medium text-neutral-900">
                          {child.label}
                        </div>
                        {child.description && (
                          <div className="text-sm text-neutral-500 mt-1">
                            {child.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link
              href={item.href || '#'}
              className="px-4 py-2 text-neutral-700 hover:text-neutral-900"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
```

---

## Utility: cn() Function

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Animation Patterns

```typescript
// Fade in on scroll
'animate-in fade-in duration-500'

// Slide up
'animate-in slide-in-from-bottom-4 duration-500'

// Stagger children (use with framer-motion)
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}
```

---

## Responsive Patterns

```typescript
// Mobile-first grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

// Hide/show by breakpoint
<div className="hidden lg:block">  {/* Desktop only */}
<div className="lg:hidden">        {/* Mobile/tablet only */}

// Responsive text
<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">

// Responsive spacing
<section className="py-12 md:py-16 lg:py-24">
```
