import fs from 'fs'
import path from 'path'

export type Departure = { date: string; price: number }
export type Addon = { code: string; name: string; price: number }
export type Pkg = {
  type: 'umrah' | 'hajj'
  slug: string
  name: string
  description?: string
  departures: Departure[]
  addons?: Addon[]
  images?: string[]
}

function readJSON<T = any>(p: string): T {
  const file = path.join(process.cwd(), p)
  const raw = fs.readFileSync(file, 'utf-8')
  return JSON.parse(raw) as T
}

export function readAllPackages(): Pkg[] {
  return readJSON<Pkg[]>('data/packages.json')
}

export function readPackages(type: 'umrah' | 'hajj'): Pkg[] {
  return readAllPackages().filter(p => p.type === type)
}

export function readPackageBySlug(type: 'umrah' | 'hajj', slug: string): Pkg | undefined {
  return readPackages(type).find(p => p.slug === slug)
}
