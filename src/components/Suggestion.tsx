"use client";

export function Suggestion({
  originalSentence,
  strikeOutStartIdx,
  strikeOutEndIdx,
  suggestion,
}: {
  originalSentence: string;
  strikeOutStartIdx: number;
  strikeOutEndIdx: number;
  suggestion: string;
}) {
  const before = originalSentence.slice(0, strikeOutStartIdx);
  const textToStrikeOut = originalSentence.slice(
    strikeOutStartIdx,
    strikeOutEndIdx
  );
  const struckOutText = (
    <span className="line-through bg-red-500">{textToStrikeOut}</span>
  );

  const shouldCapitalize =
    originalSentence[strikeOutStartIdx] ===
    originalSentence[strikeOutStartIdx].toUpperCase();
  const finalReplacement = shouldCapitalize
    ? suggestion.charAt(0).toUpperCase() + suggestion.slice(1)
    : suggestion.charAt(0).toLowerCase() + suggestion.slice(1);

  const greenReplacement = finalReplacement.length ? (
    <span className="bg-green-500">{finalReplacement}</span>
  ) : (
    ""
  );

  const after = originalSentence.slice(strikeOutEndIdx);

  return (
    <>
      <span>{before}</span>
      <span>{struckOutText}</span>
      <span>{greenReplacement}</span>
      <span>{after}</span>
    </>
  );
}
