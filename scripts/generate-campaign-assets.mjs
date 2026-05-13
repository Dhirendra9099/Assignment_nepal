import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "campaign-assets");
const COLORS = {
  navy: "#071a4a",
  deepNavy: "#021135",
  red: "#dc1020",
  blue: "#0b4f93",
  sky: "#eaf5ff",
  white: "#ffffff",
  gold: "#d9a43a",
};

const services = [
  ["Assignments", "Writing plans and structure"],
  ["Reports", "Clean formatting and flow"],
  ["Thesis", "Research guidance"],
  ["Dissertations", "Methodology support"],
  ["Presentations", "Slides and speaker notes"],
  ["Research", "Sources and referencing"],
  ["Website Projects", "Frontend and documentation"],
  ["Editing", "Proofreading and polish"],
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
  "Dissertation Help",
  "Research Paper Guidance",
  "Website Project Support",
  "Thesis Review",
  "Academic Editing",
  "Presentation Design",
  "Referencing Support",
  "Business Reports",
  "IT Coursework",
];

const slogans = [
  "Quality Assignments. On Time. Every Time.",
  "Your Success, Our Priority.",
  "Dream. Learn. Achieve.",
  "Original Work. Clear Guidance. Trusted Support.",
  "Academic Support for Students in Nepal.",
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" };
    return map[char];
  });
}

function logo(x, y, scale = 1) {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <path d="M95 0 L190 42 L95 84 L0 42 Z" fill="${COLORS.red}"/>
      <path d="M47 42 Q95 22 143 42 L143 66 Q95 46 47 66 Z" fill="${COLORS.white}" opacity=".96"/>
      <path d="M22 98 Q95 62 168 98 L168 154 Q95 118 22 154 Z" fill="${COLORS.blue}"/>
      <path d="M95 78 L95 156" stroke="${COLORS.white}" stroke-width="10" stroke-linecap="round"/>
      <circle cx="95" cy="106" r="15" fill="${COLORS.white}"/>
      <path d="M95 121 L67 157 M95 121 L123 157" stroke="${COLORS.white}" stroke-width="10" stroke-linecap="round"/>
    </g>`;
}

function mountains(w, h, y, variant) {
  const peaks = [
    `M${w * 0.20} ${h} L${w * 0.46} ${y - 130} L${w * 0.70} ${h} Z`,
    `M${w * 0.38} ${h} L${w * 0.64} ${y - 240 - variant * 12} L${w * 0.94} ${h} Z`,
    `M${w * 0.05} ${h} L${w * 0.25} ${y - 80} L${w * 0.44} ${h} Z`,
  ];
  return `
    <g opacity=".98">
      <path d="${peaks[0]}" fill="#bad7f6"/>
      <path d="${peaks[1]}" fill="#93c4f1"/>
      <path d="${peaks[2]}" fill="#d9ecff"/>
      <path d="M${w * 0.64} ${y - 240 - variant * 12} L${w * 0.57} ${y - 80} L${w * 0.67} ${y - 120} L${w * 0.73} ${y - 20} Z" fill="#fff5ed" opacity=".95"/>
      <path d="M${w * 0.46} ${y - 130} L${w * 0.40} ${y + 4} L${w * 0.48} ${y - 26} L${w * 0.54} ${y + 32} Z" fill="#ffffff" opacity=".9"/>
    </g>`;
}

function stupa(cx, cy, scale = 1) {
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <ellipse cx="0" cy="118" rx="155" ry="38" fill="#f7f3ec"/>
      <path d="M-145 118 Q0 -20 145 118 Z" fill="#fff8ee" stroke="#dcc6a0" stroke-width="4"/>
      <rect x="-48" y="-62" width="96" height="78" rx="8" fill="${COLORS.gold}" stroke="#9f7325" stroke-width="4"/>
      <path d="M-70 -62 L0 -132 L70 -62 Z" fill="#c48b1f"/>
      <path d="M-28 -24 Q0 -2 28 -24" stroke="${COLORS.navy}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <circle cx="-26" cy="-28" r="6" fill="${COLORS.navy}"/>
      <circle cx="26" cy="-28" r="6" fill="${COLORS.navy}"/>
      <path d="M0 -132 L0 -210" stroke="#8f6418" stroke-width="8"/>
      <path d="M-116 -45 L-220 -96 M116 -45 L220 -96 M-120 -18 L-230 -38 M120 -18 L230 -38" stroke="${COLORS.red}" stroke-width="4" opacity=".8"/>
    </g>`;
}

