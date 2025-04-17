
export function getStartAndEndIdxOfSubstring(substring: string, fullText: string) {
    const startIdx = fullText.indexOf(substring);
    const endIdx = startIdx + substring.length;
    return { startIdx, endIdx };
  }
  