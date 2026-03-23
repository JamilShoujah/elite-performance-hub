# Elite Performance Hub

Elite Performance Hub is a premium front-end web application for Ahmad Saad Performance Coach. The project combines a branded marketing website with a live exercise library so that the platform can both convert visitors into coaching inquiries and provide useful training-related value.

This README is written as a full project handoff and maintenance document. It is intended to be detailed enough for developers, designers, business stakeholders, and future collaborators who need to understand how the project works, where content lives, what is already complete, and what should happen next.

## Completed Steps

- Core brand website has been implemented for Ahmad Saad Performance Coach.
- Homepage structure has been completed across hero, stats, programs, specializations, about, gallery, reviews, certifications, and contact sections.
- Responsive site navigation, branded footer, and shared layout structure are in place.
- A dedicated Exercise Library page has been implemented with live data, search, filters, detail modal behavior, and load-more pagination.
- Homepage content has already been centralized in a small number of source files, which makes short-term manual updates manageable.
- The project already has a modular feature-based structure that will support future scaling more cleanly than a single-file landing-page approach.

## Steps To Be Done

- Update reviews with the latest approved client testimonials.
- Insert new images by a professional photographer.
- Add an admin panel for easier content updates.

## Project Overview

The project currently serves two business goals:

1. Present Ahmad Saad as a serious, premium performance coach with a clear, modern, and conversion-oriented online presence.
2. Extend the site beyond a standard marketing page by providing a useful exercise library experience powered by live external data.

The result is a website that is both promotional and functional. It introduces the coach, communicates authority, presents the available programs, builds trust through reviews and certifications, and then gives interested users a direct way to start a conversation. At the same time, the exercise library gives the brand more depth by offering a practical tool that visitors can use directly.

## Product Positioning

The experience is positioned as disciplined, high-performance, and premium. The messaging, visual system, and layout all lean toward a strong coaching identity rather than a generic fitness template.

The current content is especially suited for:

- Beginners who want structure and accountability.
- Busy professionals who need efficient coaching and clear systems.
- Competitive athletes who want performance-first programming.
- Hyrox and functional fitness audiences.
- Visitors who value direct coach access through WhatsApp and Instagram.

## Current Product Scope

### Marketing Website

The homepage is a long-form conversion experience designed to move visitors through a clear sequence:

1. Strong first impression and brand positioning.
2. Trust building through social proof and performance metrics.
3. Clear explanation of programs and specializations.
4. Authority building through the coach profile, reviews, and certifications.
5. Direct outreach through contact actions.

### Exercise Library

The `/exercises` route expands the product beyond pure marketing. It allows users to browse exercise data, search movements, filter by body part or equipment, and open exercise details in a modal. This gives the brand a more substantial digital product layer and creates a stronger sense of value around the coaching experience.

## Homepage Section Breakdown

The homepage currently renders the following sections in order:

| Section | Purpose | Main Source Files |
| --- | --- | --- |
| Hero | Creates the first impression, establishes premium positioning, and drives users toward coaching inquiry actions. | `src/features/home/components/HeroSection.tsx`, `src/features/home/content.ts`, `src/assets/hero-bg.jpg` |
| Stats | Reinforces authority and social proof with animated metrics. | `src/features/home/components/StatsSection.tsx`, `src/features/home/content.ts` |
| Programs | Explains the coaching offers, pricing, feature sets, and strongest call-to-action points. | `src/features/home/components/ProgramsSection.tsx`, `src/features/home/content.ts` |
| Specializations | Shows the disciplines and performance domains the coach focuses on. | `src/features/home/components/SpecializationsSection.tsx`, `src/features/home/content.ts` |
| About | Builds credibility through portrait imagery, experience, philosophy, and coaching highlights. | `src/features/home/components/AboutSection.tsx`, `src/features/home/content.ts`, `src/assets/ahmed-portrait.jpg` |
| Training Gallery | Gives visual proof of coaching sessions and the training environment. | `src/features/home/components/TrainingGallerySection.tsx`, `src/features/home/content.ts` |
| Reviews | Provides rotating social proof with testimonials and star ratings. | `src/features/home/components/ReviewsSection.tsx`, `src/features/home/content.ts` |
| Certifications | Reinforces authority through visible credentials. | `src/features/home/components/CertificationsSection.tsx`, `src/features/home/content.ts` |
| Contact | Converts interested visitors into real outreach through WhatsApp and Instagram. | `src/features/home/components/ContactSection.tsx`, `src/features/site-shell/config.ts` |

