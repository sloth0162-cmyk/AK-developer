import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "../lib/client";

const supabase = createClient();

/* ─── Inline SVG Icons ──────────────────────────────────────────── */
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
  </svg>
);

const RoadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3.5 2A1.5 1.5 0 002 3.5v13A1.5 1.5 0 003.5 18h1a.5.5 0 00.49-.41L6.5 9l1.51 8.59A.5.5 0 008.5 18h3a.5.5 0 00.49-.41L13.5 9l1.51 8.59a.5.5 0 00.49.41h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-13z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

/* ─── Single Property Card ──────────────────────────────────────── */
const SingleCard = ({ property, navigate }) => {
  return (
    <div className="group snap-start flex-shrink-0 w-[340px] sm:w-[360px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col">

      {/* Image */}
      <Link
        to={`/blogs/${property.area}`}
        className="block relative h-52 overflow-hidden bg-gray-100"
      >
        {property.image_url ? (
          <img
            src={property.image_url}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400 bg-gray-50">
            No image
          </div>
        )}

        {/* Highway badge */}
        {property.highway && (
          <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[11px] font-semibold text-gray-700 shadow-sm flex items-center gap-1.5">
            <RoadIcon />
            <span className="line-clamp-1 max-w-[160px]">{property.highway}</span>
          </div>
        )}

        {/* Growth indicator */}
        {property.growth && (
          <div className="absolute top-3.5 right-3.5 bg-emerald-600/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white shadow-sm flex items-center gap-1">
            <TrendingUpIcon />
            {property.growth}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Property name */}
        <Link to={`/blogs/${property.area}`}>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-1 leading-snug">
            {property.name}
          </h3>
        </Link>

        {/* Area & location */}
        {property.area && (
          <p className="mt-2 text-sm text-gray-500 flex items-center gap-1.5">
            <MapPinIcon />
            <span className="line-clamp-1">
              {property.area}
              {property.location ? `, ${property.location}` : ""}
            </span>
          </p>
        )}

        {/* Growth or Returns info */}
        {(property.growth || property.returns) && (
          <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-semibold self-start">
            <TrendingUpIcon />
            {property.growth
              ? `${property.growth} Growth`
              : `${property.returns} Returns`}
          </div>
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

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-gray-100">
          <button
            onClick={() =>
              navigate("/connect", {
                state: { area: property.area },
              })
            }
            className="flex-1 text-center text-sm font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-3 py-2.5 rounded-xl transition-colors duration-300 cursor-pointer"
          >
            Site Visit
          </button>

          <Link
            to={`/blogs/${property.area}`}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 px-3 py-2.5 rounded-xl transition-colors duration-300"
          >
            View Details
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ─── Loading skeleton for card ─────────────────────────────────── */
const CardSkeleton = () => (
  <div className="snap-start flex-shrink-0 w-[340px] sm:w-[360px] bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-52 bg-gray-100" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-100 rounded-md w-3/4" />
      <div className="h-4 bg-gray-50 rounded-md w-1/2" />
      <div className="h-4 bg-gray-50 rounded-md w-2/3" />
      <div className="flex gap-1.5 mt-3">
        <div className="h-5 bg-gray-50 rounded w-14" />
        <div className="h-5 bg-gray-50 rounded w-14" />
      </div>
      <div className="flex gap-2.5 mt-5 pt-4 border-t border-gray-100">
        <div className="flex-1 h-10 bg-gray-50 rounded-xl" />
        <div className="flex-1 h-10 bg-gray-100 rounded-xl" />
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════ */
/* ═══  PROPERTY CARD (Horizontal scroll container)  ════════════════ */
/* ═══════════════════════════════════════════════════════════════════ */

function PropertyCard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      const { data, error } = await supabase
        .from("data")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        return;
      }

      setProperties(data);
      setLoading(false);
    }

    fetchProperties();
  }, []);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [properties]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 380;
    scrollRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="relative">
        <div className="flex gap-5 pb-6 px-4 sm:px-6 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <p className="text-gray-400 text-center py-12 text-sm">
        No properties available right now.
      </p>
    );
  }

  return (
    <div className="relative group/container">
      {/* Scroll buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/95 shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all duration-300 opacity-0 group-hover/container:opacity-100 cursor-pointer"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/95 shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all duration-300 opacity-0 group-hover/container:opacity-100 cursor-pointer"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Edge fade */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white/80 to-transparent z-[5] pointer-events-none" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/80 to-transparent z-[5] pointer-events-none" />
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-5 pb-6 px-4 sm:px-6 overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {properties.map((property) => (
          <SingleCard
            key={property.id}
            property={property}
            navigate={navigate}
          />
        ))}
      </div>
    </div>
  );
}


export default PropertyCard;