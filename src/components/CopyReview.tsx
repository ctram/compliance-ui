import React from "react";
import { ActionButton } from "./ActionButton";

export function CopyReview({
  workingCopy,
  hasApproved,
  onApprove,
  onReset,
  onCancelApproval,
  onNext,
  showOriginalText,
  onClickShowOriginalText,
}: {
  workingCopy: React.ReactNode;
  hasApproved: boolean;
  onApprove: () => void;
  onReset: () => void;
  onCancelApproval: () => void;
  onNext: () => void;
  showOriginalText: boolean;
  onClickShowOriginalText: () => void;
}) {
  const toggleOriginalTextButton = showOriginalText
    ? "Hide Original Text"
    : "Show Original Text";

  const actionButtons = hasApproved ? (
    <>
      <ActionButton text="Cancel Approval" onClick={onCancelApproval} />
      <ActionButton text={toggleOriginalTextButton} onClick={onClickShowOriginalText} />
      <ActionButton text="Next" onClick={onNext} />
    </>
  ) : (
    <>
      <ActionButton text="Approve" onClick={onApprove} />
      <ActionButton text={toggleOriginalTextButton} onClick={onClickShowOriginalText} />
      <ActionButton text="Reset" onClick={onReset} />
    </>
  );

  const approvedMsg = hasApproved ? (
    <div className="text-green-700 text-center mb-4 font-bold">
      Copy has been approved. <span className="text-green-700">&#x2714;</span>
    </div>
  ) : null;

  return (
    <div className=" p-4 flex flex-col items-center">
      <div className="text-xl font-bold mb-8">Copy Review</div>
      <div className="w-2/3 leading-14">{workingCopy}</div>
      {approvedMsg}
      <div className="flex flex-row gap-2 mt-4">{actionButtons}</div>
    </div>
  );
}
