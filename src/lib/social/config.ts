import type { CampaignSlot, SlotConfig } from "./types";

export const SLOT_CONFIG: Record<CampaignSlot, SlotConfig> = {
  "poster-morning": {
    slot: "poster-morning",
    type: "poster",
    label: "Morning poster",
    folderEnv: "GOOGLE_DRIVE_POSTERS_FOLDER_ID",
  },
  "poster-midday": {
    slot: "poster-midday",
    type: "poster",
    label: "Midday poster",
    folderEnv: "GOOGLE_DRIVE_POSTERS_FOLDER_ID",
  },
  "poster-evening": {
    slot: "poster-evening",
    type: "poster",
    label: "Evening poster",
    folderEnv: "GOOGLE_DRIVE_POSTERS_FOLDER_ID",
  },
  "animated-ad-afternoon": {
    slot: "animated-ad-afternoon",
    type: "animated_ad",
    label: "Afternoon animated ad",
    folderEnv: "GOOGLE_DRIVE_ANIMATED_ADS_FOLDER_ID",
  },
  "animated-ad-night": {
    slot: "animated-ad-night",
    type: "animated_ad",
    label: "Night animated ad",
    folderEnv: "GOOGLE_DRIVE_ANIMATED_ADS_FOLDER_ID",
  },
  "banner-prime": {
    slot: "banner-prime",
    type: "banner",
    label: "Prime banner",
    folderEnv: "GOOGLE_DRIVE_BANNERS_FOLDER_ID",
  },
};

export function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function isCampaignSlot(value: string): value is CampaignSlot {
  return Object.prototype.hasOwnProperty.call(SLOT_CONFIG, value);
}
