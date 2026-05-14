import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "campaign-assets");
const STOCK = path.join(OUT, "stock");

const COLORS = {
  navy: "#061846",
  ink: "#020b24",
  red: "#e50920",
  blue: "#0a58a8",
  cyan: "#7ee7ff",
  gold: "#d9a43a",
  cream: "#fff8ed",
  white: "#ffffff",
};

const palettes = [
  ["#061846", "#e50920", "#f5fbff", "#d9a43a"],
  ["#021225", "#0a58a8", "#fff8ed", "#e50920"],
  ["#10203f", "#d9a43a", "#eef7ff", "#e50920"],
  ["#081d36", "#22a7f0", "#ffffff", "#ff4b5c"],
  ["#101024", "#e50920", "#f7f4ff", "#7ee7ff"],
  ["#09203f", "#2fbf71", "#f3fbf7", "#e50920"],
];

const services = [
  ["Assignments", "Briefs, plans, drafts"],
  ["Reports", "Structure and formatting"],
  ["Thesis", "Research direction"],
  ["Dissertations", "Methodology support"],
  ["Presentations", "Slides and notes"],
  ["Research", "Sources and referencing"],
  ["Website Projects", "Frontend and docs"],
  ["Editing", "Proofread and polish"],
  ["Referencing", "APA, Harvard, IEEE"],
  ["Coding Concepts", "Logic and debugging"],
];

const colleges = [
  "Islington College",
  "Softwarica College",
  "The British College",
  "King's College",
  "ISMT College",
  "Herald College",
  "NAMI College",
  "Westminster College",
  "PCPS",
  "Ace International",
];

const topics = [
  "Assignment Support",
  "Dissertation Guidance",
  "Research Paper Help",
  "Website Project Support",
  "Thesis Review",
  "Academic Editing",
  "Presentation Design",
  "Referencing Support",
  "Business Report Help",
  "IT Coursework Support",
  "Draft Feedback",
  "Study Planning",
];

const slogans = [
  "Your Success, Our Priority.",
  "Original Work. Clear Guidance. Trusted Support.",
  "Quality Assignments. On Time. Every Time.",
  "Dream. Learn. Achieve.",
  "Academic Support for Students in Nepal.",
  "Plan Better. Write Clearer. Submit Stronger.",
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" };
    return map[char];
  });
}

function files(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => path.join(dir, name));
}

const stock = {
  images: files(path.join(STOCK, "images")),
  banners: files(path.join(STOCK, "banners")),
  portraits: files(path.join(STOCK, "portraits")),
};

function pick(pool, index, offset = 0) {
  if (!pool.length) return null;
  return pool[(index * 7 + offset) % pool.length];
}

function dataUri(filePath) {
  if (!filePath) return null;
  const ext = path.extname(filePath).toLowerCase();
  const mime = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
  return `data:${mime};base64,${fs.readFileSync(filePath).toString("base64")}`;
}

function image(w, h, filePath, opts = {}) {
  const href = dataUri(filePath);
  if (!href) return fallbackMountains(w, h, opts.palette || palettes[0]);
  const { x = 0, y = 0, width = w, height = h, opacity = 1, clip = "", preserve = "xMidYMid slice" } = opts;
  return `<image href="${href}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="${preserve}" opacity="${opacity}" ${clip}/>`;
}

function logo(x, y, scale = 1) {
  return `
  <g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M88 0 176 40 88 80 0 40Z" fill="${COLORS.red}"/>
    <path d="M42 42 Q88 22 134 42 L134 61 Q88 45 42 61Z" fill="#fff"/>
    <path d="M20 94 Q88 60 156 94 L156 145 Q88 114 20 145Z" fill="${COLORS.blue}"/>
    <path d="M88 76 L88 148" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
    <circle cx="88" cy="103" r="14" fill="#fff"/>
    <path d="M88 118 L62 150 M88 118 L114 150" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
  </g>`;
}

function flag(x, y, scale = 1) {
  return `
  <g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M0 0 L170 59 L42 89 L170 164 L0 138 Z" fill="${COLORS.red}" stroke="${COLORS.navy}" stroke-width="9"/>
    <circle cx="52" cy="53" r="19" fill="#fff"/>
    <path d="M53 109 L65 135 L39 120 L68 120 L42 135 Z" fill="#fff"/>
  </g>`;
}

