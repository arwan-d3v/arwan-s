# CHANGELOG

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed
- Fixed z-index overlap issue on the dashboard notification dropdown.
- Fixed malformed Supabase URL in environment configurations.

### Changed
- Configured real environment variables for Supabase, Cloudflare R2, Stripe, Gemini, and Telegram to transition from Mock to Production-ready state.

## [v1.0.0] - 2024-05-20 (Release Date)
### Added
- **Core Ecosystem:** Interactive Gateway (`/`), Resume (`/resume`), Services (`/services`), Explore (`/explore`), and Login (`/login`) pages.
- **UI Design System:** Comprehensive Zenitsu Agatsuma aesthetic implementation incorporating "Liquid Glass", "Claymorphism", and dynamic lightning particle effects.
- **Backend Infrastructure:** Deep integration with Supabase for data storage and `@supabase/ssr` for session-based mock/real authentication routing.
- **User Dashboard (`/dashboard`):** Fully responsive, feature-rich member dashboard featuring:
  - High-level metric overview.
  - A dynamic 6-step CV Builder utilizing a `theme_configs` engine with 27 unique variations and public publishing routing (`/r/[slug]`).
  - An Algorithmic Trading module providing simulated live polling signals using `recharts`.
  - Utility conversion mock endpoints and gamification tracking.
- **Admin Command Center (`/admin`):** Secure access area (`superadmin` role protected) offering metrics overview and 10 management stub endpoints.
- **Monetization & Gamification:** Real REST webhook integrations for Midtrans, Stripe, and PayPal, alongside Breath Points, Referral codes, and Daily Gift claiming endpoints.
- **SEO Optimization:** Dynamic `<meta>` injection via `shared-metadata.ts` and automated `sitemap.xml` and `robots.txt` endpoints configured for production.
- **Deployment & Configs:** Fallback dummy mock architectures seamlessly built-in to allow UI operation without environment variables. Allowed remote domains for image sourcing inside `next.config.mjs`.

### Fixed
- Re-architected Dashboard Sidebar as a slide-out client-side mobile drawer.
- Avoided React Hydration Mismatch issues on dynamically generated `TradingDashboard` simulated data.
- Corrected API routing paths and specific vendor webhook payload parsings (e.g. tracking `event_type` for PayPal vs `type` for Stripe).
