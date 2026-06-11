'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string | null
  publishedAt: string
  category: string | null
  featuredImage?: {
    url: string
    formats?: {
      medium?: { url: string }
      small?: { url: string }
    }
  }
}

interface NewsPreviewSectionProps {
  locale: Locale
  posts: BlogPost[]
  strapiUrl?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

function estimateReadTime(excerpt: string | null): number {
  if (!excerpt) return 3
  const words = excerpt.split(' ').length
  return Math.max(2, Math.ceil(words / 200) + 2)
}

export function NewsPreviewSection({ locale, posts, strapiUrl = '' }: NewsPreviewSectionProps): React.JSX.Element | null {
  if (posts.length === 0) return null

  const latestPosts = posts.slice(0, 3)

  const isTh = locale === 'th'

  return (
    <section className="section-padding bg-base-200">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">{isTh ? 'ข่าวสาร' : 'Newsroom'}</p>
            <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl mb-5">
              {isTh ? 'ข่าวสารและมุมมองล่าสุด' : 'Latest News & Insights'}
            </h2>
            <div className="rule-accent mb-6" />
            <p className="text-lg text-base-content/70 leading-relaxed">
              {isTh
                ? 'อัปเดตข่าวสาร งานวิจัย และมุมมองจากทีมของเรา'
                : 'Updates, research, and perspectives from our team.'}
            </p>
          </div>
          <Link
            href={`/${locale}/news`}
            className="btn btn-outline btn-primary group shrink-0"
          >
            {isTh ? 'ดูทั้งหมด' : 'View All'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* News Grid - 3 equal columns */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {latestPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group"
            >
              <Link href={`/${locale}/news/${post.slug}`} className="card-surface flex flex-col h-full overflow-hidden">
                <div className="aspect-[16/10] relative overflow-hidden bg-base-200">
                  {post.featuredImage ? (
                    <Image
                      src={`${strapiUrl}${
                        post.featuredImage.formats?.small?.url ||
                        post.featuredImage.url
                      }`}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary/5 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-base-content/20" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-secondary text-secondary-content text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1">
                      {post.category || (isTh ? 'ทั่วไป' : 'General')}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-4 text-xs text-base-content/60 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.publishedAt).toLocaleDateString(
                        isTh ? 'th-TH' : 'en-US',
                        { month: 'short', day: 'numeric', year: 'numeric' }
                      )}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {estimateReadTime(post.excerpt)}{' '}
                      {isTh ? 'นาที' : 'min'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-base-content group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-base-content/70 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-primary font-medium text-sm">
                    {isTh ? 'อ่านต่อ' : 'Read more'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
