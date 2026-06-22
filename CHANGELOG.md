# CHANGELOG

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Dynamic Multi-Theme System:** Developed a site-wide modular theming architecture supporting real-time configuration by a Superadmin (or `admin@arwan.space`) in the Command Center settings panel.
- **Preconfigured Character Themes:** Implemented three distinct themes:
  - **Zenitsu Agatsuma (Yellow):** Autoplay loop `/zenitsu-bg.mp4` with electric yellow glows.
  - **Satoru Gojo (Blue):** Autoplay loop `/gojo-bg.mp4` with deep blue infinity glows.
  - **Shadow Commander Igris (Purple):** Autoplay loop `/igris-bg.mp4` with dark purple shadow glows.
- **Settings API (`/api/settings/theme`):** Added GET/POST endpoints for retrieval and real-time updates of the active theme.
- **Supabase & JSON Fallback Cache:** Designed theme persistence using the Supabase `site_settings` table (key `active_theme`) with a robust local JSON file fallback (`src/lib/theme-config.json`).
- **Interactive Video Background:** Developed a client-side `VideoBackground` component to autoplay, loop, and mute the active background video on the landing page, overlaid with drifting particles that match the active theme's colors.

### Fixed
- **React Hydration Autoplay Bug:** Resolved issues preventing browser video autoplay by forcing `.muted` and `.defaultMuted` programmatically inside a `useEffect` hook.
- **CSS Z-Index Stacking:** Relocated solid background color declarations from `body` to `html` in `globals.css` to prevent negative z-index background elements from disappearing behind the body.
- **Hydration Mismatch warnings:** Fixed random seed mismatches on client/server rendering of lightning particles by implementing a `mounted` check in `ThunderBackground`.
- **Z-index overlay:** Fixed z-index overlap issue on the dashboard notification dropdown.
- **Supabase configuration:** Fixed malformed Supabase URL in environment configurations.
- **ESLint & TypeScript Errors:** Fixed strict type errors (`any` catch bindings, unused variables) in `src/app/api/settings/theme/route.ts` and `src/lib/theme-service.ts`.

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

## [v1.1.0] - 2025-06-22
### Added
- **Anti-Gravity Video Background themes:** Built-in Zenitsu, Gojo, and Igris themes with looping video logic.
- **Dynamic Palette System:** Dynamic CSS variables derived directly from the active theme's JSON payload.
- **Hybrid Cross-Platform Video Hooks:** Implemented `window.matchMedia` orientation sensors to dynamically swap between Landscape (16:9) and Portrait (9:16) video assets.
- **Advanced Live Theme Builder (`/admin/settings`):** Developed a fully responsive Split-Screen Builder UI with:
  - Real-time `iframe` live previews.
  - Interactive **Drag-to-Focus** visual crosshair for granular mobile crop controls (`object-position`).
  - Direct `.mp4` client-side upload functionality piped into Supabase Storage buckets.
- **Theme Manager Protection:** Hardened API routing to prevent accidental deletion of core system themes.

### Changed
- **No-Code Theme Architecture:** Completely decoupled the theme engine from hardcoded TS files, migrating all logic to dynamic `theme_configs` and `admin_config` SQL tables.
