import React from "react";
import { Highlight } from "../hooks/useHighlights";

type FeatureGridProps = {
  items: Highlight[];
};

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <section id="recursos" className="grid">
      {items.map((item) => (
        <article key={item.title} className="card">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </article>
      ))}
    </section>
  );
}
