import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";
import { formatPeriod, shortUrl } from "../src/lib/format.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const readJson = (filename) => JSON.parse(fs.readFileSync(path.join(root, "src", "data", filename), "utf8"));

const site = readJson("site.json");
const cv = readJson("cv.json");
const skills = readJson("skills.json");
const allExperience = readJson("experience.json");
const jobs = cv.experienceSlugs.flatMap((slug) => allExperience.filter((job) => job.slug === slug));
const output = path.join(root, "public", cv.filename);

// Same fonts as the website, straight from the @fontsource packages.
const font = (pkg, file) => path.join(path.dirname(require.resolve(`${pkg}/package.json`)), "files", file);
const fonts = {
  serif: font("@fontsource/newsreader", "newsreader-latin-400-normal.woff"),
  serifMedium: font("@fontsource/newsreader", "newsreader-latin-500-normal.woff"),
  sans: font("@fontsource/dm-sans", "dm-sans-latin-400-normal.woff"),
  sansMedium: font("@fontsource/dm-sans", "dm-sans-latin-500-normal.woff"),
  sansBold: font("@fontsource/dm-sans", "dm-sans-latin-600-normal.woff"),
};

const color = { ink: "#1f1e1d", text: "#2a2926", muted: "#46443f", faint: "#8a877f", ochre: "#8f6200", sun: "#f6c744", line: "#d9dde3" };
const page = { width: 595.28, height: 841.89 };
const left = 54;
const right = page.width - 54;
const labelWidth = 84;
const contentX = left + labelWidth + 16;
const contentWidth = right - contentX;
const period = (start, end) => formatPeriod(start, end, { present: "present", dash: "–" });

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 48, bottom: 40, left, right: page.width - right },
  bufferPages: true,
  info: { Title: `${site.name} - Curriculum Vitae`, Author: site.name, Subject: `${cv.title} - ${cv.specialism}` },
});
for (const [name, file] of Object.entries(fonts)) doc.registerFont(name, file);
doc.pipe(fs.createWriteStream(output));

function header() {
  const top = 50;
  doc.font("serif").fontSize(30).fillColor(color.ink).text(site.fullName, left, top, { lineBreak: false });
  doc.font("sansMedium").fontSize(9.5).fillColor(color.ochre).text(`${cv.title} — ${cv.specialism}`, left, top + 40);

  const contact = [site.location, `${site.phone}  ·  ${site.email}`, site.socials.map((social) => shortUrl(social.url)).join("  ·  ")];
  doc.font("sans").fontSize(8).fillColor("#6b6964").text(contact.join("\n"), right - 260, top + 6, { width: 260, align: "right", lineGap: 2.5 });

  const y = top + 66;
  doc.moveTo(left, y).lineTo(right, y).lineWidth(1).strokeColor(color.ink).stroke();
  doc.rect(left, y - 1.5, 46, 3).fill(color.sun);
  doc.y = y + 16;
}

function row(label, draw) {
  const y = doc.y;
  doc.font("serifMedium").fontSize(10.5).fillColor(color.ink).text(label, left, y, { width: labelWidth });
  doc.y = y + 0.5;
  draw();
  doc.y = Math.max(doc.y, y + 14) + 11;
}

function paragraph(value) {
  doc.font("sans").fontSize(8.6).fillColor(color.muted).text(value, contentX, doc.y, { width: contentWidth, lineGap: 1.6 });
}

function skillList() {
  const dtWidth = 50;
  for (const group of skills) {
    const y = doc.y;
    doc.font("sansBold").fontSize(8.6).fillColor(color.text).text(group.title, contentX, y, { width: dtWidth });
    doc.font("sans").fillColor(color.muted).text(group.items.join(", "), contentX + dtWidth + 8, y, { width: contentWidth - dtWidth - 8, lineGap: 1.4 });
    doc.y += 2;
  }
}

function item(title, when, after) {
  const y = doc.y;
  doc.font("sansBold").fontSize(8.9).fillColor(color.text).text(title, contentX, y, { width: contentWidth - 110 });
  doc.font("sans").fontSize(8.3).fillColor(color.faint).text(when, right - 110, y + 0.5, { width: 110, align: "right" });
  doc.y = y + 13;
  after();
}

function bullets(lines) {
  for (const line of lines) {
    const y = doc.y + 1.5;
    doc.circle(contentX + 2.5, y + 4.6, 1.1).fill(color.muted);
    doc.font("sans").fontSize(8.4).fillColor(color.muted).text(line, contentX + 10, y, { width: contentWidth - 10, lineGap: 1.3 });
  }
}

header();
row("Profile", () => paragraph(cv.profile));
row("Skills", skillList);
row("Experience", () => {
  jobs.forEach((job, index) => {
    if (index) doc.y += 7;
    item(`${job.company} — ${job.title}`, period(job.start, job.end), () => bullets(job.highlights));
  });
});
row("Education", () => {
  cv.education.forEach((entry, index) => {
    if (index) doc.y += 5;
    item(entry.degree, period(entry.start, entry.end), () => {
      doc.font("sans").fontSize(8.4).fillColor("#6b6964").text(entry.school, contentX, doc.y, { width: contentWidth });
    });
  });
});
row("Languages", () => paragraph(cv.languages.join(", ")));
row("Interests", () => paragraph(cv.interests.join("  ·  ")));

const footerY = page.height - 54;
doc.moveTo(left, footerY - 9).lineTo(right, footerY - 9).lineWidth(0.4).strokeColor(color.line).stroke();
doc.font("sans").fontSize(6.8).fillColor(color.faint).text(`${site.name.toUpperCase()}  —  CURRICULUM VITAE`, left, footerY, { characterSpacing: 0.6, lineBreak: false });
doc.text("lalauw.com", right - 120, footerY, { width: 120, align: "right", characterSpacing: 0.3, lineBreak: false });

const range = doc.bufferedPageRange();
if (range.count !== 1) {
  throw new Error(`CV layout overflowed to ${range.count} pages; shorten the content or adjust spacing.`);
}

doc.end();
