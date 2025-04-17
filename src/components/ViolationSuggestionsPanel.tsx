"use client";

import { ComplianceViolation } from "@/backend";
import { SuggestionPanel } from "./SuggestionPanel";
import { ViolationNavigator } from "./ViolationNavigator";
import { ChosenSuggestions } from "@/utils/get-initial-chosen-suggestions";

export function ViolationSuggestionsPanel({
  violationSuggestions,
  idxOfViolationInView,
  onClickPrev,
  onClickNext,
  onSelectSuggestion,
  chosenSuggestions,
}: {
  violationSuggestions: ComplianceViolation[];
  idxOfViolationInView: number;
  onClickPrev: () => void;
  onClickNext: () => void;
  onSelectSuggestion: (violationId: string, isOriginalSelected: boolean | undefined, chosenSuggestions: number | undefined) => void;
  chosenSuggestions: ChosenSuggestions;
}) {
  const numViolations = violationSuggestions.length;
  const violationInView = violationSuggestions[idxOfViolationInView];

  return (
    <div >
      <ViolationNavigator
        numViolations={numViolations}
        currViolationIdx={idxOfViolationInView}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
      />
      <div className="flex flex-col gap-2">
        {violationInView && (
          <SuggestionPanel
            violation={violationInView}
            chosenSuggestions={chosenSuggestions}
            onSelectSuggestion={onSelectSuggestion}
          />
        )}
      </div>
    </div>
  );
}
