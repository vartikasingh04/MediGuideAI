import {
  HeartPulse,
  Stethoscope,
  Hospital,
  Ambulance,
  Phone,
  ShieldCheck,
  Pill,
  Brain,
  ChevronDown,
  ArrowRight,
  Activity,
  AlertTriangle,
  Home,
  Apple,
  Droplets,
  Thermometer,
  Clock,
  CheckCircle,
  Info,
  Wind,
} from "lucide-react";

const MedicalHelp = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("emergency");

  const goTo = (path) => {
    window.location.href = path;
  };

  const callEmergency = () => {
    window.location.href = "tel:112";
  };

  const faqs = [
    {
      question: "When should I go to the emergency department?",
      answer:
        "Seek immediate medical attention for severe breathing difficulty, severe chest pain, unconsciousness, uncontrolled bleeding, signs of stroke, seizures, or any condition that appears life-threatening.",
    },
    {
      question: "Can MediGuideAI replace a doctor?",
      answer:
        "No. MediGuideAI is designed to provide general health information and guidance. Diagnosis and treatment should be provided by a qualified healthcare professional.",
    },
    {
      question: "What information should I tell a doctor?",
      answer:
        "Tell the doctor your symptoms, when they started, how severe they are, medicines you take, allergies, existing conditions, and any recent changes in your health.",
    },
    {
      question: "Should I take medicine based only on online information?",
      answer:
        "No. Do not start, stop, or change prescription medicines without appropriate professional medical advice.",
    },
    {
      question: "What should I do if my symptoms are getting worse?",
      answer:
        "Do not ignore worsening symptoms. Contact a healthcare professional or seek urgent medical care depending on the severity of the symptoms.",
    },
  ];

  const emergencySigns = [
    "Severe difficulty breathing",
    "Severe or persistent chest pain",
    "Unconsciousness or inability to wake",
    "Uncontrolled or severe bleeding",
    "Sudden weakness or difficulty speaking",
    "Seizure or repeated seizures",
    "Severe allergic reaction",
    "Serious injury or accident",
  ];

  const firstAid = [
    {
      title: "Minor Cuts",
      icon: Activity,
      steps: [
        "Wash your hands before touching the wound.",
        "Gently clean the wound with clean running water.",
        "Apply gentle pressure if there is bleeding.",
        "Cover with a clean dressing.",
      ],
    },
    {
      title: "Burns",
      icon: Thermometer,
      steps: [
        "Move away from the source of heat.",
        "Cool the affected area with clean, cool running water.",
        "Do not apply ice directly to the burn.",
        "Seek medical attention for serious or extensive burns.",
      ],
    },
    {
      title: "Fever",
      icon: Thermometer,
      steps: [
        "Rest and stay hydrated.",
        "Monitor temperature and symptoms.",
        "Wear comfortable clothing.",
        "Seek medical advice if symptoms are severe or persistent.",
      ],
    },
    {
      title: "Breathing Difficulty",
      icon: Wind,
      steps: [
        "Help the person sit upright if comfortable.",
        "Keep the surroundings calm and well ventilated.",
        "Do not delay professional medical care.",
        "Call emergency services for severe breathing difficulty.",
      ],
    },
  ];

  const healthyHabits = [
    {
      icon: Droplets,
      title: "Stay Hydrated",
      text: "Drink adequate fluids throughout the day and pay attention to signs of dehydration.",
    },
    {
      icon: Apple,
      title: "Balanced Diet",
      text: "Include fruits, vegetables, whole grains and other nutritious foods in your diet.",
    },
    {
      icon: Activity,
      title: "Stay Active",
      text: "Regular physical activity can support cardiovascular and overall health.",
    },
    {
      icon: Clock,
      title: "Sleep Well",
      text: "Maintain a consistent sleep routine and give your body enough time to recover.",
    },
    {
      icon: Brain,
      title: "Manage Stress",
      text: "Use healthy coping strategies such as relaxation, hobbies, exercise and social support.",
    },
    {
      icon: ShieldCheck,
      title: "Preventive Care",
      text: "Keep up with appropriate health checkups, vaccinations and preventive care.",
    },
  ];

  const medicineRules = [
    "Take medicines only as directed by a qualified healthcare professional.",
    "Read the medicine label and follow the prescribed instructions.",
    "Do not share prescription medicines with another person.",
    "Tell your healthcare provider about allergies and other medicines you take.",
    "Do not stop important prescription medicines without professional advice.",
    "Keep medicines safely stored and away from children.",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <button
            onClick={() => goTo("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-2">
              <HeartPulse size={22} />
            </div>

            <span className="text-xl font-bold">
              MediGuide
              <span className="text-cyan-400">AI</span>
            </span>
          </button>

          <button
            onClick={() => goTo("/dashboard")}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
          >
            <Home size={17} />
            Dashboard
          </button>

        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/20">
            <HeartPulse size={40} />
          </div>

          <p className="font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Medical Help Center
          </p>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">
            Your Guide to
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Better Health Decisions
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Understand common health situations, learn basic first-aid
            information, recognize emergency warning signs and know when
            professional medical care may be needed.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <button
              onClick={callEmergency}
              className="flex items-center gap-2 rounded-2xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-700 hover:scale-105"
            >
              <Ambulance size={21} />
              Emergency: 112
            </button>

            <button
              onClick={() => goTo("/assessment")}
              className="flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-7 py-4 font-bold text-cyan-300 transition hover:bg-cyan-400/20"
            >
              <Activity size={21} />
              Check My Symptoms
            </button>

          </div>

        </div>
      </section>

      {/* EMERGENCY WARNING */}
      <section className="mx-auto max-w-6xl px-6">

        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-7">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/20 text-red-400">
                <AlertTriangle size={28} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Know the Emergency Warning Signs
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  If a person appears to have a life-threatening condition,
                  do not delay professional medical care.
                </p>
              </div>

            </div>

            <button
              onClick={callEmergency}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-700"
            >
              <Phone size={18} />
              Call 112
            </button>

          </div>

        </div>

      </section>

      {/* EMERGENCY SIGNS */}
      <section className="mx-auto max-w-6xl px-6 py-16">

        <div className="mb-8">
          <p className="font-semibold text-red-400">
            EMERGENCY CARE
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Get Immediate Help If You Notice
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">

          {emergencySigns.map((sign, index) => (

            <div
              key={index}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400">
                <AlertTriangle size={19} />
              </div>

              <span className="font-medium text-slate-200">
                {sign}
              </span>

            </div>

          ))}

        </div>

      </section>

      {/* HEALTH GUIDE TABS */}
      <section className="mx-auto max-w-6xl px-6 py-10">

        <div className="mb-10 text-center">

          <p className="font-semibold text-cyan-400">
            HEALTH GUIDE
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Useful Medical Information
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Explore basic information that can help you make safer health
            decisions.
          </p>

        </div>

        {/* TABS */}

        <div className="mb-8 flex flex-wrap justify-center gap-3">

          <button
            onClick={() => setActiveTab("emergency")}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              activeTab === "emergency"
                ? "bg-cyan-500 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            Emergency
          </button>

          <button
            onClick={() => setActiveTab("firstaid")}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              activeTab === "firstaid"
                ? "bg-cyan-500 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            First Aid
          </button>

          <button
            onClick={() => setActiveTab("medicine")}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              activeTab === "medicine"
                ? "bg-cyan-500 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            Medicine Safety
          </button>

          <button
            onClick={() => setActiveTab("lifestyle")}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              activeTab === "lifestyle"
                ? "bg-cyan-500 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            Healthy Lifestyle
          </button>

        </div>

        {/* EMERGENCY TAB */}

        {activeTab === "emergency" && (

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="mb-6 flex items-center gap-4">

              <div className="rounded-2xl bg-red-500/15 p-4 text-red-400">
                <Ambulance size={30} />
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  What To Do During an Emergency
                </h3>

                <p className="text-slate-400">
                  Stay calm and prioritize immediate professional help.
                </p>
              </div>

            </div>

            <div className="grid gap-4 md:grid-cols-3">

              <div className="rounded-2xl bg-black/20 p-5">
                <span className="text-2xl font-bold text-cyan-400">
                  01
                </span>

                <h4 className="mt-3 font-bold">
                  Recognize
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Identify serious or life-threatening symptoms.
                </p>
              </div>

              <div className="rounded-2xl bg-black/20 p-5">
                <span className="text-2xl font-bold text-cyan-400">
                  02
                </span>

                <h4 className="mt-3 font-bold">
                  Call for Help
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Contact emergency medical services as quickly as possible.
                </p>
              </div>

              <div className="rounded-2xl bg-black/20 p-5">
                <span className="text-2xl font-bold text-cyan-400">
                  03
                </span>

                <h4 className="mt-3 font-bold">
                  Follow Instructions
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Follow instructions from trained emergency professionals.
                </p>
              </div>

            </div>

          </div>

        )}

        {/* FIRST AID TAB */}

        {activeTab === "firstaid" && (

          <div className="grid gap-6 md:grid-cols-2">

            {firstAid.map((item, index) => {

              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/5 p-7"
                >

                  <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-cyan-500/15 p-4 text-cyan-400">
                      <Icon size={27} />
                    </div>

                    <h3 className="text-xl font-bold">
                      {item.title}
                    </h3>

                  </div>

                  <div className="mt-6 space-y-3">

                    {item.steps.map((step, stepIndex) => (

                      <div
                        key={stepIndex}
                        className="flex gap-3"
                      >

                        <CheckCircle
                          size={19}
                          className="mt-1 shrink-0 text-emerald-400"
                        />

                        <p className="text-sm leading-6 text-slate-400">
                          {step}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>
              );
            })}

          </div>

        )}

        {/* MEDICINE TAB */}

        {activeTab === "medicine" && (

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-purple-500/15 p-4 text-purple-400">
                <Pill size={30} />
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  Medicine Safety
                </h3>

                <p className="text-slate-400">
                  Safe medicine use is an important part of healthcare.
                </p>
              </div>

            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">

              {medicineRules.map((rule, index) => (

                <div
                  key={index}
                  className="flex gap-3 rounded-2xl bg-black/20 p-5"
                >

                  <ShieldCheck
                    size={21}
                    className="mt-1 shrink-0 text-purple-400"
                  />

                  <p className="text-sm leading-6 text-slate-300">
                    {rule}
                  </p>

                </div>

              ))}

            </div>

            <div className="mt-8 flex gap-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">

              <Info
                className="shrink-0 text-yellow-400"
                size={22}
              />

              <p className="text-sm leading-6 text-slate-300">
                Never use MediGuideAI or online information as the sole
                basis for starting or changing prescription treatment.
              </p>

            </div>

          </div>

        )}

        {/* LIFESTYLE TAB */}

        {activeTab === "lifestyle" && (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {healthyHabits.map((habit, index) => {

              const Icon = habit.icon;

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10"
                >

                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
                    <Icon size={27} />
                  </div>

                  <h3 className="text-xl font-bold">
                    {habit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {habit.text}
                  </p>

                </div>
              );
            })}

          </div>

        )}

      </section>

      {/* WHEN TO SEE DOCTOR */}
      <section className="mx-auto max-w-6xl px-6 py-16">

        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-8 md:p-10">

          <div className="flex flex-col gap-8 md:flex-row">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400">
              <Stethoscope size={34} />
            </div>

            <div className="flex-1">

              <h2 className="text-2xl font-bold md:text-3xl">
                When Should You Consult a Doctor?
              </h2>

              <p className="mt-3 leading-7 text-slate-400">
                Professional medical advice is important when symptoms are
                persistent, worsening, unusual, severe, or affecting your
                normal activities.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">

                {[
                  "Symptoms are getting worse",
                  "Symptoms continue for an unusual period",
                  "You have a serious existing condition",
                  "You are unsure about your symptoms",
                  "Treatment is not improving your condition",
                  "You have concerning new symptoms",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle
                      size={18}
                      className="text-cyan-400"
                    />

                    <span className="text-sm text-slate-300">
                      {item}
                    </span>
                  </div>

                ))}

              </div>

              <button
                onClick={() => goTo("/assessment")}
                className="mt-7 flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-bold transition hover:bg-cyan-600"
              >
                Start Health Assessment
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* MENTAL HEALTH */}
      <section className="mx-auto max-w-6xl px-6 pb-16">

        <div className="rounded-3xl border border-pink-500/20 bg-pink-500/5 p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-pink-500/15 text-pink-400">
              <Brain size={34} />
            </div>

            <div className="flex-1">

              <h2 className="text-2xl font-bold">
                Mental Health Matters Too
              </h2>

              <p className="mt-3 leading-7 text-slate-400">
                Stress, anxiety, low mood and emotional difficulties can
                affect everyday life. Talking to a trusted person or
                qualified mental health professional can be an important
                step toward support.
              </p>

            </div>

            <button
              onClick={() => goTo("/mental-wellness")}
              className="flex items-center justify-center gap-2 rounded-xl bg-pink-500 px-5 py-3 font-bold transition hover:bg-pink-600"
            >
              Mental Wellness
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </section>

      {/* QUICK ACTIONS */}
      <section className="mx-auto max-w-6xl px-6 pb-16">

        <div className="mb-8 text-center">

          <p className="font-semibold text-cyan-400">
            QUICK ACTIONS
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Need More Help?
          </h2>

        </div>

        <div className="grid gap-5 md:grid-cols-3">

          <button
            onClick={() => goTo("/assessment")}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-cyan-400/30 hover:bg-white/10"
          >

            <Activity
              className="text-cyan-400"
              size={30}
            />

            <h3 className="mt-5 text-lg font-bold">
              Check Symptoms
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Start a health assessment and record your symptoms.
            </p>

            <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-cyan-400">
              Start Assessment
              <ArrowRight size={16} />
            </span>

          </button>

          <button
            onClick={() => goTo("/hospitals")}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-blue-400/30 hover:bg-white/10"
          >

            <Hospital
              className="text-blue-400"
              size={30}
            />

            <h3 className="mt-5 text-lg font-bold">
              Find Hospitals
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Find healthcare facilities and medical services.
            </p>

            <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-400">
              Find Medical Help
              <ArrowRight size={16} />
            </span>

          </button>

          <button
            onClick={callEmergency}
            className="group rounded-3xl border border-red-500/20 bg-red-500/5 p-6 text-left transition hover:bg-red-500/10"
          >

            <Ambulance
              className="text-red-400"
              size={30}
            />

            <h3 className="mt-5 text-lg font-bold">
              Emergency
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              For serious emergencies, contact emergency services.
            </p>

            <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-red-400">
              Call 112
              <Phone size={16} />
            </span>

          </button>

        </div>

      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 pb-20">

        <div className="mb-10 text-center">

          <p className="font-semibold text-cyan-400">
            FAQ
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="space-y-4">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >

              <button
                onClick={() =>
                  setOpenFaq(
                    openFaq === index ? null : index
                  )
                }
                className="flex w-full items-center justify-between p-5 text-left"
              >

                <span className="pr-5 font-semibold">
                  {faq.question}
                </span>

                <ChevronDown
                  size={20}
                  className={`shrink-0 transition ${
                    openFaq === index
                      ? "rotate-180 text-cyan-400"
                      : "text-slate-400"
                  }`}
                />

              </button>

              {openFaq === index && (

                <div className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-7 text-slate-400">
                  {faq.answer}
                </div>

              )}

            </div>

          ))}

        </div>

      </section>

      {/* DISCLAIMER */}
      <section className="mx-auto max-w-6xl px-6 pb-16">

        <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-7">

          <div className="flex gap-4">

            <ShieldCheck
              size={28}
              className="shrink-0 text-yellow-400"
            />

            <div>

              <h3 className="font-bold">
                Important Medical Disclaimer
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-400">
                The information provided on this page is for general
                educational purposes only. MediGuideAI does not provide
                a medical diagnosis or replace a qualified healthcare
                professional. If you have serious, worsening or
                life-threatening symptoms, seek appropriate professional
                medical care immediately.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/20">

        <div className="mx-auto max-w-7xl px-6 py-10 text-center">

          <div className="flex items-center justify-center gap-2 text-lg font-bold">

            <HeartPulse
              size={23}
              className="text-cyan-400"
            />

            MediGuide
            <span className="text-cyan-400">AI</span>

          </div>

          <p className="mt-3 text-sm text-slate-500">
            Smart health guidance for a healthier tomorrow.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-5 text-sm text-slate-500">

            <button
              onClick={() => goTo("/dashboard")}
              className="hover:text-cyan-400"
            >
              Dashboard
            </button>

            <button
              onClick={() => goTo("/assessment")}
              className="hover:text-cyan-400"
            >
              Assessment
            </button>

            <button
              onClick={() => goTo("/hospitals")}
              className="hover:text-cyan-400"
            >
              Hospitals
            </button>

            <button
              onClick={callEmergency}
              className="hover:text-red-400"
            >
              Emergency
            </button>

          </div>

          <p className="mt-7 text-xs text-slate-600">
            © {new Date().getFullYear()} MediGuideAI. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
};

export default MedicalHelp;