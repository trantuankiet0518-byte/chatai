# Project Context

Project:

- Name: `nextjs-app`
- Purpose: Eastern astrology platform for `Bazi`, `Tu Vi`, and `Van Han`
- Default locale: `vi`
- Supported locales: `vi`, `en`

Stack:

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- `next-intl`
- domain logic in `lib/bazi`, `lib/vanhan_predict.ts`, `app/api/*`

Architecture:

- routes in `app/[locale]`
- API routes in `app/api`
- UI uses atomic design in `components/atoms|molecules|organisms|templates`
- business contracts in `lib/contracts`
- services in `lib/services`

Non-negotiables:

- do not hardcode Vietnamese or English UI strings in JSX
- add new strings to both `messages/vi.json` and `messages/en.json`
- avoid direct `fetch` in UI components when service layer exists
- keep timezone with birth date and birth time data
- be careful with `lib/bazi/engine.ts`, `lib/api-schema.ts`, `i18n/routing.ts`, `i18n/request.ts`, `next.config.ts`

Data flow:

- form input -> API route -> engine/service -> `ApiResult<T>` -> UI

Expected work pattern:

- inspect only the files relevant to the task
- preserve dirty user changes
- keep edits typed and minimal
