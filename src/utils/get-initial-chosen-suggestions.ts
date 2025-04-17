import { ComplianceViolation } from "@/backend";

export type ChosenSuggestions = Record<
  string,
  {
    idxOfSelectedSuggestion: number | undefined;
    isOriginalSelected: boolean | undefined;
  } | undefined
>;

export function getInitialChosenSuggestions(
  violationSuggestions: ComplianceViolation[]
) {
  const state: ChosenSuggestions = {};

  violationSuggestions.forEach((violation) => {
    state[violation.id] = {
      idxOfSelectedSuggestion: undefined,
      isOriginalSelected: false,
    };
  });

  return state;
}