"use client";

import {
  ComplianceViolation,
  getComplianceViolations,
  getCopy,
  getSuggestions,
} from "@/backend";
import { CopyReview } from "@/components/CopyReview";
import { ChosenSuggestions } from "../utils/get-initial-chosen-suggestions";
import { getInitialChosenSuggestions } from "@/utils/get-initial-chosen-suggestions";
import { getSourceSentence } from "@/utils/get-source-sentence";
import { getStartAndEndIdxOfSubstring } from "@/utils/get-start-and-end-idx-of-substring";
import { useState, useEffect } from "react";
import { markupOriginalCopy } from "@/utils/markup-original-copy";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import RightPanel from "@/components/RightPanel";

export default function Page() {
  // The original copy from the backend. This is used when state is reset.
  const [originalCopy, setOriginalCopy] = useState("Loading...");

  // The copy that the user is currently working on
  const [workingCopy, setWorkingCopy] = useState<React.ReactNode>("Loading...");

  // The violations that were found in the original copy,
  // pulled from the backend
  const [violationSuggestions, setViolationSuggestions] = useState<
    ComplianceViolation[]
  >([]);

  // The index of the violation the user is currently viewing
  // in the right panel
  const [idxOfCurrViolation, setCurrViolationIdx] = useState(0);

  // Whether the user has approved the copy with or without edits
  const [hasApproved, setHasApproved] = useState(false);

  // Whether the left panel should show fragments of the original text
  // or only the suggestions.
  const [showOriginalText, setShowOriginalText] = useState(false);

  // The suggestion that the user has chosen for each violation
  const [chosenSuggestions, setChosenSuggestions] =
    useState<ChosenSuggestions>();

  // Whether the data from the backend has loaded
  const [hasDataLoaded, setHasDataLoaded] = useState(false);

  // Whether the user is in manual edit mode
  const [isManualEditMode, setIsManualEditMode] = useState(false);

  // Whether the user has manually edited the copy as
  // opposed to choosing a suggestion.
  const [didManualEdit, setDidManualEdit] = useState(false);

  // The copy that the user has manually edited
  const [editedCopy, setEditedCopy] = useState("");

  // Load the data from the backend and set the state
  useEffect(() => {
    // Simulate network request to backend
    setTimeout(() => {
      const copy = getCopy();
      setOriginalCopy(copy);
      setWorkingCopy(copy);

      const violations = getComplianceViolations();
      const suggestions = getSuggestions();

      // Hydrate the violation suggestions with the suggestions and original sentences
      // for convenience.
      const innerViolationSuggestions = violations.map((violation) => {
        const { startIdx } = getStartAndEndIdxOfSubstring(violation.text, copy);
        const originalSentence = getSourceSentence(startIdx, copy);

        return {
          ...violation,
          suggestions: suggestions[violation.id] || [],
          originalSentence,
        };
      });
      setViolationSuggestions(innerViolationSuggestions);

      const initialChosenSuggestions = getInitialChosenSuggestions(
        innerViolationSuggestions
      );
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
   * highlight original fragments and suggestions within the working copy
   * which is rendered in the left panel.
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

  // Handle clicking the PREVIOUS button in the violation panel i.e right panel
  const handleClickPrevViolation = () => {
    const prevIdx =
      (idxOfCurrViolation - 1 + violationSuggestions.length) %
      violationSuggestions.length;

    setCurrViolationIdx(prevIdx);
  };

  // Handle clicking the NEXT button in the violation panel i.e right panel
  const handleClickNextViolation = () => {
    const nextIdx = (idxOfCurrViolation + 1) % violationSuggestions.length;
    setCurrViolationIdx(nextIdx);
  };

  // Handle choosing a suggestion for a violation from the violation panel i.e right panel
  const handleChooseSuggestion = (
    violationId: string,
    isOriginalSelected: boolean | undefined,
    idxOfChosenSuggestion: number | undefined
  ) => {
    if (!chosenSuggestions) {
      return;
    }

    const chosenSuggestionsForViolation = chosenSuggestions[violationId];
    const modifiedChosenSuggestions = {
      ...chosenSuggestions,
      [violationId]: {
        ...chosenSuggestionsForViolation,
        idxOfChosenSuggestion,
        isOriginalSelected,
      },
    };
    setChosenSuggestions(modifiedChosenSuggestions);
  };

  // Handle approving the copy, with or without edits
  const handleApprove = () => {
    setHasApproved(true);
  };

  // Handle resetting the copy to the original state.
  // This is available to the user BEFORE they have approved the copy.
  const handleReset = () => {
    setHasApproved(false);
    setDidManualEdit(false);
    setIsManualEditMode(false);
    setEditedCopy("");
    const initialChosenSuggestions =
      getInitialChosenSuggestions(violationSuggestions);
    setChosenSuggestions(initialChosenSuggestions);
  };

  // Handle canceling the approval of the copy.
  // This is available to the user AFTER they have approved the copy.
  const handleCancelApproval = () => {
    setHasApproved(false);
    setDidManualEdit(false);
    setIsManualEditMode(false);
    const initialChosenSuggestions =
      getInitialChosenSuggestions(violationSuggestions);
    setChosenSuggestions(initialChosenSuggestions);
  };

  // Handle moving to the next copy.
  // Since this is a demo, we'll only review a single
  // copy.
  const handleClickNextCopy = () => {
    toast.success("There are no more violations to review.");
  };

  // Handle toggling whether to show the fragments of the original text
  // or only the chosen suggestions.
  const handleToggleOriginalText = () => {
    setShowOriginalText(!showOriginalText);
  };

  // Handle saving a manual edit.
  const handleSaveManualEdit = (text: string) => {
    setIsManualEditMode(false);
    setWorkingCopy(text);
    setEditedCopy(text);
    setDidManualEdit(true);
  };

  // Handle canceling a manual edit.
  const handleCancelManualEdit = () => {
    setIsManualEditMode(false);
  };

  // Handle double clicking a paragraph in the left panel.
  const handleDoubleClickParagraph = () => {
    if (hasApproved) {
      return;
    }

    if (didManualEdit) {
      setWorkingCopy(editedCopy);
    } else {
      setWorkingCopy(originalCopy);
    }

    setIsManualEditMode(true);
    setDidManualEdit(false);
  };

  const inner =
    hasDataLoaded && chosenSuggestions ? (
      <div className="flex ">
        <div className="w-1/2 border-r border-gray-200 px-40">
          <div className="left-panel">
            <CopyReview
              workingCopy={workingCopy}
              hasApproved={hasApproved}
              onApprove={handleApprove}
              onReset={handleReset}
              onCancelApproval={handleCancelApproval}
              onNextCopy={handleClickNextCopy}
              showOriginalText={showOriginalText}
              onClickShowOriginalText={handleToggleOriginalText}
              isManualEditMode={isManualEditMode}
              onSaveManualEdit={handleSaveManualEdit}
              onCancelManualEdit={handleCancelManualEdit}
              onDoubleClickParagraph={handleDoubleClickParagraph}
            />
          </div>
        </div>
        <div className="w-1/2 px-40">
          <RightPanel
            isManualEditMode={isManualEditMode}
            didManualEdit={didManualEdit}
            hasApproved={hasApproved}
            chosenSuggestions={chosenSuggestions}
            violationSuggestions={violationSuggestions}
            onClickPrev={handleClickPrevViolation}
            onClickNext={handleClickNextViolation}
            onChooseSuggestion={handleChooseSuggestion}
            idxOfCurrViolation={idxOfCurrViolation}
          />
        </div>
      </div>
    ) : (
      <div className="text-center">Loading...</div>
    );

  return (
    <div className="flex flex-col page">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-8 text-center">Compliance Review</h1>
      {inner}
    </div>
  );
}
