import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const getHashId = (hash) => {
  const rawId = hash.slice(1);
  try {
    return decodeURIComponent(rawId);
  } catch {
    return rawId;
  }
};

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = getHashId(hash);
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return () => window.clearTimeout(timer);
    }
    
    // Fallback: If there's no hash, snap to the top of the page
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]); // Removed navigationType dependency

  return null;
}
