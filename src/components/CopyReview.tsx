import { useState, useEffect } from "react";
import React from "react";
import { ActionButton } from "./ActionButton";

export function CopyReview({
  workingCopy,
  hasApproved,
  onApprove,
  onReset,
  onCancelApproval,
  onNext,
}: {
  workingCopy: React.ReactNode;
  hasApproved: boolean;
  onApprove: () => void;
  onReset: () => void;
  onCancelApproval: () => void;
  onNext: () => void;
}) {
  const [content, setContent] = useState<React.ReactNode>("Loading...");

  useEffect(() => {
    if (workingCopy !== content) {
      setContent(workingCopy);
    }
  }, [workingCopy]);

  if (hasApproved) {
    return (
      <div className=" p-4 flex flex-col items-center">
        <div className="text-lg font-bold mb-8">Copy Review</div>
        <div className="w-2/3">{content}</div>
        <div className="flex flex-row gap-2">
          <ActionButton text="Cancel Approval" onClick={onCancelApproval} />
          <ActionButton text="Next" onClick={onNext} />
        </div>
      </div>
    );
  }

  return (
    <div className=" p-4 flex flex-col items-center">
      <div className="text-lg font-bold mb-8">Copy Review</div>
      <div className="w-2/3 leading-14">{content}</div>
        <div className="flex flex-row gap-2">
          <ActionButton text="Approve" onClick={onApprove} />
          <ActionButton text="Reset" onClick={onReset} />
        </div>
    </div>
  );
}
