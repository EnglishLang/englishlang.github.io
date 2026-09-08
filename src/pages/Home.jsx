import React from "react";
import Navbar from "@/components/home/Navbar";
import CodeMorphHero from "@/components/home/CodeMorphHero";
import Commitments from "@/components/home/Commitments";
import Philosophy from "@/components/home/Philosophy";
import BenchmarksTeaser from "@/components/home/BenchmarksTeaser";
import OpenInternals from "@/components/home/OpenInternals";
import CompilerFooter from "@/components/home/CompilerFooter";
export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Added id="hero" wrapper here */}
        <div id="hero">
          <CodeMorphHero />
        </div>
        <Commitments />
        <Philosophy />
        <BenchmarksTeaser />
        <OpenInternals />
      </main>
      <CompilerFooter />
    </div>
  );
}
