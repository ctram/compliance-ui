import { ComplianceViolation } from "@/backend";
import { getStartAndEndIdxOfSubstring } from "./get-start-and-end-idx-of-substring";
import { ChosenSuggestions } from "./get-initial-chosen-suggestions";
import React from "react";
import { adjustCasing } from "./adjust-casing";
import { removeEndingPunctuation } from "./remove-ending-punctuation";

export function markupOriginalCopy({
  originalCopy,
  violationSuggestions,
  chosenSuggestions,
  onClickSentence,
  idOfCurrViolation,
  classNameForViolationInView,
  classNameForViolationNotInView,
  showOriginalText,
}: {
  originalCopy: string;
  violationSuggestions: ComplianceViolation[];
  chosenSuggestions: ChosenSuggestions;
  onClickSentence: (violationId: string) => void;
  idOfCurrViolation: string;
  classNameForViolationInView: string;
  classNameForViolationNotInView: string;
  showOriginalText: boolean;
}): React.ReactNode {
  // Create a simple array of text segments and React elements
  const segments: (string | React.ReactNode)[] = [];
  let currentText = originalCopy;

  // Process each violation in order of appearance in the text
  const sortedViolations = [...violationSuggestions].sort((a, b) => {
    const posA = originalCopy.indexOf(a.originalSentence || "");
    const posB = originalCopy.indexOf(b.originalSentence || "");
    return posA - posB;
  });

  for (const violation of sortedViolations) {
    const {
      suggestions,
      originalSentence,
      text: originalFragment,
      id,
    } = violation;
    const isInView = idOfCurrViolation === id;
    const classNameForSentence = isInView
      ? classNameForViolationInView
      : classNameForViolationNotInView;
    const innerSuggestions: string[] = suggestions || [];
    const innerSourceSentence = originalSentence || "";

    // Find the position of this sentence in the current text
    const sentencePos = currentText.indexOf(innerSourceSentence);
    if (sentencePos === -1) continue; // Skip if sentence not found

    // Add text before this sentence
    if (sentencePos > 0) {
      segments.push(currentText.substring(0, sentencePos));
      currentText = currentText.substring(sentencePos);
    }

    // Process the sentence
    const idxOfChosenSuggestion =
      chosenSuggestions[violation.id]?.idxOfChosenSuggestion;
    let chosenSuggestion: string | undefined;

    if (typeof idxOfChosenSuggestion === "number") {
      chosenSuggestion = innerSuggestions[idxOfChosenSuggestion];
    }

    if (chosenSuggestion) {
      // Create React elements for the updated sentence with chosen suggestion
      const {
        startIdx: startIdxOfReplacementFragment,
        endIdx: endIdxOfReplacementFragment,
      } = getStartAndEndIdxOfSubstring(originalFragment, innerSourceSentence);

      const before = innerSourceSentence.slice(
        0,
        startIdxOfReplacementFragment
      );
      const after = innerSourceSentence.slice(endIdxOfReplacementFragment);

      // Adjust the casing of the replacement text to match the original
      const adjustedSuggestion = adjustCasing(
        chosenSuggestion,
        originalFragment
      );

      // Always remove ending punctuation from suggestions
      const processedSuggestion = removeEndingPunctuation(adjustedSuggestion);

      const sentenceEl = (
        <span
          key={`sentence-${violation.id}`}
          className={classNameForSentence}
          onClick={() => onClickSentence(violation.id)}
        >
          {before}
          {showOriginalText && (
            <span className="bg-red-200 line-through">{originalFragment}</span>
          )}
          <span className="bg-green-200">{processedSuggestion}</span>
          {after}
        </span>
      );

      segments.push(sentenceEl);
    } else {
      // Create React elements for the highlighted original sentence
      const {
        startIdx: startIdxOfOriginalFragment,
        endIdx: endIdxOfOriginalFragment,
      } = getStartAndEndIdxOfSubstring(originalFragment, innerSourceSentence);

      const before = innerSourceSentence.slice(0, startIdxOfOriginalFragment);
      const after = innerSourceSentence.slice(endIdxOfOriginalFragment);

      const sentenceEl = (
        <span
          key={`sentence-${violation.id}`}
          className={classNameForSentence}
          onClick={() => onClickSentence(violation.id)}
        >
          {before}
          <span className="bg-yellow-200">{originalFragment}</span>
          {after}
        </span>
      );

      segments.push(sentenceEl);
    }

    // Update currentText to remove the processed sentence
    currentText = currentText.substring(innerSourceSentence.length);
  }

  // Add any remaining text
  if (currentText) {
    segments.push(<span key="remaining">{currentText}</span>);
  }

  // Also need to wrap any plain string segments at the start
  const processedSegments = segments.map((segment, index) => {
    if (typeof segment === 'string') {
      return <span key={`text-${index}`}>{segment}</span>;
    }
    return segment;
  });

  return <>{processedSegments}</>;
}