function fallbackMountains(w, h, palette) {
  return `
  <rect width="${w}" height="${h}" fill="${palette[2]}"/>
  <path d="M0 ${h * 0.62} L${w * 0.28} ${h * 0.24} L${w * 0.56} ${h * 0.62}Z" fill="#cce4fb"/>
  <path d="M${w * 0.32} ${h * 0.68} L${w * 0.67} ${h * 0.18} L${w} ${h * 0.68}Z" fill="#8fc4ef"/>
  <path d="M${w * 0.67} ${h * 0.18} L${w * 0.58} ${h * 0.34} L${w * 0.69} ${h * 0.30} L${w * 0.77} ${h * 0.45}Z" fill="#fff7ed"/>
  `;
}

function defs(id, palette) {
  return `
  <defs>
    <linearGradient id="bg-${id}" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${palette[2]}"/>
      <stop offset=".58" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#dcefff"/>
    </linearGradient>
    <linearGradient id="dark-${id}" x1="0" x2="1">
      <stop offset="0" stop-color="${palette[0]}"/>
      <stop offset="1" stop-color="${COLORS.blue}"/>
    </linearGradient>
    <linearGradient id="shade-${id}" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#000000" stop-opacity=".02"/>
      <stop offset="1" stop-color="#000000" stop-opacity=".62"/>
    </linearGradient>
    <clipPath id="diag-${id}"><path d="M0 0 H1080 V920 L0 760Z"/></clipPath>
    <clipPath id="bannerDiag-${id}"><path d="M780 0 H1942 V809 H620Z"/></clipPath>
    <clipPath id="circle-${id}"><circle cx="820" cy="440" r="300"/></clipPath>
    <filter id="shadow-${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#061846" flood-opacity=".22"/>
    </filter>
  </defs>`;
}

function brandBlock(x, y, size = "large") {
  const a = size === "small" ? 48 : 68;
  const b = size === "small" ? 52 : 72;
  return `
  ${logo(x, y - 72, size === "small" ? 0.62 : 0.82)}
  <text x="${x + (size === "small" ? 132 : 184)}" y="${y}" font-size="${a}" font-weight="950" fill="${COLORS.navy}" font-family="Arial Black, Arial">ASSIGNMENT</text>
  <text x="${x + (size === "small" ? 132 : 184)}" y="${y + b}" font-size="${b}" font-weight="950" fill="${COLORS.red}" font-family="Arial Black, Arial">NEPAL</text>`;
}

function serviceChips(x, y, count, palette, compact = false) {
  const width = compact ? 132 : 180;
  const gap = compact ? 12 : 16;
  const shortLabels = {
    Assignments: "Assign.",
    Reports: "Reports",
    Thesis: "Thesis",
    Dissertations: "Diss.",
    Presentations: "Slides",
    Research: "Research",
    "Website Projects": "Web",
    Editing: "Editing",
    Referencing: "Refs",
    "Coding Concepts": "Code",
  };
  return services
    .slice(0, count)
    .map(([title], i) => {
      const px = x + i * (width + gap);
      const label = compact ? shortLabels[title] || title : title;
      return `
      <g transform="translate(${px} ${y})">
        <rect width="${width}" height="${compact ? 74 : 94}" rx="14" fill="#fff" opacity=".94" filter="url(#shadow-global)"/>
        <circle cx="${compact ? 28 : 42}" cy="${compact ? 36 : 46}" r="${compact ? 18 : 23}" fill="${i % 2 ? palette[0] : palette[1]}"/>
        <text x="${compact ? 28 : 42}" y="${compact ? 43 : 54}" text-anchor="middle" font-size="${compact ? 18 : 23}" font-weight="900" fill="#fff">${i + 1}</text>
        <text x="${compact ? 58 : 92}" y="${compact ? 43 : 52}" font-size="${compact ? 14 : 19}" font-weight="900" fill="${palette[0]}" text-anchor="${compact ? "start" : "middle"}">${esc(label)}</text>
      </g>`;
    })
    .join("");
}

function collegeStrip(x, y, count, width, palette) {
  const gap = 10;
  const cardW = (width - gap * (count - 1)) / count;
  return colleges
    .slice(0, count)
    .map((name, i) => {
      const initials = name
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 3);
      return `
      <g transform="translate(${x + i * (cardW + gap)} ${y})">
        <rect width="${cardW}" height="82" rx="12" fill="#fff" opacity=".96"/>
        <circle cx="${cardW / 2}" cy="26" r="19" fill="${i % 2 ? palette[3] : palette[1]}"/>
        <text x="${cardW / 2}" y="33" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">${esc(initials)}</text>
        <text x="${cardW / 2}" y="62" text-anchor="middle" font-size="13" font-weight="800" fill="${palette[0]}">${esc(name.split(" ").slice(0, 2).join(" "))}</text>
      </g>`;
    })
    .join("");
}

