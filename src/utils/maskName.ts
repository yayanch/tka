/**
 * Mask student name for leaderboard privacy:
 * Only show the first 3 characters of EACH word in the student's name,
 * replacing the remaining characters of each word with asterisks (*).
 * Example: "Yayan Cahyana" -> "Yay** Cah****"
 * Example: "Budi Raharjo" -> "Bud* Rah****"
 */
export function maskStudentName(fullName: string): string {
  if (!fullName) return '';
  return fullName
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (word.length <= 3) {
        return word;
      }
      return word.slice(0, 3) + '*'.repeat(word.length - 3);
    })
    .join(' ');
}
