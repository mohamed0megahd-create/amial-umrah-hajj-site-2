import { NextRequest, NextResponse } from 'next/server'
import { readPackageBySlug } from '@/lib/data'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const type = (req.nextUrl.searchParams.get('type') || 'umrah') as 'umrah'|'hajj'
  const pkg = readPackageBySlug(type, params.slug)
  if (!pkg) return new NextResponse('Not found', { status: 404 })
  return NextResponse.json(pkg)
}
