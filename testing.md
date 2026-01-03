# Testing Instructions
## Testing Strategy Guide

---

## Stack

- **Unit/Integration:** Vitest + Testing Library
- **E2E:** Playwright
- **API:** Bun test (for Elysia)

---

## Unit Tests (Vitest)

### Setup

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

```typescript
// tests/setup.ts
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
```

### Utility Function Tests

```typescript
// lib/utils.test.ts
import { describe, it, expect } from 'vitest'
import { cn, formatDate, slugify } from './utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('merges tailwind conflicts', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6')
  })
})

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2026-01-15')
    expect(formatDate(date)).toBe('January 15, 2026')
  })
})

describe('slugify', () => {
  it('converts string to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world')
    expect(slugify('Cloud & AI Services')).toBe('cloud-ai-services')
  })
})
```

### Validation Tests

```typescript
// lib/validations.test.ts
import { describe, it, expect } from 'vitest'
import { contactSchema } from './validations'

describe('contactSchema', () => {
  it('validates correct data', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      message: 'This is a test message',
    }
    expect(contactSchema.safeParse(data).success).toBe(true)
  })

  it('rejects invalid email', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid',
      message: 'This is a test message',
    }
    const result = contactSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('rejects short message', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      message: 'Short',
    }
    const result = contactSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})
```

---

## Component Tests

```typescript
// components/ui/button.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border-2')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button.querySelector('svg')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### Form Component Tests

```typescript
// components/forms/contact-form.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from './contact-form'

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('renders all fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('shows validation errors', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: /send/i }))

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument()
    })
  })

  it('submits form successfully', async () => {
    const user = userEvent.setup()
    ;(global.fetch as any).mockResolvedValueOnce({ ok: true })

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message for the form')

    await user.click(screen.getByRole('button', { name: /send/i }))

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    })
  })
})
```

---

## API Tests (Elysia/Bun)

```typescript
// src/routes/leads.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'bun:test'
import { app } from '../index'

describe('Leads API', () => {
  it('POST /leads - creates lead', async () => {
    const response = await app.handle(
      new Request('http://localhost/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          message: 'Test message',
        }),
      })
    )

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.success).toBe(true)
    expect(data.data.email).toBe('john@example.com')
  })

  it('POST /leads - validates email', async () => {
    const response = await app.handle(
      new Request('http://localhost/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          email: 'invalid-email',
        }),
      })
    )

    expect(response.status).toBe(400)
  })

  it('GET /leads/:id - returns 404 for missing', async () => {
    const response = await app.handle(
      new Request('http://localhost/leads/non-existent-id')
    )

    expect(response.status).toBe(404)
  })
})
```

---

## E2E Tests (Playwright)

### Setup

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### Page Tests

```typescript
// e2e/homepage.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Think Space/)
  })

  test('navigation works', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Services')
    await expect(page).toHaveURL(/\/services/)
  })

  test('hero CTA is clickable', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Get Started')
    await expect(page).toHaveURL(/\/contact/)
  })
})
```

### Form Tests

```typescript
// e2e/contact.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('submits successfully', async ({ page }) => {
    await page.fill('input[name="firstName"]', 'John')
    await page.fill('input[name="lastName"]', 'Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('textarea[name="message"]', 'This is a test message for E2E testing')

    await page.click('button[type="submit"]')

    await expect(page.getByText(/thank you/i)).toBeVisible()
  })

  test('shows validation errors', async ({ page }) => {
    await page.click('button[type="submit"]')
    await expect(page.getByText(/required/i)).toBeVisible()
  })
})
```

### Visual Regression

```typescript
// e2e/visual.spec.ts
import { test, expect } from '@playwright/test'

test('homepage visual regression', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    animations: 'disabled',
  })
})

test('services page visual regression', async ({ page }) => {
  await page.goto('/services')
  await expect(page).toHaveScreenshot('services.png')
})
```

---

## Commands

```bash
# Unit tests
bun run test              # Run all
bun run test:watch        # Watch mode
bun run test:coverage     # With coverage

# E2E tests
bun run test:e2e          # Run all
bun run test:e2e:ui       # With UI
bun run test:e2e:headed   # Headed mode

# Update snapshots
bun run test:e2e -- --update-snapshots
```

---

## CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run test

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bunx playwright install --with-deps
      - run: bun run test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```
