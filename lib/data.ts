import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')

export function readPackages() {
  const raw = fs.readFileSync(path.join(dataDir, 'packages.json'), 'utf-8')
  return JSON.parse(raw)
}
export function readPackageBySlug(type: 'umrah'|'hajj', slug: string) {
  const db = readPackages()
  const list = db[type] || []
  return list.find((x:any)=>x.slug===slug) || null
}
export function appendBooking(b: any) {
  const file = path.join(dataDir, 'bookings.json')
  const raw = fs.readFileSync(file, 'utf-8')
  const arr = JSON.parse(raw)
  arr.push(b)
  fs.writeFileSync(file, JSON.stringify(arr, null, 2), 'utf-8')
}
