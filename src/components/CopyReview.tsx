import React from "react";
import { ActionButton } from "./ActionButton";
import { TextEditor } from "./TextEditor";
import { extractTextFromReactElements } from "@/utils/extract-text-from-react-elements";

function CopyReviewWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
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
  onNext,
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
  onNext: () => void;
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
        <div className="h-[50vh]">
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
      <ActionButton text="Next" onClick={onNext} />
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
    <div className="text-green-700 text-center mb-4 font-bold">
      Copy has been approved. <span className="text-green-700">&#x2714;</span>
    </div>
  ) : null;

  return (
    <CopyReviewWrapper>
      <div className="leading-14" onDoubleClick={onDoubleClickParagraph}>
        {workingCopy}
      </div>
      {approvedMsg}
      <div className="flex flex-row gap-2 mt-4">{actionButtons}</div>
    </CopyReviewWrapper>
  );
}
