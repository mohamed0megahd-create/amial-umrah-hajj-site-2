import { readPackageBySlug } from '@/lib/data'
import Link from 'next/link'

export default function HajjDetails({ params }: { params: { slug: string } }) {
  const pkg = readPackageBySlug('hajj', params.slug)
  if (!pkg) return <div className="section">لم يتم العثور على الباقة</div>
  return (
    <div className="section space-y-6">
      <div className="card p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{pkg.name}</h1>
          <Link href={`/hajj/${pkg.slug}/book`} className="btn btn-primary">احجز الآن</Link>
        </div>
        <p className="text-gray-700 mt-2">{pkg.summary}</p>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div>
            <h3 className="font-semibold mb-2">يشمل</h3>
            <ul className="text-sm list-disc pr-5">{pkg.includes.map((x:string, i:number)=><li key={i}>{x}</li>)}</ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">لا يشمل</h3>
            <ul className="text-sm list-disc pr-5">{pkg.excludes.map((x:string, i:number)=><li key={i}>{x}</li>)}</ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">الفنادق</h3>
            <ul className="text-sm list-disc pr-5">{pkg.hotels.map((x:string, i:number)=><li key={i}>{x}</li>)}</ul>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">التواريخ والأسعار</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pkg.departures.map((d:any, i:number)=> (
              <div key={i} className="card p-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{d.date}</div>
                  <div className="text-xs text-gray-500">مقاعد متاحة: {d.seats}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">${d.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">البرنامج اليومي</h3>
          <ol className="list-decimal pr-5 text-sm text-gray-700 space-y-1">
            {pkg.itinerary.map((it:any)=>(<li key={it.day}><b>اليوم {it.day}:</b> {it.title} — {it.desc}</li>))}
          </ol>
        </div>
      </div>
    </div>
  )
}
