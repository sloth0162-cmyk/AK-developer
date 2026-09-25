const PropertyVideo = ({ property, videoUrl = "" }) => {
  const url = videoUrl || property?.video_url || "";

  // No video yet → don't render an empty section.
  if (!url) return null;

  const isYouTube =
    url.includes("youtube.com") || url.includes("youtu.be");

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
          Property Video
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          Explore the Property
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl bg-black">
        {isYouTube ? (
          <iframe
            src={url}
            title={`${property?.name || "Property"} video`}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={url}
            controls
            playsInline
            className="aspect-video w-full"
          />
        )}
      </div>
    </section>
  );
};

export default PropertyVideo;