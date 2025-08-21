'use client'
import { useState } from 'react'

export default function FlightSearchForm() {
  const [origin, setOrigin] = useState('CAI')
  const [destination, setDestination] = useState('JED')
  const [date, setDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [adults, setAdults] = useState(1)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/flights', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ origin, destination, date, returnDate, adults })
      })
      if (!res.ok) throw new Error('حدث خطأ أثناء جلب الرحلات')
      const data = await res.json()
      setResults(data.flights || [])
    } catch (err:any) {
      setError(err.message || 'خطأ غير متوقع')
    } finally { setLoading(false) }
  }

  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold mb-3">ابحث عن رحلات الطيران</h3>
      <form className="grid md:grid-cols-6 gap-3" onSubmit={submit}>
        <div>
          <label>من (IATA)</label>
          <input className="input" value={origin} onChange={e=>setOrigin(e.target.value.toUpperCase())} required />
        </div>
        <div>
          <label>إلى (IATA)</label>
          <input className="input" value={destination} onChange={e=>setDestination(e.target.value.toUpperCase())} required />
        </div>
        <div>
          <label>تاريخ الذهاب</label>
          <input type="date" className="input" value={date} onChange={e=>setDate(e.target.value)} required />
        </div>
        <div>
          <label>تاريخ العودة (اختياري)</label>
          <input type="date" className="input" value={returnDate} onChange={e=>setReturnDate(e.target.value)} />
        </div>
        <div>
          <label>عدد البالغين</label>
          <input type="number" min={1} className="input" value={adults} onChange={e=>setAdults(parseInt(e.target.value || '1'))} />
        </div>
        <div className="flex items-end">
          <button className="btn btn-primary w-full" disabled={loading}>{loading? 'جارٍ البحث...' : 'بحث'}</button>
        </div>
      </form>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {results.length>0 && (
        <div className="mt-4 space-y-3">
          {results.map((f, i) => (
            <div key={i} className="card p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold">{f.origin} → {f.destination}</div>
                <div className="text-sm text-gray-600">{f.airline} · {f.stops>0? `${f.stops} ترانزيت` : 'مباشر'} · {f.duration} ساعة</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold">${f.price}</div>
                <div className="text-xs text-gray-500">{f.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
