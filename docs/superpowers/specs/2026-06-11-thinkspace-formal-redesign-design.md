# ThinkSpace — Formal/Enterprise Redesign + Real-Content CMS Rewrite

**Date:** 2026-06-11
**Source of truth for content:** `port/Profile-Think2569(1).pdf` (company profile) and `port/Proxmox-authorized-reseller-logos/` (partner assets)
**Design references:** hpe.com (clean white canvas, restrained accent, strong type hierarchy), p-dictor.com (navy + bright accent, card grids, generous whitespace)

## 1. Goals

1. Re-skin the entire marketing site to a **formal, enterprise, professional** look in the HPE / p-dictor mold.
2. Replace the **fictional/generic CMS content** ("AWS partner", "99.99% SLA", "PCI-DSS SOC", "founded 2020 Bangkok") with the **real ThinkSpace story** (Chiang Mai, registered 22 Nov 2024, real services, real team, real projects), bilingual TH/EN.
3. Add **Logix** (own AI-native platform, on-prem + on-cloud) as a flagship Product.
4. Add **Technology Partners**: Proxmox (authorized reseller — with a compliant Proxmox product page), Dell, Google Cloud (GCP).
5. Preview everything in **dev mode** first.

## 2. Decisions (locked with user)

- Content: **full real rewrite**, bilingual TH/EN.
- Palette: **Navy + Teal/Green (logo-tied)** — primary `#16C79A`, navy `#0B2447`, canvas white/`#F5F7FA`, slate text `#1A2433`.
- Scope: **all marketing pages**.
- Clients: **use real client names & logos**.
- Logix: **flagship product** — new top-level **Products** nav + `/products/logix` page + homepage band.
- Partners: real Proxmox logo now; Dell / Google Cloud / Logix as clean text/SVG wordmarks with file slots to swap; **Proxmox product page** follows `Proxmox-Landingpage-Wireframe-Template.pdf`.

## 3. Design System (foundation — highest leverage)

Everything uses DaisyUI semantic tokens, so retuning the theme re-skins the whole site.

**`packages/config/tailwind.config.ts` — `thinkspace` + `thinkspaceDark` themes:**

| Token | New value (light) | Notes |
|---|---|---|
| `primary` | `#16C79A` teal-green | actions, links, underlines only |
| `primary-content` | `#06231C` | |
| `secondary` | `#0B2447` deep navy | headings, dark surfaces |
| `accent` | `#11A88A` darker teal | hover |
| `neutral` | `#1A2433` slate | |
| `base-100` | `#FFFFFF` | canvas |
| `base-200` | `#F5F7FA` | cool gray sections |
| `base-300` | `#E3E8EF` | borders |
| `base-content` | `#1A2433` | body text |
| `info` | `#2563EB` | |
| `--rounded-btn` | `0.25rem` | sharper, formal |
| `--rounded-box` | `0.375rem` | |

Dark theme: navy-tinted (`base-100` `#0B1A2E`, `base-200` `#102740`), teal primary preserved.

- **`brand` color scale** in same file: retune from green to teal scale.
- **`globals.css` `.text-gradient`**: change hardcoded green → navy→teal gradient. Tone down marquee usage on hero.
- **Type:** keep Inter (EN) + Kanit (TH). Enterprise scale: larger/heavier navy display headings, eyebrow labels (uppercase, letter-spaced, teal), generous body line-height. Add a `.eyebrow` and refined heading utilities.
- **Motion:** subtle fade/translate-on-scroll; remove bouncy/auto-marquee from hero; calm = formal.
- **Cards:** 1px `base-300` border + soft shadow, sharp corners, hover-lift restrained.

## 4. Information Architecture

Nav: **Home · Products (Logix, Proxmox) · Solutions/Services (6 pillars) · Works · About · News · Contact** + EN/TH switch + single teal CTA "Get Started / ติดต่อเรา".

New route group/pages:
- `/[locale]/(marketing)/products/page.tsx` — products overview (Logix + Proxmox).
- `/[locale]/(marketing)/products/logix/page.tsx` — Logix product page.
- `/[locale]/(marketing)/products/proxmox/page.tsx` — Proxmox reseller page (compliant layout).

## 5. Page-by-page redesign (all marketing pages)

