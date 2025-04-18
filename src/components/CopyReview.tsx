import React from "react";
import { ActionButton } from "./ActionButton";
import { TextEditor } from "./TextEditor";
import { extractTextFromReactElements } from "@/utils/extract-text-from-react-elements";

function CopyReviewWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col copy-review-wrapper">
      <div className="text-xl font-bold mb-8 text-center">Copy Review</div>
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}

export function CopyReview({
  workingCopy,
  hasApproved,
  onApprove,
  onReset,
  onCancelApproval,
  onNextCopy,
  showOriginalText,
  onClickShowOriginalText,
  isManualEditMode,
  onSaveManualEdit,
  onCancelManualEdit,
  onDoubleClickParagraph,
}: {
  workingCopy: React.ReactNode;
  hasApproved: boolean;
  onApprove: () => void;
  onReset: () => void;
  onCancelApproval: () => void;
  onNextCopy: () => void;
  showOriginalText: boolean;
  onClickShowOriginalText: () => void;
  isManualEditMode: boolean;
  onSaveManualEdit: (text: string) => void;
  onCancelManualEdit: () => void;
  onDoubleClickParagraph: () => void;
}) {
  if (isManualEditMode) {
    const text = extractTextFromReactElements(workingCopy);

    return (
      <CopyReviewWrapper>
        <div className="h-[50vh] w-full">
          <TextEditor
            initialText={text}
            onClickSave={onSaveManualEdit}
            onClickCancel={onCancelManualEdit}
          />
        </div>
      </CopyReviewWrapper>
    );
  }

  const toggleOriginalTextButton = showOriginalText
    ? "Hide Original Text"
    : "Show Original Text";

  const actionButtons = hasApproved ? (
    <>
      <ActionButton text="Cancel Approval" onClick={onCancelApproval} />
      <ActionButton
        text={toggleOriginalTextButton}
        onClick={onClickShowOriginalText}
      />
      <ActionButton text="Next Copy" onClick={onNextCopy} />
    </>
  ) : (
    <>
      <ActionButton text="Approve" onClick={onApprove} />
      <ActionButton
        text={toggleOriginalTextButton}
        onClick={onClickShowOriginalText}
      />
      <ActionButton text="Reset" onClick={onReset} />
    </>
  );

  const approvedMsg = hasApproved ? (
    <div className="text-green-700 text-center m-4 font-bold">
      Copy has been approved. <span className="text-green-700">&#x2714;</span>
    </div>
  ) : null;

  return (
    <CopyReviewWrapper>
      {!isManualEditMode && (
        <div className="leading-[3.5rem]" onDoubleClick={onDoubleClickParagraph}>
          {workingCopy}
        </div>
      )}
      {approvedMsg}
      <div className="flex flex-row gap-2 mt-6">{actionButtons}</div>
      {!hasApproved && (
        <div className="mt-10 text-md text-gray-400">
          To manually edit the copy, double click on any text that is not a
          violation. Violations are underlined.
        </div>
      )}
    </CopyReviewWrapper>
  );
}
