import { Link } from "react-router-dom";

const TruePropertyCard = ({ property }) => {
  return (
    <Link
      to={`/property/${property.id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden bg-gray-100">
        {property.image_url ? (
          <img
            src={property.image_url}
            alt={property.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No image available
          </div>
        )}

        {property.area && (
          <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {property.area}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 transition group-hover:text-black">
          {property.name}
        </h3>

        {property.location && (
          <p className="mt-2 text-sm text-gray-500">
            {property.location}
          </p>
        )}

        {property.highway && (
          <p className="mt-2 text-sm text-gray-600">
            {property.highway}
          </p>
        )}

        {property.summary && (
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
            {property.summary}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            View Property
          </span>

          <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TruePropertyCard;