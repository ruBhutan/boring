import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  tags?: string[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  tourData?: {
    name: string;
    description: string;
    price: number;
    currency: string;
    duration: string;
    location: string;
    provider: string;
    rating?: number;
    reviewCount?: number;
  };
  organizationData?: {
    name: string;
    logo: string;
    contactPoint: {
      telephone: string;
      email: string;
      contactType: string;
    };
    address: {
      streetAddress: string;
      addressLocality: string;
      addressCountry: string;
      postalCode: string;
    };
    sameAs: string[];
  };
}

const SEOOptimization: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  articleSection,
  tags = [],
  breadcrumbs = [],
  tourData,
  organizationData
}) => {
  // Generate structured data based on content type
  const generateStructuredData = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@graph": []
    };

    // Organization Schema
    if (organizationData) {
      baseSchema["@graph"].push({
        "@type": "TravelAgency",
        "@id": `${url}#organization`,
        "name": organizationData.name,
        "logo": {
          "@type": "ImageObject",
          "url": organizationData.logo
        },
        "description": description,
        "url": url,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": organizationData.address.streetAddress,
          "addressLocality": organizationData.address.addressLocality,
          "addressCountry": organizationData.address.addressCountry,
          "postalCode": organizationData.address.postalCode
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": organizationData.contactPoint.telephone,
          "email": organizationData.contactPoint.email,
          "contactType": organizationData.contactPoint.contactType
        },
        "sameAs": organizationData.sameAs
      });
    }

    // WebSite Schema
    baseSchema["@graph"].push({
      "@type": "WebSite",
      "@id": `${url}#website`,
      "name": "Bhutan Mind Break",
      "description": "Authentic Bhutan Tours & Travel Experiences",
      "url": url,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${url}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    });

    // WebPage Schema
    const webPageSchema = {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      "name": title,
      "description": description,
      "url": url,
      "isPartOf": {
        "@id": `${url}#website`
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": image
      },
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime
    };

    if (breadcrumbs.length > 0) {
      webPageSchema["breadcrumb"] = {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      };
    }

    baseSchema["@graph"].push(webPageSchema);

    // Article Schema (for blog posts)
    if (type === 'article' && author) {
      baseSchema["@graph"].push({
        "@type": "Article",
        "@id": `${url}#article`,
        "headline": title,
        "description": description,
        "image": {
          "@type": "ImageObject",
          "url": image
        },
        "author": {
          "@type": "Person",
          "name": author
        },
        "publisher": {
          "@id": `${url}#organization`
        },
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "articleSection": articleSection,
        "keywords": keywords,
        "url": url,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${url}#webpage`
        }
      });
    }

    // Tour/Product Schema
    if (tourData) {
      const tourSchema = {
        "@type": "TouristTrip",
        "@id": `${url}#tour`,
        "name": tourData.name,
        "description": tourData.description,
        "url": url,
        "image": {
          "@type": "ImageObject",
          "url": image
        },
        "touristType": "International",
        "itinerary": {
          "@type": "ItemList",
          "name": `${tourData.name} Itinerary`
        },
        "offers": {
          "@type": "Offer",
          "price": tourData.price,
          "priceCurrency": tourData.currency,
          "availability": "https://schema.org/InStock",
          "validFrom": new Date().toISOString().split('T')[0]
        },
        "provider": {
          "@type": "TravelAgency",
          "name": tourData.provider,
          "@id": `${url}#organization`
        },
        "duration": tourData.duration,
        "locationCreated": {
          "@type": "Place",
          "name": tourData.location,
          "addressCountry": "BT"
        }
      };

      if (tourData.rating && tourData.reviewCount) {
        tourSchema["aggregateRating"] = {
          "@type": "AggregateRating",
          "ratingValue": tourData.rating,
          "reviewCount": tourData.reviewCount,
          "bestRating": 5,
          "worstRating": 1
        };
      }

      baseSchema["@graph"].push(tourSchema);
    }

    return baseSchema;
  };

  const structuredData = generateStructuredData();

  // Generate optimized title
  const optimizedTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title;
  
  // Generate optimized description
  const optimizedDescription = description.length > 160 ? 
    `${description.substring(0, 157)}...` : description;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Bhutan Mind Break" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {articleSection && <meta property="article:section" content={articleSection} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@BhutanMindBreak" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      <link rel="canonical" href={url} />
      
      {/* Language and Region */}
      <meta name="language" content="en-US" />
      <meta name="geo.region" content="BT" />
      <meta name="geo.placename" content="Bhutan" />
      
      {/* Mobile App Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Theme Colors */}
      <meta name="theme-color" content="#D97706" />
      <meta name="msapplication-navbutton-color" content="#D97706" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#D97706" />
      
      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
      
      {/* Additional Schema for Tour Pages */}
      {tourData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": tourData.name,
            "description": tourData.description,
            "image": image,
            "brand": {
              "@type": "Brand",
              "name": "Bhutan Mind Break"
            },
            "offers": {
              "@type": "Offer",
              "price": tourData.price,
              "priceCurrency": tourData.currency,
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": tourData.provider
              }
            }
          }, null, 2)}
        </script>
      )}
      
      {/* FAQ Schema for relevant pages */}
      {type === 'faq' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Do I need a visa to visit Bhutan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all visitors except Indian, Bangladeshi, and Maldivian nationals need a visa to enter Bhutan. We assist with visa processing as part of our tour packages."
                }
              },
              {
                "@type": "Question",
                "name": "What is the best time to visit Bhutan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The best times to visit Bhutan are during spring (March to May) and autumn (September to November) when the weather is clear and comfortable for travel."
                }
              }
            ]
          }, null, 2)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOOptimization;
