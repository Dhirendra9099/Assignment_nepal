import { google } from "googleapis";

import { requiredEnv } from "./config";
import type { DriveAsset } from "./types";

function serviceAccountCredentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;
  if (!raw) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_JSON_BASE64");
  }

  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64
    ? Buffer.from(raw, "base64").toString("utf8")
    : raw;

  return JSON.parse(json) as {
    client_email: string;
    private_key: string;
  };
}

export function driveClient() {
  const credentials = serviceAccountCredentials();
  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  return google.drive({ version: "v3", auth });
}

export async function listDriveFolderAssets(folderId: string): Promise<DriveAsset[]> {
  const drive = driveClient();
  const files: DriveAsset[] = [];
  let pageToken: string | undefined;

  do {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields:
        "nextPageToken, files(id, name, mimeType, webViewLink, webContentLink, size, createdTime, modifiedTime)",
      orderBy: "name_natural",
      pageToken,
      pageSize: 1000,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    for (const file of response.data.files || []) {
      if (!file.id || !file.name || !file.mimeType) continue;
      files.push({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        webViewLink: file.webViewLink,
        webContentLink: file.webContentLink,
        size: file.size,
        createdTime: file.createdTime,
        modifiedTime: file.modifiedTime,
      });
    }

    pageToken = response.data.nextPageToken || undefined;
  } while (pageToken);

  return files;
}

export async function ensureAnyoneReadable(fileId: string) {
  if (process.env.GOOGLE_DRIVE_AUTO_SHARE !== "true") return;

  const drive = driveClient();
  await drive.permissions
    .create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
      supportsAllDrives: true,
    })
    .catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      if (!message.includes("already exists")) throw error;
    });
}

export function driveDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
}

export function configuredFolderId(envName: string): string {
  return requiredEnv(envName);
}
