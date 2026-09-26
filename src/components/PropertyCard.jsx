import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "../lib/client";
import { MapPin, TrendingUp, ArrowRight } from "lucide-react";

const supabase = createClient();

const PropertyCard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from("data")
        .select("*")
        .limit(4);

      if (error) {
        console.error("Error fetching properties:", error);
        setProperties([]);
      } else {
        setProperties(data || []);
      }

      setLoading(false);
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-[520px] animate-pulse rounded-2xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        No properties found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {properties.map((property) => {
        const growthText =
          property.growth ||
          property.returns ||
          "Investment Opportunity";

        const highlights = Array.isArray(property.highlights)
          ? property.highlights.slice(0, 2)
          : [];

        return (
          <div
            key={property.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* =========================
                HEADER
                Image + badges + title
               ========================= */}
            <div>
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                {property.image_url ? (
                  <img
                    src={property.image_url}
                    alt={property.area}
                    onClick={() => navigate(`/property/${property.id}`)}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-100 text-sm text-gray-400">
                    No image available
                  </div>
                )}

                {/* Highway badge */}
                <div className="absolute left-4 top-4 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                  {property.highway || "NH44"}
                </div>

                {/* Growth badge */}
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white shadow-sm">
                  <TrendingUp size={14} />
                  {growthText}
                </div>
              </div>

              {/* Title */}
              <div className="px-5 pt-5">
                <h3 className="text-xl font-bold capitalize text-gray-900">
                  {property.area}
                </h3>
              </div>
            </div>

            {/* =========================
                CONTENT
                Location + growth + tags
               ========================= */}
            <div className="flex min-h-[155px] flex-col px-5 pb-5 pt-3">
              {/* Location */}
              <div className="min-h-[44px]">
                {property.location && (
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-gray-400"
                    />

                    <span className="line-clamp-2 leading-6">
                      {property.location}
                    </span>
                  </div>
                )}
              </div>

              {/* Growth */}
              <div className="mt-3 min-h-[36px]">
                {property.growth && (
                  <div className="inline-flex items-center rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600">
                    ↗ {property.growth} Growth
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="mt-3 flex min-h-[54px] flex-wrap content-start gap-2">
                {highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* =========================
                FOOTER
                Site Visit + View More
               ========================= */}
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 px-5 py-4">
              {/* Site Visit */}
              <Link
                to="/connect"
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
              >
                Site Visit
              </Link>

              {/* View More */}
              <Link
                to={`/blogs/${encodeURIComponent(property.area)}`}
                className="group/link flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                View More
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover/link:translate-x-1"
                />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertyCard;