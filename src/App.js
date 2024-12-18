import "./styles/App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
const LazyComponent = lazy(() => import("./routes"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
          <SpeedInsights />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
