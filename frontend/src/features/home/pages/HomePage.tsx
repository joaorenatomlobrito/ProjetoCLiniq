import React from "react";
import { Hero } from "../components/Hero";
import { FeatureGrid } from "../components/FeatureGrid";
import { CallToAction } from "../components/CallToAction";
import { useHighlights } from "../hooks/useHighlights";

export function HomePage() {
  const highlights = useHighlights();

  return (
    <div className="page">
      <Hero />
      <FeatureGrid items={highlights} />
      <CallToAction />
      <footer className="footer">
        <span>CliniQ 2026</span>
        <span>Saude conectada com simplicidade.</span>
      </footer>
    </div>
  );
}
