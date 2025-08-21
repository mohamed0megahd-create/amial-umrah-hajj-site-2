import { NextRequest, NextResponse } from 'next/server'

function rand(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const airlines = ['Egyptair', 'Saudia', 'Flynas', 'Nile Air', 'Flyadeal']

export async function POST(req: NextRequest) {
  const { origin='CAI', destination='JED', date, returnDate, adults=1 } = await req.json()
  if (!date) return new NextResponse('Missing date', { status: 400 })
  const results = Array.from({ length: 6 }).map((_, i) => ({
    origin, destination,
    date,
    airline: airlines[rand(0, airlines.length-1)],
    duration: rand(2, 10),
    stops: rand(0, 1),
    price: rand(120, 480) * adults
  }))
  return NextResponse.json({ flights: results })
}
