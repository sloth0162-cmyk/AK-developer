import { Link } from "react-router-dom";
import properties from "../data/data";

function PropertyCard() {
  return (
    <div className="flex overflow-x-auto scroll-smooth gap-6 pb-8 px-4 sm:px-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {properties.map((property) => (
        <div
          key={property.area}
          className="snap-start min-w-[320px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 border border-gray-100 overflow-hidden group"
        >
          {/* Image */}
          <div className="h-48 overflow-hidden relative">
            <Link to={`/blogs/${property.area}`}>
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out cursor-pointer"
              />
            </Link>

            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
              {property.highway}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              {property.category}
            </p>

            <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {property.name}
            </h2>

            {(property.growth || property.returns) && (
              <p className="text-sm font-semibold text-emerald-600 bg-emerald-50 inline-block px-2 py-1 rounded-md">
                {property.growth
                  ? `Up to ${property.growth} Growth`
                  : `Up to ${property.returns} Returns`}
              </p>
            )}

            {property.highlights && (
              <div className="flex flex-wrap gap-2 mt-3">
                {property.highlights.slice(0, 3).map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex gap-4 text-xs font-medium text-gray-500">
              <span>❤️ {property.likes || 0}</span>
              <span>👁️ {property.views || 0}</span>
            </div>

            <Link to={`/blogs/${property.area}`}>
              <button className="text-sm font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white px-4 py-1.5 rounded-full transition-colors duration-300 cursor-pointer">
                View Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertyCard;