import {
  ArrowLeft,
  MapPin,
  Phone,
  Ambulance,
  Hospital,
  ShieldAlert,
  Navigation,
  HeartPulse,
} from "lucide-react";

function Emergency() {

  // ==========================================
  // CALL AMBULANCE - 108
  // ==========================================

  const callAmbulance = () => {
    window.location.href = "tel:108";
  };

  // ==========================================
  // GENERAL EMERGENCY - 112
  // ==========================================

  const callEmergency = () => {
    window.location.href = "tel:112";
  };

  // ==========================================
  // FIND NEARBY HOSPITAL
  // ==========================================

  const openMaps = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } =
            position.coords;

          window.open(
            `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},14z`,
            "_blank"
          );
        },
        () => {
          window.open(
            "https://www.google.com/maps/search/emergency+hospital+near+me",
            "_blank"
          );
        }
      );
    } else {
      window.open(
        "https://www.google.com/maps/search/emergency+hospital+near+me",
        "_blank"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <a
            href="/dashboard"
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
              <HeartPulse size={24} />
            </div>

            <div>

              <h1 className="font-bold text-gray-900">
                MediGuide{" "}
                <span className="text-blue-600">
                  AI
                </span>
              </h1>

              <p className="text-xs text-gray-500">
                Smart Health Assistant
              </p>

            </div>

          </a>


          <a
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
          >
            <ArrowLeft size={17} />
            Dashboard
          </a>

        </div>

      </header>


      {/* ======================================
          MAIN
      ====================================== */}

      <main className="mx-auto max-w-6xl px-6 py-10">


        {/* ======================================
            HERO
        ====================================== */}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-8 text-white shadow-xl md:p-12">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

          <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-white/5" />


          <div className="relative">

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">

              <ShieldAlert size={34} />

            </div>


            <p className="text-sm font-bold uppercase tracking-widest text-red-100">
              Emergency Assistance
            </p>


            <h2 className="mt-2 text-3xl font-bold md:text-5xl">
              Need Emergency Help?
            </h2>


            <p className="mt-5 max-w-2xl text-base leading-7 text-red-50 md:text-lg">
              If you or someone around you is
              experiencing a serious or
              life-threatening emergency, contact
              emergency services immediately.
            </p>


            {/* AMBULANCE 108 */}

            <button
              type="button"
              onClick={callAmbulance}
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-lg font-bold text-red-600 shadow-lg transition hover:-translate-y-1 hover:bg-red-50"
            >

              <Ambulance size={25} />

              Call Ambulance — 108

            </button>

          </div>

        </section>


        {/* ======================================
            EMERGENCY SERVICES
        ====================================== */}

        <section className="mt-8">

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">

                  <Phone size={23} />

                </div>


                <div>

                  <h3 className="text-lg font-bold text-red-900">
                    National Emergency Number
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-red-700">
                    For police, fire, medical and other
                    emergency assistance.
                  </p>

                </div>

              </div>


              {/* 112 */}

              <button
                type="button"
                onClick={callEmergency}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
              >

                <Phone size={18} />

                Call 112

              </button>

            </div>

          </div>

        </section>


        {/* ======================================
            QUICK ACTIONS
        ====================================== */}

        <section className="mt-10">

          <div className="mb-5">

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Quick Help
            </p>

            <h3 className="mt-1 text-2xl font-bold text-gray-900">
              Find Emergency Assistance
            </h3>

          </div>


          <div className="grid gap-5 md:grid-cols-3">


            {/* ==================================
                AMBULANCE
            ================================== */}

            <button
              type="button"
              onClick={callAmbulance}
              className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
            >

              <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-red-100 text-red-600">

                <Ambulance size={26} />

              </div>


              <h4 className="mt-5 text-lg font-bold text-gray-900">
                Ambulance
              </h4>


              <p className="mt-2 text-sm leading-6 text-gray-500">
                Call an ambulance for immediate
                medical emergency assistance.
              </p>


              <div className="mt-5 flex items-center gap-2 font-semibold text-red-600">

                <Phone size={16} />

                Call 108

              </div>

            </button>


            {/* ==================================
                HOSPITAL
            ================================== */}

            <button
              type="button"
              onClick={openMaps}
              className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >

              <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                <Hospital size={26} />

              </div>


              <h4 className="mt-5 text-lg font-bold text-gray-900">
                Nearby Hospitals
              </h4>


              <p className="mt-2 text-sm leading-6 text-gray-500">
                Find emergency hospitals near your
                current location.
              </p>


              <div className="mt-5 flex items-center gap-2 font-semibold text-blue-600">

                <MapPin size={16} />

                Find Hospital

              </div>

            </button>


            {/* ==================================
                LOCATION
            ================================== */}

            <button
              type="button"
              onClick={openMaps}
              className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
            >

              <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">

                <Navigation size={26} />

              </div>


              <h4 className="mt-5 text-lg font-bold text-gray-900">
                Get Directions
              </h4>


              <p className="mt-2 text-sm leading-6 text-gray-500">
                Use your location to find the nearest
                emergency medical facility.
              </p>


              <div className="mt-5 flex items-center gap-2 font-semibold text-emerald-600">

                <Navigation size={16} />

                Open Maps

              </div>

            </button>

          </div>

        </section>


        {/* ======================================
            IMPORTANT STEPS
        ====================================== */}

        <section className="mt-10">

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">

                <ShieldAlert size={22} />

              </div>


              <div>

                <h3 className="text-xl font-bold text-gray-900">
                  While Waiting for Help
                </h3>

                <p className="text-sm text-gray-500">
                  Follow appropriate emergency guidance.
                </p>

              </div>

            </div>


            <div className="mt-6 grid gap-4 md:grid-cols-2">


              <div className="rounded-xl bg-gray-50 p-5">

                <p className="font-semibold text-gray-900">
                  01. Stay with the person
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  If possible, stay with an unconscious
                  or seriously ill person.
                </p>

              </div>


              <div className="rounded-xl bg-gray-50 p-5">

                <p className="font-semibold text-gray-900">
                  02. Call emergency services
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Clearly explain the situation and
                  provide your location.
                </p>

              </div>


              <div className="rounded-xl bg-gray-50 p-5">

                <p className="font-semibold text-gray-900">
                  03. Follow professional instructions
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Follow instructions provided by
                  emergency professionals.
                </p>

              </div>


              <div className="rounded-xl bg-gray-50 p-5">

                <p className="font-semibold text-gray-900">
                  04. Do not delay medical care
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Do not rely only on an AI assessment
                  during an emergency.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ======================================
            DISCLAIMER
        ====================================== */}

        <section className="mt-8">

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">

            <div className="flex items-start gap-3">

              <HeartPulse
                size={21}
                className="mt-0.5 shrink-0 text-amber-600"
              />


              <div>

                <h3 className="font-bold text-amber-900">
                  Important
                </h3>

                <p className="mt-1 text-sm leading-6 text-amber-800">
                  MediGuide AI provides general health
                  information and is not a replacement
                  for professional medical care. In a
                  serious emergency, contact emergency
                  services immediately.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ======================================
            BACK TO DASHBOARD
        ====================================== */}

        <div className="mt-8">

          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-3 font-semibold text-gray-600 transition hover:bg-gray-200"
          >

            <ArrowLeft size={18} />

            Back to Dashboard

          </a>

        </div>

      </main>

    </div>
  );
}

export default Emergency;