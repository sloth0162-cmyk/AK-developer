import { useEffect, useState } from "react";
import { createClient } from "../../lib/client";

const supabase = createClient()


const FamousSiteAreas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAreas = async () => {
      const { data, error } = await supabase
        .from("area")
        .select("id, name, slug, location, highway, image_url")
        .order("id", { ascending: true })
        .limit(8);

      if (error) {
        console.error("Error loading areas:", error);
      } else {
        setAreas(data || []);
      }

      setLoading(false);
    };

    loadAreas();
  }, []);

  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Locations
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Famous Site Areas
          </h2>

          <p className="mt-4 max-w-2xl text-gray-600">
            Explore some of the key locations where Eeshanya properties are
            available.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-12 text-center text-gray-500">
            Loading areas...
          </div>
        )}

        {/* Areas */}
        {!loading && areas.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((area) => (
              <div
                key={area.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-44 overflow-hidden bg-gray-100">
                  {area.image_url ? (
                    <img
                      src={area.image_url}
                      alt={area.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No image available
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {area.name}
                  </h3>

                  {area.location && (
                    <p className="mt-2 text-sm text-gray-500">
                      {area.location}
                    </p>
                  )}

                  {area.highway && (
                    <p className="mt-2 text-sm text-gray-600">
                      {area.highway}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && areas.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            No areas found.
          </div>
        )}
      </div>
    </section>
  );
};

export default FamousSiteAreas;