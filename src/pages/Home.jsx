import { useState } from "react";
import { createClient } from "../lib/client";

import PropertyCard from "../components/PropertyCard";
import ShowResults from "../components/ShowResults";
import Footer from "../components/Footer";
import { Hero } from "../components/Hero";
import Navbar from "../components/Navbar";

const supabase = createClient();

export const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSearching(true);

    const lowerQuery = query.toLowerCase();

    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .eq("published", true)
      .or(
        `title.ilike.%${lowerQuery}%,area.ilike.%${lowerQuery}%,content.ilike.%${lowerQuery}%`
      );

    if (error) {
      console.error("Search error:", error);
      setSearchResults([]);
      setSearching(false);
      return;
    }

    setSearchResults(data || []);
    setSearching(false);

    // Move screen below Hero
    setTimeout(() => {
      document
        .getElementById("search-results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  return (
    <>
      <Navbar />

      <Hero onSearch={handleSearch} />

      <div id="search-results">
        {searching ? (
          <section className="py-12 text-center">
            <p className="text-gray-500">
              Searching...
            </p>
          </section>
        ) : (
          <ShowResults
            results={searchResults}
            searchQuery={searchQuery}
          />
        )}
      </div>

      {/* Properties */}
      <section className="bg-gray-50/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center md:text-left space-y-3">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Properties
              </span>
            </h2>

            <p className="text-lg text-gray-500 max-w-2xl">
              Discover the finest real estate opportunities tailored for your
              lifestyle and investment goals.
            </p>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto">
          <PropertyCard />
        </div>
      </section>

      <Footer />
    </>
  );
};