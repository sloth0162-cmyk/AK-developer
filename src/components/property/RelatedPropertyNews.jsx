const RelatedPropertyNews = ({ property }) => {
  if (!property) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="rounded-2xl bg-gray-50 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
          Latest News
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          News about {property.area}
        </h2>

        <p className="mt-4 text-gray-600">
          Related news will appear here once the News data structure is
          connected.
        </p>
      </div>
    </section>
  );
};

export default RelatedPropertyNews;