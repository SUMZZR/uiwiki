# Vibehoarder

Vibehoarder is an AI-first library of interactive UI components and motion patterns. Every entry includes a live preview, a detailed English prompt for Claude/GPT/Cursor/v0, paste-ready React + Tailwind + Framer Motion source, and a CSS-only fallback.

The site is built with Next.js 15 App Router and static JSON content. It has no database, CMS, admin panel, or runtime content API.

## The only setup required

1. Push this repository to GitHub and import it into Vercel. Keep Vercel's default “deploy on push to main” behavior.
2. In GitHub, open **Settings → Secrets and variables → Actions** and add one repository secret named `ANTHROPIC_API_KEY`.

That is all. The built-in `GITHUB_TOKEN` receives `contents: write` only in the daily workflow, so no personal access token is required. At 02:00 UTC each day the workflow generates three entries, validates them, commits them to `main`, and Vercel deploys the commit.

If the repository later enables branch protection that blocks GitHub Actions from pushing to `main`, allow this workflow to bypass that rule or replace the final push with a pull-request flow.

## Local development

Node.js 22 and pnpm are recommended.

```bash
pnpm install
pnpm dev
```

Production verification:

```bash
pnpm validate:content
pnpm validate:demos
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm lighthouse
```

`pnpm generate --dry-run` verifies the idea pool and shows the next batch without calling Anthropic. A real local generation run requires `ANTHROPIC_API_KEY`:

```bash
cp .env.example .env.local
export ANTHROPIC_API_KEY="your-key"
pnpm generate
```

## Content model

Entries live in `content/components/*.json` and are validated by `src/schemas/component-entry.ts`. Dynamic detail routes use `generateStaticParams`, so every component page is emitted as static HTML during the build.

The initial library contains 30 original entries—three in each category. `content/ideas.json` starts with 120 additional ideas and replenishes itself through the same Anthropic API key when fewer than 24 remain.

Generated content is not published blindly. Each candidate must pass:

- Zod schema validation, including a 200–400 word prompt
- duplicate slug and category checks
- forbidden API and dynamic-code checks
- TypeScript compilation of the copied React source
- isolated `react-dom/server` rendering of `demoCode` with stripped environment variables and a timeout
- the full repository lint, typecheck, tests, content validation, demo rendering, and Next.js production build

Failed candidates are discarded and regenerated up to two additional times. The workflow writes and commits content only after all three candidates pass.

## Useful commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Turbopack development server |
| `pnpm build` | Validate content and create the production build |
| `pnpm generate` | Generate and validate three new entries |
| `pnpm generate --dry-run` | Inspect the next generation batch without an API call |
| `pnpm validate:content` | Validate every JSON entry and category coverage |
| `pnpm validate:demos` | SSR every live demo in an isolated worker |
| `pnpm lighthouse` | Check the home and representative detail page budgets |

## Source policy

The initial catalog is marked `original`. Future inspired entries must use `source: "inspired-by-<url>"` and may only reference material with a compatible open-source license. The generation prompt explicitly forbids copying named products or copyrighted interfaces.
