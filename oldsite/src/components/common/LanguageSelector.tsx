// src/components/common/LanguageSelector.tsx
'use client'
import { useRouter } from 'next/navigation'

export function LanguageSelector() {
  const router = useRouter()

  return (
    <select 
      onChange={(e) => router.push(`/${e.target.value}`)}
      className="bg-transparent"
    >
      <option value="en">English</option>
      <option value="th">ไทย</option>
    </select>
  )
}