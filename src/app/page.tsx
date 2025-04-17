"use client";

import {
  ComplianceViolation,
  getComplianceViolations,
  getCopy,
  getSuggestions,
} from "@/backend";
import { CopyReview } from "@/components/CopyReview";
import { ViolationSuggestionsPanel } from "@/components/ViolationSuggestionsPanel";
import {
  ChosenSuggestions,
  getInitialChosenSuggestions,
} from "@/utils/get-initial-chosen-suggestions";
import { getSourceSentence } from "@/utils/get-source-sentence";
import { getStartAndEndIdxOfSubstring } from "@/utils/get-start-and-end-idx-of-substring";

import { useState, useEffect } from "react";

export default function Page() {
  const [originalCopy, setOriginalCopy] = useState("Loading...");
  const [violationSuggestions, setViolationSuggestions] = useState<
    ComplianceViolation[]
  >([]);
  const [currViolationIdx, setCurrViolationIdx] = useState(0);

  const initialChosenSuggestions =
    getInitialChosenSuggestions(violationSuggestions);
  const [chosenSuggestions, setChosenSuggestions] = useState<ChosenSuggestions>(
    initialChosenSuggestions
  );

  useEffect(() => {
    setTimeout(() => {
      const innerOriginalCopy = getCopy();
      setOriginalCopy(innerOriginalCopy);
      const violations = getComplianceViolations();
      const suggestions = getSuggestions();
      const violationSuggestions = violations.map((violation) => {
        const { startIdx } = getStartAndEndIdxOfSubstring(
          violation.text,
          innerOriginalCopy
        );
        const sourceSentence = getSourceSentence(startIdx, innerOriginalCopy);

        console.log({
          sourceSentence,
        });

        return {
          ...violation,
          suggestions: suggestions[violation.id] || [],
          sourceSentence,
        };
      });
      setViolationSuggestions(violationSuggestions);
    }, 1000);
  }, []);

  const handleClickPrev = () => {
    const prevIdx =
      (currViolationIdx - 1 + violationSuggestions.length) %
      violationSuggestions.length;
    setCurrViolationIdx(prevIdx);
  };
  const handleClickNext = () => {
    const nextIdx = (currViolationIdx + 1) % violationSuggestions.length;
    setCurrViolationIdx(nextIdx);
  };

  const handleSelectSuggestion = (
    violationId: string,
    isOriginalSelected: boolean | undefined,
    idxOfSelectedSuggestion: number | undefined
  ) => {
    const chosenSuggestionsForViolation = chosenSuggestions[violationId];
    const newState = {
      ...chosenSuggestions,
      [violationId]: {
        ...chosenSuggestionsForViolation,
        idxOfSelectedSuggestion,
        isOriginalSelected,
      },
    };
    setChosenSuggestions(newState);
  };

  return (
    <>
      <div className="flex ">
        <div className="w-1/2 shadow-md">
          <CopyReview originalCopy={originalCopy} />
        </div>
        <div className="w-1/2 shadow-md">
          <ViolationSuggestionsPanel
            violationSuggestions={violationSuggestions}
            idxOfViolationInView={currViolationIdx}
            onClickPrev={handleClickPrev}
            onClickNext={handleClickNext}
            onSelectSuggestion={handleSelectSuggestion}
            chosenSuggestions={chosenSuggestions}
          />
        </div>
      </div>
    </>
  );
}
