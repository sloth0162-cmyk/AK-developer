import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "../lib/client";
import Navbar from "../components/Navbar";
import NavbarTwo from "../components/NavbarTwo";
import Footer from "../components/Footer";

const supabase = createClient();

/* ─── Inline SVG Icons ──────────────────────────────────────────────── */
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const RoadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3.5 2A1.5 1.5 0 002 3.5v13A1.5 1.5 0 003.5 18h1a.5.5 0 00.49-.41L6.5 9l1.51 8.59A.5.5 0 008.5 18h3a.5.5 0 00.49-.41L13.5 9l1.51 8.59a.5.5 0 00.49.41h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-13z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

/* ─── Property Landing Page Card (inline, for this page only) ─────── */
const PropertyPageCard = ({ property, navigate }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <Link to={`/property/${property.id}`} className="block relative h-56 sm:h-60 overflow-hidden bg-gray-100">
        {property.image_url ? (
          <img
            src={property.image_url}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400 bg-gray-50">
            No image available
          </div>
        )}

        {/* Area badge */}
        {property.area && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-800 shadow-sm flex items-center gap-1.5">
            <MapPinIcon />
            {property.area}
          </div>
        )}

        {/* Growth badge */}
        {property.growth && (
          <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-sm flex items-center gap-1">
            <TrendingUpIcon />
            {property.growth} Growth
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <Link to={`/property/${property.id}`} className="block">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300 leading-snug">
            {property.name}
          </h3>
        </Link>

        {/* Location row */}
        {property.location && (
          <p className="mt-2 text-sm text-gray-500 flex items-center gap-1.5">
            <MapPinIcon />
            <span className="line-clamp-1">{property.location}</span>
          </p>
        )}

        {/* Highway */}
        {property.highway && (
          <p className="mt-1.5 text-sm text-gray-500 flex items-center gap-1.5">
            <RoadIcon />
            <span className="line-clamp-1">{property.highway}</span>
          </p>
        )}

        {/* Returns */}
        {property.returns && !property.growth && (
          <p className="mt-2 text-sm font-medium text-emerald-600 flex items-center gap-1.5">
            <TrendingUpIcon />
            {property.returns} Returns
          </p>
        )}

        {/* Highlights */}
        {property.highlights && property.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {property.highlights.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium bg-gray-50 text-gray-600 px-2.5 py-1 rounded-md border border-gray-100"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Summary preview */}
        {property.summary && (
          <p className="mt-3 text-sm text-gray-500 line-clamp-2 leading-relaxed flex-1">
            {property.summary}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
          <Link
            to={`/property/${property.id}`}
            className="flex-1 text-center text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 px-4 py-2.5 rounded-xl transition-colors duration-300"
          >
            View Property
          </Link>

          <button
            onClick={() =>
              navigate("/connect", {
                state: { area: property.area },
              })
            }
            className="flex-1 text-center text-sm font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-xl transition-colors duration-300 cursor-pointer"
          >
            Book Visit
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Area Card (inline) ──────────────────────────────────────────── */
const AreaCard = ({ area }) => {
  return (
    <div className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer">
      {area.image_url ? (
        <img
          src={area.image_url}
          alt={area.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-sm">
          {area.name}
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-lg font-bold text-white mb-1">{area.name}</h3>
        {area.location && (
          <p className="text-sm text-white/80 flex items-center gap-1.5">
            <MapPinIcon />
            <span className="line-clamp-1">{area.location}</span>
          </p>
        )}
        {area.highway && (
          <p className="text-xs text-white/70 mt-1 flex items-center gap-1.5">
            <RoadIcon />
            <span className="line-clamp-1">{area.highway}</span>
          </p>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-emerald-700/0 group-hover:bg-emerald-700/10 transition-colors duration-500" />
    </div>
  );
};

/* ─── Skeleton loaders ────────────────────────────────────────────── */
const PropertySkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-56 bg-gray-100" />
    <div className="p-6 space-y-3">
      <div className="h-5 bg-gray-100 rounded w-3/4" />
      <div className="h-4 bg-gray-50 rounded w-1/2" />
      <div className="h-4 bg-gray-50 rounded w-2/3" />
      <div className="flex gap-2 mt-4">
        <div className="h-6 bg-gray-50 rounded w-16" />
        <div className="h-6 bg-gray-50 rounded w-16" />
      </div>
      <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
        <div className="flex-1 h-10 bg-gray-100 rounded-xl" />
        <div className="flex-1 h-10 bg-gray-50 rounded-xl" />
      </div>
    </div>
  </div>
);

const AreaSkeleton = () => (
  <div className="h-64 sm:h-72 rounded-2xl bg-gray-100 animate-pulse" />
);

/* ═══════════════════════════════════════════════════════════════════ */
/* ═══  PROPERTY PAGE  ═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════ */

const Property = () => {
  const navigate = useNavigate();
  const featuredRef = useRef(null);

  const [properties, setProperties] = useState([]);
  const [areas, setAreas] = useState([]);
  const [heroImage, setHeroImage] = useState("");
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [areasLoading, setAreasLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState("");
  const [propertyCount, setPropertyCount] = useState(0);
  const [areaCount, setAreaCount] = useState(0);

  useEffect(() => {
    const loadProperties = async () => {
      const { data, error } = await supabase
        .from("data")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error loading properties:", error);
        setPropertiesError("Unable to load properties right now.");
      } else {
        setProperties(data || []);
        setPropertyCount((data || []).length);
        if (data?.length && data[0]?.image_url) {
          setHeroImage(data[0].image_url);
        }
      }
      setPropertiesLoading(false);
    };

    const loadAreas = async () => {
      const { data, error } = await supabase
        .from("area")
        .select("id, name, slug, location, highway, image_url, growth, returns")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error loading areas:", error);
      } else {
        setAreas(data || []);
        setAreaCount((data || []).length);
      }
      setAreasLoading(false);
    };

    loadProperties();
    loadAreas();
  }, []);

  const scrollToProperties = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <NavbarTwo />

      <div className="min-h-screen bg-white">
        <main>

          {/* ────────────────────────────────────────────────────────── */}
          {/*  HERO                                                     */}
          {/* ────────────────────────────────────────────────────────── */}
          <section className="relative isolate overflow-hidden bg-gray-950">
            {heroImage && (
              <img
                src={heroImage}
                alt="Property landscape"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/40 to-gray-950/80" />

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="flex flex-col justify-center min-h-[520px] sm:min-h-[580px] py-20">
                <div className="max-w-3xl">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-emerald-400 mb-6">
                    <span className="w-8 h-px bg-emerald-400" />
                    AK Developer &middot; Hyderabad
                  </p>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                    Properties Built for
                    <br />
                    <span className="text-emerald-400">What Comes Next</span>
                  </h1>

                  <p className="mt-6 text-lg sm:text-xl text-white/75 max-w-2xl leading-relaxed">
                    Explore residential plots across Hyderabad's growing corridors.
                    Every property is backed by location research, connectivity data,
                    and on-ground support from our team.
                  </p>

                  {/* Quick stats */}
                  <div className="mt-8 flex flex-wrap gap-6">
                    {propertyCount > 0 && (
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">{propertyCount}</span>
                        <span className="text-sm text-white/60">Properties</span>
                      </div>
                    )}
                    {areaCount > 0 && (
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">{areaCount}</span>
                        <span className="text-sm text-white/60">Locations</span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-white">10+</span>
                      <span className="text-sm text-white/60">Years of Experience</span>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <button
                      onClick={scrollToProperties}
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300 cursor-pointer"
                    >
                      Explore Properties
                      <ArrowRightIcon />
                    </button>

                    <button
                      onClick={() => navigate("/connect")}
                      className="inline-flex items-center gap-2 border border-white/30 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold px-7 py-3.5 rounded-xl backdrop-blur-sm transition-colors duration-300 cursor-pointer"
                    >
                      <CalendarIcon />
                      Schedule a Site Visit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────── */}
          {/*  AK DEVELOPER TRUST SECTION                               */}
          {/* ────────────────────────────────────────────────────────── */}
          <section className="bg-gray-50 border-b border-gray-100">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left: About */}
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-emerald-600 mb-4">
                    <span className="w-6 h-px bg-emerald-500" />
                    About AK Developer
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                    Experience in Real Estate.
                    <br />
                    <span className="text-gray-500">Focus on Your Next Plot.</span>
                  </h2>
                  <p className="mt-6 text-gray-600 leading-relaxed text-base">
                    AK Developer is a Hyderabad focused real estate company specializing in residential plots.
                    Our team brings more than 10 years of real estate experience to the business, with practical
                    knowledge of Hyderabad's locations, development corridors, and property market.
                  </p>
                  <p className="mt-4 text-gray-600 leading-relaxed text-base">
                    Over the years, our team has helped hundreds of families find and purchase properties.
                    We believe buying a plot should involve more than simply seeing photos or receiving brochures.
                    That's why we support property and site visits, giving clients the opportunity to see the
                    location, understand the surroundings, and evaluate the property themselves.
                  </p>
                </div>

                {/* Right: Trust indicators */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-3xl font-bold text-gray-900">10+</p>
                    <p className="mt-1 text-sm text-gray-500">Years in Hyderabad Real Estate</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-3xl font-bold text-gray-900">500+</p>
                    <p className="mt-1 text-sm text-gray-500">Families Served</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-3xl font-bold text-gray-900">100+</p>
                    <p className="mt-1 text-sm text-gray-500">Plots Sold</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CalendarIcon />
                      <span className="text-sm font-semibold">Site Visits</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Visit any property before you decide</p>
                  </div>
                </div>
              </div>

              {/* Value props row */}
              <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <CheckCircleIcon />,
                    title: "RERA Registered Projects",
                    desc: "We focus on RERA registered projects and verified property information to help clients make informed decisions.",
                  },
                  {
                    icon: <CheckCircleIcon />,
                    title: "Property Verification",
                    desc: "We give importance to property documentation and title verification before presenting projects to clients.",
                  },
                  {
                    icon: <CalendarIcon />,
                    title: "Site Visit Support",
                    desc: "Clients can visit the property and understand the location, surroundings, and development before making a decision.",
                  },
                  {
                    icon: <MapPinIcon />,
                    title: "Hyderabad Expertise",
                    desc: "Backed by more than 10 years of experience, our team understands the city's growing property corridors.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────── */}
          {/*  LOCATIONS / AREAS                                        */}
          {/* ────────────────────────────────────────────────────────── */}
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
              {/* Heading */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-emerald-600 mb-3">
                    <span className="w-6 h-px bg-emerald-500" />
                    Locations
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Where We Operate
                  </h2>
                  <p className="mt-3 text-gray-500 max-w-xl">
                    These are the areas across Hyderabad where AK Developer has properties.
                    Each location is selected based on connectivity, development activity, and future potential.
                  </p>
                </div>
              </div>

              {/* Areas grid */}
              {areasLoading && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {[...Array(4)].map((_, i) => (
                    <AreaSkeleton key={i} />
                  ))}
                </div>
              )}

              {!areasLoading && areas.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {areas.map((area) => (
                    <AreaCard key={area.id} area={area} />
                  ))}
                </div>
              )}

              {!areasLoading && areas.length === 0 && (
                <div className="py-12 text-center text-gray-400 text-sm">
                  No areas available right now.
                </div>
              )}
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────── */}
          {/*  FEATURED PROPERTIES                                      */}
          {/* ────────────────────────────────────────────────────────── */}
          <section
            ref={featuredRef}
            id="featured-properties"
            className="bg-gray-50 border-t border-gray-100"
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
              {/* Heading */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-emerald-600 mb-3">
                    <span className="w-6 h-px bg-emerald-500" />
                    Explore
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Available Properties
                  </h2>
                  <p className="mt-3 text-gray-500 max-w-xl">
                    Discover properties selected for their location, connectivity, and
                    growth potential. Every listing comes with real information from the ground.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/connect")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Can't find what you need? Talk to us
                  <ArrowRightIcon />
                </button>
              </div>

              {/* Loading state */}
              {propertiesLoading && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <PropertySkeleton key={i} />
                  ))}
                </div>
              )}

              {/* Error state */}
              {!propertiesLoading && propertiesError && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center text-red-500">
                  {propertiesError}
                </div>
              )}

              {/* Empty state */}
              {!propertiesLoading && !propertiesError && properties.length === 0 && (
                <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center text-gray-400">
                  No properties available right now. Please check back soon.
                </div>
              )}

              {/* Property cards grid */}
              {!propertiesLoading && !propertiesError && properties.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {properties.map((property) => (
                    <PropertyPageCard
                      key={property.id}
                      property={property}
                      navigate={navigate}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────── */}
          {/*  WHY LOCATION MATTERS                                     */}
          {/* ────────────────────────────────────────────────────────── */}
          <section className="bg-white border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-emerald-600 mb-4">
                    <span className="w-6 h-px bg-emerald-500" />
                    Why It Matters
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                    The right location makes
                    <br />
                    all the difference.
                  </h2>
                  <p className="mt-6 text-gray-600 leading-relaxed">
                    When you're considering a plot, the surrounding infrastructure, road connectivity,
                    and development activity tell you more than any brochure. That's why every property
                    we present includes real location data, highway access information, and growth details
                    that actually matter.
                  </p>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    Our goal is not simply to sell a plot. We want clients to understand what they are
                    buying, where they are buying, and what makes a location suitable for them.
                  </p>

                  <div className="mt-8 space-y-4">
                    {[
                      "Location and connectivity details for every property",
                      "Growth and returns information where available",
                      "Site visits so you can see the property yourself",
                      "A team with practical knowledge of Hyderabad's corridors",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: visual mosaic from first 3 property images */}
                <div className="grid grid-cols-2 gap-3">
                  {properties.slice(0, 3).map((p, idx) =>
                    p.image_url ? (
                      <div
                        key={p.id}
                        className={`rounded-2xl overflow-hidden ${
                          idx === 0 ? "col-span-2 h-48 sm:h-56" : "h-36 sm:h-44"
                        }`}
                      >
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : null
                  )}
                  {properties.filter((p) => p.image_url).length < 1 && (
                    <div className="col-span-2 h-56 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      Property images
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────── */}
          {/*  SITE VISIT CTA                                           */}
          {/* ────────────────────────────────────────────────────────── */}
          <section className="bg-gray-950">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
              <div className="max-w-3xl mx-auto text-center">
                <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-emerald-400 mb-5">
                  <span className="w-6 h-px bg-emerald-400" />
                  See It For Yourself
                  <span className="w-6 h-px bg-emerald-400" />
                </p>

                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Visit the property before
                  <br />
                  you decide.
                </h2>

                <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
                  We encourage clients to visit properties personally. See the location,
                  understand the surroundings, ask questions, and make your decision with
                  a clearer picture of what you are buying.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => navigate("/connect")}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-8 py-4 rounded-xl transition-colors duration-300 cursor-pointer"
                  >
                    <CalendarIcon />
                    Book a Site Visit
                  </button>

                  <a
                    href="https://wa.me/919052051750?text=Hi%2C%20I%20am%20looking%20for%20plots%20in%20Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-colors duration-300"
                  >
                    <PhoneIcon />
                    WhatsApp for Details
                  </a>
                </div>

                <p className="mt-8 text-white/40 text-sm">
                  AK Developer &middot; Hyderabad Real Estate &middot; 10+ Years of Experience
                </p>
              </div>
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </>
  );
};

export default Property;