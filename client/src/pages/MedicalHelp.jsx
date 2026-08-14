import { useState } from "react";

import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Hospital,
  Loader2,
  MapPin,
  Navigation,
  Phone,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";

function MedicalHelp() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const hospitals = [
    {
      id: 1,
      name: "Nearby General Hospital",
      type: "General Hospital",
      distance: "Nearby",
      status: "Open",
      phone: "+910000000000",
    },
    {
      id: 2,
      name: "City Care Hospital",
      type: "Multi-Speciality Hospital",
      distance: "Nearby",
      status: "Open",
      phone: "+910000000000",
    },
    {
      id: 3,
      name: "Health Plus Clinic",
      type: "Clinic",
      distance: "Nearby",
      status: "Open",
      phone: "+910000000000",
    },
  ];

  const getLocation = () => {
    setLoading(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by your browser."
      );
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLoading(false);
      },
      (error) => {
        setLoading(false);

        if (error.code === 1) {
          setLocationError(
            "Location permission was denied. Please allow location access in your browser."
          );
        } else if (error.code === 2) {
          setLocationError(
            "Your location could not be determined."
          );
        } else {
          setLocationError(
            "Unable to get your location. Please try again."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const openDirections = () => {
    if (!location) {
      alert("Please use your location first.");
      return;
    }

    const mapsUrl =
      `https://www.google.com/maps/search/hospitals/` +
      `@${location.latitude},${location.longitude},14z`;

    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-6xl items-center px-6 py-4">

          <a
            href="/dashboard"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Stethoscope size={22} />
            </div>

            <div>
              <h1 className="font-bold text-gray-900">
                MediGuide{" "}
                <span className="text-blue-600">
                  AI
                </span>
              </h1>

              <p className="text-xs text-gray-500">
                Medical Assistance
              </p>
            </div>

          </a>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* BACK */}

        <button
          onClick={() => window.history.back()}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back
        </button>


        {/* ================= HERO ================= */}

        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white shadow-xl md:p-10">

          <div className="grid items-center gap-8 md:grid-cols-2">

            <div>

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                <Hospital size={30} />
              </div>

              <h2 className="text-3xl font-bold md:text-4xl">
                Find Medical Help
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-blue-50">
                Use your current location to find nearby
                hospitals and healthcare facilities.
              </p>


              {/* LOCATION BUTTON */}

              <button
                onClick={getLocation}
                disabled={loading}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Getting Location...
                  </>
                ) : (
                  <>
                    <MapPin size={18} />

                    Use My Location
                  </>
                )}

              </button>

            </div>


            <div className="hidden justify-center md:flex">

              <div className="flex h-56 w-56 items-center justify-center rounded-full bg-white/10">

                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white/15">

                  <MapPin
                    size={90}
                    strokeWidth={1.3}
                  />

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= LOCATION STATUS ================= */}

        {location && (

          <section className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">

                <CheckCircle size={21} />

              </div>


              <div>

                <h3 className="font-bold text-emerald-900">
                  Location Detected
                </h3>

                <p className="mt-1 text-sm text-emerald-800">
                  Your current location has been detected.
                </p>

                <p className="mt-2 break-all text-xs text-emerald-700">
                  Latitude: {location.latitude}
                  <br />
                  Longitude: {location.longitude}
                </p>

              </div>

            </div>

          </section>

        )}


        {/* ================= ERROR ================= */}

        {locationError && (

          <section className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5">

            <div className="flex items-start gap-3">

              <ShieldAlert
                size={22}
                className="shrink-0 text-red-600"
              />

              <div>

                <h3 className="font-bold text-red-900">
                  Location Error
                </h3>

                <p className="mt-1 text-sm leading-6 text-red-800">
                  {locationError}
                </p>

              </div>

            </div>

          </section>

        )}


        {/* ================= EMERGENCY ================= */}

        <section className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">

              <ShieldAlert size={25} />

            </div>


            <div>

              <h3 className="text-lg font-bold text-red-900">
                Medical Emergency?
              </h3>

              <p className="mt-2 text-sm leading-6 text-red-800">
                If you are experiencing a serious or
                life-threatening situation, seek emergency
                medical assistance immediately.
              </p>


              <a
                href="/emergency"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >

                <ShieldAlert size={17} />

                Emergency Help

              </a>

            </div>

          </div>

        </section>


        {/* ================= HOSPITAL TITLE ================= */}

        <div className="mb-5">

          <div className="flex flex-wrap items-end justify-between gap-4">

            <div>

              <h3 className="text-2xl font-bold text-gray-900">
                Nearby Healthcare Facilities
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Use your location to search for nearby
                medical facilities.
              </p>

            </div>


            {location && (

              <button
                onClick={openDirections}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >

                <Navigation size={17} />

                Open Hospitals in Maps

              </button>

            )}

          </div>

        </div>


        {/* ================= HOSPITAL CARDS ================= */}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {hospitals.map((hospital) => (

            <div
              key={hospital.id}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">

                  <Hospital size={23} />

                </div>


                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">

                  <CheckCircle size={13} />

                  {hospital.status}

                </span>

              </div>


              <h4 className="mt-5 text-lg font-bold text-gray-900">
                {hospital.name}
              </h4>


              <p className="mt-1 text-sm text-gray-500">
                {hospital.type}
              </p>


              <div className="mt-5 space-y-3">

                <div className="flex items-center gap-2 text-sm text-gray-600">

                  <MapPin
                    size={17}
                    className="text-blue-600"
                  />

                  {location
                    ? "Location available"
                    : hospital.distance}

                </div>


                <div className="flex items-center gap-2 text-sm text-gray-600">

                  <Clock
                    size={17}
                    className="text-blue-600"
                  />

                  Open now

                </div>

              </div>


              <div className="mt-6 grid grid-cols-2 gap-3">

                <a
                  href={`tel:${hospital.phone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >

                  <Phone size={16} />

                  Call

                </a>


                <button
                  onClick={openDirections}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >

                  <Navigation size={16} />

                  Directions

                </button>

              </div>

            </div>

          ))}

        </div>


        {/* ================= INFO ================= */}

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">

          <div className="flex items-start gap-3">

            <Stethoscope
              size={21}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <div>

              <h4 className="font-bold text-blue-900">
                About Medical Assistance
              </h4>

              <p className="mt-2 text-sm leading-6 text-blue-800">
                MediGuide AI helps you find medical services
                based on your location. Always verify the
                facility details before travelling.
              </p>

            </div>

          </div>

        </section>


        {/* ================= FOOTER BUTTONS ================= */}

        <div className="mt-8 flex flex-wrap justify-between gap-3">

          <a
            href="/assessment/result"
            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >

            <ArrowLeft size={17} />

            Back to Result

          </a>


          <a
            href="/dashboard"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >

            Back to Dashboard

          </a>

        </div>

      </main>

    </div>
  );
}

export default MedicalHelp;