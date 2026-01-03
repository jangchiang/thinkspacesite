import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Think Space, our mission, values, and the team behind our enterprise technology solutions.',
}

export default function AboutPage() {
  return (
    <div className="container-custom section-padding">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Think Space</h1>
        <p className="text-lg text-base-content/70 mb-8">
          We are a leading enterprise technology company dedicated to helping
          businesses transform through innovative solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-primary">Our Mission</h2>
            <p>
              To empower businesses with cutting-edge technology solutions that
              drive growth and innovation.
            </p>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-primary">Our Vision</h2>
            <p>
              To be the trusted technology partner for enterprises worldwide,
              enabling digital transformation.
            </p>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-primary">Our Values</h2>
            <p>
              Innovation, integrity, excellence, and customer success drive
              everything we do.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
