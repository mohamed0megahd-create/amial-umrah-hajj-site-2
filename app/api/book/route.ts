import { NextRequest, NextResponse } from 'next/server'
import { appendBooking, readPackageBySlug } from '@/lib/data'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { type, slug, departure, name, email, phone, people, addons } = body || {}
  if (!type || !slug || !departure || !name || !email) {
    return new NextResponse('Missing fields', { status: 400 })
  }
  const pkg = readPackageBySlug(type, slug)
  if (!pkg) return new NextResponse('Package not found', { status: 404 })
  const dep = pkg.departures.find((d:any)=> d.date === departure)
  if (!dep) return new NextResponse('Departure not found', { status: 404 })
  const reference = 'BKMVDLWN24'.replace(/^$/, 'BK' + Math.random().toString(36).slice(2,10).toUpperCase())

  const booking = { reference, type, slug, departure, name, email, phone, people: people||1, addons: addons||[], createdAt: new Date().toISOString() }
  appendBooking(booking)
  return NextResponse.json({ ok: true, reference })
}
