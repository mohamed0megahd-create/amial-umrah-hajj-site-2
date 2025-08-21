import { readPackages } from '@/lib/data'
import PackageCard from '@/components/PackageCard'

export const metadata = { title: 'عروض العمرة' }

export default function UmrahPage() {
  const db = readPackages()
  const list = db.umrah
  return (
    <div className="section">
      <h1 className="text-2xl font-bold mb-4">عروض العمرة</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((p:any)=> <PackageCard key={p.slug} pkg={p} type="umrah" />)}
      </div>
    </div>
  )
}
