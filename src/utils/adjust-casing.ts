
/**
 * Adjusts the casing of the replacement text to match the original text
 * @param replacement The replacement text
 * @param original The original text being replaced
 * @returns The replacement text with adjusted casing
 */
export function adjustCasing(replacement: string, original: string): string {
    if (!replacement || !original) return replacement;
    
    // Check if the original text starts with a capital letter
    const originalFirstChar = original.charAt(0);
    const replacementFirstChar = replacement.charAt(0);
    
    // If original starts with uppercase and replacement doesn't
    if (originalFirstChar === originalFirstChar.toUpperCase() && 
        replacementFirstChar !== replacementFirstChar.toUpperCase()) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    
    // If original starts with lowercase and replacement doesn't
    if (originalFirstChar === originalFirstChar.toLowerCase() && 
        replacementFirstChar !== replacementFirstChar.toLowerCase()) {
      return replacement.charAt(0).toLowerCase() + replacement.slice(1);
    }
    
    // If casing already matches or we can't determine, return as is
    return replacement;
  }
  