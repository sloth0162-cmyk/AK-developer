import { useEffect, useState } from "react";
import TruePropertyCard from "./TruePropertyCard";
import { createClient } from "../../lib/client";

const supabase = createClient()

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProperties = async () => {
      const { data, error } = await supabase
        .from("data")
        .select("*")
        .order("id", { ascending: true })
        .limit(6);

      if (error) {
        console.error("Error loading properties:", error);
        setError("Unable to load properties.");
      } else {
        setProperties(data || []);
      }

      setLoading(false);
    };

    loadProperties();
  }, []);

  return (
    <section
      id="featured-properties"
      className="bg-gray-50 px-6 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Explore
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Featured Properties
          </h2>

          <p className="mt-4 max-w-2xl text-gray-600">
            Discover properties selected for their location, connectivity and
            future potential.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-12 text-center text-gray-500">
            Loading properties...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && properties.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            No properties found.
          </div>
        )}

        {/* Cards */}
        {!loading && !error && properties.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <TruePropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;