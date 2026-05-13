export type CampaignAssetType = "poster" | "banner" | "animated_ad";

export type CampaignSlot =
  | "poster-morning"
  | "poster-midday"
  | "poster-evening"
  | "animated-ad-afternoon"
  | "animated-ad-night"
  | "banner-prime";

export type DriveAsset = {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string | null;
  webContentLink?: string | null;
  size?: string | null;
  createdTime?: string | null;
  modifiedTime?: string | null;
};

export type SlotConfig = {
  slot: CampaignSlot;
  type: CampaignAssetType;
  label: string;
  folderEnv: string;
};

export type MetaPublishResult = {
  facebookId?: string;
  instagramContainerId?: string;
  instagramMediaId?: string;
  raw: unknown;
};
