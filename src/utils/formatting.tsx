import React from 'react';

export function findSentence(text: string, violationText: string): string {
  // Find the position of the violation text
  const violationIndex = text.indexOf(violationText);
  if (violationIndex === -1) return violationText;

  // Find the start of the sentence (going backwards to find period, exclamation, question mark or start of text)
  let startIndex = violationIndex;
  while (startIndex > 0 && !text[startIndex - 1].match(/[.!?]/)) {
    startIndex--;
  }

  // Find the end of the sentence (going forwards to find period, exclamation, question mark or end of text)
  let endIndex = violationIndex + violationText.length;
  while (endIndex < text.length && !text[endIndex].match(/[.!?]/)) {
    endIndex++;
  }
  endIndex++; // Include the punctuation mark

  return text.slice(startIndex, endIndex).trim();
}

export function formatSuggestion(
  originalSentence: string,
  violationText: string,
  suggestion: string
): { element: React.ReactElement; formattedText: string } {
  // Find the position of the violation text in the sentence
  const violationIndex = originalSentence.indexOf(violationText);

  // Format the suggestion based on its position
  let formattedSuggestion = suggestion.trim();

  // Handle capitalization
  if (violationIndex === 0) {
    formattedSuggestion =
      formattedSuggestion.charAt(0).toUpperCase() +
      formattedSuggestion.slice(1);
  } else {
    formattedSuggestion =
      formattedSuggestion.charAt(0).toLowerCase() +
      formattedSuggestion.slice(1);
  }

  // Handle punctuation
  if (violationIndex + violationText.length < originalSentence.length) {
    formattedSuggestion = formattedSuggestion.replace(/[.,]+$/, "");
  }

  // Create the modified sentence
  const before = originalSentence.slice(0, violationIndex);
  const after = originalSentence.slice(violationIndex + violationText.length);

  // Ensure we don't have double spaces
  const modifiedSentence =
    `${before}<span class="bg-green-200 dark:bg-green-900/40">${formattedSuggestion}</span>${after}`
      .replace(/\s+/g, " ")
      .replace(/\s+\./g, ".")
      .replace(/\s+,/g, ",");

  return {
    element: (
      <div
        className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-colors"
        dangerouslySetInnerHTML={{ __html: modifiedSentence }}
      />
    ),
    formattedText: formattedSuggestion,
  };
}

export function formatSelectedSentence(sentence: string, violationText: string) {
  const parts = sentence.split(violationText);
  return (
    <>
      {parts[0]}
      <span className="bg-red-200 dark:bg-red-900/40 line-through">
        {violationText}
      </span>
      {parts[1]}
    </>
  );
}

export function getSeverityColor(severity: string) {
  switch (severity.toLowerCase()) {
    case "high":
      return "text-red-600 dark:text-red-400";
    case "medium":
      return "text-orange-600 dark:text-orange-400";
    case "low":
      return "text-yellow-600 dark:text-yellow-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
} 