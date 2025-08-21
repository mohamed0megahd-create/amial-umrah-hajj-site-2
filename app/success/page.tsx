'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')
  const [status, setStatus] = useState<'loading'|'ok'|'error'>('loading')
  const [reference, setReference] = useState<string>('')
  const [err, setErr] = useState<string>('')

  useEffect(()=>{
    const run = async () => {
      if (!sessionId) { setStatus('error'); setErr('Session ID missing'); return }
      try {
        const sres = await fetch(`/api/stripe-session?id=${sessionId}`)
        if (!sres.ok) throw new Error('Stripe session not found')
        const sdata = await sres.json()
        const { metadata } = sdata
        const body = {
          type: metadata.type,
          slug: metadata.slug,
          departure: metadata.departure,
          name: metadata.name,
          email: metadata.email,
          phone: metadata.phone,
          people: parseInt(metadata.people || '1', 10),
          addons: JSON.parse(metadata.addons || '[]')
        }
        const bres = await fetch('/api/book', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
        if (!bres.ok) throw new Error('Failed to save booking')
        const bdata = await bres.json()
        setReference(bdata.reference || '')
        setStatus('ok')
      } catch (e:any) {
        setErr(e.message || 'Unexpected error')
        setStatus('error')
      }
    }
    run()
  }, [sessionId])

  return (
    <div className="section">
      {status==='loading' && <div className="card p-6"><h1 className="text-xl font-bold">جارٍ تأكيد الدفع والحجز…</h1></div>}
      {status==='ok' && (
        <div className="card p-6">
          <h1 className="text-2xl font-bold text-emerald-700">تم الدفع والحجز بنجاح</h1>
          <p className="mt-2">رقم الحجز: <b>{reference}</b></p>
          <p className="text-sm text-gray-600 mt-2">وصلتك رسالة تأكيد على البريد.</p>
        </div>
      )}
      {status==='error' && <div className="card p-6"><h1 className="text-xl font-bold text-red-700">حدث خطأ</h1><p className="mt-2 text-sm text-red-600">{err}</p></div>}
    </div>
  )
}