## Exercise Library Breakdown

The exercise-library feature is a meaningful part of the codebase and deserves its own maintenance awareness.

Current functionality includes:

- Live exercise fetching from ExerciseDB.
- Body-part category loading.
- Search by exercise name.
- Equipment filtering, including bodyweight browsing.
- Combined filtering behavior.
- Load-more pagination.
- Empty states, error states, and retry behavior.
- Exercise detail modal with scroll lock and keyboard dismissal.
- Shared site shell consistency with the rest of the website.

## Design Direction

The visual design is intentionally focused and performance-driven.

Key design characteristics:

- Strong black-and-white foundation with a bright green accent color.
- Sharp, modern typography using `Space Grotesk`.
- Premium card shadows and high-contrast layout styling.
- A clean, minimal interface without excessive decoration.
- Motion used intentionally for reveals, counters, carousels, and modal transitions.
- Responsive layouts that preserve the brand feel on both desktop and mobile.

The design language works well for a performance coach brand because it feels disciplined, modern, and serious.

## Technology Stack

| Layer | Technology |
| --- | --- |
| Build tool | Vite |
| Language | TypeScript |
| Frontend framework | React 18 |
| Routing | React Router |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| UI foundation | Shared custom components, utility helpers, and Radix-compatible package ecosystem |
| Testing | Vitest and Testing Library |
| External data source | ExerciseDB API |

## Architecture Overview

The application is structured by feature area, which makes it easier to maintain than a flat component directory. This is a good foundation for future growth because it separates the homepage experience, site shell, shared utilities, and exercise-library logic.

### Current High-Level Structure

```text
src/
  app/
    router.tsx
  assets/
    hero-bg.jpg
    ahmed-portrait.jpg
  features/
    home/
      components/
      content.ts
      page.tsx
    exercise-library/
      components/
      hooks/
      lib/
      services/
      types.ts
      page.tsx
    not-found/
      page.tsx
    site-shell/
      components/
      config.ts
  shared/
    components/ui/
    utils/
  styles/
    globals.css
public/
  social-preview.jpg
  robots.txt
  favicon.svg
```

## Route Map

| Route | Purpose |
| --- | --- |
| `/` | Main marketing website and coaching conversion path |
| `/exercises` | Interactive exercise library experience |
| `*` | Not-found fallback route |

## Key Files and Responsibilities

| File or Area | Responsibility |
| --- | --- |
| `src/app/router.tsx` | Registers application routes and scroll-restoration behavior. |
| `src/features/home/page.tsx` | Composes the homepage section order. |
| `src/features/home/content.ts` | Central content source for stats, programs, reviews, certifications, gallery items, and other homepage business content. |
| `src/features/site-shell/config.ts` | Defines brand information, anchor navigation, and social/contact links. |
| `src/features/site-shell/components/SiteHeader.tsx` | Handles responsive navigation and route-aware header behavior. |
| `src/features/site-shell/components/SiteFooter.tsx` | Renders the footer brand block and social actions. |
| `src/features/exercise-library/page.tsx` | Main page for the exercise library experience. |
| `src/features/exercise-library/hooks/useExerciseLibrary.ts` | Owns client-side exercise-library state, filtering, loading, pagination, and retry logic. |
| `src/features/exercise-library/services/exerciseDb.ts` | Handles API requests and data retrieval from ExerciseDB. |
| `src/styles/globals.css` | Defines theme tokens, fonts, layout-level styles, and utility classes. |
| `src/assets/hero-bg.jpg` | Hero background image. |
| `src/assets/ahmed-portrait.jpg` | Coach portrait image used in the about section. |
| `public/social-preview.jpg` | Social-share preview asset. |

## Content Ownership and Data Model

One of the most important implementation details in this project is that the homepage content is not scattered randomly across many components. Much of it is intentionally centralized in `src/features/home/content.ts`.

That file currently contains the following content groups:

- `heroTrustSignals`
- `socialProofStats`
- `programs`
- `specializations`
- `aboutHighlights`
- `coachMetrics`
- `reviews`
- `certifications`
- `trainingGallery`

This makes short-term manual editing practical, even though a real admin panel still needs to be added for long-term business use.

