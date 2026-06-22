# CHANGELOG

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Interactive Video Background:** Developed a client-side `VideoBackground` component to autoplay, loop, and mute local background video `/zenitsu-bg.mp4` on the landing page, overlaid with drifting lightning particles.

### Fixed
- **React Hydration Autoplay Bug:** Resolved issues preventing browser video autoplay by forcing `.muted` and `.defaultMuted` programmatically inside a `useEffect` hook.
- **CSS Z-Index Stacking:** Relocated solid background color declarations from `body` to `html` in `globals.css` to prevent negative z-index background elements from disappearing behind the body.
- **Hydration Mismatch warnings:** Fixed random seed mismatches on client/server rendering of lightning particles by implementing a `mounted` check in `ThunderBackground`.
- **Z-index overlay:** Fixed z-index overlap issue on the dashboard notification dropdown.
- **Supabase configuration:** Fixed malformed Supabase URL in environment configurations.

### Changed
- Configured real environment variables for Supabase, Cloudflare R2, Stripe, Gemini, and Telegram to transition from Mock to Production-ready state.

## [v1.0.0] - Production Launch Release
### Added
- **Production API Integrations:** Transitioned from mock data to real API integrations across the ecosystem.
- **Payment Webhooks:** Full implementation of Stripe and Midtrans webhooks with strict cryptographic signature verification to update user subscriptions securely.
- **AI Companion:** Integrated `@google/genai` to connect the AI chat interface directly to Google Gemini 2.5 Flash API.
- **Trading Module Data:** Connected `/api/trading/signals` to Supabase `trade_signals` table for live data polling.
- **Cloudflare R2 Storage:** Implemented file upload utility directly to R2 buckets via `@aws-sdk/client-s3`.
- **Telegram Notifications:** Wired up `/api/contact` to push direct notifications to a Telegram Bot.
- **Core Ecosystem:** Interactive Gateway (`/`), Resume (`/resume`), Services (`/services`), Explore (`/explore`), and Login (`/login`) pages.
- **UI Design System:** Comprehensive Zenitsu Agatsuma aesthetic implementation incorporating "Liquid Glass", "Claymorphism", and dynamic lightning particle effects.
- **Backend Infrastructure:** Deep integration with Supabase for data storage and `@supabase/ssr` for session-based mock/real authentication routing.
- **User Dashboard (`/dashboard`):** Fully responsive, feature-rich member dashboard featuring:
  - High-level metric overview.
  - A dynamic 6-step CV Builder utilizing a `theme_configs` engine with 27 unique variations and public publishing routing (`/r/[slug]`).
- **Admin Command Center (`/admin`):** Secure access area (`superadmin` role protected) offering metrics overview and 10 management stub endpoints.
- **SEO Optimization:** Dynamic `<meta>` injection via `shared-metadata.ts` and automated `sitemap.xml` and `robots.txt` endpoints configured for production.

### Fixed
- Fixed z-index overlap issue on the dashboard notification dropdown.
- Handled Stripe API version dependency errors.
- Handled Supabase Edge Runtime compatibility issues during webhook routing.
- Avoided React Hydration Mismatch issues on dynamically generated `TradingDashboard` data by introducing robust API polling.
- Corrected API routing paths and specific vendor webhook payload parsings.
- Optimized text contrast for the dark liquid glass theme and validated mobile responsiveness.

### Changed
- Configured real environment variables for Supabase, Cloudflare R2, Stripe, Gemini, and Telegram to achieve Production-ready state.
- Graceful fallbacks implemented across all API endpoints to prevent 500 errors if keys are missing in the runtime environment.
