This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Migrasi dari Mock ke Production

Aplikasi Arwan'space ini dibangun menggunakan arsitektur "mock-first", yang memungkinkan UI/UX dan interaksi dasar berjalan bahkan ketika *environment variables* eksternal belum di-setup.
Untuk meluncurkan ke Production, ikuti langkah-langkah migrasi berikut:

### 1. Setup Environment Variables
Buka Dashboard Vercel (atau `.env.local` jika di lokal) dan isikan semua key yang dibutuhkan. Panduan `.env.example` sudah disertakan. Key wajib meliputi:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `MIDTRANS_SERVER_KEY`, `STRIPE_SECRET_KEY`, `PAYPAL_SECRET` dll.

### 2. Database Supabase
Pastikan 19 tabel schema asli telah dibuat di Supabase (via fitur SQL editor atau migration scripts v0). Sistem ini mengandalkan tabel utama seperti `profiles`, `subscriptions`, `notifications`, dan `contact_submissions`.
Jika membuat profile baru, pastikan trigger Supabase dijalankan saat user melakukan registrasi agar tabel pendukung (seperti poin loyalitas dan referral code) di-*bootstrap* otomatis.

### 3. Superadmin Setup
Secara default, saat sistem mock, email `admin@arwan.space` otomatis mendapat role superadmin. Di environment Supabase production, Anda harus update row di tabel `profiles`:
```sql
UPDATE profiles SET role = 'superadmin' WHERE email = 'admin@arwan.space';
```

### 4. Setup Webhooks Payment
Arahkan endpoint webhooks di platform payment (Midtrans/Stripe/PayPal) ke URL production Anda:
- `https://your-domain.com/api/payment/midtrans-webhook`
- `https://your-domain.com/api/payment/stripe-webhook`
- `https://your-domain.com/api/payment/paypal-webhook`

### 5. Telegram & AI (Opsional)
Jika Anda menggunakan notifikasi bot, setup `TELEGRAM_BOT_TOKEN` dan `TELEGRAM_CHAT_ID`. Untuk integrasi Gemini, sertakan `GEMINI_API_KEY`.
