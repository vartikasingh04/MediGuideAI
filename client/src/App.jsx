import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Symptoms from "./pages/Symptoms";
import SymptomDetails from "./pages/SymptomDetails";
import AssessmentResult from "./pages/AssessmentResult";
import Emergency from "./pages/Emergency";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Assessment */}
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/assessment/symptoms" element={<Symptoms />} />
        <Route
          path="/assessment/symptom-details"
          element={<SymptomDetails />}
        />
        <Route
          path="/assessment/result"
          element={<AssessmentResult />}
        />
<Route
  path="/emergency"
  element={<Emergency />}
/>
<Route
  path="/history"
  element={<History />}
/>
        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;