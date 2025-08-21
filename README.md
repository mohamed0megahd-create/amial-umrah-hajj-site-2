
# AMIAL – حج وعمرة + بحث طيران (Next.js)

واجهة عربية (RTL) مع صفحات للعمرة والحج (قوائم + تفاصيل + حجز)،
وفورم بحث رحلات طيران على الصفحة الرئيسية (نتائج تجريبية).
يمكنك لاحقًا توصيل مزود طيران حقيقي مثل Amadeus/Duffel.

## التشغيل محليًا
```bash
cd amial-umrah-hajj-site
npm install
npm run dev
# افتح http://localhost:3000
```

> البيانات في `data/packages.json` — عدّل العروض والتواريخ والأسعار كما تشاء.
> الحجوزات تحفظ في `data/bookings.json` أثناء التشغيل المحلي.

## البنية
- **Next.js (App Router) + TypeScript + Tailwind**
- صفحات:
  - `/` الصفحة الرئيسية + **FlightSearchForm**
  - `/umrah` قائمة باقات العمرة
  - `/umrah/[slug]` تفاصيل الباقة
  - `/umrah/[slug]/book` نموذج الحجز
  - `/hajj` قائمة باقات الحج
  - `/hajj/[slug]` تفاصيل
  - `/hajj/[slug]/book` حجز
- **APIs**:
  - `GET /api/packages?type=umrah|hajj` مع فلاتر `city` و`maxPrice`
  - `GET /api/package/[slug]?type=umrah|hajj`
  - `POST /api/book` (يحفظ في `data/bookings.json`)
  - `POST /api/flights` (نتائج وهمية — استبدلها باندماج حقيقي لاحقًا)

## دمج بحث الطيران الحقيقي (اختياري)
1) **Amadeus Self-Service**: 
   - أنشئ حسابًا واحصل على `API Key/Secret`.
   - استبدل منطق `/api/flights` بالنداء إلى `Flight Offers Search`.
2) **Duffel API** أو **Tequila (Kiwi)**:
   - نفس المبدأ: استبدل المنطق الوهمي بالاتصال الفعلي + توكيد الدفع وإصدار التذكرة.

## تخصيص التصميم
- Tailwind موجود في `app/globals.css` و `tailwind.config.ts`.
- استخدم مكونات جاهزة في `components/*`.

## ملاحظات
- الملفات تكتب الحجوزات محليًا فقط. في إنتاج حقيقي ستحتاج قاعدة بيانات (MySQL/Postgres) وبوابة دفع (Paymob/Stripe).
- ضع `dir="rtl"` في `app/layout.tsx` (موجود بالفعل) لضبط الاتجاه.
