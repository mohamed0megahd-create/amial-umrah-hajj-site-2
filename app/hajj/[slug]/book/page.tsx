'use client'
import { useEffect, useState } from 'react'

export default function BookHajj({ params }: { params: { slug: string } }) {
  const [pkg, setPkg] = useState<any>(null)
  const [departure, setDeparture] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [people, setPeople] = useState(1)
  const [addons, setAddons] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{
    fetch(`/api/package/${params.slug}?type=hajj`).then(r=>r.json()).then(setPkg)
  }, [params.slug])

  const toggleAddon = (code: string) => {
    setAddons(prev => prev.includes(code) ? prev.filter(x=>x!==code) : [...prev, code])
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ type:'hajj', slug: params.slug, departure, name, email, phone, people, addons })
      })
      if (!res.ok) throw new Error('تعذر إنشاء الحجز')
      const data = await res.json()
      setResult(data)
    } catch (err:any) {
      setError(err.message || 'خطأ غير متوقع')
    } finally { setLoading(false) }
  }

  if (!pkg) return <div className="section">جارٍ التحميل…</div>

  return (
    <div className="section grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 card p-5">
        <h1 className="text-xl font-bold mb-3">حجز: {pkg.name}</h1>
        <form className="space-y-3" onSubmit={submit}>
          <div>
            <label>اختر تاريخ الانطلاق</label>
            <select className="input" value={departure} onChange={e=>setDeparture(e.target.value)} required>
              <option value="" disabled>اختر التاريخ</option>
              {pkg.departures.map((d:any, i:number)=>(<option key={i} value={d.date}>{d.date} — ${d.price} — مقاعد: {d.seats}</option>))}
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div><label>الاسم الكامل</label><input className="input" value={name} onChange={e=>setName(e.target.value)} required/></div>
            <div><label>البريد الإلكتروني</label><input type="email" className="input" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div><label>الهاتف</label><input className="input" value={phone} onChange={e=>setPhone(e.target.value)} required/></div>
            <div><label>عدد المسافرين</label><input type="number" min={1} className="input" value={people} onChange={e=>setPeople(parseInt(e.target.value||'1'))} /></div>
          </div>

          <div>
            <label>إضافات اختيارية</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {pkg.addons.map((a:any)=>(
                <label key={a.code} className="inline-flex items-center gap-2 border rounded-lg px-3 py-2">
                  <input type="checkbox" checked={addons.includes(a.code)} onChange={()=>toggleAddon(a.code)} />
                  {a.name} (+${a.price})
                </label>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" disabled={loading}>{loading? 'جارٍ الحجز…' : 'تأكيد الحجز'}</button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>

      <aside className="card p-4 h-max">
        <h3 className="font-semibold mb-2">تفاصيل مختصرة</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><b>الليالي:</b> {pkg.nights}</li>
          <li><b>الفنادق:</b> {pkg.hotels.join('، ')}</li>
        </ul>
        {result && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 text-emerald-800">
            <div className="font-semibold">تم إنشاء الحجز</div>
            <div className="text-sm">رقم الحجز: <b>{result.reference}</b></div>
          </div>
        )}
      </aside>
    </div>
  )
}
