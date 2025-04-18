export function getSourceSentence(idx: number, fullText: string) {
    // given an index that represents the location in fullText, identifies the nearest sentence
    // by checking for surrounding punctuations
    const sentenceEndings = [".", "!", "?", ";"];
    const sentenceStartings = sentenceEndings;
  
    // Find the start of the sentence (looking backwards)
    let startIdx = idx;
    let endIdx = idx;
  
    while (startIdx > 0) {
      const char = fullText[startIdx - 1];
      if (sentenceStartings.includes(char)) {
        break;
      }
      startIdx--;
    }
  
    // Find the end of the sentence (looking forwards)
    while (endIdx < fullText.length) {
      const char = fullText[endIdx];
      if (sentenceEndings.includes(char)) {
        endIdx++; // Include the punctuation
        break;
      }
      endIdx++;
    }
  
    return fullText.slice(startIdx, endIdx).trim();
  }
  