function trustList(x, y, color = "#fff", gap = 38) {
  return ["100% Original Work", "Plagiarism Free", "On-Time Delivery", "Confidential Support"]
    .map((line, i) => `<text x="${x}" y="${y + i * gap}" font-size="22" font-weight="850" fill="${color}">[OK] ${esc(line)}</text>`)
    .join("");
}

function posterSvg(index) {
  const id = `poster-${index}`;
  const palette = palettes[index % palettes.length];
  const layout = index % 8;
  const topic = topics[index % topics.length];
  const slogan = slogans[(index * 2) % slogans.length];
  const service = services[index % services.length];
  const bg = pick(stock.images, index) || pick(stock.banners, index);
  const bg2 = pick(stock.images, index, 3) || bg;
  const portrait = pick(stock.portraits, index, 5) || bg2;
  const common = `${defs(id, palette)}<filter id="shadow-global" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#061846" flood-opacity=".20"/></filter>`;

  const layouts = [
    () => `
      ${image(1080, 1350, bg, { palette })}
      <rect width="1080" height="1350" fill="url(#shade-${id})"/>
      ${flag(825, 78, 0.82)}
      ${brandBlock(70, 160)}
      <text x="76" y="492" font-size="72" font-weight="950" fill="#fff" font-family="Arial Black, Arial">${esc(topic)}</text>
      <text x="80" y="552" font-size="31" font-weight="750" fill="#f0f7ff">${esc(service[1])}</text>
      <rect x="76" y="604" width="730" height="70" rx="16" fill="${palette[1]}"/>
      <text x="108" y="649" font-size="28" font-weight="950" fill="#fff">GET GENUINE ACADEMIC SUPPORT</text>
      ${serviceChips(70, 760, 3, palette)}
      <rect x="0" y="1080" width="1080" height="270" fill="url(#dark-${id})"/>
      <text x="70" y="1148" font-size="30" font-weight="950" fill="#fff">${esc(slogan)}</text>
      ${trustList(70, 1204)}
      ${collegeStrip(505, 1182, 4, 500, palette)}
    `,
    () => `
      <rect width="1080" height="1350" fill="url(#bg-${id})"/>
      <rect x="0" y="0" width="450" height="1350" fill="url(#dark-${id})"/>
      ${image(1080, 1350, bg, { x: 450, y: 0, width: 630, height: 1350, opacity: 0.88 })}
      <rect x="450" y="0" width="630" height="1350" fill="#fff" opacity=".20"/>
      ${logo(72, 78, 0.82)}
      <text x="72" y="315" font-size="62" font-weight="950" fill="#fff" font-family="Arial Black, Arial">ASSIGNMENT</text>
      <text x="72" y="385" font-size="68" font-weight="950" fill="${palette[1]}" font-family="Arial Black, Arial">NEPAL</text>
      <text x="72" y="500" font-size="46" font-weight="950" fill="#fff">${esc(topic)}</text>
      <text x="72" y="564" font-size="24" font-weight="700" fill="#dcecff">${esc(slogan)}</text>
      <rect x="520" y="790" width="500" height="350" rx="34" fill="#fff" opacity=".94" filter="url(#shadow-${id})"/>
      <text x="565" y="870" font-size="36" font-weight="950" fill="${palette[0]}">Support Includes</text>
      ${trustList(565, 936, palette[0], 44)}
      <text x="72" y="1230" font-size="28" font-weight="950" fill="#fff">Contact Assignment Nepal Today</text>
      ${flag(778, 88, 0.74)}
    `,
    () => `
      <rect width="1080" height="1350" fill="#fff"/>
      ${image(1080, 1350, bg, { clip: `clip-path="url(#diag-${id})"`, palette })}
      <rect width="1080" height="920" fill="${palette[0]}" opacity=".58" clip-path="url(#diag-${id})"/>
      ${brandBlock(62, 156, "small")}
      <rect x="70" y="410" width="940" height="230" rx="26" fill="#fff" opacity=".94" filter="url(#shadow-${id})"/>
      <text x="110" y="494" font-size="54" font-weight="950" fill="${palette[0]}">${esc(topic)}</text>
      <text x="110" y="552" font-size="26" font-weight="750" fill="#37476e">${esc(service[1])}</text>
      <text x="110" y="600" font-size="24" font-weight="750" fill="#37476e">Original guidance, formatting, editing, and research support.</text>
      <path d="M0 812 L1080 682 L1080 790 L0 925Z" fill="${palette[1]}"/>
      <text x="70" y="860" font-size="30" font-weight="950" fill="#fff">QUALITY ASSIGNMENTS - ON TIME - EVERY TIME</text>
      ${serviceChips(70, 980, 5, palette, true)}
      ${collegeStrip(70, 1190, 5, 940, palette)}
    `,
    () => `
      <rect width="1080" height="1350" fill="url(#bg-${id})"/>
      ${brandBlock(62, 146, "small")}
      <rect x="680" y="58" width="330" height="190" rx="28" fill="${palette[0]}"/>
      ${flag(742, 80, 0.62)}
      <rect x="70" y="318" width="450" height="480" rx="30" fill="#fff" filter="url(#shadow-${id})"/>
      ${image(1080, 1350, bg, { x: 92, y: 340, width: 406, height: 436, opacity: 1 })}
      <rect x="560" y="318" width="450" height="260" rx="30" fill="#fff" filter="url(#shadow-${id})"/>
      ${image(1080, 1350, bg2, { x: 582, y: 340, width: 406, height: 216, opacity: 1 })}
      <rect x="560" y="618" width="450" height="260" rx="30" fill="#fff" filter="url(#shadow-${id})"/>
      ${image(1080, 1350, portrait, { x: 582, y: 640, width: 406, height: 216, opacity: 1 })}
      <text x="70" y="930" font-size="62" font-weight="950" fill="${palette[0]}" font-family="Arial Black, Arial">${esc(topic)}</text>
      <text x="72" y="986" font-size="28" font-weight="750" fill="#32456e">${esc(slogan)}</text>
      <rect x="70" y="1050" width="940" height="96" rx="18" fill="${palette[1]}"/>
      <text x="540" y="1110" text-anchor="middle" font-size="30" font-weight="950" fill="#fff">ASSIGNMENTS - THESIS - RESEARCH - WEBSITES</text>
      ${collegeStrip(70, 1200, 5, 940, palette)}
    `,
    () => `
      <rect width="1080" height="1350" fill="${palette[0]}"/>
      <circle cx="900" cy="150" r="220" fill="${palette[1]}" opacity=".22"/>
      <circle cx="90" cy="1110" r="280" fill="${COLORS.blue}" opacity=".18"/>
      ${image(1080, 1350, bg, { x: 110, y: 305, width: 860, height: 500, opacity: 0.88 })}
      <rect x="110" y="305" width="860" height="500" rx="38" fill="none" stroke="${palette[3]}" stroke-width="6"/>
      ${brandBlock(70, 146, "small")}
      <text x="90" y="900" font-size="60" font-weight="950" fill="#fff" font-family="Arial Black, Arial">${esc(topic)}</text>
      <text x="92" y="960" font-size="27" font-weight="750" fill="#dcecff">${esc(service[1])}</text>
      ${trustList(96, 1035)}
      <text x="770" y="1200" font-size="45" font-weight="950" fill="#fff">DREAM.</text>
      <text x="770" y="1260" font-size="45" font-weight="950" fill="#fff">LEARN.</text>
      <text x="770" y="1320" font-size="45" font-weight="950" fill="${palette[1]}">ACHIEVE.</text>
    `,
    () => `
      <rect width="1080" height="1350" fill="#fff"/>
      ${image(1080, 1350, bg, { x: 0, y: 0, width: 1080, height: 430, opacity: 1 })}
      <rect x="0" y="0" width="1080" height="430" fill="${palette[0]}" opacity=".46"/>
      ${brandBlock(62, 146, "small")}
      <rect x="70" y="500" width="940" height="250" rx="32" fill="${palette[2]}" filter="url(#shadow-${id})"/>
      <text x="110" y="590" font-size="62" font-weight="950" fill="${palette[0]}">${esc(topic)}</text>
      <text x="112" y="654" font-size="28" font-weight="760" fill="#344569">${esc(slogan)}</text>
      <path d="M110 700 H520" stroke="${palette[1]}" stroke-width="10" stroke-linecap="round"/>
      ${serviceChips(70, 830, 5, palette, true)}
      <rect x="0" y="1110" width="1080" height="240" fill="url(#dark-${id})"/>
      ${collegeStrip(70, 1192, 5, 940, palette)}
      <text x="70" y="1165" font-size="28" font-weight="950" fill="#fff">Students from top colleges trust Assignment Nepal</text>
    `,
    () => `
      <rect width="1080" height="1350" fill="url(#bg-${id})"/>
      ${image(1080, 1350, bg, { x: 58, y: 90, width: 420, height: 1120, opacity: 1 })}
      <rect x="58" y="90" width="420" height="1120" rx="42" fill="none" stroke="${palette[1]}" stroke-width="8"/>
      <rect x="530" y="80" width="492" height="1188" rx="42" fill="#fff" filter="url(#shadow-${id})"/>
      ${logo(585, 130, 0.68)}
      <text x="585" y="340" font-size="57" font-weight="950" fill="${palette[0]}" font-family="Arial Black, Arial">ASSIGNMENT</text>
      <text x="585" y="405" font-size="62" font-weight="950" fill="${palette[1]}" font-family="Arial Black, Arial">NEPAL</text>
      <text x="585" y="535" font-size="49" font-weight="950" fill="${palette[0]}">${esc(topic)}</text>
      <text x="585" y="596" font-size="25" font-weight="760" fill="#344569">${esc(service[1])}</text>
      ${trustList(585, 690, palette[0], 48)}
      <rect x="585" y="930" width="360" height="78" rx="18" fill="${palette[1]}"/>
      <text x="765" y="980" text-anchor="middle" font-size="28" font-weight="950" fill="#fff">CONTACT US TODAY</text>
      ${flag(800, 1080, 0.64)}
    `,
    () => `
      <rect width="1080" height="1350" fill="${palette[2]}"/>
      <rect x="0" y="0" width="1080" height="220" fill="url(#dark-${id})"/>
      ${brandBlock(62, 146, "small")}
      <rect x="70" y="292" width="940" height="490" rx="42" fill="#fff" filter="url(#shadow-${id})"/>
      ${image(1080, 1350, bg, { x: 92, y: 314, width: 896, height: 446, opacity: 1 })}
      <rect x="70" y="830" width="600" height="290" rx="34" fill="${palette[0]}"/>
      <text x="112" y="910" font-size="53" font-weight="950" fill="#fff">${esc(topic)}</text>
      <text x="114" y="970" font-size="26" font-weight="760" fill="#dcecff">${esc(slogan)}</text>
      <text x="114" y="1046" font-size="24" font-weight="780" fill="#fff">Assignments, reports, theses, research papers, and websites.</text>
      <rect x="700" y="830" width="310" height="290" rx="34" fill="${palette[1]}"/>
      <text x="855" y="925" text-anchor="middle" font-size="34" font-weight="950" fill="#fff">QUALITY</text>
      <text x="855" y="985" text-anchor="middle" font-size="34" font-weight="950" fill="#fff">ON TIME</text>
      <text x="855" y="1045" text-anchor="middle" font-size="34" font-weight="950" fill="#fff">ORIGINAL</text>
      ${collegeStrip(70, 1195, 5, 940, palette)}
    `,
  ];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">${common}${layouts[layout]()}</svg>`;
}

