import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PropertyGallery from "../components/property/PropertyGallery";
import PropertyDescription from "../components/property/PropertyDescription";
import PropertyVideo from "../components/property/PropertyVideo";
import RelatedPropertyNews from "../components/property/RelatedPropertyNews";
import RelatedPropertyBlogs from "../components/property/RelatedPropertyBlogs";
import { createClient } from "../lib/client";
import Navbar from "../components/Navbar";
import NavbarTwo from "../components/NavbarTwo";
import Footer from "../components/Footer";

const supabase = createClient()

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("data")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error loading property:", error);
        setError("Unable to load this property.");
      } else if (!data) {
        setError("Property not found.");
      } else {
        setProperty(data);
      }

      setLoading(false);
    };

    loadProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="text-gray-500">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {error || "Property not found"}
          </h1>

          <p className="mt-3 text-gray-500">
            We couldn't find the property you're looking for.
          </p>

          <button
            onClick={() => navigate("/property")}
            className="mt-6 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const highlights = Array.isArray(property.highlights)
    ? property.highlights
    : [];

  const handleSiteVisit = () => {
    navigate("/connect", {
      state: {
        area: property.area,
      },
    });
  };

  return <>
  <Navbar/>
  <NavbarTwo/>

    <div className="min-h-screen bg-white">

      <main>
        {/* Back */}
        <div className="mx-auto max-w-7xl px-6 pt-6 sm:px-8 lg:px-12">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-gray-500 transition hover:text-black"
          >
            ← Back
          </button>
        </div>

        {/* Property Header */}
        <section className="mx-auto max-w-7xl px-6 pb-12 pt-8 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl bg-gray-100">
              {property.image_url ? (
                <img
                  src={property.image_url}
                  alt={property.name}
                  className="h-[320px] w-full object-cover sm:h-[420px]"
                />
              ) : (
                <div className="flex h-[320px] items-center justify-center text-gray-400 sm:h-[420px]">
                  No image available
                </div>
              )}
            </div>

            {/* Main info */}
            <div>
              {property.area && (
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                  {property.area}
                </p>
              )}

              <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                {property.name}
              </h1>

              {property.location && (
                <p className="mt-4 text-base text-gray-600">
                  {property.location}
                </p>
              )}

              {property.highway && (
                <p className="mt-2 text-sm text-gray-500">
                  {property.highway}
                </p>
              )}

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {property.growth && (
                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Growth
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {property.growth}
                    </p>
                  </div>
                )}

                {property.returns && (
                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Returns
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {property.returns}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleSiteVisit}
                className="mt-8 rounded-lg bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Book a Site Visit
              </button>
            </div>
          </div>
        </section>

        {/* Description */}
        <PropertyDescription property={property} />

        {/* Highlights */}
        {highlights.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                Property Highlights
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                What makes this property special
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((highlight, index) => (
                <div
                  key={`${highlight}-${index}`}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <p className="text-sm leading-6 text-gray-700">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Future media */}
        <PropertyVideo property={property} />

        {/* Future related content */}
        <RelatedPropertyNews property={property} />
        <RelatedPropertyBlogs property={property} />
      </main>
    </div>
    <Footer/>
    </>
};

export default PropertyDetails;