# Kuba — Fieldnotes

A small static blog for GitHub Pages. Posts are Markdown files in Git.
No application server, database, Node.js, React, or API keys are required.
GitHub Pages builds the site with its built-in Jekyll support.

## Enable GitHub Pages (one time)

1. Open this repository's **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Choose **main**, **/(root)**, then **Save**.
4. GitHub will display the published URL when the build finishes.

The configured address is `https://urobor.github.io/kubalog/`.
This is a project site; `_config.yml` sets `baseurl: /kubalog` so assets and links
work under that path.

GitHub Free requires a public repository for Pages. Private repositories need
an eligible paid GitHub plan. A Pages website is normally public even when its
source repository is private. Do not change repository visibility without
reviewing the full Git history for private material.

## Write a post directly on GitHub

1. Open `_posts/`, then **Add file → Create new file**.
2. Name it `YYYY-MM-DD-short-title.md`, for example `2026-10-26-learning-go.md`.
3. Paste this template and replace the title, topic, summary, date, and body:

```markdown
---
title: "Learning Go"
date: 2026-10-26 12:00:00 +0100
topic: "Learning"
summary: "A short introduction that appears in the feed."
---

Write your entry here. Leave a blank line between paragraphs.

## A heading

- A useful observation
- Something to try next

Use **bold**, *italic*, links, images, and code blocks as needed.
```

4. Choose **Commit changes** and commit to `main`.
5. GitHub rebuilds the site automatically once Pages is enabled.

The title is required. A topic and summary make the feed easier to browse.
Use the timezone offset appropriate for the date: Poland is +0100 in winter
and +0200 in summer. Future-dated posts are omitted until a later build after
their publication date; GitHub Pages does not schedule that rebuild for you.

Edit or delete the corresponding Markdown file to change or remove a post.
There is no author login or editor inside the published website; GitHub's
editor provides the writing interface and Git tracks every saved revision.

## Drafts

Keep unpublished work in `_drafts/`. Jekyll excludes drafts from the published
website. Move a finished draft into `_posts/` with a dated filename to publish.
**Drafts in a public repository are visible in the source**, even though they
are excluded from the website. For private notes, keep them outside the repo.

## Customize

- `_config.yml`: author, description, domain, and project path.
- `index.html`: intro and summary feed.
- `_layouts/`: shared page and article layouts.
- `assets/style.css`: appearance.
- `assets/journal.js`: optional search, topic filters, and mobile menu.
- `assets/`: place images here, then link using `/kubalog/assets/filename.jpg`.

Posts and navigation render as ordinary HTML and remain readable without
JavaScript. The search and topic filters run in the visitor's browser.

## Optional local preview

No local tools are needed to publish through GitHub. If you want a local preview,
install Ruby and Bundler, then run:

```sh
bundle install
bundle exec jekyll serve --baseurl /kubalog
```

Open `http://127.0.0.1:4000/kubalog/`.

## Migration and history

The two published entries were copied from the original Sites database on
25 October 2026. The original private Sites deployment was left intact during
the migration. Once Pages is live and verified, it can be retired separately.

The former full-stack code remains in earlier Git commits. The original Sites
Git history is also preserved in `history/fieldnotes-original.bundle`, which
is excluded from the published website. The current code needs no Sites or
Cloudflare integration.
