export function normalizeEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (!email.includes("@") || email.length < 5) return null;
  return email;
}
