# Supabase setup — Wedding Buddy

The site reads everything (venues, vendors, gallery, images) from this Supabase
project. Admins manage data directly from **Supabase Studio** — no custom admin
UI exists (by design).

## One-time setup (5 minutes)

1. Open the [SQL Editor](https://supabase.com/dashboard/project/crxygdrvlckoaykpafss/sql/new).
2. Paste the contents of **`schema.sql`** → **Run**. This creates the tables,
   indexes, Row-Level Security policies, and the `images` storage bucket.
3. Paste the contents of **`seed.sql`** → **Run**. This populates 9 venues,
   16 vendors, and 8 gallery inspirations.
4. Go to [Storage → `images`](https://supabase.com/dashboard/project/crxygdrvlckoaykpafss/storage/buckets/images)
   and upload photos into sub-folders. The `image_path` column in each row
   already points to the expected path (e.g. `images/venues/bolgatty-palace.jpg`).
   Rows with no uploaded image fall back gracefully to a gradient tile on the
   site — **seeding works before you've uploaded any photos.**

## Managing content after launch

Everything happens in Studio:

| Task | Where |
| --- | --- |
| Add / edit / remove a venue | **Table Editor → `venues`** |
| Add / edit / remove a vendor | **Table Editor → `vendors`** |
| Add inspiration images to the chatbot | **Table Editor → `gallery`** + upload file to `Storage → images/gallery/` |
| Replace a photo | **Storage → `images/<folder>/<file>.jpg`** — overwrite the file with the same name, site updates instantly |
| Feature a venue on the home page | Set `featured = true` in the `venues` row |

The **anon key** used by the Next.js app has read-only access — it can never
mutate data. All mutations require the `service_role` key, which lives only in
`.env.local` (used by the chat API for future writes; currently read-only too).

## Security notes

- `service_role` bypasses all RLS. Never expose it client-side. It is stored in
  `.env.local` (gitignored). Rotate it any time from **Project Settings → API**.
- Public read policies are on by default for all three tables. Change them in
  Studio → Authentication → Policies if you ever need auth-gated content.
