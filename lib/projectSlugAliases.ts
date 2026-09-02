/** Legacy project slugs → current slug (permanent redirects). */
export const PROJECT_SLUG_ALIASES: Record<string, string> = {
  nimue: 'runtime',
};

export function resolveProjectSlug(slug: string): string {
  return PROJECT_SLUG_ALIASES[slug] ?? slug;
}

export function isLegacyProjectSlug(slug: string): boolean {
  return slug in PROJECT_SLUG_ALIASES;
}

export function getLegacyProjectSlugs(): string[] {
  return Object.keys(PROJECT_SLUG_ALIASES);
}
