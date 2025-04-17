"use client";

import { ComplianceViolation } from "@/backend";
import { Suggestion } from "./Suggestion";
import { getStartAndEndIdxOfSubstring } from "@/utils/get-start-and-end-idx-of-substring";
import { HighlightedSentence } from "./HighlightedSentence";
import { ChosenSuggestions } from "@/utils/get-initial-chosen-suggestions";

export function SuggestionPanel({
  violation,
  chosenSuggestions,
  onSelectSuggestion,
}: {
  violation: ComplianceViolation;
  chosenSuggestions: ChosenSuggestions;
  onSelectSuggestion: (
    violationId: string,
    isOriginalSelected: boolean | undefined,
    idxOfSelectedSuggestion: number | undefined
  ) => void;
}) {

  const chosenSuggestionStateForViolation = chosenSuggestions[violation.id];
  
  
  const {
    text: fragmentOfOriginalSentence,
    sourceSentence,
    suggestions,
    id,
    start,
    end,
    length,
    type,
    message,
    severity,
  } = violation;

  const selectedClassName = "border border-gray-800";

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
  const baseClassName =
    "border border-gray-200 rounded-md p-4 hover:cursor-pointer";
  const hoverClassName = "hover:border-gray-300";

  const markedupSentences = suggestions.map((suggestion, i) => {
    const hash =
      suggestion.slice(0, 10).trim().toLowerCase() + new Date().getTime();
    const isSelected = chosenSuggestionStateForViolation?.idxOfSelectedSuggestion === i;
    const finalClassName = isSelected
      ? `${baseClassName} ${selectedClassName}`
      : `${baseClassName} ${hoverClassName}`;

    return (
      <div key={hash} className={finalClassName} onClick={() => onSelectSuggestion(id, false, i)}>
        <Suggestion
          originalSentence={sourceSentence}
          strikeOutStartIdx={startIdx}
          strikeOutEndIdx={endIdx}
          suggestion={suggestion}
        />
      </div>
    );
  });

  const finalClassName = chosenSuggestionStateForViolation?.isOriginalSelected
    ? `${baseClassName} ${selectedClassName}`
    : `${baseClassName} ${hoverClassName}`;
  const originalSentence = (
    <div className={finalClassName} onClick={() => onSelectSuggestion(id, true, undefined)}>
      <HighlightedSentence
        originalSentence={sourceSentence}
        highlightStartIdx={startIdx}
        highlightEndIdx={endIdx}
        highlightColor="bg-yellow-500"
      />
    </div>
  );

  const baseClass = "text-sm font-semibold";
  const colorClass = severity === "error" ? "text-red-500" : "text-yellow-500";
  const colorCodedSeverity = (
    <span className={`${baseClass} ${colorClass}`}>{severity}</span>
  );

  return (
    <div
      key={violation.id}
      className="bg-white rounded-lg p-6 grid gap-y-8"
    >
      <div className="grid gap-y-4 border border-gray-200 rounded-md p-4 ">
        <div>
          <div className="text-base font-semibold">Violation Type</div>
          {type}
        </div>
        <div>
          <div className="text-base font-semibold">Explanation</div>
          {message}
        </div>
        <div>
          <div className="text-base font-semibold">Severity</div>
          {colorCodedSeverity}
        </div>
      </div>

      <div>
        <div className="text-xl font-semibold my-4">Decide What To Do</div>
        <div className="flex flex-col gap-y-8">
          <div>
            <div className="text-base font-semibold my-4">Use Original</div>
            {originalSentence}
          </div>
          <div>
            <div className="text-base font-semibold my-4">Use Suggestion</div>
            <div className="grid gap-y-6">{markedupSentences}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
