import { ComplianceViolation } from "@/backend";
import { SelectedSentenceInfo, ChosenSuggestions } from "@/types";

export function markViolations(
    text: string,
    violations: ComplianceViolation[],
    chosenChoices: ChosenSuggestions,
    hasApproved: boolean,
    selectedSentence: SelectedSentenceInfo | null,
    showOriginal: boolean
  ) {
    let markedText = text;
  
    // highlight the selected sentence if it hasn't been accepted
    if (selectedSentence && !hasApproved) {
      // escape special characters
      const sentenceRegex = new RegExp(
        selectedSentence.fullSentence.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "g"
      );
      markedText = markedText.replace(
        sentenceRegex,
        `<span class="border-2 border-yellow-400 dark:border-yellow-500 rounded-sm">${selectedSentence.fullSentence}</span>`
      );
    }
  
    violations.forEach((violation) => {
      const choice = chosenChoices[violation.id];
      const isSelected = selectedSentence?.violation.id === violation.id;
      
      // Encode the violation data as a data attribute
      const violationData = encodeURIComponent(JSON.stringify(violation));
      const dataAttrs = !hasApproved ? `data-violation="${violationData}" data-fulltext="${encodeURIComponent(text)}"` : '';
      
      if (choice) {
        // Handle suggestion display
        const suggestionText = choice.formattedSuggestion;
        markedText = markedText.replace(
          new RegExp(violation.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
          showOriginal
            ? `<span class="bg-red-100 dark:bg-red-900/30 line-through">${violation.text}</span><span class="bg-green-100 dark:bg-green-900/30">${suggestionText}</span>`
            : `<span class="bg-green-100 dark:bg-green-900/30">${suggestionText}</span>`
        );
      } else {
        // Keep yellow highlighting for unchanged violations, but only make clickable if not accepted
        const className = `bg-yellow-100 dark:bg-yellow-900/30 ${!hasApproved ? "cursor-pointer" : ""} ${isSelected ? "border-2 border-yellow-400 dark:border-yellow-600" : ""}`;
        markedText = markedText.replace(
          new RegExp(violation.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
          `<span class="${className}" ${!hasApproved ? dataAttrs : ""}>${violation.text}</span>`
        );
      }
    });
  
    return markedText;
  }