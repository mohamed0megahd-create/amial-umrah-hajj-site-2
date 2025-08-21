import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { readPackageBySlug } from '@/lib/data'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' })

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return new NextResponse('Stripe not configured', { status: 500 })
    }
    const body = await req.json()
    const { type, slug, departure, people=1, addons=[], customer } = body || {}
    if (!type || !slug || !departure || !customer?.name || !customer?.email || !customer?.phone) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    const pkg = readPackageBySlug(type, slug)
    if (!pkg) return new NextResponse('Package not found', { status: 404 })
    const dep = pkg.departures.find((d:any)=> d.date === departure)
    if (!dep) return new NextResponse('Departure not found', { status: 404 })

    // calculate base price
    const base = dep.price * people
    // addons sum
    const addonsSum = (addons || []).reduce((sum:number, code:string)=> {
      const a = (pkg.addons||[]).find((x:any)=>x.code===code)
      return sum + (a ? a.price * people : 0)
    }, 0)
    const total = base + addonsSum

    // Stripe requires amounts in cents
    const amount = Math.round(total * 100)

    const metadata: Record<string,string> = {
      type, slug, departure, people: String(people),
      name: customer.name, email: customer.email, phone: customer.phone,
      addons: JSON.stringify(addons || [])
    }

    const siteUrl = process.env.SITE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: customer.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: amount,
            product_data: {
              name: `${pkg.name} — ${departure} × ${people}`,
              description: `إضافات: ${(addons||[]).join(', ') || 'لا يوجد'}`
            }
          }
        }
      ],
      success_url: `${siteUrl}/success?session_id={{CHECKOUT_SESSION_ID}}`,
      cancel_url: `${siteUrl}/cancel`,
      metadata,
      locale: 'ar'
    })

    return NextResponse.json({ url: session.url })
  } catch (e:any) {
    console.error(e)
    return new NextResponse('Checkout error', { status: 500 })
  }
}
