import Akcard from "../assets/images/Akcard.png";
import { FaWhatsapp, FaPhoneAlt, FaStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { HiShieldCheck } from "react-icons/hi";
import { whatsappLink, callLink } from "../utils/contact";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const trustBadges = [
  { icon: HiShieldCheck, label: "Verified Projects" },
  { icon: MdVerified, label: "Clear Property Information" },
  { icon: MdVerified, label: "Site Visits Available" },
];

const AvatarGroup = ({ size = "h-6 w-6" }) => (
  <div className="flex -space-x-3">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className={`${size} rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-blue-700`}
      />
    ))}
  </div>
);

const TrustBadges = ({
  iconSize = "text-base",
  textSize = "text-xs",
  justify = "",
}) => (
  <div
    className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${justify}`}
  >
    {trustBadges.map(({ icon: Icon, label }) => (
      <div
        key={label}
        className="flex items-center gap-1.5 text-gray-600"
      >
        <Icon className={`text-green-600 ${iconSize}`} />
        <span className={`${textSize} font-medium`}>
          {label}
        </span>
      </div>
    ))}
  </div>
);

export const Hero = () => {
  const navigate = useNavigate();

  return (
<section className="relative mx-4 my-5 overflow-hidden rounded-2xl border border-gray-200 shadow-sm lg:mx-6">
  {/* Background image */}
  <img
    src={Akcard}
    alt=""
    className="absolute inset-0 h-full w-full object-cover"
  />
{/* Left-side blur for text readability */}
<div className="absolute inset-y-0 left-0 w-full md:w-[65%] bg-gradient-to-r from-white/95 via-white/75 to-transparent backdrop-blur-[2px]" />
  {/* Content */}
  <div className="relative mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">

    {/* Trust */}
    <div className="mb-5 flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
      <AvatarGroup />

      <span className="text-xs font-semibold text-gray-900">
        Trusted by 500+ families
      </span>

      <div className="flex items-center gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <FaStar key={index} className="text-xs" />
        ))}
      </div>
    </div>

    {/* Main content */}
    <div className="max-w-3xl">

      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
        AK Developer
      </p>

      <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        Verified Open Plots
        <br />
        <span className="text-blue-600">
          For Your Next Investment
        </span>
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-gray-950 sm:text-lg">
        AK Developer is an{" "}
        <span className="font-semibold">
          Eeshanya Dream Team project
        </span>{" "}
        focused on verified open plots and property opportunities
        across Hyderabad and nearby growth areas.
      </p>

      <p className="mt-2 max-w-2xl text-base leading-7 text-gray-900">
        Explore the property, understand the location, and arrange a{" "}
        <span className="font-semibold">
          site visit
        </span>{" "}
        before making your decision.
      </p>

      {/* CTA */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          size="lg"
          className="h-11 bg-blue-600 px-6 text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
          onClick={() => navigate("/property")}
        >
          Explore Properties
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="h-11 border-gray-300 bg-white/90 px-6 text-gray-950 shadow-sm hover:bg-white"
          onClick={() => navigate("/sitevisit")}
        >
          Book a Site Visit
        </Button>

        <a
          href={whatsappLink(
            "Hi, I am interested in properties from AK Developer"
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-green-500 px-5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-lg"
        >
          <FaWhatsapp className="text-lg" />
          WhatsApp
        </a>

        <a
          href={callLink()}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-gray-950 px-5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg"
        >
          <FaPhoneAlt className="text-sm" />
          Call Now
        </a>
      </div>

      {/* Surprise: simple buying journey */}
      <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-xl border border-white/70 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm">
        <span className="text-xs font-bold text-gray-950">
          Explore
        </span>

        <span className="text-gray-500">→</span>

        <span className="text-xs font-bold text-gray-950">
          Visit
        </span>

        <span className="text-gray-500">→</span>

        <span className="text-xs font-bold text-gray-950">
          Decide
        </span>

        <span className="ml-1 rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
          Simple &amp; direct
        </span>
      </div>

      {/* Trust badges */}
      <div className="mt-5">
        <TrustBadges />
      </div>
    </div>
  </div>
</section>
  );
};