In addition, `src/features/site-shell/config.ts` controls:

- Brand title and role.
- Top navigation items.
- Section anchor behavior.
- Social and contact links.

## Runtime and Behavioral Notes

The current codebase already contains several thoughtful runtime behaviors that future work should preserve.

### Global and Navigation Behavior

- Scroll restoration is handled during route changes so users land at the top of new pages.
- The header changes appearance based on scroll position and route context.
- Mobile navigation automatically closes when route changes happen or the screen becomes desktop-sized.

### Homepage Behavior

- The stats section uses an intersection-driven count-up animation.
- The reviews section rotates automatically on a timer while also supporting manual navigation.
- Multiple homepage sections animate into view with Framer Motion.

### Exercise Library Behavior

- Search input is managed with `useDeferredValue` for smoother typing performance.
- Requests are canceled with `AbortController` to avoid stale updates during rapid filter changes.
- `startTransition` is used for lower-priority state updates.
- The library supports retry flows if loading fails.
- The modal prevents background scroll and closes on `Escape`.

These details are part of what makes the current experience feel polished, and they should be preserved during refactors.

## Local Development

### Requirements

- Node.js 18+ recommended
- npm installed locally

The repository also contains Bun lockfiles, but the documented workflow uses npm because the existing scripts are already defined for it. No environment variables are currently required for local startup.

### Install Dependencies

```sh
npm install
```

### Start the Development Server

```sh
npm run dev
```

### Create a Production Build

```sh
npm run build
```

### Preview the Production Build

```sh
npm run preview
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production build in `dist/` |
| `npm run build:dev` | Creates a development-mode build |
| `npm run preview` | Serves the built app locally for preview |
| `npm run lint` | Runs ESLint across the project |
| `npm run test` | Runs Vitest once |
| `npm run test:watch` | Runs Vitest in watch mode |

## Detailed Content Maintenance Guide

There is currently no admin panel or CMS. That means content updates are still code-driven. The good news is that the current structure already makes many of those updates straightforward.

### Main Content Update Map

| Task | File to Edit | Notes |
| --- | --- | --- |
| Update reviews | `src/features/home/content.ts` | Edit the `reviews` array used by the homepage carousel. |
| Update program names, pricing, descriptions, or feature lists | `src/features/home/content.ts` | Edit the `programs` array. |
| Update stats or trust metrics | `src/features/home/content.ts` | Edit `socialProofStats` and related content values. |
| Update certifications | `src/features/home/content.ts` | Edit the `certifications` array. |
| Update specializations | `src/features/home/content.ts` | Edit the `specializations` array. |
| Update gallery image URLs and alt text | `src/features/home/content.ts` | Edit the `trainingGallery` array. |
| Update brand name, navigation, or social links | `src/features/site-shell/config.ts` | This file controls the main shell-level brand and link behavior. |
| Replace hero image | `src/assets/hero-bg.jpg` | Keep dimensions and crop quality in mind. |
| Replace portrait image | `src/assets/ahmed-portrait.jpg` | Ensure the image still fits the about-section layout. |
| Replace social preview image | `public/social-preview.jpg` | Update if branding or photography changes significantly. |

### Review Update Workflow

When updating reviews, use the following process:

1. Edit the `reviews` array in `src/features/home/content.ts`.
2. Replace placeholder or older testimonials with the latest approved versions.
3. Keep the reviewer naming style consistent, especially if initials or shortened names are being used for privacy.
4. Keep testimonial length reasonable so the carousel remains clean on mobile.
5. Check the homepage manually to ensure the auto-rotation still feels balanced with the new copy lengths.

### Professional Photography Update Workflow

When final photography from a professional photographer is available, update the project in the following order:

1. Replace `src/assets/hero-bg.jpg` if a new hero image is provided.
2. Replace `src/assets/ahmed-portrait.jpg` if a new coach portrait is provided.
3. Replace `public/social-preview.jpg` so the sharing card matches the latest brand visuals.
4. Replace the `trainingGallery` entries in `src/features/home/content.ts` with the final approved gallery assets.
5. Update the related image alt text so it accurately reflects the real scenes shown in the final photography.
6. Visually test desktop and mobile layouts after the swap to confirm composition, cropping, and image quality still work well.

### Offer and Pricing Update Workflow

When coaching packages change:

1. Edit the `programs` array in `src/features/home/content.ts`.
2. Review the `title`, `price`, `period`, `sessions`, `bestFor`, `features`, and `result` values together so the cards remain consistent.
3. Confirm whether a package should be marked as `isPopular` or `isLimited`.
4. Check the homepage after changes to ensure card heights and CTA balance still look good.

### Contact and Link Update Workflow

If the coach changes preferred contact methods, social links, or branding labels:

1. Update `src/features/site-shell/config.ts`.
2. Confirm that the WhatsApp link still works correctly.
3. Confirm that Instagram, Facebook, email, and any future external links point to the intended destinations.
4. Re-test both the header and contact section because both rely on the shared config.

## Quality Assurance and Testing

The repository already includes tests for selected logic, especially where data transformation and configuration behavior matter most.

Current automated test areas include:

- `src/features/site-shell/config.test.ts`
- `src/features/exercise-library/lib/transformExercise.test.ts`

Recommended local QA flow before release:

1. Run lint.
2. Run tests.
3. Run a production build.
4. Manually inspect the homepage on desktop and mobile.
5. Manually inspect the `/exercises` route with search and filters.

### Suggested Verification Commands

```sh
npm run lint
npm run test
npm run build
```

## Release Checklist

Before publishing a new version, especially after content updates, the following checks are recommended:

- Confirm all testimonials are approved and free of spelling issues.
- Confirm prices, package names, and feature lists are current.
- Confirm hero, portrait, and gallery images are final versions.
- Confirm WhatsApp and Instagram links work correctly.
- Confirm the exercise library still loads and handles failure states gracefully.
- Confirm mobile navigation and section anchors behave correctly.
- Confirm the site builds successfully for production.

## External Dependency Notes

The exercise library depends on the external ExerciseDB service.

Current base URL:

- `https://www.exercisedb.dev/api/v1`

