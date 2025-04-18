import { useState } from "react";
import { ActionButton } from "./ActionButton";

export function TextEditor({
  initialText,
  onClickSave,
  onClickCancel,
}: {
  initialText: string;
  onClickSave: (text: string) => void;
  onClickCancel: () => void;
}) {
  const [text, setText] = useState(initialText);

  return (
    <div className="h-full flex flex-col">
      <textarea
        className="flex-1 resize-none p-4 border rounded-md mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex flex-row gap-2 justify-center">
        <ActionButton text="Save" onClick={() => onClickSave(text)} />
        <ActionButton text="Cancel" onClick={onClickCancel} />
      </div>
    </div>
  );
}
