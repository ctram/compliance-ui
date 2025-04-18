
/**
 * Removes ending punctuation from a suggestion
 * @param text The text to process
 * @returns The text with ending punctuation removed
 */
export function removeEndingPunctuation(text: string): string {
    if (!text) return text;
    
    // Common punctuation marks to check for
    const punctuationMarks = ['.', ',', ';', ':', '!', '?', ')', ']', '}'];
    
    // Check if the text ends with any punctuation mark
    for (const mark of punctuationMarks) {
      if (text.endsWith(mark)) {
        // Remove the punctuation from the end
        return text.slice(0, -1);
      }
    }
    
    return text;
  }
  