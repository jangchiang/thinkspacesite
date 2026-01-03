type Dict = Record<string, any>

interface StatsSectionProps {
  dict: Dict
}

export function StatsSection({ dict }: StatsSectionProps) {
  const stats = [
    { value: '500+', labelKey: 'clients' },
    { value: '99.9%', labelKey: 'uptime' },
    { value: '24/7', labelKey: 'support' },
    { value: '15+', labelKey: 'experience' },
  ]

  return (
    <section className="section-padding bg-primary text-primary-content">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-primary-content/80 text-sm md:text-base">
                {dict.stats[stat.labelKey]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
