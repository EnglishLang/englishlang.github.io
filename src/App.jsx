import { lazy, Suspense } from 'react'; // Added lazy and Suspense
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';

// 1. FIXED: Removed { eager: true } so pages are imported asynchronously
const pages = import.meta.glob("./pages/**/*.{jsx,tsx}");

// 2. Map file paths to lazy-loaded routes automatically
const dynamicRoutes = Object.keys(pages).map((path) => {
  const name = path
    .replace("./pages/", "")
    .replace(/\.(jsx|tsx)$/, "")
    .toLowerCase();

  const isHome = name === "home" || name === "index";
  const routePath = isHome ? "/" : `/${name}`;

  // FIXED: Wrap the dynamic import in React.lazy() so Rolldown breaks it into a separate file
  const LazyComponent = lazy(pages[path]);

  return <Route key={path} path={routePath} element={<LazyComponent />} />;
});

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        {/* FIXED: Added Suspense to handle the brief loading state when switching paths */}
        <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center">Loading...</div>}>
          <Routes>
            {/* Dynamic chunks are safely injected here as needed */}
            {dynamicRoutes}
            
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App;

