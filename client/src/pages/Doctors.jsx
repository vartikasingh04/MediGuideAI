import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  MapPin,
  Phone,
  Search,
  Star,
  Stethoscope,
} from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Ankit Sharma",
    speciality: "General Physician",
    experience: "8 years experience",
    rating: 4.8,
    distance: "2.3 km",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Priya Singh",
    speciality: "Cardiologist",
    experience: "10 years experience",
    rating: 4.7,
    distance: "3.1 km",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Rahul Verma",
    speciality: "Dermatologist",
    experience: "6 years experience",
    rating: 4.6,
    distance: "4.2 km",
    available: false,
  },
  {
    id: 4,
    name: "Dr. Neha Gupta",
    speciality: "Pediatrician",
    experience: "7 years experience",
    rating: 4.9,
    distance: "5.0 km",
    available: true,
  },
  {
    id: 5,
    name: "Dr. Amit Mishra",
    speciality: "Orthopedic",
    experience: "12 years experience",
    rating: 4.8,
    distance: "5.7 km",
    available: true,
  },
  {
    id: 6,
    name: "Dr. Sneha Kapoor",
    speciality: "Gynecologist",
    experience: "9 years experience",
    rating: 4.7,
    distance: "6.2 km",
    available: true,
  },
];

const specialities = [
  "All Specialities",
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedic",
  "Gynecologist",
];

function Doctors() {
  const [search, setSearch] = useState("");
  const [speciality, setSpeciality] =
    useState("All Specialities");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        doctor.speciality
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSpeciality =
        speciality === "All Specialities" ||
        doctor.speciality === speciality;

      return matchesSearch && matchesSpeciality;
    });
  }, [search, speciality]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

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
                Find Medical Care
              </p>
            </div>

          </a>

        </div>

      </header>


      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Back */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back
        </button>


        {/* Hero */}
        <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white shadow-xl md:p-10">

          <div className="max-w-2xl">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <Stethoscope size={30} />
            </div>

            <h2 className="text-3xl font-bold md:text-4xl">
              Find the right doctor
            </h2>

            <p className="mt-3 leading-7 text-blue-50">
              Search doctors by name or speciality and
              find suitable healthcare professionals.
            </p>

          </div>

        </section>


        {/* Search */}
        <section className="relative z-10 -mt-6 mx-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl md:mx-8">

          <div className="grid gap-4 md:grid-cols-[1fr_250px]">

            {/* Search Input */}
            <div className="relative">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search doctor or speciality..."
                className="w-full rounded-xl border border-gray-300 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

            </div>


            {/* Speciality */}
            <select
              value={speciality}
              onChange={(e) =>
                setSpeciality(e.target.value)
              }
              className="rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm font-medium text-gray-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >

              {specialities.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>

        </section>


        {/* Results Header */}
        <div className="mt-12 flex items-center justify-between">

          <div>

            <h3 className="text-2xl font-bold text-gray-900">
              Available Doctors
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {filteredDoctors.length} doctors found
            </p>

          </div>

        </div>


        {/* Doctor Cards */}
        {filteredDoctors.length > 0 ? (

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {filteredDoctors.map((doctor) => (

              <div
                key={doctor.id}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Doctor Top */}
                <div className="flex items-start justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                    👨‍⚕️
                  </div>

                  {doctor.available ? (

                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">

                      <CheckCircle size={13} />

                      Available

                    </span>

                  ) : (

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                      Busy
                    </span>

                  )}

                </div>


                {/* Doctor Info */}
                <h4 className="mt-5 text-lg font-bold text-gray-900">
                  {doctor.name}
                </h4>

                <p className="mt-1 text-sm font-medium text-blue-600">
                  {doctor.speciality}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {doctor.experience}
                </p>


                {/* Rating */}
                <div className="mt-4 flex items-center gap-4">

                  <div className="flex items-center gap-1">

                    <Star
                      size={17}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-sm font-bold text-gray-800">
                      {doctor.rating}
                    </span>

                  </div>


                  <div className="flex items-center gap-1 text-sm text-gray-500">

                    <MapPin size={16} />

                    {doctor.distance}

                  </div>

                </div>


                {/* Buttons */}
                <div className="mt-6 grid grid-cols-2 gap-3">

                  <button
                    onClick={() =>
                      alert(
                        `Calling ${doctor.name}...`
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >

                    <Phone size={16} />

                    Call

                  </button>


                 <button
  onClick={() => {
    window.location.href = "/book-appointment";
  }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >

                    <CalendarDays size={16} />

                    Book

                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* No Results */

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Search
                size={24}
                className="text-gray-500"
              />
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No doctors found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another doctor name or speciality.
            </p>

          </div>

        )}


        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 p-4 text-center text-xs leading-5 text-amber-800">

          <strong>Important:</strong> Doctor information shown
          here is for demonstration. Always verify doctor
          availability and credentials before consultation.

        </div>

      </main>

    </div>
  );
}

export default Doctors;