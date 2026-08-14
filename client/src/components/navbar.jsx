import { HeartPulse, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <HeartPulse size={23} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              MediGuide <span className="text-blue-600">AI</span>
            </h1>
            <p className="text-[10px] text-slate-500">
              Smart Health Assistant
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#home" className="text-sm font-medium text-slate-700 hover:text-blue-600">
            Home
          </a>

          <a href="#features" className="text-sm font-medium text-slate-700 hover:text-blue-600">
            Features
          </a>

          <a href="#how-it-works" className="text-sm font-medium text-slate-700 hover:text-blue-600">
            How It Works
          </a>

          <a href="#about" className="text-sm font-medium text-slate-700 hover:text-blue-600">
            About
          </a>
        </div>

        {/* Desktop Buttons */}
        <a
  href="/login"
  className="rounded-xl px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100"
>
  Login
</a>

<a
  href="/register"
  className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-lg transition hover:bg-blue-700"
>
  Get Started
</a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About</a>

            <button className="rounded-xl bg-blue-600 py-3 font-semibold text-white">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;