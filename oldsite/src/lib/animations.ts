// src/lib/animations.ts
export const pageTransition = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }
  
  export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
  
  export const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }