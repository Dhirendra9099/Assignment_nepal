# Assignment Nepal Social Automation Plan

## Goal

Publish six daily campaign items from Google Drive through the Assignment Nepal Meta accounts:

- 3 posters per day
- 2 animated ads per day
- 1 banner per day

The heavy media generation happens locally or in GitHub Actions. Vercel Cron only runs the lightweight scheduler and publisher.

## Why this architecture

Video rendering, avatar generation, voice synthesis, LUT-style processing, and stock media collection are too heavy and slow for a Vercel request. Vercel should publish already-rendered files, not generate 60 videos inside a cron invocation.

## Current implementation

- `scripts/generate-campaign-assets.mjs`
  - Generates 90 poster PNGs and 30 banner PNGs in `campaign-assets/`.
  - Uses multiple poster/banner layout families so the batch does not repeat the same composition.
  - Uses the attached Assignment Nepal reference direction: navy/red brand, Nepal mountain/stupa/flag cues, service icons, college strip, and CTA blocks.

- `scripts/download-stock-media.mjs`
  - Downloads a reusable stock pool from configured provider keys in `.env`.
  - Stores images, banner photos, portrait photos, vertical videos, and attribution/license metadata under `campaign-assets/stock/`.
  - Pexels and Unsplash assets are used by the current generators when available.

- `scripts/upload-campaign-assets-to-drive.mjs`
  - Uploads generated poster/banner/video files to configured Google Drive folders.
  - Can optionally set uploaded files to public link access for Meta API ingestion.

- `src/app/api/cron/social-publisher/[slot]/route.ts`
  - Vercel Cron entrypoint.
  - Calls `runSocialPublisherSlot(slot)`.

- `src/lib/social/*`
  - Google Drive folder reading.
  - Meta Graph API publishing.
  - Slot/caption scheduling logic.
  - Deterministic Drive rotation so the batch cycles without a database dependency.

- `vercel.json`
  - Six UTC cron entries:
    - 03:30 UTC: morning poster
    - 06:30 UTC: midday poster
    - 09:30 UTC: evening poster
    - 12:30 UTC: afternoon animated ad
    - 14:30 UTC: night animated ad
    - 16:30 UTC: prime banner

## Required environment variables

Google Drive:

- `GOOGLE_SERVICE_ACCOUNT_JSON` or `GOOGLE_SERVICE_ACCOUNT_JSON_BASE64`
- `GOOGLE_DRIVE_POSTERS_FOLDER_ID`
- `GOOGLE_DRIVE_BANNERS_FOLDER_ID`
- `GOOGLE_DRIVE_ANIMATED_ADS_FOLDER_ID`
- `GOOGLE_DRIVE_AUTO_SHARE=true` if Meta should fetch public Drive URLs directly

Meta:

- `META_PAGE_ID`
- `META_IG_USER_ID`
- `META_PAGE_ACCESS_TOKEN`
- The token must have the page and Instagram publishing permissions required by Meta.

Cron/security:

- `CRON_SECRET`

## Operational flow

1. Download/update the stock media pool:

   ```bash
   npm run assets:stock
   ```

2. Generate local poster and banner media:

   ```bash
   npm run assets:generate-static
   ```

3. Render animated videos into:

   ```bash
   npm run assets:generate-videos
   ```

4. Upload to Drive:

   ```bash
   npm run assets:upload-drive
   ```

5. Push code to GitHub and deploy on Vercel.

6. Set all production environment variables in Vercel.

7. Vercel Cron posts from Drive on schedule.

## Animated video production note

`scripts/generate-animated-ads.py` creates an offline-ready batch with unique scripts, Edge TTS voices, synthesized background music, stock video backgrounds, animated panels, and real stock portrait avatar cards. For fully lip-synced human avatars, swap the renderer's avatar step to a dedicated generation provider such as Replicate, Creatomate, or another avatar/video API configured in `.env`. The scheduler is independent from the video renderer: as long as final MP4 files are uploaded to the configured Drive animated ads folder, the cron publisher can post them.
