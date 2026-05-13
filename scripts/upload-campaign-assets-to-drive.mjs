import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { google } from "googleapis";

const ROOT = process.cwd();
const ASSET_ROOT = path.join(ROOT, "campaign-assets");
const MANIFEST_OUT = path.join(ASSET_ROOT, "drive-upload-manifest.json");

function loadDotEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function serviceAccountCredentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;
  if (!raw) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_JSON_BASE64");
  return JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 ? Buffer.from(raw, "base64").toString("utf8") : raw,
  );
}

function folderForKind(kind) {
  if (kind === "posters") return process.env.GOOGLE_DRIVE_POSTERS_FOLDER_ID;
  if (kind === "banners") return process.env.GOOGLE_DRIVE_BANNERS_FOLDER_ID;
  if (kind === "animated_ads") return process.env.GOOGLE_DRIVE_ANIMATED_ADS_FOLDER_ID;
  throw new Error(`Unknown asset folder kind: ${kind}`);
}

function mimeFor(file) {
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".jpg") || file.endsWith(".jpeg")) return "image/jpeg";
  if (file.endsWith(".mp4")) return "video/mp4";
  if (file.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

function driveQueryString(value) {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

async function filesForKind(kind) {
  const dir = path.join(ASSET_ROOT, kind);
  if (!fs.existsSync(dir)) return [];
  const names = await fsp.readdir(dir);
  return names
    .filter((name) => [".png", ".mp4"].includes(path.extname(name).toLowerCase()))
    .sort()
    .map((name) => path.join(dir, name));
}

async function main() {
  loadDotEnv();
  const credentials = serviceAccountCredentials();
  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  const drive = google.drive({ version: "v3", auth });
  const manifest = [];

  for (const kind of ["posters", "banners", "animated_ads"]) {
    const folderId = folderForKind(kind);
    if (!folderId) {
      console.log(`Skipping ${kind}: Drive folder ID is not configured`);
      continue;
    }

    for (const filePath of await filesForKind(kind)) {
      const name = path.basename(filePath);
      const existing = await drive.files.list({
        q: `'${driveQueryString(folderId)}' in parents and name = '${driveQueryString(name)}' and trashed = false`,
        fields: "files(id, name, mimeType, webViewLink, webContentLink)",
        pageSize: 1,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
      });

      const media = {
        mimeType: mimeFor(filePath),
        body: fs.createReadStream(filePath),
      };
      const existingId = existing.data.files?.[0]?.id;
      console.log(`${existingId ? "Updating" : "Uploading"} ${kind}/${name}`);
      const response = existingId
        ? await drive.files.update({
            fileId: existingId,
            requestBody: { name },
            media,
            fields: "id, name, mimeType, webViewLink, webContentLink",
            supportsAllDrives: true,
          })
        : await drive.files.create({
            requestBody: {
              name,
              parents: [folderId],
            },
            media,
            fields: "id, name, mimeType, webViewLink, webContentLink",
            supportsAllDrives: true,
          });

      if (process.env.GOOGLE_DRIVE_AUTO_SHARE === "true" && response.data.id) {
        await drive.permissions
          .create({
            fileId: response.data.id,
            requestBody: { role: "reader", type: "anyone" },
            supportsAllDrives: true,
          })
          .catch((error) => {
            if (!String(error?.message || error).includes("already exists")) throw error;
          });
      }

      manifest.push({ kind, localPath: filePath, ...response.data });
    }
  }

  await fsp.mkdir(ASSET_ROOT, { recursive: true });
  await fsp.writeFile(MANIFEST_OUT, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`Uploaded ${manifest.length} files. Manifest: ${MANIFEST_OUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
