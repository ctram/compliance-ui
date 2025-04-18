import { ComplianceViolation } from "@/backend";

export type ChosenSuggestions = Record<
  string,
  {
    idxOfChosenSuggestion: number | undefined;
    isOriginalSelected: boolean | undefined;
  } | undefined
>;

export function getInitialChosenSuggestions(
  violationSuggestions: ComplianceViolation[]
) {
  const state: ChosenSuggestions = {};

  violationSuggestions.forEach((violation) => {
    state[violation.id] = {
      idxOfChosenSuggestion: undefined,
      isOriginalSelected: true,
    };
  });

  return state;
}