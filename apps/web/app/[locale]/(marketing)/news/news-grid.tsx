'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Clock } from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  featuredImage: string | null
}

interface NewsGridProps {
  posts: BlogPost[]
  locale: string
  strapiUrl?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

function estimateReadTime(excerpt: string): number {
  const words = excerpt.split(' ').length
  return Math.max(2, Math.ceil(words / 200) + 2)
}

export function NewsGrid({ posts, locale, strapiUrl = '' }: NewsGridProps) {
  if (posts.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-base-content/70 text-lg">
          {locale === 'th' ? 'ยังไม่มีข่าวสาร' : 'No news yet'}
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.map((post) => (
        <motion.article
          key={post.slug}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="group"
        >
          <Link href={`/${locale}/news/${post.slug}`}>
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary/30 overflow-hidden">
              <div className="aspect-video bg-base-200 relative overflow-hidden">
                {post.featuredImage ? (
                  <Image
                    src={`${strapiUrl}${post.featuredImage}`}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-6xl opacity-20">📰</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="badge badge-primary">{post.category}</span>
                </div>
              </div>
              <div className="card-body">
                <div className="flex items-center gap-4 text-sm text-base-content/60 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {estimateReadTime(post.excerpt)} {locale === 'th' ? 'นาที' : 'min read'}
                  </span>
                </div>
                <h2 className="card-title text-xl group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-base-content/70 line-clamp-2">{post.excerpt}</p>
                <div className="card-actions mt-4">
                  <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    {locale === 'th' ? 'อ่านเพิ่มเติม' : 'Read More'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  )
}