function flag(x, y, scale = 1) {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <path d="M0 0 L178 62 L42 91 L178 170 L0 142 Z" fill="${COLORS.red}" stroke="${COLORS.navy}" stroke-width="10"/>
      <circle cx="54" cy="55" r="20" fill="${COLORS.white}"/>
      <path d="M53 113 L66 139 L39 123 L69 123 L42 139 Z" fill="${COLORS.white}"/>
    </g>`;
}

function serviceIcon(x, y, label, i) {
  const icon = ["✎", "▤", "▰", "⌕", "◉", "✦", "⌂", "✓"][i % 8];
  return `
    <g transform="translate(${x} ${y})">
      <rect x="0" y="0" width="134" height="98" rx="15" fill="#ffffff" stroke="#d6ddea" stroke-width="2" filter="url(#softShadow)"/>
      <text x="67" y="47" font-size="34" font-weight="900" fill="${COLORS.blue}" text-anchor="middle">${icon}</text>
      <text x="67" y="126" font-size="18" font-weight="800" fill="${COLORS.navy}" text-anchor="middle">${esc(label)}</text>
    </g>`;
}

function collegeStrip(y, w, compact = false, countOverride) {
  const cardW = compact ? 132 : 154;
  const gap = compact ? 10 : 12;
  const start = 34;
  return colleges
    .slice(0, countOverride ?? (compact ? 7 : 10))
    .map((name, i) => {
      const x = start + i * (cardW + gap);
      const initials = name
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 3);
      return `
        <g transform="translate(${x} ${y})">
          <rect width="${cardW}" height="96" rx="12" fill="#ffffff" opacity=".96"/>
          <circle cx="${cardW / 2}" cy="29" r="22" fill="${i % 2 ? COLORS.blue : COLORS.red}" opacity=".92"/>
          <text x="${cardW / 2}" y="37" text-anchor="middle" font-size="20" font-weight="900" fill="#fff">${esc(initials)}</text>
          <text x="${cardW / 2}" y="70" text-anchor="middle" font-size="15" font-weight="800" fill="${COLORS.navy}">${esc(name.split(" ").slice(0, 2).join(" "))}</text>
          <text x="${cardW / 2}" y="88" text-anchor="middle" font-size="14" font-weight="700" fill="${COLORS.navy}" opacity=".82">${esc(name.split(" ").slice(2).join(" "))}</text>
        </g>`;
    })
    .join("");
}

function posterSvg(index) {
  const topic = topics[index % topics.length];
  const slogan = slogans[index % slogans.length];
  const service = services[index % services.length];
  const variant = index % 6;
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset=".47" stop-color="#f4f9ff"/>
        <stop offset="1" stop-color="#dceeff"/>
      </linearGradient>
      <linearGradient id="navy" x1="0" x2="1">
        <stop offset="0" stop-color="${COLORS.deepNavy}"/>
        <stop offset="1" stop-color="${COLORS.blue}"/>
      </linearGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#061846" flood-opacity=".18"/>
      </filter>
    </defs>
    <rect width="1080" height="1350" fill="url(#bg)"/>
    ${mountains(1080, 740, 480, variant)}
    ${stupa(735, 410, 0.78)}
    ${flag(884, 80, 0.72)}
    <rect x="0" y="0" width="1080" height="1350" fill="url(#bg)" opacity=".18"/>
    ${logo(56, 74, 1.02)}
    <text x="292" y="156" font-size="74" font-weight="950" fill="${COLORS.navy}" font-family="Arial Black, Arial">ASSIGNMENT</text>
    <text x="292" y="236" font-size="78" font-weight="950" fill="${COLORS.red}" font-family="Arial Black, Arial">NEPAL</text>
    <path d="M488 320 C620 284 720 298 832 280" stroke="${COLORS.red}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <text x="298" y="288" font-size="30" font-style="italic" font-weight="700" fill="${COLORS.navy}">${esc(slogan)}</text>
    <rect x="62" y="362" width="956" height="206" rx="32" fill="#ffffff" opacity=".88" filter="url(#softShadow)"/>
    <text x="100" y="438" font-size="48" font-weight="950" fill="${COLORS.navy}" font-family="Arial Black, Arial">${esc(topic)}</text>
    <text x="100" y="492" font-size="29" font-weight="700" fill="#263b67">${esc(service[1])}</text>
    <text x="100" y="536" font-size="25" font-weight="700" fill="#31476f">Plagiarism-free guidance • On-time delivery • Confidential support</text>
    <g transform="translate(82 635)">
      ${services.slice(0, 6).map((s, i) => serviceIcon(i * 158, 0, s[0], i)).join("")}
    </g>
    <rect x="70" y="840" width="590" height="66" rx="14" fill="${COLORS.navy}"/>
    <rect x="70" y="840" width="68" height="66" rx="14" fill="${COLORS.red}"/>
    <text x="104" y="884" font-size="28" font-weight="900" fill="#fff" text-anchor="middle">➤</text>
    <text x="158" y="882" font-size="26" font-weight="900" fill="#fff">WE HELP YOU ACHIEVE MORE</text>
    <g transform="translate(704 770)">
      <rect x="0" y="0" width="290" height="170" rx="20" fill="#0d1e4f" opacity=".95" filter="url(#softShadow)"/>
      <text x="145" y="54" text-anchor="middle" font-size="28" font-weight="900" fill="#fff">100% ORIGINAL</text>
      <text x="145" y="100" text-anchor="middle" font-size="26" font-weight="900" fill="#fff">ON TIME</text>
      <text x="145" y="145" text-anchor="middle" font-size="26" font-weight="900" fill="${COLORS.red}">EVERY TIME</text>
    </g>
    <rect x="0" y="1010" width="1080" height="340" fill="url(#navy)"/>
    <text x="540" y="1070" text-anchor="middle" font-size="26" font-weight="950" fill="#fff">WE SUPPORT STUDENTS FROM TOP COLLEGES</text>
    ${collegeStrip(1102, 1080, true)}
    <text x="88" y="1300" font-size="28" font-weight="900" fill="#fff">Contact us today for academic support</text>
    <text x="1018" y="1300" text-anchor="end" font-size="25" font-weight="950" fill="${COLORS.red}">DREAM. LEARN. ACHIEVE.</text>
  </svg>`;
}

