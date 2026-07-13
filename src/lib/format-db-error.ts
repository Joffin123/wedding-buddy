// Supabase's client sometimes surfaces a raw upstream response (e.g. a
// Cloudflare error page) as `error.message` instead of a short string.
// This collapses that into something safe and readable to render in the UI.
export function friendlyDbError(message: string): string {
  const trimmed = message.trim();

  if (trimmed.length > 200 || /^<!doctype|^<html/i.test(trimmed)) {
    const title = trimmed.match(/<title>([^<]*)<\/title>/i)?.[1];
    return title
      ? `Database unreachable — ${title.trim()}`
      : "Database unreachable — the request failed before a usable response came back.";
  }

  return message;
}
