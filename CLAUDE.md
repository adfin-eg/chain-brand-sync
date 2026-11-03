# CLAUDE.md

## Purpose

UX prototype of the new Order Management System (OMS, a.k.a. customer order module) for EG Retail Chain Cloud, built to make handover to development easy.

- Data is mock data, provided by the user. Label any sample data you invent.
- UI is built with BrandSync: `@brandsync/wc` web components and `brandsync-tokens`.
- Confirm scope (screens, flows, fields) with the user before building. Never drop fields silently.

## Stack

Matches the real OMS UI (`EG-A-S/CloudService-CustomerOrderServiceV2`, `src/CustomerOrderV2.UI/ClientApp`):

- Angular 22, standalone components, SCSS, npm
- Signals for state; mock data lives in services under `src/app`, so they can be swapped for HTTP services later
- `inject()`, `OnPush`, `@if`/`@for`/`@switch`, `$`-suffixed observables, null-safe templates, loading/empty/error/success states on every data view

## BrandSync rules

1. Use `bs-*` components for every control they cover. If none fits, list it as a GAP.
2. Call the BrandSync MCP `get_component` before using a component, and follow its Do/Don't rules. `get_pattern` / `search_guidelines` are for layout guidance only, not markup to copy.
3. In our own CSS use official `--bs-*` tokens, preferring foundation tokens (surface, text, border, spacing, ...) over raw palette colours.
4. Keep `@brandsync/wc` and `brandsync-tokens` on the latest version (`npm view <pkg> version`) before generating code.
5. Before calling work BrandSync-compliant, list every gap, workaround and piece of sample data.

## Wiring

- [src/main.ts](src/main.ts) calls `defineCustomElements()` from `@brandsync/wc/loader`.
- Components that use `bs-*` tags declare `schemas: [CUSTOM_ELEMENTS_SCHEMA]`.
- [src/styles.scss](src/styles.scss) imports the token files globally, before any `bs-*` element renders.

## Design tokens

- `src/styles/tokens/tokens.css`: local copy of `brandsync-tokens/tokens.css`, refreshed with `npm run tokens:sync`.
- `src/styles/tokens/tokens.overrides.css`: loaded after the copy; holds all prototype overrides, redeclaring only the tokens being changed. Comment each override with what and why.

## Commands

```bash
npm start            # ng serve
npm run build        # production build
npm run tokens:sync  # refresh local tokens.css from node_modules
```

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/): `<type>(<feature>): <subject>`, where `<feature>` is the feature folder name (e.g. `orders`).
- Not scoped to one feature: `<type>(<affected-path>): <subject>` naming the file/script, e.g. `chore(tokens): ...`.
- Repo-root changes with no single-file scope (folder moves, root docs): `<type>(repo): <subject>`.
- Types: `feat` (new feature, or new/improved behavior that wasn't broken), `fix` (something behaved incorrectly), `chore` (tooling, deps, config, build, structure), `docs` (documentation only).
- Examples: `feat(orders): initial commit`, `fix(orders): correct filter dropdown showing stale results after clearing a filter`, `chore(repo): reorganize folders`.

## Branches

**Current phase: work and commit directly on `main`. No branches or PRs for now.** The convention below applies once this note is removed.

`<type>/<feature>-<what-changes>`, using the same types as commits (`feat`, `fix`, `chore`, `docs`, `ci`). The feature is the folder name, so a branch name says which feature it touches.

- Lowercase, hyphen-separated, 3-6 words. Say what the branch changes, not the whole project.
- One change per branch, short-lived. Branch from an up-to-date `main` (`git checkout main && git pull`) and delete after merge.
- Examples: `feat/orders-initial`, `feat/orders-user-menu`, `fix/orders-stale-filter-results`, `chore/tokens-override-primary`, `docs/branch-naming-convention`.
- Several branches on one feature: give each its own specific change (`feat/orders-user-menu`, `fix/orders-card-outline-clipping`), not a counter. Keep them independent and branched from `main`; merge the first before starting a dependent second one rather than stacking.
- Never reuse a taken name with a suffix. Continue the existing branch, or if stale, rebase it onto `main` or start a new, more specific one and cherry-pick.

## Layout

One folder per feature (e.g. `src/app/orders/`), with mock data in a clearly named `mock/` file.

## Open items

- Screens, flows and fields: user will provide.
- Mock data: user will provide.
- Shell frame (top menu / side nav) from `bs-*` navigation components, or content area only. Default: content area only.