function bannerSvg(index) {
  const topic = topics[index % topics.length];
  const slogan = slogans[(index + 2) % slogans.length];
  const variant = index % 5;
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="1942" height="809" viewBox="0 0 1942 809">
    <defs>
      <linearGradient id="bg" x1="0" x2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset=".42" stop-color="#f4f8ff"/>
        <stop offset="1" stop-color="#dcefff"/>
      </linearGradient>
      <linearGradient id="navy" x1="0" x2="1">
        <stop offset="0" stop-color="${COLORS.deepNavy}"/>
        <stop offset="1" stop-color="${COLORS.blue}"/>
      </linearGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#061846" flood-opacity=".20"/>
      </filter>
    </defs>
    <rect width="1942" height="809" fill="url(#bg)"/>
    ${mountains(1942, 590, 400, variant)}
    ${stupa(1322, 344, 0.82)}
    ${flag(1666, 54, 1.04)}
    ${logo(58, 74, 1.18)}
    <text x="302" y="160" font-size="88" font-weight="950" fill="${COLORS.navy}" font-family="Arial Black, Arial">ASSIGNMENT</text>
    <text x="302" y="252" font-size="92" font-weight="950" fill="${COLORS.red}" font-family="Arial Black, Arial">NEPAL</text>
    <path d="M670 278 C820 246 980 252 1126 230" stroke="${COLORS.red}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <text x="660" y="236" font-size="34" font-style="italic" font-weight="700" fill="${COLORS.navy}">${esc(slogan)}</text>
    <text x="138" y="340" font-size="31" font-weight="950" fill="${COLORS.navy}">QUALITY ASSIGNMENTS • ON TIME • EVERY TIME</text>
    <g transform="translate(50 372)">
      ${services.slice(0, 6).map((s, i) => serviceIcon(i * 136, 0, s[0], i)).join("")}
    </g>
    <rect x="50" y="528" width="530" height="43" rx="9" fill="${COLORS.navy}"/>
    <rect x="50" y="528" width="44" height="43" rx="9" fill="${COLORS.red}"/>
    <text x="74" y="558" text-anchor="middle" font-size="22" font-weight="900" fill="#fff">➤</text>
    <text x="108" y="558" font-size="23" font-weight="900" fill="#fff">${esc(topic.toUpperCase())}</text>
    <g transform="translate(1394 430)">
      <rect width="420" height="150" rx="16" fill="#ffffff" opacity=".90" filter="url(#softShadow)"/>
      <text x="210" y="62" text-anchor="middle" font-size="30" font-weight="900" fill="${COLORS.navy}">Your Academic Partner</text>
      <text x="210" y="104" text-anchor="middle" font-size="28" font-style="italic" font-weight="700" fill="${COLORS.blue}">in Nepal</text>
    </g>
    <rect x="0" y="596" width="1942" height="213" fill="url(#navy)"/>
    <text x="312" y="640" font-size="25" font-weight="950" fill="#fff">WE SUPPORT STUDENTS FROM TOP COLLEGES</text>
    ${collegeStrip(662, 1942, true, 8)}
    <line x1="1248" y1="646" x2="1248" y2="779" stroke="#ffffff" stroke-width="2" opacity=".55"/>
    <g transform="translate(1290 648)">
      <text x="0" y="0" font-size="21" font-weight="800" fill="#fff">✓ 100% Original Work</text>
      <text x="0" y="42" font-size="21" font-weight="800" fill="#fff">✓ Plagiarism Free</text>
      <text x="0" y="84" font-size="21" font-weight="800" fill="#fff">✓ On-Time Delivery</text>
      <text x="0" y="126" font-size="21" font-weight="800" fill="#fff">✓ Confidential &amp; Reliable</text>
    </g>
    <text x="1728" y="710" font-size="35" font-weight="950" fill="#fff">DREAM.</text>
    <text x="1728" y="752" font-size="35" font-weight="950" fill="#fff">LEARN.</text>
    <text x="1728" y="792" font-size="35" font-weight="950" fill="${COLORS.red}">ACHIEVE.</text>
  </svg>`;
}

async function writeAsset(kind, index, svg) {
  const dir = path.join(OUT, kind);
  await fs.mkdir(dir, { recursive: true });
  const stem = `assignment-nepal-${kind.slice(0, -1)}-${String(index).padStart(3, "0")}`;
  const svgPath = path.join(dir, `${stem}.svg`);
  const pngPath = path.join(dir, `${stem}.png`);
  await fs.writeFile(svgPath, svg, "utf8");
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

await fs.writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
console.log(`Generated ${manifest.length} static assets in ${OUT}`);
