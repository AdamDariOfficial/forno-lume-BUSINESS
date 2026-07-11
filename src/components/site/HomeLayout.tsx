import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// Homepage layout: the Navbar starts hidden and fades in after the hero
// threshold, so main does NOT reserve top space — the hero owns the fold.
export function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}