This has a few practical implications:

- If the external service is unavailable, the exercise library will be affected.
- If the service changes response structure, data transformation code may need updates.
- The current UI already includes loading, empty, and failure messaging, which helps protect the user experience.

## Deployment Notes

This is a static Vite application. It can be deployed on most modern static hosting platforms.

Suitable deployment targets include:

- Vercel
- Netlify
- Cloudflare Pages
- Amazon S3 with CDN
- Any traditional static-hosting setup

Production build output is generated in:

- `dist/`

## Current Limitations

Even though the project foundation is strong, a few important limitations still exist:

- Reviews are still hardcoded and need to be refreshed manually in the codebase.
- Gallery imagery still needs to be upgraded with final professional photography.
- There is no admin panel or CMS for non-technical content updates.
- The exercise library depends on a third-party API outside this repository.
- Most business-facing updates still require developer involvement.

## Admin Panel Recommendation

The admin panel is one of the most important next-phase upgrades for this project. It will reduce developer dependency and make the website more practical for ongoing business use.

### Minimum Useful Scope

A first version of the admin panel should allow trusted editors to update:

- Reviews
- Programs and pricing
- Certifications
- Social links
- Gallery images
- Core homepage copy

### Recommended Capabilities

The admin panel should ideally include:

- Secure login for approved editors
- Structured forms for each content type
- Image upload or managed asset selection
- Preview capability before publish
- Save and publish workflow
- Content validation for required fields
- Clear separation between admin editing and public presentation

### Recommended Technical Direction

When this phase begins, the cleanest long-term direction will likely be:

1. Move homepage content out of hardcoded arrays and into a structured content model.
2. Introduce authenticated editing for business users.
3. Keep the public site fast and lightweight while isolating editing tools separately.
4. Preserve the current front-end quality while making content operations easier and safer.

## Recommended Next Phase

The next stage of the project should focus on operational maturity rather than a full visual rebuild.

Highest-priority next steps:

1. Update reviews with the latest approved client testimonials.
2. Replace current images with final assets from a professional photographer.
3. Introduce an admin panel for easier content updates.

After those three items are complete, the project will be much stronger not only visually, but also operationally.

## Summary

Elite Performance Hub already has a strong front-end foundation, a focused brand identity, and a useful secondary product in the exercise library. The site is well-positioned for the next phase. The main remaining work is no longer about basic structure. It is about refinement, content quality, visual polish, and easier content operations through an admin panel.
