# Deployment Guide

## 1. Provision PostgreSQL

Create a PostgreSQL database on your host of choice. Set:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
APP_URL="https://your-domain.com"
ADMIN_JWT_SECRET="use-a-long-random-secret"
ADMIN_EMAIL="admin@your-domain.com"
ADMIN_PASSWORD="set-a-strong-password"
```

Optional email notification variables:

```env
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM="Assignment Nepal <hello@your-domain.com>"
ADMIN_NOTIFICATION_EMAIL="admin@your-domain.com"
```

## 2. Build Commands

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run build
npm run start
```

For a platform such as Vercel, run `prisma generate` during install/build and run `db:push` plus `db:seed` as a controlled release step, not on every request.

## 3. Production Checklist

- Replace all placeholder source URLs with official source URLs.
- Review every college, university, programme, and module before marking it published.
- Change seeded admin credentials.
- Set a strong `ADMIN_JWT_SECRET`.
- Configure SMTP if admin email notifications are required.
- Confirm `/sitemap.xml`, `/robots.txt`, metadata, and Open Graph image.
- Test enquiry submission and correction request submission against the production database.
- Confirm all public copy remains academic-integrity compliant.
