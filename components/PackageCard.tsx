import Link from 'next/link'

export default function PackageCard({ pkg, type }: { pkg: any, type: 'umrah'|'hajj' }) {
  const minPrice = Math.min(...pkg.departures.map((d:any)=>d.price))
  return (
    <div className="card p-4 flex flex-col">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge">{pkg.level}</span>
          <span className="text-xs text-gray-500">{pkg.city}</span>
        </div>
        <h3 className="text-lg font-semibold">{pkg.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{pkg.summary}</p>
        <p className="text-sm mt-2">الليالي: <b>{pkg.nights}</b></p>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div>
          <div className="text-xs text-gray-500">ابتداءً من</div>
          <div className="text-xl font-semibold">${minPrice}</div>
        </div>
        <div className="flex gap-2">
          <Link href={`/${type}/${pkg.slug}`} className="btn btn-outline">التفاصيل</Link>
          <Link href={`/${type}/${pkg.slug}/book`} className="btn btn-primary">احجز الآن</Link>
        </div>
      </div>
    </div>
  )
}
