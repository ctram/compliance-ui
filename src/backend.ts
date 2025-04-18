export function getCopy() {
  return "Our proprietary investment algorithm is designed by top-tier analysts and uses cutting-edge machine learning. It guarantees consistent returns of up to 20% annually. We’ve helped hundreds of investors beat the market and build generational wealth. Contact us today to learn how we can make you our next success story.";
}

export type ComplianceViolation = {
  id: string;
  text: string;
  start: number;
  end: number;
  length: number;
  type: string;
  message: string;
  severity: string;
  suggestions?: string[];
  sourceSentence?: string;
  startIdxOfOriginalFragment?: number;
  endIdxOfOriginalFragment?: number;
};

export function getComplianceViolations(): ComplianceViolation[] {
  return [
    {
      id: "v1",
      text: "guarantees consistent returns of up to 20% annually",
      start: 102,
      end: 153,
      length: 51,
      type: "Guaranteed Returns",
      message: "Avoid implying guaranteed or predictable returns.",
      severity: "high",
    },
    {
      id: "v2",
      text: "beat the market and build generational wealth",
      start: 180,
      end: 226,
      length: 46,
      type: "Promissory Language",
      message: "Avoid promising outperformance or guaranteed success.",
      severity: "medium",
    },
    {
      id: "v3",
      text: "make you our next success story",
      start: 260,
      end: 292,
      length: 32,
      type: "Testimonials",
      message: "Avoid vague success testimonials without disclosures.",
      severity: "low",
    },
  ];
}

export type Suggestions = Record<string, string[]>;

export function getSuggestions(): Suggestions {
  return {
    v1: [
      "Has historically delivered returns of up to 20% annually, though past performance is not indicative of future results.",
      "aims to achieve strong annual returns, with some investors seeing gains as high as 20% in certain years.",
      "Leverages advanced modeling to pursue returns that, in past performance, have reached up to 20% annually.",
    ],
    v2: [
      "strive for long-term growth and financial resilience",
      "Help investors pursue their financial goals with confidence",
      "support informed investing strategies aimed at building lasting value",
    ],
    v3: [
      "Discuss how our approach might align with your financial goals",
      "Explore whether our strategy is a good fit for your needs",
      "See how our methodology could support your investment journey",
    ],
  };
}
