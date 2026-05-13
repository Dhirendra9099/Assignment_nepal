import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const STOCK_ROOT = path.join(ROOT, "campaign-assets", "stock");
const MANIFEST_PATH = path.join(STOCK_ROOT, "manifest.json");

const imageQueries = [
  "students studying laptop",
  "university library study",
  "graduation cap student",
  "research desk notebook",
  "business presentation student",
  "coding student laptop",
  "academic books library",
  "college campus students",
  "thesis research laptop",
  "team study session",
  "online learning desk",
  "student writing notes",
];

const nepalQueries = [
  "Nepal Himalaya landscape",
  "Kathmandu Nepal temple",
  "Nepal mountain flag",
  "Boudhanath stupa Nepal",
  "Nepal city mountains",
];

const portraitQueries = [
  "student portrait laptop",
  "young professional portrait",
  "university student portrait",
  "student smiling books",
  "business student portrait",
  "researcher portrait laptop",
];

const videoQueries = [
  "student studying laptop",
  "library study",
  "writing notebook",
  "business presentation",
  "coding laptop",
  "graduation students",
  "team studying",
  "online learning",
];

const sfxQueries = ["whoosh transition", "soft click", "camera shutter", "success chime", "paper flip"];

const gifQueries = [
  "study motivation",
  "deadline reminder",
  "graduation cap",
  "research notes",
  "typing laptop",
  "success celebration",
  "book study",
  "check mark",
  "sparkle education",
  "presentation",
];

function loadDotEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function firstKey(name) {
  return (process.env[name] || "")
    .split(/[,;\n|]+/)
    .map((value) => value.trim())
    .filter(Boolean)[0];
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 52);
}

async function mkdir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function downloadFile(url, filePath) {
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) return false;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await mkdir(path.dirname(filePath));
  await fsp.writeFile(filePath, bytes);
  return true;
}

function pexelsPhotoUrl(photo, orientation) {
  if (orientation === "portrait") return photo.src?.portrait || photo.src?.large2x || photo.src?.large;
  if (orientation === "landscape") return photo.src?.landscape || photo.src?.large2x || photo.src?.large;
  return photo.src?.large2x || photo.src?.large || photo.src?.original;
}

async function collectPexelsPhotos(manifest, query, orientation, folder, limit = 3) {
  const key = firstKey("PEXELS_API_KEY");
  if (!key) return;

  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(limit));
  url.searchParams.set("orientation", orientation);

  const json = await fetchJson(url, { headers: { Authorization: key } });
  let count = 0;
  for (const photo of json.photos || []) {
    const photoUrl = pexelsPhotoUrl(photo, orientation);
    if (!photoUrl) continue;
    const filePath = path.join(STOCK_ROOT, folder, `pexels-${slug(query)}-${photo.id}.jpg`);
    await downloadFile(photoUrl, filePath);
    manifest.push({
      provider: "pexels",
      type: folder,
      query,
      localPath: path.relative(ROOT, filePath),
      sourceUrl: photo.url,
      photographer: photo.photographer,
      license: "Pexels License",
    });
    count++;
    if (count >= limit) break;
  }
}

async function collectUnsplashPhotos(manifest, query, orientation, folder, limit = 2) {
  const key = firstKey("UNSPLASH_ACCESS_KEY");
  if (!key) return;

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(limit));
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("client_id", key);

  const json = await fetchJson(url);
  for (const photo of json.results || []) {
    const photoUrl = photo.urls?.regular || photo.urls?.full;
    if (!photoUrl) continue;
    const filePath = path.join(STOCK_ROOT, folder, `unsplash-${slug(query)}-${photo.id}.jpg`);
    await downloadFile(photoUrl, filePath);
    manifest.push({
      provider: "unsplash",
      type: folder,
      query,
      localPath: path.relative(ROOT, filePath),
      sourceUrl: photo.links?.html,
      photographer: photo.user?.name,
      license: "Unsplash License",
    });
  }
}

