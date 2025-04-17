import { ActionButton } from "./ActionButton";

export function ActionButtonGroup({
  onApprove,
  onReject,
}: {
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className="flex flex-row gap-2">
      <ActionButton text="Approve" onClick={onApprove} />
      <ActionButton text="Reject" onClick={onReject} />
    </div>
  );
}