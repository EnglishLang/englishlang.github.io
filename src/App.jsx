import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';

// 1. DYNAMIC & SYNCHRONOUS: { eager: true } kills all lazy loading chunks
const pages = import.meta.glob("./pages/**/*.{jsx,tsx}", { eager: true });

// 2. Map file paths directly to compiled component modules
const dynamicRoutes = Object.keys(pages).map((path) => {
  const name = path
    .replace("./pages/", "")
    .replace(/\.(jsx|tsx)$/, "")
    .toLowerCase();
  
  const isHome = name === "home" || name === "index";
  const routePath = isHome ? "/" : `/${name}`;

  // Get the default component export synchronously
  const Component = pages[path].default;
  
  return <Route key={path} path={routePath} element={<Component />} />;
});

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Your pages are loaded directly, no Suspense required */}
          {dynamicRoutes}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App;
