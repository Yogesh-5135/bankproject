import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ExternalLayout from "./layouts/ExternalLayout";
import InternalLayout from "./layouts/InternalLayout";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import CustomerLayout from "./layouts/CustomerLayout";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ExternalLayout />} />
          <Route path="/visitors/*" element={<ExternalLayout />} />
          <Route path="/bankloan/*" element={<InternalLayout />} />
          <Route
            path="/bankloan/customerlayout/*"
            element={<CustomerLayout />}
          />
          <Route path="/bankloan/customerlayout" element={<CustomerLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
