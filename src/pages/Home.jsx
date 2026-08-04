import PropertyCard from "../components/PropertyCard";
import Footer from "../components/Footer";
import { Hero } from "../components/Hero";
import Navbar from "../components/Navbar";
import React from "react";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />

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