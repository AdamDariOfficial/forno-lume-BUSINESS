import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// Layout wrapper for internal pages. Navbar is fixed, so main gets top
// padding to avoid being hidden underneath it. Homepage does its own
// layout (hero owns the top space) and does NOT use this wrapper.
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}