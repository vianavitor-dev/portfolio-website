import type { ReactNode } from "react";

const additionalTechnicalTerms = [
  "Mercado Pago",
  "Salesforce Accounts",
  "Scheduler",
  "Database Connector",
  "Salesforce Connector",
  "CONAIDUC",
  "FATEC Ourinhos",
  "JPA",
  "JWT",
  "CI",
  "AI",
  "AWS Bucket",
];

type TechnicalDescriptionProps = {
  text: string;
  technicalTerms: string[];
};

export default function TechnicalDescription({ text, technicalTerms }: TechnicalDescriptionProps) {
  const terms = [...new Set([...technicalTerms, ...additionalTechnicalTerms])]
    .filter(Boolean)
    .sort((left, right) => right.length - left.length);

  if (terms.length === 0) return text;

  const termPattern = new RegExp(
    `(?<![\\p{L}\\p{N}_])(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![\\p{L}\\p{N}_])`,
    "giu"
  );
  const content: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(termPattern)) {
    const index = match.index;
    const term = match[0];

    if (index > lastIndex) content.push(text.slice(lastIndex, index));
    content.push(
      <span className="notranslate" translate="no" key={`${index}-${term}`}>
        {term}
      </span>
    );
    lastIndex = index + term.length;
  }

  if (lastIndex === 0) return text;
  if (lastIndex < text.length) content.push(text.slice(lastIndex));

  return content;
}
