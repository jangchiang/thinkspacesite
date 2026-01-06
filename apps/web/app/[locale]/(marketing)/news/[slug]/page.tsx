import { type Locale } from '@/lib/i18n'
import { getBlogPost } from '@/lib/strapi'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { Breadcrumb } from '@/components/ui/breadcrumb'

type Props = {
  params: Promise<{ locale: Locale; slug: string }>
}

interface BlogPost {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  author: string | null
  category: string | null
  publishedAt: string
  featuredImage?: {
    url: string
    formats?: {
      large?: { url: string }
      medium?: { url: string }
    }
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getBlogPost(slug, locale) as BlogPost | null

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  const post = await getBlogPost(slug, locale) as BlogPost | null

  if (!post) {
    notFound()
  }

  const imageUrl = post.featuredImage?.formats?.large?.url ||
                   post.featuredImage?.formats?.medium?.url ||
                   post.featuredImage?.url

  return (
    <article className="py-12 md:py-20">
      <div className="container-custom">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: locale === 'th' ? 'ข่าวสาร' : 'News', href: `/${locale}/news` },
            { label: post.title }
          ]}
          locale={locale}
          className="mb-8"
        />

        {/* Header */}
        <header className="max-w-3xl mx-auto text-center mb-12">
          {post.category && (
            <span className="badge badge-primary badge-lg mb-4">{post.category}</span>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-base-content/60">
            {post.author && (
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        {imageUrl && (
          <div className="relative aspect-video max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.techthinkspace.com'}${imageUrl}`}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          {post.content ? (
            <MarkdownRenderer content={post.content} />
          ) : (
            <p className="text-base-content/70">
              {locale === 'th' ? 'ไม่มีเนื้อหา' : 'No content available'}
            </p>
          )}
        </div>

        {/* Back Link Bottom */}
        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-base-200">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            {locale === 'th' ? 'กลับไปข่าวสารทั้งหมด' : 'Back to all news'}
          </Link>
        </div>
      </div>
    </article>
  )
}
