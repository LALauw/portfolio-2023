# Leslie Lauw portfolio

A static portfolio built with Astro, Tailwind CSS and restrained GSAP animations. The website and generated CV are driven by JSON files, so content updates do not require component changes.

Animations use GSAP ScrollTrigger for one-time entrance and scroll reveals. They automatically switch off when the visitor prefers reduced motion.

## Content

- `src/data/site.json` - profile, contact details and social links
- `src/data/experience.json` - work experience; entries with the same `slug` are grouped as roles at one company
- `src/content/work/*.md` - the three selected articles and their page metadata
- `src/data/skills.json` - homepage toolchain
- `src/data/cv.json` - CV sections, education, languages and interests

The CV references work entries by their `slug`, keeping job content in one place. All matching roles are included, so promotions remain visible. `npm run cv` regenerates `public/Leslie_Lauw_Resume.pdf` from these JSON files.

## Development

```sh
npm install
npm run dev
```

Run `npm run build` for the production build. This regenerates the PDF, checks all Astro files and creates the static site in `dist`.
