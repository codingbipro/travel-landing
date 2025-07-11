import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Wanderlust - Discover Your Next Adventure",
  description = "Explore breathtaking destinations around the world. Create memories that last a lifetime with our curated travel experiences.",
  keywords = "travel, destinations, vacation, adventure, tourism, booking, wanderlust",
  image = "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
  url = "https://wanderlust-travel.com"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Wanderlust Travel Agency" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "Wanderlust",
          "description": description,
          "url": url,
          "logo": `${url}/logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4567",
            "contactType": "customer service"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;