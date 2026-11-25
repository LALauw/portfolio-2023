// Small helpers shared by the Astro pages and scripts/generate-cv.mjs.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2024-07" -> "Jul 2024", "2023" -> "2023" */
export function formatDate(value) {
  const [year, month] = String(value).split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

/** Period of a single role, e.g. "Jul 2024 — now" or "2023". */
export function formatPeriod(start, end, { present = "now", dash = "—" } = {}) {
  if (end && start === end) return formatDate(start);
  return `${formatDate(start)} ${dash} ${end ? formatDate(end) : present}`;
}

/** Years only, across several roles: "2023 — now", "2020 — 2021". */
export function formatYears(roles, { present = "now", dash = "—" } = {}) {
  const startYear = Math.min(...roles.map((role) => Number(String(role.start).slice(0, 4))));
  const ongoing = roles.some((role) => !role.end);
  const endYear = Math.max(...roles.map((role) => Number(String(role.end ?? role.start).slice(0, 4))));
  if (!ongoing && startYear === endYear) return String(startYear);
  return `${startYear} ${dash} ${ongoing ? present : endYear}`;
}

/**
 * Roles with the same slug become one company entry, in file order.
 * @template {{ slug: string, company: string, location: string, link: string, earlier?: boolean }} T
 * @param {T[]} experience
 * @returns {{ slug: string, company: string, location: string, link: string, earlier: boolean, roles: T[] }[]}
 */
export function groupBySlug(experience) {
  /** @type {{ slug: string, company: string, location: string, link: string, earlier: boolean, roles: T[] }[]} */
  const groups = [];
  for (const role of experience) {
    const group = groups.find((item) => item.slug === role.slug);
    if (group) group.roles.push(role);
    else groups.push({ slug: role.slug, company: role.company, location: role.location, link: role.link, earlier: Boolean(role.earlier), roles: [role] });
  }
  return groups;
}

/** "The Hague, The Netherlands" -> "The Hague" */
export const city = (location) => location.split(",")[0].trim();

/** "https://www.linkedin.com/in/leslielauw/" -> "linkedin.com/in/leslielauw" */
export const shortUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

/** Escapes text and turns *words* into <em>words</em> (or another tag/class). */
export function emphasis(text, open = "<em>", close = "</em>") {
  return escapeHtml(text).replace(/\*(.+?)\*/g, `${open}$1${close}`);
}

/** Removes the *emphasis* markers for plain-text use (meta tags, PDF). */
export const plain = (text) => text.replace(/\*(.+?)\*/g, "$1");
