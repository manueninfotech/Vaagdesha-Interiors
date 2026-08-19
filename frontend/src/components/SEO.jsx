import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  url,
  noindex = false,
}) {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      {/* Canonical URL */}
      {url && (
        <link
          rel="canonical"
          href={url}
        />
      )}

      {/* Robots */}
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      {url && (
        <meta
          property="og:url"
          content={url}
        />
      )}

      <meta
        property="og:site_name"
        content="Vaagdeesha Interiors"
      />

      {/* Twitter / X */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={image}
      />
    </Helmet>
  );
}