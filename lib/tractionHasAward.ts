/** True when traction copy mentions an award, prize, or nomination. */
export function tractionHasAward(traction: string): boolean {
  return /\b(award|awards|winner|nominee|nominated|prize|finalist|honorable mention)\b/i.test(
    traction,
  );
}
