"use client";

export function HighlightedSentence({
  originalSentence,
  highlightStartIdx,
  highlightEndIdx,
  highlightColor,
}: {
  originalSentence: string;
  highlightStartIdx: number;
  highlightEndIdx: number;
  highlightColor?: string;
}) {
  const before = originalSentence.slice(0, highlightStartIdx);
  const textToHighlight = originalSentence.slice(
    highlightStartIdx,
    highlightEndIdx
  );
  const highlightedText = (
    <span className={highlightColor}>{textToHighlight}</span>
  );
  const after = originalSentence.slice(highlightEndIdx);

  return (
    <>
      <span>{before}</span>
      <span>{highlightedText}</span>
      <span>{after}</span>
    </>
  );
}
