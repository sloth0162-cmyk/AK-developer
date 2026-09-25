import Navbar from "../components/Navbar";
import NavbarTwo from "../components/NavbarTwo";
import Footer from "../components/Footer";

import PropertyHero from "../components/property/PropertyHero";
import FamousSiteAreas from "../components/property/FamousSiteAreas";
import FeaturedProperties from "../components/property/FeaturedProperties";

const Property = () => {
  return (
    <>
      <Navbar />
      <NavbarTwo />

      <div className="min-h-screen bg-white">
        <main>
          <PropertyHero />

          <FamousSiteAreas />

          <FeaturedProperties />
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Property;