import { publicAssetUrl } from "./media-url";
import type { CampaignSlot } from "./types";

const DAY_MS = 86_400_000;
const CAMPAIGN_START_UTC_DAY = Math.floor(Date.UTC(2026, 4, 15) / DAY_MS);
const ISMT_ASSET_COUNT = 30;
const REST_COLLEGE_ASSET_COUNT = 9;

const posterSlots: CampaignSlot[] = ["poster-morning", "poster-midday", "poster-evening"];

const ismtAssets = [
  "college-campaign-ismt-001-bsc-it-semester-i.jpg",
  "college-campaign-ismt-002-bsc-it-semester-ii.jpg",
  "college-campaign-ismt-003-bsc-it-semester-iii.jpg",
  "college-campaign-ismt-004-bsc-it-semester-iv.jpg",
  "college-campaign-ismt-005-bsc-it-semester-v.jpg",
  "college-campaign-ismt-006-bsc-it-semester-vi.jpg",
  "college-campaign-ismt-007-computer-science-semester-i.jpg",
  "college-campaign-ismt-008-computer-science-semester-ii.jpg",
  "college-campaign-ismt-009-computer-science-semester-iii.jpg",
  "college-campaign-ismt-010-computer-science-semester-iv.jpg",
  "college-campaign-ismt-011-computer-science-semester-v.jpg",
  "college-campaign-ismt-012-computer-science-semester-vi.jpg",
  "college-campaign-ismt-013-cyber-security-semester-i.jpg",
  "college-campaign-ismt-014-cyber-security-semester-ii.jpg",
  "college-campaign-ismt-015-cyber-security-semester-iii.jpg",
  "college-campaign-ismt-016-cyber-security-semester-iv.jpg",
  "college-campaign-ismt-017-cyber-security-semester-v.jpg",
  "college-campaign-ismt-018-cyber-security-semester-vi.jpg",
  "college-campaign-ismt-019-msc-computing-module-focus.jpg",
  "college-campaign-ismt-020-msc-computing-module-focus.jpg",
  "college-campaign-ismt-021-msc-computing-module-focus.jpg",
  "college-campaign-ismt-022-msc-computing-project-stage.jpg",
  "college-campaign-ismt-023-mba-leadership-module.jpg",
  "college-campaign-ismt-024-mba-global-business-module.jpg",
  "college-campaign-ismt-025-mba-digital-enterprise-module.jpg",
  "college-campaign-ismt-026-mba-governance-module.jpg",
  "college-campaign-ismt-027-mba-research-project.jpg",
  "college-campaign-ismt-028-ismt-tech-pathways.jpg",
  "college-campaign-ismt-029-ismt-project-support.jpg",
  "college-campaign-ismt-030-ismt-referencing-support.jpg",
];

const restAssets = [
  "college-campaign-rest-001-islington-college.jpg",
  "college-campaign-rest-002-softwarica-college.jpg",
  "college-campaign-rest-003-the-british-college.jpg",
  "college-campaign-rest-004-king-s-college.jpg",
  "college-campaign-rest-005-herald-college.jpg",
  "college-campaign-rest-006-nami-college.jpg",
  "college-campaign-rest-007-westminster-college.jpg",
  "college-campaign-rest-008-pcps.jpg",
  "college-campaign-rest-009-ace-international-business-school.jpg",
];

function utcDayIndex(now = Date.now()) {
  return Math.floor(now / DAY_MS);
}

export function selectCollegeCampaignAsset(slot: CampaignSlot, now = Date.now()) {
  const slotIndex = posterSlots.indexOf(slot);
  if (slotIndex === -1) return null;

  const dayOffset = utcDayIndex(now) - CAMPAIGN_START_UTC_DAY;
  if (dayOffset < 0) return null;

  const campaignIndex = dayOffset * posterSlots.length + slotIndex;

  if (campaignIndex < ISMT_ASSET_COUNT) {
    const name = ismtAssets[campaignIndex];
    return {
      name,
      mediaUrl: publicAssetUrl(`/college-campaign/${name}`),
    };
  }

  const restIndex = campaignIndex - ISMT_ASSET_COUNT;
  if (restIndex < REST_COLLEGE_ASSET_COUNT) {
    const name = restAssets[restIndex];
    return {
      name,
      mediaUrl: publicAssetUrl(`/college-campaign/${name}`),
    };
  }

  return null;
}
