"use client";

import { ActionButton } from "./ActionButton";

export function ViolationNavigator({
  numViolations,
  currViolationIdx,
  onClickPrev,
  onClickNext,
}: {
  numViolations: number;
  currViolationIdx: number;
  onClickPrev: () => void;
  onClickNext: () => void;
}) {
  return (
    <div className="rounded-md p-4 text-center flex flex-col items-center">
      <div className="text-lg font-bold">
        Violation {currViolationIdx + 1} of {numViolations}
      </div>
      <div className="flex flex-row gap-2 mt-4">
        <ActionButton text="Prev" onClick={onClickPrev} />
        <ActionButton text="Next" onClick={onClickNext} />
      </div>
    </div>
  );
}
