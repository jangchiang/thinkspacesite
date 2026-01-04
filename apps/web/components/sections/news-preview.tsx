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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function estimateReadTime(excerpt: string | null): number {
  if (!excerpt) return 3
  const words = excerpt.split(' ').length
  return Math.max(2, Math.ceil(words / 200) + 2)
}

export function NewsPreviewSection({ locale, posts }: NewsPreviewSectionProps) {
  if (posts.length === 0) return null

  const latestPosts = posts.slice(0, 3)
  const featuredPost = latestPosts[0]
  const otherPosts = latestPosts.slice(1)

  return (
    <section className="section-padding bg-base-200/30">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {locale === 'th' ? 'ข่าวสารล่าสุด' : 'Latest News'}
            </h2>
            <p className="text-base-content/70">
              {locale === 'th'
                ? 'อัพเดทข่าวสารและความรู้จากทีมของเรา'
                : 'Stay updated with news and insights from our team'}
            </p>
          </div>
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-primary font-medium mt-4 md:mt-0 group"
          >
            {locale === 'th' ? 'ดูทั้งหมด' : 'View All'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* News Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Featured Post */}
          <motion.article
            variants={itemVariants}
            className="group"
          >
            <Link href={`/${locale}/news/${featuredPost.slug}`}>
              <div className="relative overflow-hidden rounded-2xl bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary/30">
                <div className="aspect-video relative overflow-hidden">
                  {featuredPost.featuredImage ? (
                    <Image
                      src={`http://localhost:1337${
                        featuredPost.featuredImage.formats?.medium?.url ||
                        featuredPost.featuredImage.url
                      }`}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-6xl opacity-20">📰</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-primary">
                      {featuredPost.category || 'General'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-base-content/60 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString(
                        locale === 'th' ? 'th-TH' : 'en-US',
                        { year: 'numeric', month: 'short', day: 'numeric' }
                      )}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {estimateReadTime(featuredPost.excerpt)}{' '}
                      {locale === 'th' ? 'นาที' : 'min read'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {featuredPost.title}
                  </h3>
                  <p className="text-base-content/70 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Other Posts */}
          <div className="flex flex-col gap-6">
            {otherPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/${locale}/news/${post.slug}`}>
                  <div className="flex gap-4 p-4 rounded-xl bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-300 hover:border-primary/30">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                      {post.featuredImage ? (
                        <Image
                          src={`http://localhost:1337${
                            post.featuredImage.formats?.small?.url ||
                            post.featuredImage.url
                          }`}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="text-2xl opacity-20">📰</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-xs text-primary font-medium mb-1">
                        {post.category || 'General'}
                      </span>
                      <h3 className="font-semibold text-base md:text-lg group-hover:text-primary transition-colors line-clamp-2 mb-1">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-base-content/60">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString(
                            locale === 'th' ? 'th-TH' : 'en-US',
                            { month: 'short', day: 'numeric' }
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {estimateReadTime(post.excerpt)}{' '}
                          {locale === 'th' ? 'นาที' : 'min'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
