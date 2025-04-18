import React from "react";
/**
 * Given a root React element, extract the text from all of the
 * child elements, ignoring React elements themselves e.g. spans, divs, etc.
 * Attempts to preserve whitespace in a context-aware manner.
 */
export function extractTextFromReactElements(element: React.ReactNode): string {
  if (typeof element === "string") {
    return element;
  }

  if (Array.isArray(element)) {
    // Process each element individually
    const processedElements = element.map((item) => {
      return extractTextFromReactElements(item);
    });

    // Join elements without adding extra spaces
    // This preserves the original structure better
    return processedElements.join("");
  }

  if (React.isValidElement(element)) {
    const typedElement = element as React.ReactElement<{
      children?: React.ReactNode;
    }>;

    // Check if this is a block-level element that should preserve newlines
    const isBlockElement = [
      "div",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "section",
      "article",
      "aside",
      "header",
      "footer",
      "nav",
      "main",
      "form",
      "table",
      "ul",
      "ol",
      "li",
    ].includes(typedElement.type as string);

    const extractedText = extractTextFromReactElements(
      typedElement.props.children ?? ""
    );

    // Add newlines for block elements to preserve paragraph structure
    return isBlockElement ? extractedText + "\n" : extractedText;
  }

  return "";
}
