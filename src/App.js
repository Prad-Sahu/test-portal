import { BrowserRouter } from "react-router-dom";
import "./styles/App.css";
import AppRoutes from "./routes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
