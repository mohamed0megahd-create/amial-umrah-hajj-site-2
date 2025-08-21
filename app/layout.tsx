import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'حج وعمرة | AMIAL',
  description: 'عروض حج وعمرة وبحث رحلات طيران'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <header className="bg-white border-b sticky top-0 z-50">
          <nav className="section flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-emerald-700">AMIAL</Link>
            <div className="flex items-center gap-4">
              <Link href="/umrah" className="hover:text-emerald-700">العمرة</Link>
              <Link href="/hajj" className="hover:text-emerald-700">الحج</Link>
              <a href="https://www.amial-int.com" target="_blank" className="text-sm text-gray-600 hover:text-gray-900">الموقع الأصلي</a>
            </div>
          </nav>
        </header>
        <main className="py-6">{children}</main>
        <footer className="border-t mt-10">
          <div className="section py-10 text-sm text-gray-600 flex items-center justify-between">
            <p>© {new Date().getFullYear()} AMIAL — كل الحقوق محفوظة</p>
            <p>صُمِّم بواسطة نموذج جاهز للتعديل</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
