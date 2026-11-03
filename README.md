# OMS Prototype

UX prototype of the new Order Management System (customer order module) for EG Retail Chain Cloud, built with Angular 22 and BrandSync (`@brandsync/wc`, `brandsync-tokens`). All data is mock data.

## Run

```bash
npm install
npm start          # http://localhost:4200
npm run build
```

## Design tokens

A local copy of the BrandSync tokens lives in `src/styles/tokens/`. Put overrides in `tokens.overrides.css`; `npm run tokens:sync` refreshes `tokens.css` from the installed package.

See [CLAUDE.md](CLAUDE.md) for project conventions.
