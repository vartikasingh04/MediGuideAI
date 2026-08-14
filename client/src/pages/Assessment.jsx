import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  HeartPulse,
  UserRound,
} from "lucide-react";

function Assessment() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [existingCondition, setExistingCondition] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    // ==========================================
    // VALIDATION
    // ==========================================

    if (!age || !gender || !existingCondition) {
      alert("Please complete all the fields.");
      return;
    }

    if (Number(age) < 1 || Number(age) > 120) {
      alert("Please enter a valid age between 1 and 120.");
      return;
    }

    // ==========================================
    // GET LOGIN TOKEN
    // ==========================================

    const token = localStorage.getItem("mediGuideToken");

    if (!token) {
      alert("Please login first.");
      window.location.href = "/login";
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // BASIC INFORMATION
      // ==========================================

      const basicInfo = {
        age: Number(age),
        gender,
        existingCondition,
      };

      // ==========================================
      // SAVE LOCALLY
      // ==========================================

      localStorage.setItem(
        "mediGuideBasicInfo",
        JSON.stringify(basicInfo)
      );

      // ==========================================
      // SEND TO BACKEND
      // ==========================================

      const response = await fetch(
        "http://localhost:5000/api/assessments",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(basicInfo),
        }
      );

      // ==========================================
      // READ RESPONSE SAFELY
      // ==========================================

      const contentType =
        response.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        console.error(
          "Server returned non-JSON response:",
          text
        );

        throw new Error(
          "Server returned an invalid response."
        );
      }

      // ==========================================
      // HANDLE ERROR
      // ==========================================

      if (!response.ok) {
        console.error(
          "Assessment API error:",
          data
        );

        throw new Error(
          data.message ||
            "Failed to create assessment"
        );
      }

      console.log(
        "Assessment created successfully:",
        data
      );

      // ==========================================
      // SAVE ASSESSMENT ID
      // ==========================================

      if (data.assessment?._id) {
        localStorage.setItem(
          "mediGuideAssessmentId",
          data.assessment._id
        );
      } else {
        throw new Error(
          "Assessment ID was not returned by server."
        );
      }

      // ==========================================
      // GO TO SYMPTOMS PAGE
      // ==========================================

      window.location.href =
        "/assessment/symptoms";
    } catch (error) {
      console.error(
        "Assessment error:",
        error
      );

      alert(
        error.message ||
          "Unable to save assessment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ========================================
          HEADER
      ======================================== */}

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

          {/* Logo */}

          <button
            type="button"
            onClick={() =>
              (window.location.href = "/dashboard")
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

          {/* User */}

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <UserRound size={19} />
          </div>

        </div>
      </header>

      {/* ========================================
          MAIN
      ======================================== */}

      <main className="mx-auto max-w-3xl px-6 py-10">

        {/* ======================================
            PROGRESS
        ====================================== */}

        <div className="mb-8">

          <div className="mb-3 flex items-center justify-between text-sm">

            <span className="font-semibold text-blue-600">
              Step 1 of 4
            </span>

            <span className="text-gray-500">
              Basic Information
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/4 rounded-full bg-blue-600 transition-all" />
          </div>

        </div>

        {/* ======================================
            CARD
        ====================================== */}

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">

          {/* Heading */}

          <div className="mb-8">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <UserRound size={28} />
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Let's get to know you
            </h2>

            <p className="mt-3 leading-6 text-gray-600">
              A few basic details will help us
              provide more relevant general health
              information.
            </p>

          </div>

          {/* ====================================
              FORM
          ==================================== */}

          <div className="space-y-6">

            {/* AGE */}

            <div>

              <label
                htmlFor="age"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                What is your age?
              </label>

              <input
                id="age"
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) =>
                  setAge(e.target.value)
                }
                placeholder="Enter your age"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

            </div>

            {/* GENDER */}

            <div>

              <label className="mb-3 block text-sm font-semibold text-gray-700">
                What is your gender?
              </label>

              <div className="grid gap-3 sm:grid-cols-3">

                {[
                  "Male",
                  "Female",
                  "Other",
                ].map((option) => (

                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setGender(option)
                    }
                    className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                      gender === option
                        ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100"
                        : "border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50"
                    }`}
                  >
                    {option}
                  </button>

                ))}

              </div>

            </div>

            {/* EXISTING CONDITION */}

            <div>

              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Do you have any existing health
                condition?
              </label>

              <div className="grid gap-3 sm:grid-cols-2">

                {["Yes", "No"].map((option) => (

                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setExistingCondition(option)
                    }
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                      existingCondition === option
                        ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100"
                        : "border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50"
                    }`}
                  >
                    {option}
                  </button>

                ))}

              </div>

            </div>

            {/* ==================================
                NAVIGATION
            ================================== */}

            <div className="flex items-center justify-between border-t border-gray-100 pt-7">

              <button
                type="button"
                onClick={() =>
                  (window.location.href =
                    "/dashboard")
                }
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
              >
                <ArrowLeft size={17} />
                Back
              </button>

              <button
                type="button"
                onClick={handleContinue}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Saving..."
                  : "Continue"}

                {!loading && (
                  <ArrowRight size={17} />
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
          This assessment provides general health
          information and is not a medical diagnosis.
          For severe or emergency symptoms, seek
          professional medical care immediately.

        </div>

      </main>

    </div>
  );
}

export default Assessment;