import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (filename) => JSON.parse(fs.readFileSync(path.join(root, "src", "data", filename), "utf8"));
const site = readJson("site.json");
const cv = readJson("cv.json");
const allExperience = readJson("experience.json");
const experience = cv.experienceSlugs.flatMap((slug) => allExperience.filter((job) => job.slug === slug));
const output = path.join(root, "public", cv.filename);

const teal = "#15816f";
const text = "#292d2b";
const muted = "#565c59";
const faint = "#777d7a";
const pageWidth = 595.28;
const left = 52;
const right = 52;
const contentWidth = pageWidth - left - right;

const doc = new PDFDocument({ size: "A4", margins: { top: 44, bottom: 42, left, right }, bufferPages: true, info: { Title: `${site.name} - Curriculum Vitae`, Author: site.name, Subject: `${site.role} - ${site.specialism}` } });
doc.pipe(fs.createWriteStream(output));

function header() {
  doc.fillColor(text).font("Helvetica").fontSize(28).text("Leslie A. ", left, 45, { continued: true });
  doc.font("Helvetica-Bold").text("Lauw");
  doc.moveDown(.25).fillColor(teal).font("Helvetica-Bold").fontSize(8.5).text(`${site.role.toUpperCase()}  -  ${site.specialism.toUpperCase()}`, { characterSpacing: .65 });
  const contact = `${site.location}\n${site.phone}  -  ${site.email}\ngithub.com/lalauw  -  linkedin.com/in/leslielauw`;
  doc.fillColor(muted).font("Helvetica").fontSize(7.5).text(contact, 315, 45, { width: 228, align: "right", lineGap: 2 });
  const y = 96;
  doc.moveTo(left, y).lineTo(pageWidth - right, y).lineWidth(1.5).strokeColor(text).stroke();
  doc.y = y + 13;
}

function section(title) {
  const y = doc.y;
  doc.roundedRect(left, y + 1, 3.5, 14, 1.5).fill(teal);
  doc.fillColor(text).font("Helvetica-Bold").fontSize(13).text(title, left + 11, y, { continued: false });
  const titleWidth = doc.widthOfString(title);
  doc.moveTo(left + 18 + titleWidth, y + 8).lineTo(pageWidth - right, y + 8).lineWidth(.6).strokeColor("#747c79").stroke();
  doc.y = y + 20;
}

function paragraph(value) {
  doc.fillColor(muted).font("Helvetica").fontSize(8.1).text(value, left, doc.y, { width: contentWidth, lineGap: 1 });
}

function skills() {
  const labelWidth = 76;
  for (const [category, items] of Object.entries(cv.skills)) {
    const y = doc.y;
    doc.fillColor(text).font("Helvetica-Bold").fontSize(8).text(category, left, y, { width: labelWidth, align: "right" });
    doc.fillColor(muted).font("Helvetica").text(items.join(", "), left + labelWidth + 12, y, { width: contentWidth - labelWidth - 12 });
    doc.y = Math.max(doc.y, y + 11);
  }
}

function job(item) {
  const y = doc.y;
  doc.fillColor(text).font("Helvetica-Bold").fontSize(9).text(item.company, left, y, { width: 260 });
  doc.fillColor(teal).font("Helvetica-Oblique").fontSize(7.4).text(item.location, 320, y, { width: pageWidth - right - 320, align: "right" });
  doc.fillColor(muted).font("Helvetica").fontSize(7).text(item.title.toUpperCase(), left, y + 12, { width: 290, characterSpacing: .25 });
  doc.fillColor(faint).font("Helvetica-Oblique").text(item.period, 340, y + 12, { width: pageWidth - right - 340, align: "right", characterSpacing: 0 });
  doc.y = y + 23;
  for (const highlight of item.highlights) {
    doc.fillColor(text).font("Helvetica").fontSize(7.5).text("-", left + 2, doc.y, { continued: false });
    doc.fillColor(muted).text(highlight, left + 13, doc.y - 9, { width: contentWidth - 13, lineGap: .3 });
  }
  doc.moveDown(.3);
}

function education(item) {
  const y = doc.y;
  doc.fillColor(text).font("Helvetica-Bold").fontSize(9).text(item.school, left, y, { width: 330 });
  doc.fillColor(teal).font("Helvetica-Oblique").fontSize(7.4).text(item.location, 370, y, { width: pageWidth - right - 370, align: "right" });
  doc.fillColor(muted).font("Helvetica").fontSize(7.8).text(item.degree, left, y + 13);
  doc.fillColor(faint).font("Helvetica-Oblique").fontSize(7.2).text(item.period, 370, y + 13, { width: pageWidth - right - 370, align: "right" });
  doc.y = y + 31;
}

header();
section("Profile");
paragraph(cv.profile);
doc.moveDown(.9);
section("Technical skills");
skills();
doc.moveDown(.65);
section("Work experience");
experience.forEach(job);
doc.moveDown(.15);
section("Education");
cv.education.forEach(education);
section("Languages");
paragraph(cv.languages.join("  -  "));
doc.moveDown(.55);
section("Interests");
paragraph(cv.interests.join("  -  "));

const range = doc.bufferedPageRange();
if (range.count !== 1) {
  throw new Error(`CV layout overflowed to ${range.count} pages; adjust spacing before publishing.`);
}
for (let index = range.start; index < range.start + range.count; index += 1) {
  doc.switchToPage(index);
  const footerY = 786;
  doc.moveTo(left, footerY - 9).lineTo(pageWidth - right, footerY - 9).lineWidth(.4).strokeColor("#d2d5d3").stroke();
  doc.fillColor("#878c89").font("Helvetica").fontSize(6.5).text("LESLIE LAUW  -  CURRICULUM VITAE", left, footerY, { characterSpacing: .45, lineBreak: false });
  doc.text(String(index + 1), pageWidth - right - 20, footerY, { width: 20, align: "right", characterSpacing: 0, lineBreak: false });
}

doc.end();
