# Assignment Nepal

Assignment Nepal is a production-oriented Next.js App Router website for an ethical academic-support and foreign-affiliated college information platform in Nepal.

The platform is compliance-first: it supports tutoring, concept explanation, study guidance, proofreading, editing, referencing help, formative feedback, research guidance, module understanding, and academic planning. It does not position itself as a ghostwriting, cheating, impersonation, exam-help, or assessed-work completion service.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS v4 liquid-glass UI
- Prisma ORM with PostgreSQL
- Custom secure admin authentication with bcrypt and JWT httpOnly cookies
- Zod validation for public forms
- Rate-limited enquiry and correction request APIs
- SEO metadata, sitemap, robots, JSON-LD schema

## Local Setup

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

Default seeded admin:

- Email: value of `ADMIN_EMAIL`, default `assignmentnepal63@gmail.com`
- Password: value of `ADMIN_PASSWORD`, default `ChangeMe123!`

Change these before production.

## Contact Email

The public contact email and WhatsApp number are:

- Email: `assignmentnepal63@gmail.com`
- Phone / WhatsApp: `9744998670`

Live contact emails are forwarded with FormSubmit.co by default, so Gmail SMTP is not required. The first live submission may send an activation email to `assignmentnepal63@gmail.com`; click the activation link from FormSubmit to fully enable delivery.

Optional SMTP fallback variables can be configured later:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="assignmentnepal63@gmail.com"
SMTP_PASS="your-gmail-app-password"
SMTP_FROM="Assignment Nepal <assignmentnepal63@gmail.com>"
ADMIN_NOTIFICATION_EMAIL="assignmentnepal63@gmail.com"
```

Use a Gmail app password, not the normal Gmail account password.

## Key Routes

- `/` homepage
- `/colleges` and `/colleges/[slug]`
- `/foreign-universities` and `/foreign-universities/[slug]`
- `/programmes` and `/programmes/[slug]`
- `/subjects` and `/subjects/[slug]`
- `/services` and `/services/[slug]`
- `/blog` and `/blog/[slug]`
- `/faq`, `/contact`, `/about`
- `/academic-integrity`, `/privacy-policy`, `/terms`, `/disclaimer`
- `/correction-request`
- `/admin/login`, `/admin`

## Admin CMS

The admin dashboard manages:

- Colleges
- Foreign universities
- Subject areas
- Programmes
- Modules
- Services
- Blog posts
- FAQs
- Testimonials
- Enquiries
- Correction requests
- SEO metadata
- Policy pages

Programme and module forms use relation IDs for now. In production, replace those fields with select components backed by the existing resource APIs.

## Compliance Disclaimer

Assignment Nepal provides tutoring, study guidance, editing, feedback, referencing help, and academic support. We do not complete graded assessments, exams, coursework, or assignments for submission on behalf of students.

## Quality Checks

```bash
npm run lint
npm run build
```

## Notes

Seed data uses source URL placeholders and verification reminders. Replace placeholder sources with official MoEST, college, and university URLs before publishing as verified information.
