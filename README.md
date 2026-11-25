# Leslie Lauw portfolio

A static portfolio built with Astro and plain CSS. The website and the generated CV are driven by JSON files, so content updates do not require component changes.

Fonts (Newsreader and DM Sans) are self-hosted through `@fontsource` and used by both the website and the PDF.

## Content

- `src/data/site.json` - name, headline, intro, contact details, the "What I work on" cards and footer text. Wrap words in `*asterisks*` in `headline` or `intro` to highlight them.
- `src/data/experience.json` - work experience. Entries with the same `slug` are grouped as roles at one company. Dates use `start` / `end` as `"2024-07"` or `"2023"`; `end: null` means present. Set `earlier: true` to show a job as a one-liner under the experience list.
- `src/data/skills.json` - skill groups, used by the homepage toolbox and the CV.
- `src/data/cv.json` - CV title, profile, which companies to include (`experienceSlugs`), education, languages and interests.
- `src/content/work/*.md` - the articles. `color` (sky, sage, lilac, peach, butter) and `icon` pick the card illustration.

`npm run cv` regenerates `public/Leslie_Lauw_Resume.pdf` from these JSON files. The build fails if the CV no longer fits on one page.

## Development

```sh
npm install
npm run dev
```

Run `npm run build` for the production build. This regenerates the PDF, checks all Astro files and creates the static site in `dist`.
