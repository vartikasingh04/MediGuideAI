
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  Clock,
  UserRound,
} from "lucide-react";

function BookAppointment() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [booked, setBooked] = useState(false);

  const doctor = {
    name: "Dr. Ankit Sharma",
    speciality: "General Physician",
    experience: "8 years experience",
    rating: "4.8",
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!name || !phone || !date || !time) {
      alert("Please complete all required fields.");
      return;
    }

    const appointment = {
      patientName: name,
      phone,
      date,
      time,
      reason,
      doctor: doctor.name,
      speciality: doctor.speciality,
    };

    localStorage.setItem(
      "mediGuideAppointment",
      JSON.stringify(appointment)
    );

    setBooked(true);
  };

  if (booked) {
    return (
      <div className="min-h-screen bg-slate-50">

        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <CalendarDays size={21} />
              </div>

              <div>
                <h1 className="font-bold text-gray-900">
                  MediGuide{" "}
                  <span className="text-blue-600">AI</span>
                </h1>

                <p className="text-xs text-gray-500">
                  Appointment Booking
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto flex max-w-3xl justify-center px-6 py-16">

          <div className="w-full rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm md:p-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle size={45} />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Appointment Request Submitted
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
              Your appointment request has been saved successfully.
              Please verify the appointment details with the healthcare
              provider before visiting.
            </p>

            <div className="mt-8 rounded-2xl bg-blue-50 p-6 text-left">

              <h3 className="font-bold text-gray-900">
                Appointment Details
              </h3>

              <div className="mt-4 space-y-3 text-sm">

                <p>
                  <strong>Doctor:</strong> {doctor.name}
                </p>

                <p>
                  <strong>Speciality:</strong>{" "}
                  {doctor.speciality}
                </p>

                <p>
                  <strong>Patient:</strong> {name}
                </p>

                <p>
                  <strong>Date:</strong> {date}
                </p>

                <p>
                  <strong>Time:</strong> {time}
                </p>

              </div>

            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">

              <a
                href="/doctors"
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Find Another Doctor
              </a>

              <a
                href="/dashboard"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Go to Dashboard
              </a>

            </div>

          </div>

        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-5xl items-center px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <CalendarDays size={21} />
            </div>

            <div>
              <h1 className="font-bold text-gray-900">
                MediGuide{" "}
                <span className="text-blue-600">AI</span>
              </h1>

              <p className="text-xs text-gray-500">
                Appointment Booking
              </p>
            </div>

          </div>

        </div>

      </header>


      {/* Main */}

      <main className="mx-auto max-w-4xl px-6 py-10">

        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Doctors
        </button>


        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">

          {/* Doctor Card */}

          <section className="h-fit rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
              👨‍⚕️
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              {doctor.name}
            </h2>

            <p className="mt-1 font-medium text-blue-600">
              {doctor.speciality}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {doctor.experience}
            </p>

            <div className="mt-5 rounded-xl bg-blue-50 p-4">

              <p className="text-sm font-semibold text-blue-900">
                ⭐ {doctor.rating} Rating
              </p>

              <p className="mt-1 text-xs text-blue-700">
                General healthcare consultation
              </p>

            </div>

          </section>


          {/* Appointment Form */}

          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm md:p-8">

            <div className="mb-7">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <CalendarDays size={23} />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                Book an Appointment
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Enter your details and preferred appointment time.
              </p>

            </div>


            <form
              onSubmit={handleBooking}
              className="space-y-5"
            >

              {/* Name */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Patient Name *
                </label>

                <div className="relative">

                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-300 py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>


              {/* Phone */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>


              {/* Date */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Preferred Date *
                </label>

                <div className="relative">

                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    value={date}
                    min={new Date()
                      .toISOString()
                      .split("T")[0]}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>


              {/* Time */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Preferred Time *
                </label>

                <div className="relative">

                  <Clock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="time"
                    value={time}
                    onChange={(e) =>
                      setTime(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>


              {/* Reason */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Reason for Visit
                </label>

                <textarea
                  value={reason}
                  onChange={(e) =>
                    setReason(e.target.value)
                  }
                  rows="4"
                  placeholder="Briefly describe your reason for consultation..."
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>


              {/* Submit */}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >

                <CalendarDays size={18} />

                Confirm Appointment

              </button>

            </form>

          </section>

        </div>


        {/* Disclaimer */}

        <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4 text-center text-xs leading-5 text-amber-800">

          <strong>Important:</strong> This is a demonstration
          appointment interface. Appointment availability and
          confirmation must be verified with the healthcare provider.

        </div>

      </main>

    </div>
  );
}

export default BookAppointment;

