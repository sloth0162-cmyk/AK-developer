import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../../lib/client";

const supabase = createClient()
const PropertyHero = () => {
  const navigate = useNavigate();

  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const loadHeroImage = async () => {
      const { data, error } = await supabase
        .from("data")
        .select("image_url")
        .not("image_url", "is", null)
        .order("id", { ascending: true })
        .limit(1);

      if (!error && data?.length && data[0]?.image_url) {
        setBackgroundImage(data[0].image_url);
      }
    };

    loadHeroImage();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-neutral-900">
      {/* Background image */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="Property"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Hero content */}
      <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Eeshanya Properties
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Find a Property
            <br />
            That Fits Your Future
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            Explore properties, locations, growth opportunities and investment
            potential across some of the most promising areas.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => {
                document
                  .getElementById("featured-properties")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
            >
              Explore Properties
            </button>

            <button
              onClick={() => navigate("/connect")}
              className="rounded-lg border border-white/70 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Book a Site Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyHero;