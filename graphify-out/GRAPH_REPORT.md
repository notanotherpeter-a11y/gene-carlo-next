# Graph Report - gene-carlo-next  (2026-08-22)

## Corpus Check
- Corpus is ~9,810 words - fits in a single context window. You may not need a graph.

## Summary
- 191 nodes · 189 edges · 25 communities (15 shown, 10 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `include` - 7 edges
3. `Gene Carlo Next.js Project` - 6 edges
4. `scripts` - 5 edges
5. `SceneHero()` - 4 edges
6. `lib` - 4 edges
7. `Build & Deploy Job` - 4 edges
8. `gene-portrait.jpg (Portrait Photo Asset)` - 4 edges
9. `useScrollAnimations()` - 3 edges
10. `Next.js Agent Rules` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Vercel Platform` --semantically_similar_to--> `Cloudflare Pages`  [INFERRED] [semantically similar]
  README.md → .github/workflows/deploy.yml
- `npm run build` --conceptually_related_to--> `Gene Carlo Next.js Project`  [INFERRED]
  .github/workflows/deploy.yml → README.md
- `Next.js Framework` --conceptually_related_to--> `Next.js Breaking Changes Warning`  [INFERRED]
  README.md → AGENTS.md
- `CLAUDE.md → AGENTS.md Reference` --references--> `Next.js Agent Rules`  [EXTRACTED]
  CLAUDE.md → AGENTS.md
- `File Document Icon` --semantically_similar_to--> `Globe / World Wide Web Icon`  [INFERRED] [semantically similar]
  public/file.svg → public/globe.svg

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Agent Instructions Context: CLAUDE.md, AGENTS.md, Next.js Breaking Changes** — claude_md_agents_md_ref, agents_md_nextjs_agent_rules, agents_md_nextjs_breaking_changes [EXTRACTED 1.00]
- **CI/CD Deployment Pipeline: Build, Wrangler, Cloudflare Pages** — _github_workflows_deploy_build_deploy_job, _github_workflows_deploy_wrangler, _github_workflows_deploy_cloudflare_pages [EXTRACTED 1.00]
- **Next.js Project Bootstrap: Framework, create-next-app, app/page.tsx** — readme_nextjs_framework, readme_create_next_app, readme_app_page_tsx [EXTRACTED 1.00]
- **UI Utility / Decorative Icons (non-brand)** — public_file_svg_file_icon, public_globe_svg_globe_icon, public_window_svg_window_icon [INFERRED 0.85]
- **Next.js Default Public Directory Icons** — public_file_svg_file_icon, public_globe_svg_globe_icon, public_next_svg_nextjs_logo, public_vercel_svg_vercel_logo, public_window_svg_window_icon [INFERRED 0.95]
- **Vercel / Next.js Brand Assets** — public_next_svg_nextjs_logo, public_vercel_svg_vercel_logo [INFERRED 0.95]

## Communities (25 total, 10 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (16): World, HUD(), sections, SceneContact(), SceneExperience(), timeline, Project, projects (+8 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (21): gsap, @gsap/react, lenis, next, dependencies, gsap, @gsap/react, lenis (+13 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (17): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+9 more)

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (16): Build & Deploy Job, Cloudflare Pages, Deploy to Cloudflare Pages Workflow, npm ci (Install Dependencies), npm run build, Wrangler CLI, generate-agent-files.js (Next.js internal), Next.js Agent Rules (+8 more)

### Community 5 - "Community 5"
Cohesion: 0.18
Nodes (5): chips, HeroScene, AuroraMaterial, @react-three/fiber, ThreeElements

### Community 6 - "Community 6"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 7 - "Community 7"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 8 - "Community 8"
Cohesion: 0.33
Nodes (5): camCurve, CAMERA_POINTS, CameraRig(), LOOKAT_POINTS, lookCurve

### Community 9 - "Community 9"
Cohesion: 0.60
Nodes (5): Portfolio / Personal Website Asset, gene-portrait.jpg (Portrait Photo Asset), Dark Studio Lighting (Low-Key), Professional Headshot Style, Gene Carlo (Portrait Subject)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (5): File Document Icon, Globe / World Wide Web Icon, Next.js Wordmark Logo, Vercel Triangle Logo, Browser Window / Desktop UI Icon

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 12 - "Community 12"
Cohesion: 0.83
Nodes (3): generateScatterPositions(), generateSpherePositions(), SceneHero()

## Knowledge Gaps
- **87 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+82 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 1` to `Community 7`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 3` to `Community 7`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `Community 2` to `Community 6`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _87 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08275862068965517 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._