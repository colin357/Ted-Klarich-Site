# Ted Klarich · Fairway Home Mortgage — website

A static, dependency-free marketing site for Ted Klarich, mortgage loan officer with
Fairway Home Mortgage. Built to match the structure and quality level of the reference
site provided (Martin Mortgage Group's "The MMG Way"), with Ted's own brand idea at the
center: **TrusTED. DedicaTED. AppreciaTED.**

## Pages

| File | What it is |
|---|---|
| `index.html` | Homepage — hero, trust bar, the three TED pillars, communication promise, about Ted, seven specialties, six-step process, learning center, values, reviews, after-closing, contact form |
| `the-ted-standard.html` | The brand philosophy page — the six-part TED Standard (TrusTED, EducaTED, DedicaTED, CommunicaTED, AnticipaTED, AppreciaTED), expectations for clients and agents, what happens when a deal goes sideways |
| `buyers.html` | Purchase paths — first-time buyers, VA, FHA, investment properties, relocation, complex files — plus buyer FAQ |
| `homeowners.html` | Refinancing (four reasons), downsizing, the annual review, homeowner FAQ |
| `assets/styles.css` | All styling. Design tokens are the `:root` variables at the top |
| `assets/site.js` | Scroll reveals, mobile menu, FAQ accordion, contact form handoff |

No build step, no framework, no dependencies. Open `index.html` in a browser, or serve
the folder (`python3 -m http.server`) and visit `localhost:8000`.

## The brand idea

Ted's intake said it best: *"TrusTED, DedicaTED, AppreciaTED. Lots of words that end in
TED."* That's the organizing idea of the whole site, the same way "The Confidence Chain"
organizes the reference site. It shows up as:

- The homepage headline, set in three lines with `TED` in Fairway green.
- Three pillars on the homepage, expanded to six on `the-ted-standard.html`.
- The `.ted` CSS class — write `Trus<span class="ted">TED</span>` anywhere and the
  suffix picks up the accent color automatically (it flips to bright green on dark
  backgrounds).

The voice throughout is friendly, educational, empathetic and inspirational, per the
brand voice selections, and the differentiator ("I don't want a partner that does the
bare minimum like it's simply a transaction") is stated directly in the trust bar and
carried through the Dedicated pillar and the values section.

---

## ⚠️ Before this goes live — required fill-ins

Everything below is a deliberate placeholder. I did not invent numbers, reviews, or
licensing details for a regulated business. Search the codebase for `[` to find them all.

**Compliance and identity**
- [ ] `NMLS #[ID]` — Ted's individual NMLS number (appears in the footer of all four pages and in the About section on `index.html`).
- [ ] Footer legal block — Fairway corporate NMLS ID, branch address, licensed states, state-specific disclosures, and complaint contact. The block currently carries a bracketed placeholder plus standard pre-approval language. **The whole footer must be reviewed and approved by Fairway compliance before publication**, along with all marketing copy on the site.
- [ ] Confirm Ted's exact Fairway email. The site currently uses `ted.klarich@fairwaymc.com` as an assumed address — it appears in the footer, the contact block, and as the contact form's `data-email`.
- [ ] Branch/office address in the contact section of `index.html`.
- [ ] Fairway's secure online application URL — the "Apply online" link in the contact block is a `#` stub.
- [ ] Replace the text "Powered by Fairway Home Mortgage" badges with the official approved logo lockup (`.fairway-badge` supports an `<img>` — see the commented markup).

**Numbers and proof**
- [ ] Trust bar stats on `index.html` — `[##]` years, `[###]` families, `[#.#★]` review score. Every figure published must be documentable. Delete any stat that can't be verified rather than estimating it.
- [ ] Reviews section on `index.html` — three placeholder cards. Paste real client reviews verbatim, keep the source (Google / Zillow / Experience.com) with each, and confirm client permission and Fairway's advertising review requirements before publishing.
- [ ] Licensed states. The copy deliberately avoids claiming any geography; the phone number's 206 area code suggests the Seattle area, but nothing on the site states a service area yet. Add it once the licensed-state list is confirmed.

**Photos** — every photo slot renders as a styled dark frame with a caption describing
what belongs there, so nothing looks broken while you wait on a shoot. Replace the
`<div class="photo-label">…</div>` inside each `.photo-frame` with an `<img>`:

```html
<div class="photo-frame">
  <img src="assets/img/ted-hero.jpg" alt="Ted Klarich, mortgage loan officer">
</div>
```

| Slot | Page | Crop |
|---|---|---|
| Hero portrait | `index.html` | 4:5 vertical, ~1200×1500 |
| About Ted | `index.html` | 3:4 vertical |
| Working portrait | `the-ted-standard.html` | 4:5 vertical |
| Buyers | `buyers.html` | 4:5 vertical |
| Homeowners | `homeowners.html` | 4:5 vertical |

**Content**
- [ ] Learning center on `index.html` — six cards marked "Coming soon" pointing at the
  contact section. Point each `href` at the real article or video as it's published, and
  update the duration. (Ted rated his content system a 2 out of 5, so this section is
  built to be filled in over time rather than launched complete.)

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
Open Graph tags to the real domain, and add an OG image once photos exist.

## Notes on the build

- **Typography** — Newsreader (display) and Figtree (body), loaded from Google Fonts,
  with system fallbacks. Deliberately different from the reference site's fonts so this
  reads as Ted's site rather than a copy of Michael Martin's.
- **Color** — Fairway green kept as the primary, deepened slightly toward evergreen, over
  a warm ivory and a deep navy for the dark sections. Tokens live in `:root`.
- **Accessibility** — skip link, visible focus rings, semantic landmarks, `aria-expanded`
  on the menu and FAQ toggles, and a `prefers-reduced-motion` block that disables every
  animation and hover transform.
- **Verified** — all four pages parse as well-formed HTML, every internal link and anchor
  resolves, and there's no horizontal overflow at 1440px, 390px or 360px wide.
