"use client";

import { ComplianceViolation } from "@/backend";
import { ViolationSuggestionsPanel } from "@/components/ViolationSuggestionsPanel";
import { ChosenSuggestions } from "../utils/get-initial-chosen-suggestions";
import React from "react";

function RightPanelWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center right-panel">{children}</div>
  );
}

export default function RightPanel({
  isManualEditMode,
  didManualEdit,
  hasApproved,
  chosenSuggestions,
  violationSuggestions,
  onClickPrev,
  onClickNext,
  onChooseSuggestion,
  idxOfCurrViolation,
}: {
  isManualEditMode: boolean;
  didManualEdit: boolean;
  hasApproved: boolean;
  chosenSuggestions: ChosenSuggestions;
  violationSuggestions: ComplianceViolation[];
  onClickPrev: () => void;
  onClickNext: () => void;
  onChooseSuggestion: (
    violationId: string,
    isOriginalSelected: boolean | undefined,
    idxOfChosenSuggestion: number | undefined
  ) => void;
  idxOfCurrViolation: number;
}) {
  if (hasApproved) {
    return (
      <RightPanelWrapper>
        <div className="text-xl font-bold mb-4">Copy Has Been Approved</div>
        <p className="text-sm text-gray-500">
          You can now move on to the next copy.
        </p>
      </RightPanelWrapper>
    );
  }

  if (isManualEditMode) {
    return (
      <RightPanelWrapper>
        <div className="text-xl font-bold mb-4">Manual Edit Mode</div>
        <p className="text-sm text-gray-500">
          Please edit the copy directly in the left panel.
        </p>
      </RightPanelWrapper>
    );
  }

  if (didManualEdit) {
    return (
      <RightPanelWrapper>
        <div className="text-xl font-bold mb-4">Copy Was Manually Edited</div>
        <p className="text-sm text-gray-500">
          Please approve or reset the copy.
        </p>
      </RightPanelWrapper>
    );
  }

  return (
    <RightPanelWrapper>
      {chosenSuggestions && (
        <ViolationSuggestionsPanel
          violationSuggestions={violationSuggestions}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
          onChooseSuggestion={onChooseSuggestion}
          chosenSuggestions={chosenSuggestions}
          idxOfViolationBeingViewed={idxOfCurrViolation}
        />
      )}
    </RightPanelWrapper>
  );
}
