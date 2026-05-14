import { captionForAsset } from "./captions";
import { selectCollegeCampaignAsset } from "./college-campaign";
import { SLOT_CONFIG } from "./config";
import { configuredFolderId, listDriveFolderAssets } from "./drive";
import { mediaDeliveryUrl } from "./media-url";
import { publishToMeta } from "./meta";
import type { CampaignAssetType, CampaignSlot, DriveAsset } from "./types";

const SLOT_ORDER = Object.keys(SLOT_CONFIG) as CampaignSlot[];

function slotsForType(type: CampaignAssetType) {
  return SLOT_ORDER.filter((slot) => SLOT_CONFIG[slot].type === type);
}

function dailyRotationIndex(slot: CampaignSlot, type: CampaignAssetType, fileCount: number) {
  const typeSlots = slotsForType(type);
  const slotIndex = Math.max(typeSlots.indexOf(slot), 0);
  const utcDay = Math.floor(Date.now() / 86_400_000);
  return (utcDay * typeSlots.length + slotIndex) % fileCount;
}

function selectAsset(slot: CampaignSlot, type: CampaignAssetType, files: DriveAsset[]) {
  const sorted = [...files].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  return sorted[dailyRotationIndex(slot, type, sorted.length)];
}

export async function runSocialPublisherSlot(slot: CampaignSlot) {
  const config = SLOT_CONFIG[slot];
  const campaignAsset = config.type === "poster" ? selectCollegeCampaignAsset(slot) : null;

  if (campaignAsset) {
    const caption = captionForAsset(config.type, campaignAsset.name);
    const publishResult = await publishToMeta({
      type: config.type,
      mediaUrl: campaignAsset.mediaUrl,
      caption,
    });

    return {
      ok: true,
      slot,
      type: config.type,
      source: "college-campaign",
      file: campaignAsset.name,
      facebookPostId: publishResult.facebookId,
      instagramMediaId: publishResult.instagramMediaId,
    };
  }

  const folderId = configuredFolderId(config.folderEnv);
  const files = await listDriveFolderAssets(folderId);

  const compatibleFiles = files.filter((file) => {
    if (config.type === "animated_ad") return file.mimeType.startsWith("video/");
    return file.mimeType.startsWith("image/");
  });

  if (!compatibleFiles.length) {
    return {
      ok: true,
      slot,
      skipped: true,
      reason: `No compatible ${config.type} files found in ${config.folderEnv}`,
    };
  }

  const selected = selectAsset(slot, config.type, compatibleFiles);
  const caption = captionForAsset(config.type, selected.name);
  const mediaUrl = mediaDeliveryUrl(selected.id);
  const publishResult = await publishToMeta({
    type: config.type,
    mediaUrl,
    caption,
  });

  return {
    ok: true,
    slot,
    type: config.type,
    file: selected.name,
    facebookPostId: publishResult.facebookId,
    instagramMediaId: publishResult.instagramMediaId,
  };
}
