import { Helmet } from 'react-helmet-async';

export function SEOHead() {
  // Construct base URL from environment variable
  const baseUrl = `${window.location.origin}${import.meta.env.BASE_URL}`;

  const title = "Juan Francisco Crespo Galan | Senior Software Engineer";
  const description = "Senior Software Engineer with 10+ years of experience in embedded systems, full-stack web development, data engineering, and machine learning. Based in Spain.";
  const ogImage = `${baseUrl}og-image.png`;

  return (
    <Helmet>
      {/* Set language attribute on html element */}
      <html lang="en" />

      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical URL */}
      <link rel="canonical" href={baseUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Cards */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  );
}
