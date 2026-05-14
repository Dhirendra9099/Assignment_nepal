import { requiredEnv } from "./config";
import type { CampaignAssetType, MetaPublishResult } from "./types";

const GRAPH_BASE = "https://graph.facebook.com/v22.0";

async function graphPost<T>(path: string, params: Record<string, string | undefined>): Promise<T> {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") body.set(key, value);
  }

  const response = await fetch(`${GRAPH_BASE}${path}`, {
    method: "POST",
    body,
  });

  const json = (await response.json()) as T & { error?: { message?: string } };
  if (!response.ok) {
    throw new Error(json.error?.message || `Meta Graph API request failed: ${response.status}`);
  }

  return json;
}

async function graphGet<T>(path: string, params: Record<string, string | undefined>): Promise<T> {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, value);
  }

  const response = await fetch(`${GRAPH_BASE}${path}?${search.toString()}`);
  const json = (await response.json()) as T & { error?: { message?: string } };
  if (!response.ok) {
    throw new Error(json.error?.message || `Meta Graph API request failed: ${response.status}`);
  }

  return json;
}

async function waitForInstagramContainer(containerId: string, accessToken: string) {
  for (let attempt = 0; attempt < 24; attempt++) {
    const status = await graphGet<{ status_code?: string; status?: string }>(`/${containerId}`, {
      fields: "status_code,status",
      access_token: accessToken,
    });

    if (status.status_code === "FINISHED") return status;
    if (status.status_code === "ERROR" || status.status_code === "EXPIRED") {
      throw new Error(`Instagram media container failed: ${status.status || status.status_code}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  throw new Error("Instagram media container did not finish processing in time");
}

export async function publishToMeta(options: {
  type: CampaignAssetType;
  mediaUrl: string;
  caption: string;
}): Promise<MetaPublishResult> {
  const accessToken = requiredEnv("META_PAGE_ACCESS_TOKEN");
  const pageId = requiredEnv("META_PAGE_ID");
  const igUserId = process.env.META_IG_USER_ID;

  const result: MetaPublishResult = { raw: {} };

  if (options.type === "poster" || options.type === "banner") {
    const facebook = await graphPost<{ id: string }>(`/${pageId}/photos`, {
      url: options.mediaUrl,
      caption: options.caption,
      published: "true",
      access_token: accessToken,
    });
    result.facebookId = facebook.id;

    if (igUserId) {
      const container = await graphPost<{ id: string }>(`/${igUserId}/media`, {
        image_url: options.mediaUrl,
        caption: options.caption,
        access_token: accessToken,
      });
      const published = await graphPost<{ id: string }>(`/${igUserId}/media_publish`, {
        creation_id: container.id,
        access_token: accessToken,
      });
      result.instagramContainerId = container.id;
      result.instagramMediaId = published.id;
    }

    result.raw = { mode: "image" };
    return result;
  }

  const facebookVideo = await graphPost<{ id: string }>(`/${pageId}/videos`, {
    file_url: options.mediaUrl,
    description: options.caption,
    access_token: accessToken,
  });
  result.facebookId = facebookVideo.id;

  if (igUserId) {
    const container = await graphPost<{ id: string }>(`/${igUserId}/media`, {
      media_type: "REELS",
      video_url: options.mediaUrl,
      caption: options.caption,
      share_to_feed: "true",
      access_token: accessToken,
    });
    await waitForInstagramContainer(container.id, accessToken);
    const published = await graphPost<{ id: string }>(`/${igUserId}/media_publish`, {
      creation_id: container.id,
      access_token: accessToken,
    });
    result.instagramContainerId = container.id;
    result.instagramMediaId = published.id;
  }

  result.raw = { mode: "video" };
  return result;
}
