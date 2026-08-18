import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  HeartPulse,
  UserRound,
} from "lucide-react";
import API_URL from "../api";
function Symptoms() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // SYMPTOMS LIST
  // ==========================================

  const symptoms = [
    "Fever",
    "Cough",
    "Cold",
    "Headache",
    "Body Pain",
    "Fatigue",
    "Dizziness",
    "Nausea",
    "Vomiting",
    "Stomach Pain",
    "Chest Pain",
    "Breathing Difficulty",
    "Sore Throat",
    "Runny Nose",
    "Back Pain",
    "Joint Pain",
    "Loss of Appetite",
    "Weakness",
  ];

  // ==========================================
  // SELECT / UNSELECT SYMPTOM
  // ==========================================

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((previous) => {
      if (previous.includes(symptom)) {
        return previous.filter(
          (item) => item !== symptom
        );
      }

      return [...previous, symptom];
    });
  };

  // ==========================================
  // CONTINUE
  // ==========================================

  const handleContinue = async () => {
    // ------------------------------------------
    // VALIDATE SYMPTOMS
    // ------------------------------------------

    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom.");
      return;
    }

    // ------------------------------------------
    // GET TOKEN
    // ------------------------------------------

    const token = localStorage.getItem(
      "mediGuideToken"
    );

    // ------------------------------------------
    // GET ASSESSMENT ID
    // ------------------------------------------

    const assessmentId =
      localStorage.getItem(
        "mediGuideAssessmentId"
      );

    console.log(
      "Token exists:",
      !!token
    );

    console.log(
      "Assessment ID:",
      assessmentId
    );

    // ------------------------------------------
    // CHECK LOGIN
    // ------------------------------------------

    if (!token) {
      alert(
        "Your login session is missing. Please login again."
      );

      window.location.href = "/login";
      return;
    }

    // ------------------------------------------
    // CHECK ASSESSMENT
    // ------------------------------------------

    if (!assessmentId) {
      alert(
        "Assessment ID not found. Please start the assessment again."
      );

      window.location.href =
        "/assessment";

      return;
    }

    try {
      setLoading(true);

      // ----------------------------------------
      // SAVE LOCALLY
      // ----------------------------------------

      localStorage.setItem(
        "mediGuideSymptoms",
        JSON.stringify(
          selectedSymptoms
        )
      );

      // ----------------------------------------
      // API REQUEST
      // ----------------------------------------

      const response = await fetch(
        `http://localhost:5000/api/assessments/${assessmentId}/symptoms`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            symptoms:
              selectedSymptoms,
          }),
        }
      );

      // ----------------------------------------
      // CHECK RESPONSE TYPE
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
          "Server returned non-JSON response:",
          text
        );

        throw new Error(
          "Server returned an invalid response."
        );
      }

      console.log(
        "Symptoms API response:",
        data
      );

      // ----------------------------------------
      // HANDLE API ERROR
      // ----------------------------------------

      if (!response.ok) {
        if (
          response.status === 401
        ) {
          localStorage.removeItem(
            "mediGuideToken"
          );

          localStorage.removeItem(
            "mediGuideUser"
          );

          alert(
            "Your login session has expired. Please login again."
          );

          window.location.href =
            "/login";

          return;
        }

        throw new Error(
          data.message ||
            "Unable to save symptoms."
        );
      }

      // ----------------------------------------
      // SUCCESS
      // ----------------------------------------

      console.log(
        "Symptoms saved successfully"
      );

      // ----------------------------------------
      // GO TO NEXT PAGE
      // ----------------------------------------

      window.location.href =
        "/assessment/symptom-details";

    } catch (error) {
      console.error(
        "Symptoms error:",
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
  // BACK
  // ==========================================

  const handleBack = () => {
    window.location.href =
      "/assessment";
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

          {/* Logo */}

          <button
            type="button"
            onClick={() =>
              (window.location.href =
                "/dashboard")
            }
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
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

          {/* User Icon */}

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
              Step 2 of 4
            </span>

            <span className="text-gray-500">
              Symptoms
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">

            <div className="h-full w-2/4 rounded-full bg-blue-600" />

          </div>

        </div>

        {/* ====================================
            CARD
        ==================================== */}

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">

          {/* Heading */}

          <div className="mb-8">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">

              <HeartPulse size={28} />

            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              What symptoms are you experiencing?
            </h2>

            <p className="mt-3 leading-6 text-gray-600">
              Select all the symptoms that you
              are currently experiencing.
            </p>

          </div>

          {/* ====================================
              SELECTED COUNT
          ==================================== */}

          <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">

            <p className="text-sm font-medium text-blue-800">

              {selectedSymptoms.length === 0
                ? "No symptoms selected"
                : `${selectedSymptoms.length} symptom${
                    selectedSymptoms.length > 1
                      ? "s"
                      : ""
                  } selected`}

            </p>

          </div>

          {/* ====================================
              SYMPTOMS
          ==================================== */}

          <div className="grid gap-3 sm:grid-cols-2">

            {symptoms.map((symptom) => {

              const selected =
                selectedSymptoms.includes(
                  symptom
                );

              return (
                <button
                  key={symptom}
                  type="button"
                  onClick={() =>
                    toggleSymptom(
                      symptom
                    )
                  }
                  className={`flex items-center justify-between rounded-xl border px-4 py-4 text-left transition ${
                    selected
                      ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100"
                      : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >

                  <span className="text-sm font-medium">
                    {symptom}
                  </span>

                  {selected && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">

                      <Check
                        size={15}
                      />

                    </span>
                  )}

                </button>
              );
            })}

          </div>

          {/* ====================================
              NAVIGATION
          ==================================== */}

          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-7">

            {/* Back */}

            <button
              type="button"
              onClick={handleBack}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
            >

              <ArrowLeft
                size={17}
              />

              Back

            </button>

            {/* Continue */}

            <button
              type="button"
              onClick={
                handleContinue
              }
              disabled={
                loading ||
                selectedSymptoms.length ===
                  0
              }
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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

        {/* ======================================
            DISCLAIMER
        ====================================== */}

        <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4 text-center text-xs leading-5 text-amber-800">

          <strong>
            Important:
          </strong>{" "}
          This assessment provides general
          health information and is not a
          medical diagnosis. For severe or
          emergency symptoms, seek professional
          medical care immediately.

        </div>

      </main>

    </div>
  );
}

export default Symptoms;