function bannerSvg(index) {
  const id = `banner-${index}`;
  const palette = palettes[(index + 2) % palettes.length];
  const layout = index % 6;
  const topic = topics[index % topics.length];
  const slogan = slogans[(index + 3) % slogans.length];
  const bg = pick(stock.banners, index) || pick(stock.images, index);
  const bg2 = pick(stock.images, index, 4) || bg;
  const portrait = pick(stock.portraits, index, 8) || bg2;
  const common = `${defs(id, palette)}<filter id="shadow-global" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#061846" flood-opacity=".20"/></filter>`;

  const layouts = [
    () => `
      ${image(1942, 809, bg, { palette })}
      <rect width="1942" height="809" fill="${palette[0]}" opacity=".56"/>
      ${brandBlock(58, 148, "small")}
      ${flag(1645, 52, 0.86)}
      <text x="72" y="374" font-size="74" font-weight="950" fill="#fff" font-family="Arial Black, Arial">${esc(topic)}</text>
      <text x="76" y="430" font-size="30" font-weight="800" fill="#e8f4ff">${esc(slogan)}</text>
      <rect x="72" y="500" width="590" height="56" rx="12" fill="${palette[1]}"/>
      <text x="108" y="537" font-size="27" font-weight="950" fill="#fff">GET PROFESSIONAL ACADEMIC SUPPORT</text>
      <rect x="0" y="620" width="1942" height="189" fill="url(#dark-${id})"/>
      ${collegeStrip(48, 682, 8, 1180, palette)}
      ${trustList(1290, 670, "#fff", 34)}
      <text x="1740" y="710" font-size="38" font-weight="950" fill="#fff">DREAM.</text>
      <text x="1740" y="758" font-size="38" font-weight="950" fill="${palette[1]}">ACHIEVE.</text>
    `,
    () => `
      <rect width="1942" height="809" fill="#fff"/>
      <rect x="0" y="0" width="710" height="809" fill="${palette[0]}"/>
      ${image(1942, 809, bg, { x: 710, y: 0, width: 1232, height: 809, opacity: 0.9 })}
      <rect x="710" y="0" width="1232" height="809" fill="#fff" opacity=".20"/>
      ${logo(68, 80, 0.74)}
      <text x="230" y="150" font-size="70" font-weight="950" fill="#fff" font-family="Arial Black, Arial">ASSIGNMENT</text>
      <text x="230" y="224" font-size="74" font-weight="950" fill="${palette[1]}" font-family="Arial Black, Arial">NEPAL</text>
      <text x="70" y="358" font-size="58" font-weight="950" fill="#fff">${esc(topic)}</text>
      <text x="72" y="414" font-size="26" font-weight="780" fill="#dcecff">${esc(slogan)}</text>
      ${trustList(72, 505, "#fff", 40)}
      <rect x="860" y="560" width="900" height="120" rx="26" fill="#fff" opacity=".94" filter="url(#shadow-${id})"/>
      <text x="1310" y="632" text-anchor="middle" font-size="34" font-weight="950" fill="${palette[0]}">Assignments - Thesis - Research - Website Projects</text>
      ${flag(1635, 68, 0.78)}
    `,
    () => `
      <rect width="1942" height="809" fill="url(#bg-${id})"/>
      ${brandBlock(58, 144, "small")}
      <rect x="760" y="0" width="1182" height="809" fill="${palette[0]}" clip-path="url(#bannerDiag-${id})"/>
      ${image(1942, 809, bg, { x: 740, y: 0, width: 1202, height: 809, opacity: 0.88, clip: `clip-path="url(#bannerDiag-${id})"` })}
      <rect x="70" y="304" width="700" height="250" rx="34" fill="#fff" filter="url(#shadow-${id})"/>
      <text x="112" y="392" font-size="58" font-weight="950" fill="${palette[0]}">${esc(topic)}</text>
      <text x="114" y="450" font-size="27" font-weight="760" fill="#344569">${esc(slogan)}</text>
      <path d="M112 502 H612" stroke="${palette[1]}" stroke-width="9" stroke-linecap="round"/>
      <rect x="0" y="632" width="1942" height="177" fill="url(#dark-${id})"/>
      ${serviceChips(48, 676, 6, palette, true)}
      ${trustList(1284, 676, "#fff", 34)}
      ${flag(1665, 72, 0.82)}
    `,
    () => `
      <rect width="1942" height="809" fill="${palette[0]}"/>
      <circle cx="1710" cy="120" r="250" fill="${palette[1]}" opacity=".22"/>
      <rect x="44" y="48" width="590" height="360" rx="38" fill="#fff" filter="url(#shadow-${id})"/>
      ${image(1942, 809, bg, { x: 68, y: 72, width: 542, height: 312 })}
      <rect x="680" y="48" width="420" height="240" rx="34" fill="#fff" filter="url(#shadow-${id})"/>
      ${image(1942, 809, bg2, { x: 704, y: 72, width: 372, height: 192 })}
      <rect x="680" y="324" width="420" height="260" rx="34" fill="#fff" filter="url(#shadow-${id})"/>
      ${image(1942, 809, portrait, { x: 704, y: 348, width: 372, height: 212 })}
      <text x="1160" y="134" font-size="68" font-weight="950" fill="#fff" font-family="Arial Black, Arial">ASSIGNMENT</text>
      <text x="1160" y="210" font-size="72" font-weight="950" fill="${palette[1]}" font-family="Arial Black, Arial">NEPAL</text>
      <text x="1160" y="340" font-size="56" font-weight="950" fill="#fff">${esc(topic)}</text>
      <text x="1162" y="396" font-size="27" font-weight="760" fill="#dcecff">${esc(slogan)}</text>
      ${trustList(1164, 478, "#fff", 35)}
      <rect x="0" y="644" width="1942" height="165" fill="#fff" opacity=".08"/>
      ${collegeStrip(52, 690, 9, 1270, palette)}
      ${flag(1660, 82, 0.72)}
    `,
    () => `
      <rect width="1942" height="809" fill="#fff"/>
      ${image(1942, 809, bg, { x: 0, y: 0, width: 1942, height: 310 })}
      <rect x="0" y="0" width="1942" height="310" fill="${palette[0]}" opacity=".48"/>
      ${brandBlock(58, 144, "small")}
      <text x="70" y="420" font-size="72" font-weight="950" fill="${palette[0]}" font-family="Arial Black, Arial">${esc(topic)}</text>
      <text x="72" y="474" font-size="29" font-weight="760" fill="#344569">${esc(slogan)}</text>
      <rect x="70" y="536" width="750" height="64" rx="14" fill="${palette[1]}"/>
      <text x="106" y="578" font-size="30" font-weight="950" fill="#fff">PLAGIARISM-FREE GUIDANCE ON TIME</text>
      <rect x="920" y="372" width="480" height="250" rx="32" fill="${palette[2]}" filter="url(#shadow-${id})"/>
      ${trustList(970, 438, palette[0], 40)}
      <rect x="0" y="650" width="1942" height="159" fill="url(#dark-${id})"/>
      ${collegeStrip(52, 694, 9, 1380, palette)}
      <text x="1580" y="726" font-size="36" font-weight="950" fill="#fff">DREAM.</text>
      <text x="1580" y="772" font-size="36" font-weight="950" fill="${palette[1]}">ACHIEVE.</text>
      ${flag(1660, 54, 0.75)}
    `,
    () => `
      <rect width="1942" height="809" fill="url(#bg-${id})"/>
      <rect x="58" y="54" width="760" height="700" rx="44" fill="#fff" filter="url(#shadow-${id})"/>
      ${image(1942, 809, bg, { x: 86, y: 82, width: 704, height: 420 })}
      ${logo(106, 545, 0.58)}
      <text x="240" y="596" font-size="56" font-weight="950" fill="${palette[0]}" font-family="Arial Black, Arial">ASSIGNMENT</text>
      <text x="240" y="658" font-size="60" font-weight="950" fill="${palette[1]}" font-family="Arial Black, Arial">NEPAL</text>
      <rect x="880" y="86" width="980" height="590" rx="44" fill="${palette[0]}"/>
      <text x="940" y="220" font-size="72" font-weight="950" fill="#fff">${esc(topic)}</text>
      <text x="944" y="286" font-size="31" font-weight="760" fill="#dcecff">${esc(slogan)}</text>
      ${serviceChips(940, 360, 4, palette, true)}
      ${trustList(940, 548, "#fff", 36)}
      <rect x="880" y="700" width="980" height="62" rx="16" fill="${palette[1]}"/>
      <text x="1370" y="741" text-anchor="middle" font-size="30" font-weight="950" fill="#fff">CONTACT US TODAY</text>
      ${flag(1620, 98, 0.70)}
    `,
  ];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1942" height="809" viewBox="0 0 1942 809">${common}${layouts[layout]()}</svg>`;
}

async function writeAsset(kind, index, svg) {
  const dir = path.join(OUT, kind);
  await fsp.mkdir(dir, { recursive: true });
  const stem = `assignment-nepal-${kind.slice(0, -1)}-${String(index).padStart(3, "0")}`;
  const svgPath = path.join(dir, `${stem}.svg`);
  const pngPath = path.join(dir, `${stem}.png`);
  await fsp.writeFile(svgPath, svg, "utf8");
  await sharp(Buffer.from(svg)).png({ quality: 92 }).toFile(pngPath);
  return { kind, index, svg: svgPath, png: pngPath };
}

const manifest = [];
for (let i = 1; i <= 90; i++) {
  manifest.push(await writeAsset("posters", i, posterSvg(i)));
}
for (let i = 1; i <= 30; i++) {
  manifest.push(await writeAsset("banners", i, bannerSvg(i)));
}

await fsp.writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
console.log(`Generated ${manifest.length} unique static assets in ${OUT}`);
