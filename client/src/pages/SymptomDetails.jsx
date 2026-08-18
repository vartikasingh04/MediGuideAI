import { useState } from "react";
import API_URL from "../api";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Brain,
  Clock,
  Droplets,
  HeartPulse,
  UserRound,
  Wind,
} from "lucide-react";

function SymptomDetails() {
  // ==========================================
  // STATE
  // ==========================================

  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("");
  const [breathingDifficulty, setBreathingDifficulty] =
    useState("");
  const [unconsciousness, setUnconsciousness] =
    useState("");
  const [severeBleeding, setSevereBleeding] =
    useState("");

  const [loading, setLoading] = useState(false);

  // ==========================================
  // GET TOKEN
  // ==========================================

  const getToken = () => {
    return (
      localStorage.getItem("mediGuideToken") ||
      localStorage.getItem("token")
    );
  };

  // ==========================================
  // GET ASSESSMENT ID
  // ==========================================

  const getAssessmentId = () => {
    return localStorage.getItem(
      "mediGuideAssessmentId"
    );
  };

  // ==========================================
  // GET SAVED SYMPTOMS
  // ==========================================

  const getSymptoms = () => {
    try {
      const savedSymptoms =
        localStorage.getItem(
          "mediGuideSymptoms"
        );

      if (!savedSymptoms) {
        return [];
      }

      const parsed =
        JSON.parse(savedSymptoms);

      return Array.isArray(parsed)
        ? parsed
        : [];
    } catch (error) {
      console.error(
        "Error reading saved symptoms:",
        error
      );

      return [];
    }
  };

  // ==========================================
  // SAVE SYMPTOM DETAILS
  // ==========================================

  const handleContinue = async () => {
    // ----------------------------------------
    // TOKEN
    // ----------------------------------------

    const token = getToken();

    if (!token) {
      alert(
        "Authentication required. Please login again."
      );

      window.location.href = "/login";
      return;
    }

    // ----------------------------------------
    // ASSESSMENT ID
    // ----------------------------------------

    const assessmentId =
      getAssessmentId();

    if (!assessmentId) {
      alert(
        "Assessment ID not found. Please start the assessment again."
      );

      window.location.href =
        "/assessment";

      return;
    }

    // ----------------------------------------
    // VALIDATION
    // ----------------------------------------

    if (!duration) {
      alert(
        "Please select how long you have had the symptoms."
      );
      return;
    }

    if (!severity) {
      alert(
        "Please select the severity of your symptoms."
      );
      return;
    }

    if (!breathingDifficulty) {
      alert(
        "Please select whether you have breathing difficulty."
      );
      return;
    }

    if (!unconsciousness) {
      alert(
        "Please select whether you experienced unconsciousness."
      );
      return;
    }

    if (!severeBleeding) {
      alert(
        "Please select whether you have severe bleeding."
      );
      return;
    }

    try {
      setLoading(true);

      // ----------------------------------------
      // GET SELECTED SYMPTOMS
      // ----------------------------------------

      const symptoms = getSymptoms();

      // ----------------------------------------
      // CREATE DETAILS OBJECT
      // ----------------------------------------

      const symptomDetails = {
        symptoms,
        duration,
        severity,
        breathingDifficulty,
        unconsciousness,
        severeBleeding,
      };

      console.log(
        "Sending symptom details:",
        symptomDetails
      );

      console.log(
        "Assessment ID:",
        assessmentId
      );

      // ----------------------------------------
      // SAVE LOCALLY
      // ----------------------------------------

      localStorage.setItem(
        "mediGuideSymptomDetails",
        JSON.stringify(
          symptomDetails
        )
      );

      // ----------------------------------------
      // API URL
      // ----------------------------------------

      const url =
  `${API_URL}/api/assessments/${assessmentId}/symptom-details`;

      console.log(
        "API URL:",
        url
      );

      // ----------------------------------------
      // API REQUEST
      // ----------------------------------------

      const response = await fetch(url, {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          symptomDetails,
        }),
      });

      // ----------------------------------------
      // READ RESPONSE SAFELY
      // ----------------------------------------

      const contentType =
        response.headers.get(
          "content-type"
        ) || "";

      let data;

      if (
        contentType.includes(
          "application/json"
        )
      ) {
        data =
          await response.json();
      } else {
        const text =
          await response.text();

        console.error(
          "Server returned non-JSON:",
          text
        );

        throw new Error(
          "Server returned an invalid response."
        );
      }

      console.log(
        "Backend response:",
        data
      );

      // ----------------------------------------
      // AUTHENTICATION ERROR
      // ----------------------------------------

      if (
        response.status === 401
      ) {
        localStorage.removeItem(
          "mediGuideToken"
        );

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "mediGuideUser"
        );

        localStorage.removeItem(
          "user"
        );

        alert(
          "Your login session has expired. Please login again."
        );

        window.location.href =
          "/login";

        return;
      }

      // ----------------------------------------
      // OTHER ERROR
      // ----------------------------------------

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to save symptom details."
        );
      }

      // ----------------------------------------
      // SUCCESS
      // ----------------------------------------

      if (data.success) {
        console.log(
          "Symptom details saved successfully."
        );

        // Save returned assessment too
        if (data.assessment) {
          localStorage.setItem(
            "mediGuideAssessment",
            JSON.stringify(
              data.assessment
            )
          );
        }

        // --------------------------------------
        // GO TO RESULT
        // --------------------------------------

        window.location.href =
          "/assessment/result";
      } else {
        throw new Error(
          data.message ||
            "Unable to save symptom details."
        );
      }
    } catch (error) {
      console.error(
        "Symptom Details Error:",
        error
      );

      alert(
        error.message ||
          "Unable to save symptoms. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // BACK BUTTON
  // ==========================================

  const handleBack = () => {
    window.location.href =
      "/assessment/symptoms";
  };

  // ==========================================
  // OPTION BUTTON
  // ==========================================

  const OptionButton = ({
    value,
    selected,
    onClick,
  }) => {
    return (
      <button
        type="button"
        onClick={() => onClick(value)}
        className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
          selected
            ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100"
            : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50"
        }`}
      >
        {value}
      </button>
    );
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

          {/* LOGO */}

          <button
            type="button"
            onClick={() => {
              window.location.href =
                "/dashboard";
            }}
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <HeartPulse size={22} />
            </div>

            <div className="text-left">

              <h1 className="font-bold text-gray-900">
                MediGuide{" "}
                <span className="text-blue-600">
                  AI
                </span>
              </h1>

              <p className="text-xs text-gray-500">
                Health Assessment
              </p>

            </div>

          </button>

          {/* USER */}

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <UserRound size={19} />
          </div>

        </div>

      </header>

      {/* ======================================
          MAIN
      ====================================== */}

      <main className="mx-auto max-w-3xl px-6 py-10">

        {/* ====================================
            PROGRESS
        ==================================== */}

        <div className="mb-8">

          <div className="mb-3 flex items-center justify-between text-sm">

            <span className="font-semibold text-blue-600">
              Step 3 of 4
            </span>

            <span className="text-gray-500">
              Symptom Details
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">

            <div className="h-full w-3/4 rounded-full bg-blue-600" />

          </div>

        </div>

        {/* ====================================
            CARD
        ==================================== */}

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">

          {/* HEADING */}

          <div className="mb-8">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <HeartPulse size={28} />
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Tell us more about your symptoms
            </h2>

            <p className="mt-3 leading-6 text-gray-600">
              Please provide some additional
              information about your symptoms.
            </p>

          </div>

          {/* ==================================
              FORM
          ================================== */}

          <div className="space-y-8">

            {/* ==================================
                DURATION
            ================================== */}

            <div>

              <div className="mb-3 flex items-center gap-2">

                <Clock
                  size={19}
                  className="text-blue-600"
                />

                <label className="text-sm font-semibold text-gray-700">
                  How long have you had these
                  symptoms?
                </label>

              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                {[
                  "Less than 1 day",
                  "1–3 days",
                  "4–7 days",
                  "More than 1 week",
                ].map((option) => (

                  <OptionButton
                    key={option}
                    value={option}
                    selected={
                      duration === option
                    }
                    onClick={
                      setDuration
                    }
                  />

                ))}

              </div>

            </div>

            {/* ==================================
                SEVERITY
            ================================== */}

            <div>

              <div className="mb-3 flex items-center gap-2">

                <AlertTriangle
                  size={19}
                  className="text-blue-600"
                />

                <label className="text-sm font-semibold text-gray-700">
                  How severe are your symptoms?
                </label>

              </div>

              <div className="grid gap-3 sm:grid-cols-3">

                {[
                  "Mild",
                  "Moderate",
                  "Severe",
                ].map((option) => (

                  <OptionButton
                    key={option}
                    value={option}
                    selected={
                      severity === option
                    }
                    onClick={
                      setSeverity
                    }
                  />

                ))}

              </div>

            </div>

            {/* ==================================
                BREATHING DIFFICULTY
            ================================== */}

            <div>

              <div className="mb-3 flex items-center gap-2">

                <Wind
                  size={19}
                  className="text-blue-600"
                />

                <label className="text-sm font-semibold text-gray-700">
                  Are you experiencing breathing
                  difficulty?
                </label>

              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                {["Yes", "No"].map(
                  (option) => (

                    <OptionButton
                      key={option}
                      value={option}
                      selected={
                        breathingDifficulty ===
                        option
                      }
                      onClick={
                        setBreathingDifficulty
                      }
                    />

                  )
                )}

              </div>

            </div>

            {/* ==================================
                UNCONSCIOUSNESS
            ================================== */}

            <div>

              <div className="mb-3 flex items-center gap-2">

                <Brain
                  size={19}
                  className="text-blue-600"
                />

                <label className="text-sm font-semibold text-gray-700">
                  Have you experienced
                  unconsciousness?
                </label>

              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                {["Yes", "No"].map(
                  (option) => (

                    <OptionButton
                      key={option}
                      value={option}
                      selected={
                        unconsciousness ===
                        option
                      }
                      onClick={
                        setUnconsciousness
                      }
                    />

                  )
                )}

              </div>

            </div>

            {/* ==================================
                SEVERE BLEEDING
            ================================== */}

            <div>

              <div className="mb-3 flex items-center gap-2">

                <Droplets
                  size={19}
                  className="text-red-500"
                />

                <label className="text-sm font-semibold text-gray-700">
                  Are you experiencing severe
                  bleeding?
                </label>

              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                {["Yes", "No"].map(
                  (option) => (

                    <OptionButton
                      key={option}
                      value={option}
                      selected={
                        severeBleeding ===
                        option
                      }
                      onClick={
                        setSevereBleeding
                      }
                    />

                  )
                )}

              </div>

            </div>

            {/* ==================================
                NAVIGATION
            ================================== */}

            <div className="flex items-center justify-between border-t border-gray-100 pt-7">

              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
              >

                <ArrowLeft size={17} />

                Back

              </button>

              <button
                type="button"
                onClick={
                  handleContinue
                }
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "Saving..."
                  : "Continue"}

                {!loading && (
                  <ArrowRight
                    size={17}
                  />
                )}

              </button>

            </div>

          </div>

        </div>

        {/* ======================================
            DISCLAIMER
        ====================================== */}

        <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4 text-center text-xs leading-5 text-amber-800">

          <strong>Important:</strong>{" "}
          MediGuide AI provides general health
          information and does not replace
          professional medical diagnosis or
          treatment.

        </div>

      </main>

    </div>
  );
}

export default SymptomDetails;