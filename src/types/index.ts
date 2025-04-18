import { ComplianceViolation } from "@/backend";

export interface ViolationSuggestion {
  violation: ComplianceViolation;
  suggestion: string;
  formattedSuggestion: string;
}

export interface ChosenSuggestion {
  idxOfChosenSuggestion?: number;
  isOriginalSelected?: boolean;
}



export interface SelectedSentenceInfo {
  fullSentence: string;
  violation: ComplianceViolation;
}