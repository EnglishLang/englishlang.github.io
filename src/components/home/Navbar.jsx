import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Single source of truth for every nav item. To add a page once it ships,
// just add { label, to, status: "done" } here — nothing else needs to
// change. To tease something upcoming, add { label, status: "soon" }.
const navItems = [
  { label: "Home", to: "/", status: "done" },
  { label: "Downloads", to: "/downloads", status: "done" },
  { label: "License", to: "/license", status: "done" },
  { label: "Beta Docs", to: "/beta-docs", status: "done" },
  { label: "Progress", to: "/progress", status: "done" },
];

function NavLink({ item, onNavigate, size = "sm" }) {
  const textSize = size === "sm" ? "text-sm" : "text-base";

  if (item.status === "done") {
    return (
      <Link
        to={item.to ?? `/${item.label.toLowerCase()}`}
        onClick={onNavigate}
        className={`${textSize} text-foreground/80 hover:text-foreground transition-colors`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <span
      className={`${textSize} text-muted-foreground/60 flex items-center gap-1.5 cursor-not-allowed select-none`}
      title="Coming soon"
    >
      {item.label}
      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-border text-muted-foreground/50">
        Soon
      </span>
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // If the window grows past the mobile breakpoint while the menu is open
  // (rotating a tablet, resizing a browser), close it so it doesn't get
  // stuck open behind the desktop nav.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const doneItems = navItems.filter((item) => item.status === "done");
  const soonItems = navItems.filter((item) => item.status === "soon");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-16">
        <Link
          to="/#top"
          className="flex items-center gap-2 group"
          onClick={() => setMenuOpen(false)}
        >
          <span className="font-display font-semibold text-lg tracking-tight text-foreground">
            english<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop nav. Real pages (`doneItems`) always show from md up.
            "Soon" teasers only show from lg up, so as doneItems grows, the
            placeholder links are the first thing to give up their space
            rather than forcing a wrap or overflow. */}
        <div className="hidden md:flex items-center gap-8">
          {doneItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
          {soonItems.length > 0 && (
            <div className="hidden lg:flex items-center gap-8">
              {soonItems.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
            </div>
          )}
        </div>

        <Link
          to="/#hero"
          className="hidden md:inline-flex text-sm font-medium px-4 py-2 rounded-md bg-foreground text-background hover:bg-primary transition-colors duration-200"
        >
          Get Started
        </Link>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-border text-foreground"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu: stacked vertically, so there's no space pressure —
          every item shows regardless of status. */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-6 py-6 flex flex-col gap-5">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              size="base"
              onNavigate={() => setMenuOpen(false)}
            />
          ))}
          <Link
            to="/#hero"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium px-4 py-2.5 rounded-md bg-foreground text-background text-center hover:bg-primary transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
