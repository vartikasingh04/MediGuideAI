import { HeartPulse, ArrowUp } from "lucide-react";

function Footer() {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-gray-200 bg-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <HeartPulse size={24} />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  MediGuide <span className="text-blue-600">AI</span>
                </h2>

                <p className="text-xs text-gray-500">
                  Smart Health Assistant
                </p>
              </div>

            </div>

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-600">
              A smart health guidance platform designed to help
              users understand symptoms and find appropriate
              medical support.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Product
            </h3>

            <div className="mt-5 space-y-3 text-sm text-gray-600">

              <a
                href="#features"
                className="block hover:text-blue-600"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="block hover:text-blue-600"
              >
                How It Works
              </a>

              <a
                href="#assessment"
                className="block hover:text-blue-600"
              >
                Assessment
              </a>

            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Company
            </h3>

            <div className="mt-5 space-y-3 text-sm text-gray-600">

              <a
                href="#about"
                className="block hover:text-blue-600"
              >
                About Us
              </a>

              <a
                href="#"
                className="block hover:text-blue-600"
              >
                Contact
              </a>

              <a
                href="#"
                className="block hover:text-blue-600"
              >
                Privacy Policy
              </a>

            </div>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Important
            </h3>

            <div className="mt-5 rounded-2xl bg-amber-50 p-5">

              <p className="text-sm leading-6 text-amber-800">
                MediGuide AI provides general health information
                and is not a substitute for professional medical
                diagnosis, treatment, or emergency care.
              </p>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MediGuide AI. All rights reserved.
          </p>

          <button
            onClick={handleTop}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
          >
            Back to top
            <ArrowUp size={16} />
          </button>

        </div>

      </div>

    </footer>
  );
}

export default Footer;