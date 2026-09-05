
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Assessment from "./pages/Assessment";
import Symptoms from "./pages/Symptoms";
import SymptomDetails from "./pages/SymptomDetails";
import AssessmentResult from "./pages/AssessmentResult";

import History from "./pages/History";
import Emergency from "./pages/Emergency";
import MedicalHelp from "./pages/MedicalHelp";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Health Assessment */}
        <Route path="/assessment" element={<Assessment />} />

        <Route
          path="/assessment/symptoms"
          element={<Symptoms />}
        />

        <Route
          path="/assessment/symptom-details"
          element={<SymptomDetails />}
        />

        <Route
          path="/assessment/result"
          element={<AssessmentResult />}
        />

        {/* History */}
        <Route
          path="/history"
          element={<History />}
        />

        {/* Emergency */}
        <Route
          path="/emergency"
          element={<Emergency />}
        />

        {/* Medical Help */}
        <Route
          path="/medical-help"
          element={<MedicalHelp />}
        />

        {/* Hospitals */}
        <Route
          path="/hospitals"
          element={<MedicalHelp />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-cyan-400">
                  404
                </h1>

                <p className="mt-4 text-xl text-slate-400">
                  Page not found
                </p>

                <a
                  href="/"
                  className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

