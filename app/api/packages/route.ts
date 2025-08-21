import { NextRequest, NextResponse } from 'next/server'
import { readPackages } from '@/lib/data'

export async function GET(req: NextRequest) {
  const type = (req.nextUrl.searchParams.get('type') || 'umrah') as 'umrah'|'hajj'
  const city = req.nextUrl.searchParams.get('city')
  const maxPrice = req.nextUrl.searchParams.get('maxPrice')
  const db = readPackages()
  let list = (db as any)[type] || []
  if (city) list = list.filter((p:any)=> (p.city||'').includes(city))
  if (maxPrice) list = list.filter((p:any)=> Math.min(...p.departures.map((d:any)=>d.price)) <= parseFloat(maxPrice))
  return NextResponse.json({ items: list })
}
