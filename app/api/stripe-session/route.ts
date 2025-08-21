import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' })

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id')
    if (!id) return new NextResponse('Missing id', { status: 400 })
    const session = await stripe.checkout.sessions.retrieve(id)
    return NextResponse.json({ id: session.id, metadata: session.metadata || {}, amount_total: session.amount_total })
  } catch (e:any) {
    console.error(e)
    return new NextResponse('Cannot fetch session', { status: 500 })
  }
}
