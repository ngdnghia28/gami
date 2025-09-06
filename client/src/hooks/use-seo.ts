import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  structuredData?: object;
}

export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogType = 'website',
  ogUrl,
  twitterTitle,
  twitterDescription,
  structuredData
}: SEOProps) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Update meta tags
    const updateMeta = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    if (description) {
      updateMeta('description', description);
    }

    if (keywords) {
      updateMeta('keywords', keywords);
    }

    // Open Graph
    if (ogTitle) {
      updateMeta('og:title', ogTitle, true);
    }

    if (ogDescription) {
      updateMeta('og:description', ogDescription, true);
    }

    if (ogType) {
      updateMeta('og:type', ogType, true);
    }

    if (ogUrl) {
      updateMeta('og:url', ogUrl, true);
    }

    // Twitter
    if (twitterTitle) {
      updateMeta('twitter:title', twitterTitle);
    }

    if (twitterDescription) {
      updateMeta('twitter:description', twitterDescription);
    }

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // Structured Data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]:last-of-type') as HTMLScriptElement;
      if (script && script.textContent?.includes('@context')) {
        // Update existing structured data
        script.textContent = JSON.stringify(structuredData);
      } else {
        // Create new structured data
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    }

    // Cleanup function
    return () => {
      // Reset to default title if component unmounts
      if (title) {
        document.title = 'Âm Lịch Việt Nam - Khám Phá Truyền Thống Văn Hóa Việt';
      }
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogType, ogUrl, twitterTitle, twitterDescription, structuredData]);
}