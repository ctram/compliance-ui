"use client";

import { ComplianceViolation } from "@/backend";
import { SuggestionPanel } from "./SuggestionPanel";
import { ViolationNavigator } from "./ViolationNavigator";
import { ChosenSuggestions } from "@/utils/get-initial-chosen-suggestions";


export function ViolationSuggestionsPanel({
  violationSuggestions,
  onClickPrev,
  onClickNext,
  onChooseSuggestion,
  chosenSuggestions,
  idxOfViolationBeingViewed,
}: {
  violationSuggestions: ComplianceViolation[];
  onClickPrev: () => void;
  onClickNext: () => void;
  onChooseSuggestion: (violationId: string, isOriginalSelected: boolean | undefined, chosenSuggestions: number | undefined) => void;
  chosenSuggestions: ChosenSuggestions;
  idxOfViolationBeingViewed: number;
}) {
  const numViolations = violationSuggestions.length;
  const violationInView = violationSuggestions[idxOfViolationBeingViewed];

  return (
    <div >
      <ViolationNavigator
        numViolations={numViolations}
        idxOfCurrViolation={idxOfViolationBeingViewed}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}

      />
      <div className="flex flex-col gap-2">
        {violationInView && (
          <SuggestionPanel
            violation={violationInView}
            chosenSuggestions={chosenSuggestions}
            onChooseSuggestion={onChooseSuggestion}
          />
        )}
      </div>
    </div>
  );
}
