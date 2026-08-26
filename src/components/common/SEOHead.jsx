import React, { useEffect } from 'react';

const setMetaTag = (attrName, attrValue, content) => {
  if (!content) return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

export const SEOHead = ({
  title,
  description,
  keywords,
  canonicalPath = '',
  ogImage = '/logo.png',
  ogType = 'website'
}) => {
  useEffect(() => {
    // 1. Page Title
    const formattedTitle = title
      ? title.includes('CARONBAR') ? title : `${title} | CARONBAR Car Wash`
      : 'Car Wash & Doorstep Car Wash Services | CARONBAR';
    document.title = formattedTitle;

    // 2. Meta Title
    setMetaTag('name', 'title', formattedTitle);

    // 3. Meta Description
    const defaultDesc = 'Best professional car wash & doorstep car wash at your home or office. Self-sufficient mobile units with soft water & silent power.';
    const formattedDesc = description || defaultDesc;
    setMetaTag('name', 'description', formattedDesc);

    // 4. Primary & Secondary Keywords
    const defaultKeywords = 'car wash, doorstep car wash, car wash near me, mobile car wash, foam car wash, car care, car cleaning, car wash delhi, car wash janakpuri, steam car sanitization, ceramic coating';
    const formattedKeywords = keywords ? `${keywords}, car wash, doorstep car wash` : defaultKeywords;
    setMetaTag('name', 'keywords', formattedKeywords);

    // 5. Open Graph Meta Tags
    const fullUrl = `https://www.caronbar.com${canonicalPath || window.location.pathname}`;
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', formattedDesc);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'CARONBAR Car Wash');
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `https://www.caronbar.com${ogImage}`);

    // 6. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', formattedDesc);
    setMetaTag('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `https://www.caronbar.com${ogImage}`);

    // 7. Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', fullUrl);

  }, [title, description, keywords, canonicalPath, ogImage, ogType]);

  return null;
};

