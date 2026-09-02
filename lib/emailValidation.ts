import validator from 'validator';

/** Shared options for client + server — validator.js defaults are production-grade. */
const EMAIL_VALIDATION_OPTIONS = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true,
  allow_ip_domain: false,
  domain_specific_validation: false,
} as const;

export function normalizeEmail(raw: string): string | null {
  const normalized = raw.trim().toLowerCase();
  if (!normalized) return null;
  if (!validator.isEmail(normalized, EMAIL_VALIDATION_OPTIONS)) return null;
  return normalized;
}

export function isValidEmail(value: string): boolean {
  return normalizeEmail(value) !== null;
}
