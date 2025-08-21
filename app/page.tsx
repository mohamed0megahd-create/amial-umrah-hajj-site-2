import FlightSearchForm from '@/components/FlightSearchForm'
import PackageCard from '@/components/PackageCard'
import { readPackages } from '@/lib/data'

export default function Home() {
  const db = readPackages()
  const umrah = db.umrah.slice(0,2)
  const hajj = db.hajj.slice(0,1)

  return (
    <div className="section space-y-10">
      <section className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-700">رحلات حج وعمرة — سهلة وواضحة</h1>
          <p className="text-gray-700">استكشف أفضل العروض بمواعيد وأسعار شفافة، واحجز بثقة. ابحث أيضاً عن رحلات الطيران مباشرة من الصفحة الرئيسية.</p>
          <ul className="list-disc pr-5 text-gray-700 text-sm">
            <li>عروض مفصّلة: البرنامج، الفنادق، ما يشمله السعر</li>
            <li>تواريخ انطلاق متعددة لكل باقة</li>
            <li>إضافات اختيارية: تأشيرة، نقل خاص</li>
          </ul>
        </div>
        <FlightSearchForm />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">عروض مختارة — عمرة</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {umrah.map((p:any)=> <PackageCard key={p.slug} pkg={p} type="umrah" />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">عرض مميز — الحج</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hajj.map((p:any)=> <PackageCard key={p.slug} pkg={p} type="hajj" />)}
        </div>
      </section>
    </div>
  )
}
