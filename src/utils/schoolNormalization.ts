/**
 * Standardizes/normalizes school names so that all spelling variations
 * (e.g. "SMK Negeri 2 Magetan", "SMKN 2 NEGERI MAGETAN", "SMK 2 MAGETAN", "SMK N 2 MAGETAN")
 * map consistently to "SMKN 2 MAGETAN".
 */
export function normalizeSchoolName(raw?: string): string {
  if (!raw || !raw.trim()) return 'SMKN 2 MAGETAN';
  const str = raw.trim();
  const lower = str.toLowerCase();

  if (
    lower.includes('magetan') ||
    lower.includes('smk') ||
    lower.includes('smkn') ||
    lower.includes('cimahi') ||
    lower.includes('bandung') ||
    lower.includes('malang')
  ) {
    return 'SMKN 2 MAGETAN';
  }

  return str;
}
