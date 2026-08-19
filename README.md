# Ted Klarich · Fairway Home Mortgage — website

A static, dependency-free single-page marketing site for Ted Klarich, mortgage loan
officer with Fairway Home Mortgage. Built to the quality level of the reference site
provided (Martin Mortgage Group's "The MMG Way"), with Ted's own brand idea at the
center: **TrusTED. DedicaTED. AppreciaTED.**

## Structure

A single page, `index.html`, plus shared assets.

| File | What it is |
|---|---|
| `index.html` | The whole site — hero, trust bar, the problem, the three TED pillars, communication promise, about Ted, seven specialties, six-step process, learning center, values, reviews, after-closing, contact form |
| `assets/styles.css` | All styling. Design tokens are the `:root` variables at the top |
| `assets/site.js` | Scroll reveals, mobile menu, FAQ accordion, contact form handoff |
| `assets/img/` | Photos — see the README in that folder for filenames and sizes |

Every nav item is an in-page anchor (`#standard`, `#pathways`, `#learn`, `#about`,
`#reviews`, `#contact`), and all seven specialty cards route to the contact form.

Earlier revisions had three additional pages — `the-ted-standard.html`, `buyers.html`
and `homeowners.html` — covering the six-part TED Standard, the purchase paths with a
buyer FAQ, and refinancing/downsizing with a homeowner FAQ. They were removed in favor
of a single page. Nothing is lost permanently: `git log --diff-filter=D --name-only`
finds the commit, and `git show <commit>^:buyers.html` prints any of them back out if
you later want that content folded into the homepage. The two FAQs are the most
worthwhile part to reclaim.

No build step, no framework, no dependencies. Open `index.html` in a browser, or serve
the folder (`python3 -m http.server`) and visit `localhost:8000`.

## The brand idea

Ted's intake said it best: *"TrusTED, DedicaTED, AppreciaTED. Lots of words that end in
TED."* That's the organizing idea of the whole site, the same way "The Confidence Chain"
organizes the reference site. It shows up as:

- The homepage headline, set in three lines with `TED` in Fairway green.
- Three pillars in the TED Standard section, each with the client's own words underneath.
- The `.ted` CSS class — write `Trus<span class="ted">TED</span>` anywhere and the
  suffix picks up the accent color automatically (it flips to bright green on dark
  backgrounds).

The voice throughout is friendly, educational, empathetic and inspirational, per the
brand voice selections, and the differentiator ("I don't want a partner that does the
bare minimum like it's simply a transaction") is stated directly in the trust bar and
carried through the Dedicated pillar and the values section.

---

## Status of the fill-ins

**Now live on the site (supplied and in place):**

- Phone **(206) 510-0744** everywhere — nav, mobile menu, contact block, footer, final CTA, and the form's fallback message. *Note: 206-401-1878 was supplied at one point and later reverted to this number. Confirm which line Ted actually wants published before pointing ads at this page.*
- Email **ted.klarich@fairwaymc.com** — contact block, footers, and the form's `data-email`.
- **NMLS #1897317** — footer legal and Ted's About block.
- **4.99 average across 593 reviews** — hero badge, trust bar, About stats, reviews headline, and the score block. Also in the homepage meta description and Open Graph tags.
- **Four real client reviews** (Lisa/Tacoma, Alex/Kirkland, Deborah/Kirkland, Kaitlin/Mc Dade) published verbatim in a 2×2 grid, with a standard variability disclaimer beneath.
- **Schema.org JSON-LD** on the homepage — name, job title, phone, email, NMLS identifier, employer, specialties. (Aggregate rating markup is deliberately omitted: Google doesn't honor self-serving review markup for a business's own site, and it can draw a manual action.)

**Still needed before launch:**

- [ ] **Years in mortgage lending** — the last bracketed stat, in the trust bar on `index.html`. Fill it in or delete that one stat block (the grid reflows cleanly at five).
- [ ] **Branch/office address** — contact section of `index.html`.
- [ ] **"Read all 593 reviews" link** — the button in the reviews summary is an `href="#"` stub. Point it at Ted's Experience.com / Zillow / Google profile.
- [ ] **Fairway's secure online application URL** — the "Apply online" link in the contact block is a `#` stub.
- [ ] **Footer legal block** — Fairway corporate NMLS ID, branch address, licensed states, state-specific disclosures, and complaint contact. Ted's individual NMLS is filled in; the rest is still a bracketed placeholder. **The whole site's marketing copy and the footer must go through Fairway compliance before publication.**
- [ ] **Licensed states.** Washington is named as the primary market in page titles, meta descriptions, hero kicker, About copy, footers and the JSON-LD `areaServed`. The footer legal block still needs the full list of states Ted is actually licensed in (the reviews include a Texas client), supplied by Fairway compliance.
- [ ] **Official Fairway logo lockup** — the "Powered by Fairway Home Mortgage" badges are set in type. `.fairway-badge` already supports an `<img>`.
- [ ] **Photos** — see `assets/img/README.md` for filenames and sizes. Every slot renders as a styled dark frame with a caption describing what belongs there, so nothing looks broken while you wait on a shoot. Replace the `<div class="photo-label">…</div>` inside each `.photo-frame` with an `<img>`:

```html
<div class="photo-frame">
  <img src="assets/img/ted-hero.jpg" alt="Ted Klarich, mortgage loan officer">
</div>
```

| Slot | Where | Crop | Status |
|---|---|---|---|
| Hero portrait | top of the page | 5:7 vertical | **in place** (`ted-hero.jpg`, 343×480 — a larger original would render sharper) |
| About Ted | About section | 3:4 vertical | placeholder frame |
| Social share image | `og:image` meta tag | 1.91:1 **landscape**, 1200×630 | not set |

- [ ] **Learning center** — six cards on `index.html` marked "Coming soon" pointing at the contact section. Point each `href` at the real article or video as it's published, and update the duration. (Ted rated his content system a 2 out of 5, so this section is built to fill in over time rather than launch complete.)

---

## The contact form

The form is **not connected to a backend yet**. Until it is, `assets/site.js` intercepts
the submit, packages every field into a pre-filled email and opens the visitor's mail
client — so no lead is silently dropped, but the experience isn't great and it won't work
for everyone.

Pick one of these before launch and replace the handler in `site.js`:

1. **Fairway's own lead capture / CRM webhook** — best option if one exists, since leads
   land where Ted already works. Requires the endpoint URL and field names.
2. **A form service** (Formspree, Basin, Netlify Forms) — fastest to wire up; point the
   `<form>` at the endpoint and delete the JS handler.
3. **A small serverless function** (Netlify/Vercel/Cloudflare) that emails Ted and posts
   to the CRM — most control, most setup.

Whichever you choose, add spam protection (honeypot field or captcha) and confirm the
consent language under the form satisfies Fairway's requirements for contacting leads.
Ted rated his lead follow-up a 3 out of 5 — routing this form straight into a CRM with an
automatic first response is probably the single highest-leverage improvement here.

## Deployment

Any static host works — GitHub Pages, Netlify, Vercel, Cloudflare Pages, or dropping the
folder on existing hosting. There's nothing to build.

For GitHub Pages: Settings → Pages → deploy from the branch root. Then update the
`<link rel="canonical">` on `index.html` (currently `https://www.tedklarich.com/`) and the
Open Graph tags to the real domain, and add an OG image once a landscape photo exists.

## Notes on the build

- **Reading level** — the body copy is written at roughly a 3rd-grade level
  (Flesch-Kincaid 2.7, reading ease 91, average sentence 8.7 words). Short sentences,
  common words, no em-dashes. Keep new copy to that standard: if a sentence runs past
  about 12 words or needs a three-syllable word, split it or swap the word. The two
  exceptions are the footer legal block, which is required compliance language and must
  stay verbatim, and the client reviews, which are quoted exactly as written.
- **Typography** — Newsreader (display) and Figtree (body), loaded from Google Fonts,
  with system fallbacks. Deliberately different from the reference site's fonts so this
  reads as Ted's site rather than a copy of Michael Martin's.
- **Color** — Fairway green kept as the primary, deepened slightly toward evergreen, over
  a warm ivory and a deep navy for the dark sections. Tokens live in `:root`.
- **Accessibility** — skip link, visible focus rings, semantic landmarks, `aria-expanded`
  on the menu and FAQ toggles, and a `prefers-reduced-motion` block that disables every
  animation and hover transform.
- **Verified** — the page parses as well-formed HTML, every anchor resolves, and there's
  no horizontal overflow at 1440px, 390px or 360px wide.
