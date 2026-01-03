import { type Locale } from '@/lib/i18n'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

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

export default async function BlogPage({ params }: Props) {
  const { locale } = await params

  const posts = [
    {
      slug: 'cloud-migration-best-practices',
      title: locale === 'th' ? 'แนวทางปฏิบัติที่ดีในการย้ายไปคลาวด์' : 'Cloud Migration Best Practices',
      excerpt: locale === 'th'
        ? 'เรียนรู้วิธีวางแผนและดำเนินการย้ายระบบไปคลาวด์อย่างมีประสิทธิภาพ'
        : 'Learn how to plan and execute an efficient cloud migration strategy.',
      date: '2024-01-15',
      readTime: 8,
      category: 'Cloud',
    },
    {
      slug: 'ai-in-enterprise',
      title: locale === 'th' ? 'AI สำหรับองค์กร: เริ่มต้นอย่างไร' : 'AI in Enterprise: Getting Started',
      excerpt: locale === 'th'
        ? 'แนวทางเบื้องต้นในการนำ AI มาใช้ในองค์กรของคุณ'
        : 'A beginner guide to implementing AI in your organization.',
      date: '2024-01-10',
      readTime: 6,
      category: 'AI',
    },
    {
      slug: 'cybersecurity-trends-2024',
      title: locale === 'th' ? 'เทรนด์ความปลอดภัยไซเบอร์ 2024' : 'Cybersecurity Trends 2024',
      excerpt: locale === 'th'
        ? 'ภัยคุกคามและแนวทางป้องกันที่ต้องจับตามองในปีนี้'
        : 'Threats and defenses to watch for this year.',
      date: '2024-01-05',
      readTime: 5,
      category: 'Security',
    },
    {
      slug: 'digital-transformation-guide',
      title: locale === 'th' ? 'คู่มือการเปลี่ยนแปลงดิจิทัล' : 'Digital Transformation Guide',
      excerpt: locale === 'th'
        ? 'ขั้นตอนสำคัญในการเปลี่ยนแปลงองค์กรสู่ดิจิทัล'
        : 'Key steps in transforming your organization digitally.',
      date: '2024-01-01',
      readTime: 10,
      category: 'Strategy',
    },
  ]

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
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-base-200 rounded-t-2xl" />
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
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime} {locale === 'th' ? 'นาที' : 'min'}
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
        </div>
      </section>
    </>
  )
}
