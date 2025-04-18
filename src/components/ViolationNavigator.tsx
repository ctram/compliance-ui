"use client";

import { ActionButton } from "./ActionButton";

export function ViolationNavigator({
  numViolations,
  idxOfCurrViolation,
  onClickPrev,
  onClickNext,
}: {
  numViolations: number;
  idxOfCurrViolation: number;
  onClickPrev: () => void;
  onClickNext: () => void;
}) {
  return (
    <div className="rounded-md p-4 text-center flex flex-col items-center">
      <div className="text-xl font-bold">
        Violation {idxOfCurrViolation + 1} of {numViolations}
      </div>
      <div className="flex flex-row gap-2 mt-4">
        <ActionButton text="Prev" onClick={onClickPrev} />
        <ActionButton text="Next" onClick={onClickNext} />
      </div>
    </div>
  );
}
