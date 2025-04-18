"use client";

import { ComplianceViolation } from "@/backend";
import { Suggestion } from "./Suggestion";
import { getStartAndEndIdxOfSubstring } from "@/utils/get-start-and-end-idx-of-substring";
import { HighlightedSentence } from "./HighlightedSentence";
import { ChosenSuggestions } from "@/utils/get-initial-chosen-suggestions";
import { getSeverityColor } from "@/utils/get-severity-color";

export function SuggestionPanel({
  violation,
  chosenSuggestions,
  onChooseSuggestion,
}: {
  violation: ComplianceViolation;
  chosenSuggestions: ChosenSuggestions;
  onChooseSuggestion: (
    violationId: string,
    isOriginalSelected: boolean | undefined,
    idxOfChosenSuggestion: number | undefined
  ) => void;
}) {
  const chosenSuggestionForViolation = chosenSuggestions[violation.id];

  const {
    text: fragmentOfOriginalSentence,
    sourceSentence,
    suggestions,
    id,
    type,
    message,
    severity,
  } = violation;

  if (!sourceSentence) {
    return <div>No source sentence found</div>;
  }
  if (!suggestions || suggestions.length === 0) {
    return <div>No suggestions found</div>;
  }

  const { startIdx, endIdx } = getStartAndEndIdxOfSubstring(
    fragmentOfOriginalSentence,
    sourceSentence
  );

  const baseClassName = "rounded-md p-4 hover:cursor-pointer";
  const selectedClassName = "border-3 border-black-800";
  const notSelectedClassName = "border-1 border-black-200";

  const markedupSentencesEls = suggestions.map((suggestion, i) => {
    const hash =
      suggestion.slice(0, 10).trim().toLowerCase() + new Date().getTime();
    const isSelected =
      chosenSuggestionForViolation?.idxOfChosenSuggestion === i;
    const finalClassName = isSelected
      ? `${baseClassName} ${selectedClassName}`
      : `${baseClassName} ${notSelectedClassName}`;

    return (
      <div
        key={hash}
        className={finalClassName}
        onClick={() => onChooseSuggestion(id, false, i)}
      >
        <Suggestion
          originalSentence={sourceSentence}
          strikeOutStartIdx={startIdx}
          strikeOutEndIdx={endIdx}
          suggestion={suggestion}
        />
      </div>
    );
  });

  const finalClassName = chosenSuggestionForViolation?.isOriginalSelected
    ? `${baseClassName} ${selectedClassName}`
    : `${baseClassName} ${notSelectedClassName}`;
  const originalSentenceEl = (
    <HighlightedSentence
      originalSentence={sourceSentence}
      highlightStartIdx={startIdx}
      highlightEndIdx={endIdx}
      highlightColor="bg-yellow-200"
    />
  );
  const wrappedOriginalSentenceEl = (
    <div
      className={finalClassName}
      onClick={() => onChooseSuggestion(id, true, undefined)}
    >
      {originalSentenceEl}
    </div>
  );

  const baseClass = "text-sm font-semibold";
  const colorClass = getSeverityColor(severity);
  const colorCodedSeverityEl = (
    <span className={`${baseClass} ${colorClass}`}>{severity}</span>
  );

  return (
    <div className="bg-white rounded-lg grid gap-y-8 suggestion-panel">
      <div className="grid gap-y-4 border border-gray-200 rounded-md p-4 ">
        <div>
          <div className="text-base font-semibold">Severity</div>
          {colorCodedSeverityEl}
        </div>

        <div>
          <div className="text-base font-semibold">Original Sentence</div>
          {originalSentenceEl}
        </div>
        <div>
          <div className="text-base font-semibold">Violation Type</div>
          {type}
        </div>
        <div>
          <div className="text-base font-semibold">Explanation</div>
          {message}
        </div>
      </div>

      <div>
        <div className="text-xl font-semibold my-4">Decide What To Do</div>
        <div className="flex flex-col gap-y-8">
          <div>
            <div className="text-base font-semibold my-4">Keep Original</div>
            {wrappedOriginalSentenceEl}
          </div>
          <div>
            <div className="text-base font-semibold my-4">Use Suggestion</div>
            <div className="grid gap-y-6">{markedupSentencesEls}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
