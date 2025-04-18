"use client";

import {
  ComplianceViolation,
  getComplianceViolations,
  getCopy,
  getSuggestions,
} from "@/backend";
import { CopyReview } from "@/components/CopyReview";
import { ViolationSuggestionsPanel } from "@/components/ViolationSuggestionsPanel";
import { ChosenSuggestions } from "../utils/get-initial-chosen-suggestions";
import { getInitialChosenSuggestions } from "@/utils/get-initial-chosen-suggestions";
import { getSourceSentence } from "@/utils/get-source-sentence";
import { getStartAndEndIdxOfSubstring } from "@/utils/get-start-and-end-idx-of-substring";
import { useState, useEffect } from "react";
import { markupOriginalCopy } from "@/utils/markup-original-copy";
import React from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [originalCopy, setOriginalCopy] = useState("Loading...");
  const [workingCopy, setWorkingCopy] = useState<React.ReactNode>("Loading...");
  const [violationSuggestions, setViolationSuggestions] = useState<
    ComplianceViolation[]
  >([]);
  const [idxOfCurrViolation, setCurrViolationIdx] = useState(0);
  const [hasApproved, setHasApproved] = useState(false);
  const [showOriginalText, setShowOriginalText] = useState(false);
  const [chosenSuggestions, setChosenSuggestions] =
    useState<ChosenSuggestions>();
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const [isManualEditMode, setIsManualEditMode] = useState(false);
  const [didManualEdit, setDidManualEdit] = useState(false);
  const [editedCopy, setEditedCopy] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const innerOriginalCopy = getCopy();
      setOriginalCopy(innerOriginalCopy);
      setWorkingCopy(innerOriginalCopy);

      const violations = getComplianceViolations();
      const suggestions = getSuggestions();

      const violationSuggestions = violations.map((violation) => {
        const { startIdx } = getStartAndEndIdxOfSubstring(
          violation.text,
          innerOriginalCopy
        );
        const sourceSentence = getSourceSentence(startIdx, innerOriginalCopy);

        const {
          startIdx: startIdxOfOriginalFragment,
          endIdx: endIdxOfOriginalFragment,
        } = getStartAndEndIdxOfSubstring(violation.text, innerOriginalCopy);

        /**
         * I think the default 'start' and 'end' field values are incorrect
         * or I'm misunderstanding how to use them, so updating them here
         */
        return {
          ...violation,
          start: startIdxOfOriginalFragment,
          end: endIdxOfOriginalFragment,
          suggestions: suggestions[violation.id] || [],
          sourceSentence,
        };
      });
      setViolationSuggestions(violationSuggestions);

      const initialChosenSuggestions =
        getInitialChosenSuggestions(violationSuggestions);
      setChosenSuggestions(initialChosenSuggestions);
      setHasDataLoaded(true);
    }, 1000);
  }, []);

  const handleClickSentence = (violationId: string) => {
    const violationIdx = violationSuggestions.findIndex(
      (violation) => violation.id === violationId
    );
    setCurrViolationIdx(violationIdx);
  };

  /**
   * highlight fragments within the original paragraph
   */
  useEffect(() => {
    if (
      violationSuggestions.length === 0 ||
      !chosenSuggestions ||
      isManualEditMode ||
      didManualEdit
    ) {
      return;
    }

    const classNameIfApproved = '"p-1"';
    const classNameForViolationInView = hasApproved
      ? classNameIfApproved
      : "hover:cursor-pointer p-1  border-b-3 border-black-800";
    const classNameForViolationNotInView = hasApproved
      ? classNameIfApproved
      : "hover:cursor-pointer p-1  border-b-1 border-black-200";

    const updatedMarkup = markupOriginalCopy({
      originalCopy,
      violationSuggestions,
      chosenSuggestions,
      onClickSentence: hasApproved ? () => {} : handleClickSentence,
      idOfCurrViolation: violationSuggestions[idxOfCurrViolation].id,
      classNameForViolationInView,
      classNameForViolationNotInView,
      showOriginalText,
    });

    setWorkingCopy(updatedMarkup);
  }, [
    chosenSuggestions,
    originalCopy,
    violationSuggestions,
    idxOfCurrViolation,
    hasApproved,
    showOriginalText,
    isManualEditMode,
    didManualEdit,
  ]);

  const handleClickPrev = () => {
    const prevIdx =
      (idxOfCurrViolation - 1 + violationSuggestions.length) %
      violationSuggestions.length;

    setCurrViolationIdx(prevIdx);
  };
  const handleClickNext = () => {
    const nextIdx = (idxOfCurrViolation + 1) % violationSuggestions.length;
    setCurrViolationIdx(nextIdx);
  };

  const handleChooseSuggestion = (
    violationId: string,
    isOriginalSelected: boolean | undefined,
    idxOfChosenSuggestion: number | undefined
  ) => {
    if (!chosenSuggestions) {
      return;
    }

    const chosenSuggestionsForViolation = chosenSuggestions[violationId];
    const newState = {
      ...chosenSuggestions,
      [violationId]: {
        ...chosenSuggestionsForViolation,
        idxOfChosenSuggestion,
        isOriginalSelected,
      },
    };
    setChosenSuggestions(newState);
  };

  const handleApprove = () => {
    setHasApproved(true);
  };

  const handleReset = () => {
    setHasApproved(false);
    const initialChosenSuggestions =
      getInitialChosenSuggestions(violationSuggestions);
    setChosenSuggestions(initialChosenSuggestions);
  };

  const handleCancelApproval = () => {
    setHasApproved(false);
    setDidManualEdit(false);
    setIsManualEditMode(false);
    const initialChosenSuggestions =
      getInitialChosenSuggestions(violationSuggestions);
    setChosenSuggestions(initialChosenSuggestions);
  };

  const handleNext = () => {
    /**
     * Since this is a demo, we'll only review a single
     * copy.
     */
    toast.success("There are no more violations to review.");
  };

  const handleToggleOriginalText = () => {
    setShowOriginalText(!showOriginalText);
  };

  const handleSaveManualEdit = (text: string) => {
    setIsManualEditMode(false);
    setWorkingCopy(text);
    setEditedCopy(text);
    setDidManualEdit(true);
  };

  const handleCancelManualEdit = () => {
    setIsManualEditMode(false);
  };

  const handleDoubleClickParagraph = () => {
    if (didManualEdit) {
      setWorkingCopy(editedCopy);
    } else {
      setWorkingCopy(originalCopy);
    }

    setIsManualEditMode(true);
    setDidManualEdit(false);
  };

  const rightPanel = hasApproved ? (
    <div className="p-4 flex flex-col items-center">
      <div className="text-xl font-bold mb-4">Copy Has Been Approved</div>
      <p className="text-sm text-gray-500">
        You can now move on to the next copy.
      </p>
    </div>
  ) : (
    <div>
      {chosenSuggestions && (
        <ViolationSuggestionsPanel
          violationSuggestions={violationSuggestions}
          onClickPrev={handleClickPrev}
          onClickNext={handleClickNext}
          onChooseSuggestion={handleChooseSuggestion}
          chosenSuggestions={chosenSuggestions}
          idxOfViolationBeingViewed={idxOfCurrViolation}
        />
      )}
    </div>
  );

  const inner =
    hasDataLoaded && chosenSuggestions ? (
      <div className="flex ">
        <div className="w-1/2 border-r border-gray-200 px-40 left-panel">
          <CopyReview
            workingCopy={workingCopy}
            hasApproved={hasApproved}
            onApprove={handleApprove}
            onReset={handleReset}
            onCancelApproval={handleCancelApproval}
            onNext={handleNext}
            showOriginalText={showOriginalText}
            onClickShowOriginalText={handleToggleOriginalText}
            isManualEditMode={isManualEditMode}
            onSaveManualEdit={handleSaveManualEdit}
            onCancelManualEdit={handleCancelManualEdit}
            onDoubleClickParagraph={handleDoubleClickParagraph}
          />
        </div>
        <div className="w-1/2 px-40 right-panel">{rightPanel}</div>
      </div>
    ) : (
      <div className="text-center">Loading...</div>
    );

  return (
    <div className="flex flex-col page">
      <h1 className="text-2xl font-bold mb-8 text-center">Compliance Review</h1>
      {inner}
    </div>
  );
}
