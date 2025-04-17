import { ComplianceViolation } from "@/backend";

export interface ViolationSuggestion {
  violation: ComplianceViolation;
  suggestion: string;
  formattedSuggestion: string;
}

export interface ChosenSuggestions {
  [violationId: string]: ViolationSuggestion;
}

export interface SelectedSentenceInfo {
  fullSentence: string;
  violation: ComplianceViolation;
}