# AGENTS.md

## Cursor Cloud specific instructions

This is an Astro 4.x static portfolio/blog site with Tailwind CSS and Franken-UI. There is no backend, database, or Docker dependency.

### Running the dev server

```
bun run dev
```

Starts on `localhost:4321` with HMR. Pass `--host 0.0.0.0` to expose on all interfaces.

### Type checking and build

- `bun run astro check` — runs Astro diagnostics (0 errors expected; a few hints are normal)
- `bun run build` — runs `astro check && astro build`, outputs static files to `dist/`

### Known issues

- `.prettierrc` references `prettier-plugin-astro` and `prettier-plugin-tailwindcss`, but neither is listed in `package.json`. Running `prettier --check` will fail until these plugins are added as dependencies.
