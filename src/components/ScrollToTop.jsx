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
      // FIXED: Increased the window timer slightly to 100ms. 
      // This guarantees elements are painted into the DOM before trying to scroll.
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100); 
      
      return () => window.clearTimeout(timer);
    }

    // Fallback: If there's no hash anchor, instantly snap to the top of the new page
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]); 

  return null;
}
