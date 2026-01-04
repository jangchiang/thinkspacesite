'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()
  const isDark = theme === 'thinkspaceDark'

  // Render placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="btn btn-ghost btn-circle" aria-label="Toggle theme">
        <Moon className="w-5 h-5" />
      </button>
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle relative overflow-hidden"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Sun className="w-5 h-5 text-white" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Moon className="w-5 h-5 text-slate-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
