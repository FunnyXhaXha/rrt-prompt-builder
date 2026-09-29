# RRT Prompt Builder — v0.1

Independent, bilingual RRT Lite prompt generator by Xilin Xu. Discord: badgermunsta.

## Local use

Node.js 24 and Python 3:

```sh
npm ci --ignore-scripts
npm test
npm run build
npm run dev
```

Open http://localhost:5173. No frontend dependencies, LLM SDK, API key, database, authentication, analytics, or input persistence. All prompt generation is in the browser. Copy uses the browser clipboard; if permission is unavailable, the output is selected for manual copy. Editing material or options clears the old output to avoid copying a stale prompt. Switching languages preserves material and regenerates an existing output in the selected language.

## Edit RRT Lite

- `src/prompts/en/*.js`: English core, resource, decision, redemption, agency, gameplay-efficiency, narrative-completion, throughput, output modules.
- `src/prompts/zh/*.js`: matching Chinese modules.
- `src/prompts/index.js`: assembly, target scope, and focus emphasis. All basic definitions remain present; selected focuses receive priority within the nine-section output.
- `src/app.js`: UI translations, input state, language switching and copy behavior.
- `public/style.css`: responsive styling.
- `public/index.html`: structure, author contact, and outbound theory link.

These are native JavaScript ES modules, so the browser can run them without framework or compilation dependencies. `npm run build` copies only public assets and source to `dist/`.

## Independent GitHub → Cloudflare deployment

Target repository: `FunnyXhaXha/rrt-prompt-builder` (not created by this source package).
Worker name: `rrt-prompt-builder` in `wrangler.jsonc`.

1. Create the new GitHub repository and push this project to `main`.
2. Add repository Actions secrets `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` (an appropriately scoped Cloudflare deployment token). Do not put credentials in source files.
3. The included `.github/workflows/cloudflare-deploy.yml` tests, builds and deploys on pushes to `main`; it can also be run manually.
4. Check the successful Actions run and the public workers.dev URL reported by Cloudflare, then verify English/Chinese generation and copy on the deployed site.

No D1, KV, R2, Worker script, or server endpoint is configured. Hosting serves static assets. `_headers` disables browser network API calls with `connect-src 'none'` and disallows form submission. Hosting still receives ordinary static-file requests; user material is never attached to them. Pasting the resulting prompt into another AI is a separate user action subject to that AI's privacy practices.

The outbound theory link points to the existing Atlas URL. Its current access policy may require sign-in. This project does not change that policy or any Atlas resource.

No Atlas code, Worker, database, deployment, repository, or existing Site was modified.
