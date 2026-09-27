import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "AK Developer | Real Estate in Hyderabad",
  description = "Explore residential plots and real estate investment opportunities in Shadnagar, Shamshabad, Kothur and Hyderabad with AK Developer.",
  image = "https://ak-developer.com/og-image.jpg",
  url = "https://ak-developer.com/",
}) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta name="robots" content="index, follow" />

      <link rel="canonical" href={url} />

      {/* Open Graph for social media sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="AK Developer" />

      {/* Twitter / X sharing */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;