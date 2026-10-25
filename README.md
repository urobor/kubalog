# Kuba — Fieldnotes

A personal log with a left-hand entry menu, a summary feed, search, topic filters, and an author editor.

## Stack

React and TypeScript, Vinext, a Cloudflare Worker, Cloudflare D1, and ChatGPT authentication provided by Sites.

## Local development

Requires Node.js >=22.13 and pnpm (the project was originally installed with pnpm 11.25).

```sh
pnpm install --frozen-lockfile
pnpm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_sudden_silk_fever.sql
pnpm run dev
```

Open the local URL printed by the dev command. A clean checkout uses the portable development profile with a separate local database and a development-only mock sign-in at `/signin-with-chatgpt?return_to=/`. Sign in locally, then select **Set up my log**.

The included [starter reference](docs/sites-starter.md) describes the framework and deployment integration.

## Source and data

- `app/journal.tsx`: reading interface and entry editor.
- `app/globals.css`: styles and responsive layout.
- `app/api/entries/route.ts`: entry reads/writes and author authorization.
- `db/schema.ts` and `drizzle/`: database schema and migrations.
- Posts and drafts live in the hosted D1 database. They are **not** stored in Git and are not included here.
- Secrets, local databases, dependencies, and build output are excluded.

## Deployment

The existing website is hosted through ChatGPT Sites. `.openai/hosting.json` identifies that Site. Pushing to this GitHub repository does not automatically deploy the website; an authorized Sites publication is still required.

Deploying independently requires configuring your own Cloudflare Worker, D1 database, and authentication. Initialize author ownership under restricted access before making an independent copy public.

## Original history

The first Sites version was commit `5680fc21bfaaa3268a91480670c35babdac4742a`. Its complete original Git history is retained in [history/fieldnotes-original.bundle](history/fieldnotes-original.bundle).

To restore that original history separately:

```sh
git clone history/fieldnotes-original.bundle fieldnotes-original
```

The working source is imported directly into this repository for ordinary commits and pull requests going forward.
