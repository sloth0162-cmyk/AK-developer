const PropertyDescription = ({ property }) => {
  if (!property) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
          About the Property
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          {property.name}
        </h2>

        <p className="mt-6 text-base leading-8 text-gray-600">
          {property.summary ||
            "Property information will be available soon."}
        </p>

        {property.connectivity && (
          <div className="mt-8 rounded-2xl bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Connectivity
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              {property.connectivity}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyDescription;