import Akcard from "../assets/images/Akcard.png";
import { Search } from "./Search";
import { FaWhatsapp, FaPhoneAlt, FaStar } from "react-icons/fa";
import { MdVerified, MdOutlineGpsFixed } from "react-icons/md";
import { HiShieldCheck } from "react-icons/hi";
import { whatsappLink, callLink } from "../utils/contact";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const stats = [
  { value: "100+", label: "Plots Delivered" },
  { value: "10+ Yrs", label: "In Hyderabad" },
  { value: "500+", label: "Families Served" },
];

const trustBadges = [
  { icon: HiShieldCheck, label: "RERA Registered" },
  { icon: MdVerified, label: "Clear Title Verified" },
  { icon: MdOutlineGpsFixed, label: "Site Visits Available" },
];

/* ─── Avatar Group ─────────────────────────────────────────────── */
const AvatarGroup = ({ size = "h-6 w-6" }) => (
  <div className="flex -space-x-3">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className={`${size} rounded - full border - 2 border - white bg - gradient - to - br from - blue - 500 to - blue - 700`}
      />
    ))}
  </div>
);

/* ─── Trust Badges ─────────────────────────────────────────────── */
const TrustBadges = ({
  iconSize = "text-base",
  textSize = "text-xs",
  justify = "",
}) => (
  <div
    className={`flex flex - wrap items - center gap - x - 5 gap - y - 2 ${justify} `}
  >
    {trustBadges.map(({ icon: Icon, label }) => (
      <div
        key={label}
        className="flex items-center gap-1.5 text-gray-600"
      >
        <Icon className={`text - green - 600 ${iconSize} `} />
        <span className={`${textSize} font - medium`}>
          {label}
        </span>
      </div>
    ))}
  </div>
);

/* ─── Stats ────────────────────────────────────────────────────── */
const StatsRow = ({ compact = false }) => (
  <div className="grid w-full grid-cols-3 gap-2 sm:gap-3">
    {stats.map((stat) => (
      <div
        key={stat.label}
        className={`rounded - xl border border - gray - 200 text - center ${compact
            ? "bg-gray-50 px-2 py-3"
            : "bg-white px-3 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          } `}
      >
        <div
          className={`font - extrabold text - blue - 600 ${compact
              ? "text-sm"
              : "text-base lg:text-lg"
            } `}
        >
          {stat.value}
        </div>

        <div
          className={`mt - 1 font - medium leading - tight text - gray - 500 ${compact
              ? "text-[9px]"
              : "text-[10px] lg:text-[11px]"
            } `}
        >
          {stat.label}
        </div>
      </div>
    ))}
  </div>
);

/* ─── Hero ─────────────────────────────────────────────────────── */
export const Hero = ({ onSearch }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* ================= DESKTOP HERO ================= */}
      <section className="mx-4 my-5 hidden overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm md:block lg:mx-6">
        <div className="grid items-center gap-10 px-7 py-10 lg:grid-cols-12 lg:px-12 lg:py-12">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            {/* Trust indicator */}
            <div className="flex w-fit items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5">
              <AvatarGroup />

              <span className="text-xs font-semibold text-gray-700">
                Trusted by 500+ families
              </span>

              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar key={index} className="text-xs" />
                ))}
              </div>
            </div>

            {/* Heading */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                AK Developer
              </p>

              <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-5xl">
                Find Verified Open Plots in{" "}
                <span className="text-blue-600">Hyderabad</span>
              </h1>
            </div>

            {/* Description */}
            <p className="max-w-2xl text-base leading-7 text-gray-600 lg:text-lg">
              Explore properties with clear information about the location,
              connectivity and investment potential. Choose a property you
              understand before you book a site visit.
            </p>

            {/* Search */}
            <div className="w-full max-w-2xl">
              <Search onSearch={onSearch} />

              <p className="mt-2 text-xs text-gray-500">
                Search by area, budget, or property type
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                size="lg"
                className="bg-blue-600 px-6 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
                onClick={() => navigate("/property")}
              >
                Explore Properties
              </Button>

              <a
                href={whatsappLink(
                  "Hi, I am interested in properties in Hyderabad"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-green-500 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-lg"
              >
                <FaWhatsapp className="text-lg" />
                WhatsApp
              </a>

              <a
                href={callLink()}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-gray-900 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg"
              >
                <FaPhoneAlt className="text-sm" />
                Call Now
              </a>
            </div>

            {/* Trust */}
            <TrustBadges />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-2 shadow-sm">
              <img
                src={Akcard}
                alt="AK Developer property"
                className="h-72 w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>

            {/* Developer card */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                    About the Developer
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900">
                    AK Developer
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    A property focused team presenting residential land
                    opportunities across Hyderabad and nearby growth areas.
                  </p>
                </div>

                <MdVerified className="mt-1 shrink-0 text-2xl text-green-600" />
              </div>
            </div>

            <StatsRow />
          </div>
        </div>
      </section>

      {/* ================= MOBILE HERO ================= */}
      <section className="bg-white px-4 py-7 sm:px-5 md:hidden">
        <div className="space-y-5">
          {/* Trust */}
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5">
            <AvatarGroup size="h-5 w-5" />

            <span className="text-[11px] font-semibold text-gray-700">
              Trusted by 500+ families
            </span>
          </div>

          {/* Heading */}
          <div className="text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              AK Developer
            </p>

            <h1 className="text-2xl font-extrabold leading-snug text-gray-900 sm:text-[1.7rem]">
              Find Verified Open Plots in{" "}
              <span className="text-blue-600">
                Hyderabad
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-center text-sm leading-6 text-gray-600">
            Explore property locations, connectivity and important details
            before you decide to visit.
          </p>

          {/* Search */}
          <div>
            <Search onSearch={onSearch} />

            <p className="mt-2 text-xs text-gray-500">
              Search by area, budget, or property type
            </p>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            <img
              src={Akcard}
              alt="AK Developer property"
              className="h-56 w-full object-cover"
            />

            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 shadow-sm">
              <MdVerified className="text-sm text-green-600" />

              <span className="text-[10px] font-semibold text-gray-800">
                Verified Properties
              </span>
            </div>
          </div>

          {/* Developer info */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
              AK Developer
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Explore residential land opportunities with clear property
              information and an easy way to arrange a site visit.
            </p>
          </div>

          {/* Stats */}
          <StatsRow compact />

          {/* CTA */}
          <div className="flex flex-col gap-3 pt-1">
            <Button
              size="lg"
              className="w-full bg-blue-600 text-white shadow transition-transform active:scale-[0.98]"
              onClick={() => navigate("/property")}
            >
              Explore Properties
            </Button>

            <a
              href={whatsappLink(
                "Hi, I am looking for properties in Hyderabad"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-green-500 text-sm font-semibold text-white shadow transition-transform active:scale-[0.98]"
            >
              <FaWhatsapp className="text-lg" />
              WhatsApp for Details
            </a>

            <a
              href={callLink()}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-gray-900 text-sm font-semibold text-white shadow transition-transform active:scale-[0.98]"
            >
              <FaPhoneAlt className="text-sm" />
              Call Now
            </a>
          </div>

          {/* Trust badges */}
          <TrustBadges
            iconSize="text-sm"
            textSize="text-[10px]"
            justify="justify-center"
          />
        </div>
      </section>
    </>
  );
};
