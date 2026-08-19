# Photos

Drop image files here using these exact names and the site picks them up with a
one-line edit on the matching page (each `.photo-frame` has a commented `<img>`
tag showing exactly what to paste).

| Filename | Used on | Crop | Suggested size |
|---|---|---|---|
| `ted-hero.jpg` | `index.html` hero | 4:5 vertical | 1200 × 1500 |
| `ted-about.jpg` | `index.html` About Ted | 3:4 vertical | 1200 × 1600 |
| `ted-standard.jpg` | `the-ted-standard.html` hero | 4:5 vertical | 1200 × 1500 |
| `buyers.jpg` | `buyers.html` hero | 4:5 vertical | 1200 × 1500 |
| `homeowners.jpg` | `homeowners.html` hero | 4:5 vertical | 1200 × 1500 |
| `og-image.jpg` | social share preview | 1.91:1 landscape | 1200 × 630 |

To use one, replace the placeholder label inside the frame:

```html
<!-- before -->
<div class="photo-frame">
  <div class="photo-label"><strong>Ted Klarich</strong>Hero portrait goes here…</div>
</div>

<!-- after -->
<div class="photo-frame">
  <img src="assets/img/ted-hero.jpg" alt="Ted Klarich, mortgage loan officer in Washington">
</div>
```

The frame handles the cropping (`object-fit: cover`), so an image that isn't
exactly the listed ratio still fills the space without distortion — it just gets
cropped from the edges, so keep faces away from the borders.

**Before committing photos:** export at roughly 1200px on the long edge and save
as JPEG at 75–85% quality. A 5MB camera original will make the page slow; the
same photo at ~200KB looks identical on screen. Always write a real `alt`
description rather than leaving it empty.
