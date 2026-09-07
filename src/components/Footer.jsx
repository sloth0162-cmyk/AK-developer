import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { callLink } from "../utils/contact";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/blogpage" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="mt-16 rounded-3xl bg-white/80 backdrop-blur-md shadow-sm border border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">

        {/* TOP: brand title */}
        <div className="border-b border-gray-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
          <p className="text-3xl sm:text-4xl font-bold text-blue-600 tracking-tight">
            Ak Developer
          </p>
          <span className="text-gray-500 text-sm sm:text-base">
            Verified open plots &amp; commercial properties in Hyderabad
          </span>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">

          {/* BRAND BLURB */}
          <div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-sm">
              <span className="text-blue-600 font-semibold">Ak Developer</span>{" "}
              helps you find verified open plots and commercial properties in
              Hyderabad, with complete assistance through to registration.
            </p>
          </div>

          {/* LINKS */}
          <nav aria-label="Quick links">
            <h3 className="text-gray-900 font-semibold mb-4 text-sm sm:text-base tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm sm:text-base text-gray-600">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="relative inline-block hover:text-blue-600 transition-colors duration-200
                    after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0
                    after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CONTACT */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-sm sm:text-base tracking-wide uppercase">
              Contact
            </h3>
            <ul className="space-y-4 text-sm sm:text-base">
              <li>
                <a
                  href={callLink()}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                >
                  <FaPhoneAlt className="text-sm" />
                  Call Now
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-blue-500 shrink-0" />
                <address className="not-italic">Hyderabad, Telangana</address>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-200 mt-10 pt-5 text-center text-xs sm:text-sm text-gray-500">
          © {year} Ak Developer. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;