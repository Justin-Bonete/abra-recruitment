# Abra Marketing Recruitment Platform
Next.js 14 + Prisma (SQLite) + JWT cookie auth.

## Run locally
1. `cp .env.example .env` and set AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
2. `npm install`
3. `npx prisma db push`
4. `npm run seed` (creates your recruiter login)
5. `npm run dev` then open http://localhost:3000 (public site) and /admin (recruiters)

## Notes
- Public page: `public/index.html` (edit roles, text, branding there).
- Resumes are saved in `private-uploads/` and only downloadable by signed-in recruiters.
- For production: switch Prisma to PostgreSQL, store uploads in private object storage (S3/R2), use HTTPS, and use a shared rate limiter (e.g. Upstash) instead of the in-memory one.
