import { useState } from "react";
import { createClient } from "../lib/client";

import PropertyCard from "../components/PropertyCard";
import ShowResults from "../components/ShowResults";
import Footer from "../components/Footer";
import { Hero } from "../components/Hero";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";



const supabase = createClient();

export const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

const handleSearch = async (query) => {
  const value = query.trim().toLowerCase();

  setSearchQuery(query);

  // Empty search
  if (!value) {
    setSearchResults([]);
    setSearching(false);
    return;
  }

  setSearching(true);

  try {
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

    // Fetch news from Flask API
    const newsPromise = apiUrl
      ? fetch(`${apiUrl}/api/news?limit=50`)
          .then(async (response) => {
            if (!response.ok) {
              throw new Error(`News API failed: ${response.status}`);
            }

            const payload = await response.json();

            return Array.isArray(payload)
              ? payload
              : payload.data || [];
          })
          .catch((error) => {
            console.error("News search error:", error);
            return [];
          })
      : Promise.resolve([]);

    // Fetch property + blog + news together
    const [
      { data: properties, error: propertyError },
      { data: blogs, error: blogError },
      news,
    ] = await Promise.all([
      // PROPERTY
      supabase
        .from("data")
        .select("*"),

      // BLOG
      supabase
        .from("blog")
        .select("*")
        .eq("published", true),

      // NEWS
      newsPromise,
    ]);

    if (propertyError) {
      console.error("Property search error:", propertyError);
    }

    if (blogError) {
      console.error("Blog search error:", blogError);
    }

    // -----------------------------------------
    // PROPERTY SEARCH
    // Searches the whole property object.
    // So name, area, tags, relational_tags,
    // highlights, location, highway, summary, etc.
    // can all produce a match.
    // -----------------------------------------

    const propertyResults = (properties || [])
      .filter((property) => {
        const searchableText = Object.values(property)
          .map((value) => {
            if (value === null || value === undefined) {
              return "";
            }

            if (Array.isArray(value)) {
              return value.join(" ");
            }

            if (typeof value === "object") {
              return JSON.stringify(value);
            }

            return String(value);
          })
          .join(" ")
          .toLowerCase();

        return searchableText.includes(value);
      })
      .map((property) => ({
        ...property,
        type: "property",
      }));

    // -----------------------------------------
    // BLOG SEARCH
    // -----------------------------------------

    const blogResults = (blogs || [])
      .filter((blog) => {
        const title = String(blog.title || "").toLowerCase();
        const area = String(blog.area || "").toLowerCase();
        const content = String(blog.content || "").toLowerCase();

        return (
          title.includes(value) ||
          area.includes(value) ||
          content.includes(value)
        );
      })
      .map((blog) => ({
        ...blog,
        type: "blog",
      }));

    // -----------------------------------------
    // NEWS SEARCH
    // Only title + classifier
    // -----------------------------------------

    const newsResults = (news || [])
      .filter((article) => {
        const title = String(article.title || "").toLowerCase();
        const classifier = String(article.classifier || "").toLowerCase();

        return (
          title.includes(value) ||
          classifier.includes(value)
        );
      })
      .map((article) => ({
        ...article,
        type: "news",
      }));

    // -----------------------------------------
    // COMBINE
    // -----------------------------------------

    setSearchResults([
      ...propertyResults,
      ...newsResults,
      ...blogResults,
    ]);

    // Scroll to search results
    setTimeout(() => {
      document
        .getElementById("search-results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);

  } catch (error) {
    console.error("Global search error:", error);
    setSearchResults([]);
  } finally {
    setSearching(false);
  }
};

  return (
    <>
     <SEO
        title="AK Developer | Open Plots in Shadnagar, Hyderabad"
        description="Discover residential plots and real estate investment opportunities in Shadnagar, Hyderabad. Explore properties and schedule a site visit with AK Developer."
        url="https://ak-developer.com/"
      />


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