- **Home:** editorial navy hero ("From Vision to Reality / เปลี่ยนวิสัยทัศน์ให้เป็นความจริง") → 6-pillar services grid → **Logix product band** → **Technology Partners band** (Proxmox/Dell/GCP) → real "Trusted by" client logo wall → featured real case studies → stats → CTA.
- **About:** real company facts (Chiang Mai, reg. 0505567026400, capital 1M THB, reg. 22 Nov 2024), vision/mission, 3 real executives (CTO ธีรดนย์ สมศรี / CEO สรารัตน์ ขวัญใจ / CDO ทีปัชลิต บินอารี with real credentials), milestone timeline.
- **Services (6 pillars):** Software Solutions; Cybersecurity & Cloud Infrastructure; AI & Data Science; High-Performance Computing (HPC); IoT & Automation; Advanced Research. Rich detail pages.
- **Works:** ~20 real case studies, filterable. See §7.
- **Products:** Logix + Proxmox (§6).
- **Contact / Careers / News:** re-skinned, real contact info.

## 6. Products

### 6a. Logix — AI-native platform
**Source of real features:** `/Users/theeradonsomsri/Logix/logix-project/README.md` (+ CLAUDE.md).
Positioning (real): **"Logix AI Platform — sovereign agentic AI infrastructure for organizations that want to own their AI workspace, not rent it."** Deploy on-premise or on-cloud; give your teams an AI workspace like Claude.ai/ChatGPT with full control over data, knowledge, and infrastructure. Product owner: ThinkSpace; initial deployment: Thaksin University (TSU).

**Real core features (use these, do NOT invent):**
- Agentic AI Harness — orchestration, reasoning, tool use
- Unified Knowledge System — Wiki + Vectors + Graph in one
- Triple Memory — Episodic + Semantic + Procedural
- MCP Hub — standard tool integration protocol
- Skills + Marketplace — user-created, shareable automation
- Personas — configurable AI personas per use case
- Infrastructure Manager — GUI for vLLM / Ollama / SGLang
- One-Click Deployment — catalog of AI apps + custom repos
- API Token System — external apps integrate via API
- **Hybrid LLM Routing — Cloud + On-Premise transparent routing** (the "on-prem + on-cloud" story)

**Do NOT claim** SOC 2 / ISO 27001 (deferred, Phase 4) — avoid over-promises.
Tech stack (for an architecture strip): Next.js 15 · Bun + Elysia · PostgreSQL 16 + pgvector + Apache AGE · vLLM / LiteLLM / BGE-M3 / MCP · Docker / Cloudflare Tunnel / Caddy.
Sections: hero (sovereign AI), on-prem vs on-cloud deployment comparison, core-capabilities grid (above), architecture strip, CTA. Homepage band links here.

### 6b. Proxmox — authorized reseller (MUST follow wireframe template for partner sign-off)
Structure (from `Proxmox-Landingpage-Wireframe-Template.pdf`):
1. **Header co-branding:** ThinkSpace logo + Proxmox "Authorized Reseller" logo (real PNG, not larger than ThinkSpace logo).
2. **Headline:** "Enterprise Virtualization with Proxmox Virtual Environment" + intro explaining ThinkSpace's role/expertise as Proxmox Partner.
3. **MANDATORY — Proxmox Virtual Environment:** overview + key features (KVM+LXC, HA & live migration, SDS: ZFS/Ceph, HCI, backup, SDN+firewall, web mgmt). | **Reseller services** value-add + **3 B2B subscription tiers (Basic, Standard, Premium)** + CTA "Schedule a Technical Consult".
4. **Proxmox Datacenter Manager:** centralized control plane. | reseller value-add / social proof.
5. **OPTIONAL add-ons:** Proxmox Backup Server; Proxmox Mail Gateway.
6. **MANDATORY — Social Proof & CTA.**
7. **Footer disclosure:** "ThinkSpace Technologies Co., Ltd. is an official reseller partner of Proxmox Server Solutions."
Compliance checklist honored: co-branding, current assets, SLA clarity, no over-promises, one dominant CTA, mobile-ready, fast load, partner-status disclosure.

Datasheet PDFs (`port/Proxmox-authorized-reseller-logos/*.pdf`) linkable as "Download Datasheet".

## 7. Real case studies (Works) — from profile

