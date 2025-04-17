import { useState, useEffect } from "react";
import { ActionButtonGroup } from "./ActionButtonGroup";

export function CopyReview({ originalCopy }: { originalCopy: string }) {
  const [content, setContent] = useState("Loading...");

  useEffect(() => {
    if (originalCopy !== content) {
      setContent(originalCopy);
    }
  }, [originalCopy]);

  return (
    <div className=" p-4 flex flex-col items-center">
      <div className="text-lg font-bold mb-12">Copy Review</div>
      <div className="w-2/3">
        <p>{content}</p>
      </div>
      <div className="mt-8">
        <ActionButtonGroup onApprove={() => {}} onReject={() => {}} />
      </div>
    </div>
  );
}
