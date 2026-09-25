import { useState } from "react";

const PropertyGallery = ({ property, media = [] }) => {
  const getImageUrl = (item) => {
    if (typeof item === "string") return item;

    if (item && typeof item === "object") {
      return item.url || item.media_url || item.image_url || "";
    }

    return "";
  };

  // Future media can be passed here.
  // For now, fall back to the existing image_url column.
  const mediaImages = media
    .map(getImageUrl)
    .filter(Boolean);

  const images =
    mediaImages.length > 0
      ? mediaImages
      : property?.image_url
        ? [property.image_url]
        : [];

  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-2xl bg-gray-100 text-gray-400 sm:h-[420px]">
        No image available
      </div>
    );
  }

  const selectedImage = images[selectedIndex] || images[0];

  return (
    <div>
      {/* Main Image */}
      <div className="overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={selectedImage}
          alt={property?.name || "Property"}
          className="h-[320px] w-full object-cover sm:h-[420px]"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${
                selectedIndex === index
                  ? "border-black"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`${property?.name || "Property"} ${index + 1}`}
                className="h-20 w-28 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;