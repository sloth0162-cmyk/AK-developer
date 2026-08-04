import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { callLink } from "../utils/contact";

const Footer = () => {
  return (
    <footer className="mt-16 rounded-3xl bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TOP: brand title, separated from the grid below */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <p className="text-4xl text-blue-400">
            EaseBuild{" "}
            <span className="block sm:inline text-blue-950 text-sm font-normal mt-1 sm:mt-0 sm:ml-2">
              A website where you purchase top real estate websites
            </span>
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* BRAND BLURB */}
          <div>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-blue-600 font-medium">EaseBuild</span>{" "}
              helps you find verified open plots and commercial properties in
              Hyderabad with complete assistance till registration.
            </p>
          </div>

          {/* LINKS */}
          <nav aria-label="Quick links">
            <h3 className="text-gray-900 font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-black transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/properties" className="hover:text-black transition-colors">
                  Properties
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-black transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-black transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* CONTACT */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={callLink()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-xl active:scale-95"
                >
                  <FaPhoneAlt className="text-sm" />
                  Call Now
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt />
                <address className="not-italic">Hyderabad, Telangana</address>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-200 mt-10 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EaseBuild. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;