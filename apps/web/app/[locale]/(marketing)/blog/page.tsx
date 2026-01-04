import { type Locale } from '@/lib/i18n'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/strapi'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'th' ? 'บทความ' : 'Blog',
    description: locale === 'th'
      ? 'บทความและข่าวสารด้านเทคโนโลยีจาก Think Space'
      : 'Technology articles and news from Think Space',
  }
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
      medium?: { url: string }
      small?: { url: string }
    }
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params

  // Fetch from Strapi
  const { posts: strapiPosts } = await getBlogPosts(locale)

  // Map Strapi data to our format
  const posts = (strapiPosts as BlogPost[]).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    date: post.publishedAt,
    category: post.category || 'General',
    featuredImage: post.featuredImage?.formats?.medium?.url || post.featuredImage?.url || null,
  }))

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-base-100 to-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {locale === 'th' ? 'บทความ' : 'Blog'}
            </h1>
            <p className="text-lg md:text-xl text-base-content/70">
              {locale === 'th'
                ? 'ข้อมูลเชิงลึก ข่าวสาร และแนวทางปฏิบัติที่ดีด้านเทคโนโลยี'
                : 'Insights, news, and best practices in technology'}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base-content/70 text-lg">
                {locale === 'th' ? 'ยังไม่มีบทความ' : 'No blog posts yet'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-base-200 rounded-t-2xl relative overflow-hidden">
                    {post.featuredImage && (
                      <Image
                        src={`http://localhost:1337${post.featuredImage}`}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="card-body">
                    <div className="flex items-center gap-4 text-sm text-base-content/60 mb-2">
                      <span className="badge badge-primary badge-outline">{post.category}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className="card-title text-xl">{post.title}</h2>
                    <p className="text-base-content/70">{post.excerpt}</p>
                    <div className="card-actions mt-4">
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                      >
                        {locale === 'th' ? 'อ่านเพิ่มเติม' : 'Read More'}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