Bedding Houze cross-border ERP (TH–MY, Dec 2024) · GETHA enterprise cybersecurity (MY, Dec 2024–Jan 2025) · Suppaisan Goldsmith gold-savings web app (Dec 2024) · CMU-RAILCFC 3D Digital Twin railway ballast (Mar–Sep 2025) · Ubah Marketplace / Nana Digital (Apr 2025) · CMU-RAILCFC + **EGAT** slope-stability risk AI (Oct 2025) · Engineers' Soul 2025 event platform / CMUEAA (Aug–Sep 2025) · CMUAA graduate marketplace (Aug 2025–2027) · CMUAA digital graduate ID (Jan 2026) · Hidden Cafe LUM-DEE POS (Feb 2026) · Thidanukroh School central auth/NAC (Mar 2026) · Songkhla Rajabhat Private AI legal (Mar 2026) · Silver Temple web platform (Jan 2026) · CCINNOMA AI formulation engine (Jan 2026) · Wanawat Hardware Private AI doc intelligence (Apr 2026) · Rajaprajanugroh 19 school site (May 2026) · Entaneer Golf Club platform (May 2026) · CMU-RAILCFC cloud/network infra (2023–2025) · LMGC90 GPU acceleration DEM (CMU-RAILCFC) · Nationwide traffic-accident analytics · Track Quality Index ML (สทร., 2023).

## 8. Partners (two distinct bands)

- **Clients ("Trusted by"):** GETHA, Bedding Houz, CMU-RAILCFC, Suppaisan Goldsmith, CMUEAA, CMU, CMU Alumni Association, Nana Digital, CCINNOMA, Silver Temple Foundation, Hidden Cafe, Wanawat Hardware, EGAT, schools.
- **Technology Partners:** Proxmox (Authorized Reseller — real logo), Dell (Technology Partner), Google Cloud / GCP (Cloud Partner).

Assets: copy `port/Proxmox-authorized-reseller-logos/screenlogo/proxmox-authorized-reseller-logo-color-1280px.png` (+ inverted) → `apps/web/public/images/partners/`. Dell/GCP/Logix → text/SVG wordmark components with file slots `dell.svg`, `google-cloud.svg`, `logix.svg`.

## 9. CMS content rewrite (bilingual, real)

Content types already exist — rewrite **seed scripts** (`apps/cms/scripts/*`) AND page **fallbacks/dictionaries** so the site shows real content with or without Strapi:
- `service` ×6 (real pillars) · `stat` (real numbers) · `partner` (clients + tech partners; add a `category` to distinguish if needed) · `case-study` ×~20 · `about-page` (real facts + 3 execs) · `contact-info` (082-808-7666 / +66 28087666, info@techthinkspace.com, @techthinkspace, Chiang Mai) · `site-setting` · `homepage` (hero + why-choose-us) · `page-hero` per page · `blog-post` (optional starter news).
- New product content can be hardcoded (Logix/Proxmox) or a new `product` content type — **decision: hardcode product pages now** (faster, fewer schema changes); revisit later.

## 10. Metadata / SEO fixes (`apps/web/app/layout.tsx`)

Fix JSON-LD + metadata: foundingDate `2024`, addressLocality `Chiang Mai`, real description (AI/Data/Simulation/Digital Engineering), real sameAs/contact, tagline "สร้างสรรค์อนาคต ที่มากกว่าแค่เทคโนโลยี" / "Creating a future beyond technology."

## 11. Dev preview & verification

ThinkSpace Docker stack is **not** currently running (only other projects' containers are). Because every page has fallbacks, the new **design** is visible immediately. To preview with **real Strapi content**: bring up the dev stack (`web` + `cms` + `db`), reseed via updated scripts. Verify: pages render, both locales, nav/footer links, Proxmox compliance, partner bands, no broken images, build passes.

## 12. Execution phases

1. **Design system** — tokens (tailwind config), `globals.css`, type/motion utilities → instant re-skin.
2. **Shell** — navbar (Products mega-menu), footer (real data), root metadata/JSON-LD.
3. **Assets** — copy Proxmox logos; create Dell/GCP/Logix wordmark components.
4. **Sections redesign** — Home first (hero, services grid, Logix band, partners band, client wall, case studies, stats, CTA), then About, Services(+detail), Works(+detail), Contact, Careers, News.
5. **Products pages** — `/products`, `/products/logix`, `/products/proxmox` (compliant).
6. **CMS content** — rewrite seed scripts + fallbacks/dictionaries, bilingual.
7. **Dev preview** — bring up stack, reseed, verify both locales + build.
