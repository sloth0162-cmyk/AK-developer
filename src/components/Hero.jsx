import Akcard from "../assets/images/Akcard.png";
import { Search } from "./Search";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { whatsappLink, callLink } from "../utils/contact";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ================= DESKTOP HERO ================= */}
      <div className="hidden md:block px-10 py-12 m-6 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 shadow-sm">
        {/* Main Header Banner */}
        <h1 className="text-center text-4xl font-extrabold tracking-tight mb-10 text-gray-900">
          Welcome to <span className="text-blue-600">Ak Developer</span> —{" "}
          <span className="italic font-semibold text-gray-700">
            Your Gateway to Smart Properties
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT CONTENT SECTION */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Line 1: Main Title */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight whitespace-nowrap">
              Find Your Dream Property
            </h2>

            {/* Line 2: Subtitle / Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Discover open plots and commercial sites in{" "}
              <span className="font-semibold text-gray-800">
                prime Hyderabad locations
              </span>.
            </p>

            {/* Line 3: Search Component */}
            <div className="w-full my-1">
              <Search />
              <p className="text-xs text-gray-500 mt-2">
                • Search by area, budget, or property type
              </p>
            </div>

            {/* Line 4: CTA Buttons below Search */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition cursor-pointer shadow-sm hover:shadow-md"
                onClick={() => navigate("/blogpage")}
              >
                Explore Properties
              </button>

              <a
                href={whatsappLink("Hi, I am interested in plots in Hyderabad")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition shadow-sm hover:shadow-md"
              >
                <FaWhatsapp className="text-lg" /> WhatsApp
              </a>

              <a
                href={callLink()}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-xl active:scale-95"
              >
                <FaPhoneAlt className="text-sm" />
                Call Now
              </a>
            </div>

            <p className="text-sm text-gray-500">
              • Hyderabad based
            </p>
          </div>

          {/* RIGHT SECTION: Hero Image placed cleanly on the right column */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative overflow-hidden rounded-2xl border border-gray-300 shadow-lg bg-white p-2 w-full max-w-md">
              <img
                src={Akcard}
                alt="Find Properties"
                className="h-72 w-full object-cover rounded-xl transform hover:scale-102 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE HERO ================= */}
      <div className="md:hidden px-5 py-8 bg-white space-y-5">
        <h1 className="text-center text-2xl font-extrabold text-gray-900">
          Smart Properties in <span className="text-blue-600">Hyderabad</span>
        </h1>

        {/* Line 1: Headline */}
        <h2 className="text-xl font-bold text-gray-900">
          Find Your Dream Property
        </h2>

        {/* Line 2: Subtitle */}
        <p className="text-gray-600 text-sm">
          Discover open plots and commercial sites in{" "}
          <span className="font-semibold text-gray-800">prime Hyderabad locations</span>.
        </p>

        {/* Line 3: Search */}
        <div>
          <Search />
          <p className="text-xs text-gray-500 mt-2">
            • Search by area, budget, or property type
          </p>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center my-3">
          <img
            src={Akcard}
            alt="Hero Logo"
            className="w-full max-h-56 object-cover rounded-xl shadow-md border border-gray-200"
          />
        </div>

        {/* Line 4: CTA Buttons below Search */}
        <div className="flex flex-col gap-3">
          <button
            className="w-full text-center py-3 bg-blue-600 text-white rounded-lg font-medium shadow cursor-pointer"
            onClick={() => navigate("/blogpage")}
          >
            Explore Properties
          </button>
          <a
            href={whatsappLink("Hi, I am looking for plots in Hyderabad")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full text-center bg-green-500 text-white py-3 rounded-lg font-medium shadow"
          >
            <FaWhatsapp className="text-lg" /> WhatsApp for Details
          </a>
          <a
            href={callLink()}
            className="flex items-center justify-center gap-2 w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium shadow active:scale-95"
          >
            <FaPhoneAlt className="text-sm" /> Call Now
          </a>
        </div>
      </div>
    </>
  );
};