async function collectPixabayPhotos(manifest, query, orientation, folder, limit = 3) {
  const key = firstKey("PIXABAY_API_KEYS");
  if (!key) return;

  const url = new URL("https://pixabay.com/api/");
  url.searchParams.set("key", key);
  url.searchParams.set("q", query);
  url.searchParams.set("image_type", "photo");
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("safesearch", "true");
  url.searchParams.set("per_page", String(limit));

  const json = await fetchJson(url);
  for (const photo of json.hits || []) {
    const photoUrl = photo.largeImageURL || photo.webformatURL;
    if (!photoUrl) continue;
    const filePath = path.join(STOCK_ROOT, folder, `pixabay-${slug(query)}-${photo.id}.jpg`);
    await downloadFile(photoUrl, filePath);
    manifest.push({
      provider: "pixabay",
      type: folder,
      query,
      localPath: path.relative(ROOT, filePath),
      sourceUrl: photo.pageURL,
      photographer: photo.user,
      license: "Pixabay Content License",
    });
  }
}

async function collectPexelsVideos(manifest, query, limit = 2) {
  const key = firstKey("PEXELS_API_KEY");
  if (!key) return;

  const url = new URL("https://api.pexels.com/videos/search");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(limit));
  url.searchParams.set("orientation", "portrait");

  const json = await fetchJson(url, { headers: { Authorization: key } });
  for (const video of json.videos || []) {
    const files = [...(video.video_files || [])]
      .filter((file) => file.file_type === "video/mp4" && file.width >= 540)
      .sort((a, b) => Math.abs(a.width - 1080) - Math.abs(b.width - 1080));
    const selected = files[0] || video.video_files?.[0];
    if (!selected?.link) continue;
    const filePath = path.join(STOCK_ROOT, "videos", `pexels-${slug(query)}-${video.id}.mp4`);
    await downloadFile(selected.link, filePath);
    manifest.push({
      provider: "pexels",
      type: "videos",
      query,
      localPath: path.relative(ROOT, filePath),
      sourceUrl: video.url,
      license: "Pexels License",
    });
  }
}

async function collectPixabayVideos(manifest, query, limit = 2) {
  const key = firstKey("PIXABAY_API_KEYS");
  if (!key) return;

  const url = new URL("https://pixabay.com/api/videos/");
  url.searchParams.set("key", key);
  url.searchParams.set("q", query);
  url.searchParams.set("safesearch", "true");
  url.searchParams.set("per_page", String(limit));

  const json = await fetchJson(url);
  for (const video of json.hits || []) {
    const selected = video.videos?.small || video.videos?.medium || video.videos?.large;
    if (!selected?.url) continue;
    const filePath = path.join(STOCK_ROOT, "videos", `pixabay-${slug(query)}-${video.id}.mp4`);
    await downloadFile(selected.url, filePath);
    manifest.push({
      provider: "pixabay",
      type: "videos",
      query,
      localPath: path.relative(ROOT, filePath),
      sourceUrl: video.pageURL,
      photographer: video.user,
      license: "Pixabay Content License",
    });
  }
}

async function collectFreesoundSfx(manifest, query, limit = 2) {
  const key = firstKey("FREESOUND_API_KEY");
  if (!key) return;

  const url = new URL("https://freesound.org/apiv2/search/text/");
  url.searchParams.set("query", query);
  url.searchParams.set("filter", 'license:"Creative Commons 0"');
  url.searchParams.set("fields", "id,name,license,previews,url");
  url.searchParams.set("page_size", String(limit));
  url.searchParams.set("token", key);

  const json = await fetchJson(url);
  for (const sound of json.results || []) {
    const preview = sound.previews?.["preview-hq-mp3"] || sound.previews?.["preview-lq-mp3"];
    if (!preview) continue;
    const filePath = path.join(STOCK_ROOT, "sfx", `freesound-${slug(query)}-${sound.id}.mp3`);
    await downloadFile(preview, filePath);
    manifest.push({
      provider: "freesound",
      type: "sfx",
      query,
      localPath: path.relative(ROOT, filePath),
      sourceUrl: sound.url,
      title: sound.name,
      license: sound.license,
    });
  }
}

