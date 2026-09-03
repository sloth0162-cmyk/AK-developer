import Akcard from "../assets/images/Akcard.png";
import { Search } from "./Search";
import { FaWhatsapp, FaPhoneAlt, FaStar } from "react-icons/fa";
import { MdVerified, MdOutlineGpsFixed } from "react-icons/md";
import { HiShieldCheck } from "react-icons/hi";
import { whatsappLink, callLink } from "../utils/contact";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "500+", label: "Plots Delivered" },
  { value: "10+ Yrs", label: "In Hyderabad" },
  { value: "1200+", label: "Happy Families" },
  { value: "0", label: "Legal Disputes" },
];

const trustBadges = [
  { icon: HiShieldCheck, label: "RERA Registered" },
  { icon: MdVerified, label: "Clear Title Verified" },
  { icon: MdOutlineGpsFixed, label: "Site Visit Guaranteed" },
];

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ================= DESKTOP HERO ================= */}
      <div className="hidden md:block relative px-6 lg:px-10 py-10 lg:py-12 m-4 lg:m-6 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 shadow-sm overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-24 -right-24 h-72 w-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT CONTENT SECTION */}
          <div className="lg:col-span-7 flex flex-col gap-5 animate-[fadeIn_0.6s_ease-out]">
            {/* Trust strip */}
            <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
              <div className="flex -space-x-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-6 w-6 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 border-2 border-white" />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-700">1200+ families trust us</span>
              <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl lg:text-4xl xl:text-[2.75rem] font-extrabold tracking-tight text-gray-900 leading-tight">
              Own Verified Open Plots in{" "}
              <span className="text-blue-600">Hyderabad</span> — Not Just a Booking Slip
            </h1>

            {/* Subtitle */}
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl">
              Every plot we list is <span className="font-semibold text-gray-800">RERA-approved and title-verified</span> before it reaches you — so you invest with proof, not promises.
            </p>

            {/* Search */}
            <div className="w-full my-1">
              <Search />
              <p className="text-xs text-gray-500 mt-2">
                Search by area, budget, or property type
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 lg:gap-4 pt-1">
              <button
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                onClick={() => navigate("/blogpage")}
              >
                Explore Verified Plots
              </button>

              <a
                href={whatsappLink("Hi, I am interested in plots in Hyderabad")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <FaWhatsapp className="text-lg" /> WhatsApp
              </a>

              <a
                href={callLink()}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                <FaPhoneAlt className="text-sm" />
                Call Now
              </a>
            </div>

            {/* Trust badges row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-gray-600">
                    <Icon className="text-green-600 text-base" />
                    <span className="text-xs font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-5 flex flex-col items-center gap-5">
            <div className="relative overflow-hidden rounded-2xl border border-gray-300 shadow-lg bg-white p-2 w-full max-w-md group">
              <img
                src={Akcard}
                alt="Verified Hyderabad plots by AK Developer"
                className="h-72 w-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur shadow-md">
                <MdVerified className="text-green-600 text-sm" />
                <span className="text-xs font-semibold text-gray-800">Title Verified</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-2 w-full max-w-md">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center text-center bg-white rounded-xl border border-gray-200 shadow-sm py-3 px-1 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="text-base lg:text-lg font-extrabold text-blue-600">{s.value}</span>
                  <span className="text-[10px] lg:text-[11px] text-gray-500 font-medium leading-tight mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE HERO ================= */}
      <div className="md:hidden px-4 sm:px-5 py-7 sm:py-8 bg-white space-y-5">
        {/* Trust strip */}
        <div className="flex items-center justify-center gap-2 w-fit mx-auto px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
          <div className="flex -space-x-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-5 w-5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 border-2 border-white" />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-gray-700">1200+ families trust us</span>
        </div>

        <h1 className="text-center text-2xl sm:text-[1.6rem] font-extrabold text-gray-900 leading-snug">
          Own Verified Open Plots in{" "}
          <span className="text-blue-600">Hyderabad</span>
        </h1>

        <p className="text-gray-600 text-sm text-center leading-relaxed">
          Every plot is <span className="font-semibold text-gray-800">RERA-approved and title-verified</span> before it reaches you.
        </p>

        {/* Search */}
        <div>
          <Search />
          <p className="text-xs text-gray-500 mt-2">
            Search by area, budget, or property type
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative flex justify-center my-3">
          <img
            src={Akcard}
            alt="Verified Hyderabad plots by AK Developer"
            className="w-full max-h-56 object-cover rounded-xl shadow-md border border-gray-200"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur shadow-md">
            <MdVerified className="text-green-600 text-xs" />
            <span className="text-[10px] font-semibold text-gray-800">Title Verified</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center text-center bg-gray-50 rounded-xl border border-gray-200 py-2.5 px-1 active:scale-95 transition-transform duration-150"
            >
              <span className="text-sm font-extrabold text-blue-600">{s.value}</span>
              <span className="text-[9px] text-gray-500 font-medium leading-tight mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 pt-1">
          <button
            className="w-full text-center py-3 bg-blue-600 text-white rounded-lg font-medium shadow cursor-pointer active:scale-95 transition-transform duration-150"
            onClick={() => navigate("/blogpage")}
          >
            Explore Verified Plots
          </button>
          <a
            href={whatsappLink("Hi, I am looking for plots in Hyderabad")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full text-center bg-green-500 text-white py-3 rounded-lg font-medium shadow active:scale-95 transition-transform duration-150"
          >
            <FaWhatsapp className="text-lg" /> WhatsApp for Details
          </a>
          <a
            href={callLink()}
            className="flex items-center justify-center gap-2 w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium shadow active:scale-95 transition-transform duration-150"
          >
            <FaPhoneAlt className="text-sm" /> Call Now
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-1">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1 text-gray-600">
              <Icon className="text-green-600 text-sm" />
              <span className="text-[10px] font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};