import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Hospital,
  MapPin,
  Navigation,
  Phone,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";

function Emergency() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const getLocation = () => {
    setLoading(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by this browser."
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
            "Location permission was denied. Please allow location access."
          );
        } else {
          setLocationError(
            "Unable to detect your location. Please try again."
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

  const openHospitals = () => {
    if (!location) {
      alert("Please detect your location first.");
      return;
    }

    const mapsUrl =
      `https://www.google.com/maps/search/hospitals/` +
      `@${location.latitude},${location.longitude},14z`;

    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="border-b border-red-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-4">

          <a
            href="/"
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


      {/* MAIN */}

      <main className="mx-auto max-w-5xl px-6 py-10">

        {/* BACK */}

        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back
        </button>


        {/* EMERGENCY HERO */}

        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-orange-500 p-8 text-white shadow-2xl md:p-12">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20">

              <ShieldAlert size={42} />

            </div>

            <h2 className="mt-6 text-3xl font-bold md:text-5xl">
              Emergency Assistance
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-red-50 md:text-lg">
              If you are experiencing a serious or
              life-threatening medical situation, seek
              professional medical help immediately.
            </p>

          </div>

        </section>


        {/* WARNING */}

        <section className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">

              <AlertTriangle size={25} />

            </div>

            <div>

              <h3 className="font-bold text-red-900">
                Do not delay emergency care
              </h3>

              <p className="mt-2 text-sm leading-6 text-red-800">
                MediGuide AI cannot diagnose or treat medical
                emergencies. If symptoms are severe or rapidly
                getting worse, contact appropriate emergency
                medical services or go to the nearest emergency
                department.
              </p>

            </div>

          </div>

        </section>


        {/* LOCATION */}

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                  <MapPin size={22} />

                </div>

                <div>

                  <h3 className="font-bold text-gray-900">
                    Find nearby medical help
                  </h3>

                  <p className="text-sm text-gray-500">
                    Use your current location to find hospitals.
                  </p>

                </div>

              </div>

            </div>


            <button
              onClick={getLocation}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <MapPin size={18} />

              {loading
                ? "Detecting Location..."
                : "Use My Location"}

            </button>

          </div>


          {/* LOCATION SUCCESS */}

          {location && (

            <div className="mt-5 rounded-xl bg-emerald-50 p-4">

              <p className="font-semibold text-emerald-800">
                ✓ Location detected
              </p>

              <p className="mt-1 break-all text-xs text-emerald-700">
                Latitude: {location.latitude}
                <br />
                Longitude: {location.longitude}
              </p>

            </div>

          )}


          {/* LOCATION ERROR */}

          {locationError && (

            <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">

              {locationError}

            </div>

          )}

        </section>


        {/* HOSPITAL */}

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

              <Hospital size={24} />

            </div>

            <div className="flex-1">

              <h3 className="text-xl font-bold text-gray-900">
                Find a nearby hospital
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Open a hospital search centered around your
                current location.
              </p>


              <button
                onClick={openHospitals}
                className="mt-5 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >

                <Navigation size={18} />

                Open Hospitals in Maps

              </button>

            </div>

          </div>

        </section>


        {/* CALL HELP */}

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">

              <Phone size={23} />

            </div>

            <div>

              <h3 className="text-lg font-bold text-gray-900">
                Need immediate assistance?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Contact your local emergency medical service
                or ask someone nearby to help you reach
                appropriate medical care.
              </p>

            </div>

          </div>

        </section>


        {/* DISCLAIMER */}

        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">

          <div className="flex items-start gap-3">

            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-amber-600"
            />

            <p className="text-sm leading-6 text-amber-800">

              <strong>Important:</strong> MediGuide AI provides
              general health information and is not a substitute
              for professional medical diagnosis or emergency
              treatment.

            </p>

          </div>

        </section>


        {/* FOOTER */}

        <div className="mt-8 flex justify-between">

          <a
            href="/medical-help"
            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >

            <ArrowLeft size={17} />

            Medical Help

          </a>


          <a
            href="/"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >

            Home

          </a>

        </div>

      </main>

    </div>
  );
}

export default Emergency;