async function collectGiphyOverlays(manifest, query, limit = 2) {
  const key = firstKey("GIPHY_API_KEY");
  if (!key) return;

  const url = new URL("https://api.giphy.com/v1/stickers/search");
  url.searchParams.set("api_key", key);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("rating", "g");
  url.searchParams.set("lang", "en");

  const json = await fetchJson(url);
  for (const item of json.data || []) {
    const selected =
      item.images?.fixed_height_small?.url ||
      item.images?.downsized_medium?.url ||
      item.images?.original?.url;
    if (!selected) continue;
    const filePath = path.join(STOCK_ROOT, "gifs", `giphy-${slug(query)}-${item.id}.gif`);
    await downloadFile(selected, filePath);
    manifest.push({
      provider: "giphy",
      type: "gifs",
      query,
      localPath: path.relative(ROOT, filePath),
      sourceUrl: item.url,
      title: item.title,
      license: "GIPHY API",
    });
  }
}

async function runSafely(label, fn) {
  try {
    await fn();
  } catch (error) {
    console.warn(`Skipping ${label}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function main() {
  loadDotEnv();
  await mkdir(STOCK_ROOT);

  const manifest = [];
  for (const folder of ["images", "banners", "portraits", "videos", "sfx", "gifs"]) {
    await mkdir(path.join(STOCK_ROOT, folder));
  }

  for (const query of imageQueries) {
    await runSafely(`Pexels image ${query}`, () => collectPexelsPhotos(manifest, query, "portrait", "images", 2));
    await runSafely(`Unsplash image ${query}`, () => collectUnsplashPhotos(manifest, query, "portrait", "images", 1));
    await runSafely(`Pixabay image ${query}`, () => collectPixabayPhotos(manifest, query, "vertical", "images", 1));
  }

  for (const query of nepalQueries) {
    await runSafely(`Pexels banner ${query}`, () => collectPexelsPhotos(manifest, query, "landscape", "banners", 2));
    await runSafely(`Unsplash banner ${query}`, () => collectUnsplashPhotos(manifest, query, "landscape", "banners", 1));
    await runSafely(`Pixabay banner ${query}`, () => collectPixabayPhotos(manifest, query, "horizontal", "banners", 1));
  }

  for (const query of portraitQueries) {
    await runSafely(`Pexels portrait ${query}`, () => collectPexelsPhotos(manifest, query, "portrait", "portraits", 2));
    await runSafely(`Unsplash portrait ${query}`, () => collectUnsplashPhotos(manifest, query, "portrait", "portraits", 1));
  }

  for (const query of videoQueries) {
    await runSafely(`Pexels video ${query}`, () => collectPexelsVideos(manifest, query, 1));
    await runSafely(`Pixabay video ${query}`, () => collectPixabayVideos(manifest, query, 1));
  }

  for (const query of sfxQueries) {
    await runSafely(`Freesound ${query}`, () => collectFreesoundSfx(manifest, query, 2));
  }

  for (const query of gifQueries) {
    await runSafely(`Giphy ${query}`, () => collectGiphyOverlays(manifest, query, 2));
  }

  const existing = fs.existsSync(MANIFEST_PATH) ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) : [];
  const byPath = new Map([...existing, ...manifest].map((entry) => [entry.localPath, entry]));
  const merged = [...byPath.values()].sort((a, b) => a.localPath.localeCompare(b.localPath));
  await fsp.writeFile(MANIFEST_PATH, JSON.stringify(merged, null, 2), "utf8");
  console.log(`Stock media ready: ${merged.length} manifest entries`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
