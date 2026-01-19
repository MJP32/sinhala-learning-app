import { useEffect } from 'react';

/**
 * SEO Component - Updates document title and meta tags dynamically
 * Improves SEO by providing unique titles and descriptions for each page/section
 */
const SEO = ({
  title,
  description,
  keywords,
  canonicalPath = '',
  structuredData = null
}) => {
  const baseTitle = 'Learn Sinhala';
  const baseUrl = 'https://www.sringlish.com';

  useEffect(() => {
    // Update document title
    const fullTitle = title ? `${title} | ${baseTitle}` : `${baseTitle} - Free Online Sinhala Lessons`;
    document.title = fullTitle;

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }

    // Update Open Graph title
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', fullTitle);
      }

      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', fullTitle);
      }
    }

    // Update Open Graph description
    if (description) {
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', description);
      }

      let twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) {
        twitterDescription.setAttribute('content', description);
      }
    }

    // Update canonical URL
    if (canonicalPath) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `${baseUrl}${canonicalPath}`);
      }

      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('href', `${baseUrl}${canonicalPath}`);
      }
    }

    // Add structured data
    if (structuredData) {
      // Remove existing dynamic structured data
      const existingScript = document.querySelector('script[data-seo="dynamic"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'dynamic');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function to restore defaults when component unmounts
    return () => {
      // Optionally restore default title on unmount
    };
  }, [title, description, keywords, canonicalPath, structuredData]);

  return null; // This component doesn't render anything
};

// Pre-defined SEO configurations for each grade
export const gradeSEOConfig = {
  1: {
    title: 'Grade 1 - Basic Sinhala Letters & Words',
    titleSinhala: 'පළමු ශ්‍රේණිය',
    description: 'Learn basic Sinhala alphabet, vowels, consonants, numbers 1-10, colors, animals, and fruits. Perfect for beginners starting their Sinhala language journey.',
    keywords: 'Sinhala alphabet, Sinhala letters, learn Sinhala basics, Sinhala vowels, Sinhala consonants, Sinhala numbers, Sinhala for kids, beginner Sinhala',
    sections: {
      letters: {
        title: 'Sinhala Alphabet - Letters & Pronunciation',
        description: 'Learn all Sinhala letters including vowels (ස්වර) and consonants (ව්‍යංජන). Audio pronunciation for each letter.',
      },
      numbers: {
        title: 'Sinhala Numbers 1-10',
        description: 'Learn to count in Sinhala from one to ten. Numbers with pronunciation and practice exercises.',
      },
      animals: {
        title: 'Animals in Sinhala',
        description: 'Learn animal names in Sinhala with pictures and pronunciation. Dog, cat, elephant, bird, and more.',
      },
      fruits: {
        title: 'Fruits in Sinhala',
        description: 'Learn fruit names in Sinhala. Apple, banana, mango, orange with audio pronunciation.',
      },
      colors: {
        title: 'Colors in Sinhala',
        description: 'Learn color names in Sinhala. Red, blue, green, yellow and more with examples.',
      },
      songs: {
        title: 'Sinhala Songs & Rhymes for Kids',
        description: 'Fun Sinhala songs and rhymes for children. Alphabet song, counting song, and more.',
      },
    }
  },
  2: {
    title: 'Grade 2 - Sinhala Vocabulary Building',
    titleSinhala: 'දෙවන ශ්‍රේණිය',
    description: 'Expand your Sinhala vocabulary with family words, numbers 11-20, days of the week, months, food items, and weather vocabulary.',
    keywords: 'Sinhala vocabulary, Sinhala family words, Sinhala days, Sinhala months, Sinhala food, Sinhala weather, intermediate Sinhala',
    sections: {
      family: {
        title: 'Family Members in Sinhala',
        description: 'Learn family relationship words in Sinhala. Mother, father, sister, brother, grandmother, grandfather.',
      },
      numbers: {
        title: 'Sinhala Numbers 11-20',
        description: 'Learn Sinhala numbers from eleven to twenty with pronunciation practice.',
      },
      days: {
        title: 'Days & Months in Sinhala',
        description: 'Learn days of the week and months of the year in Sinhala language.',
      },
      food: {
        title: 'Food & Drinks in Sinhala',
        description: 'Learn food and drink vocabulary in Sinhala. Common Sri Lankan foods and beverages.',
      },
    }
  },
  3: {
    title: 'Grade 3 - Sinhala Grammar & Conversation',
    titleSinhala: 'තුන්වන ශ්‍රේණිය',
    description: 'Learn Sinhala grammar basics, sentence structure, verb conjugation, and everyday conversation phrases.',
    keywords: 'Sinhala grammar, Sinhala sentences, Sinhala verbs, Sinhala conversation, speak Sinhala, Sinhala phrases',
    sections: {}
  },
  4: {
    title: 'Grade 4 - Advanced Sinhala Reading',
    titleSinhala: 'හතරවන ශ්‍රේණිය',
    description: 'Develop Sinhala reading comprehension, learn complex grammar patterns, and explore Sri Lankan culture.',
    keywords: 'Sinhala reading, Sinhala comprehension, advanced Sinhala, Sri Lankan culture, Sinhala stories',
    sections: {}
  },
  5: {
    title: 'Grade 5 - Sinhala Literature & History',
    titleSinhala: 'පස්වන ශ්‍රේණිය',
    description: 'Explore Sinhala literature, Sri Lankan history, advanced vocabulary, idioms, and formal writing.',
    keywords: 'Sinhala literature, Sri Lanka history, Sinhala idioms, Sinhala writing, advanced Sinhala grammar',
    sections: {}
  },
  6: {
    title: 'Grade 6 - Sinhala Mastery',
    titleSinhala: 'හයවන ශ්‍රේණිය',
    description: 'Master Sinhala language with literary analysis, critical thinking, academic writing, and cultural studies.',
    keywords: 'Sinhala mastery, Sinhala literary analysis, academic Sinhala, Sinhala essay writing, fluent Sinhala',
    sections: {}
  }
};

// Helper function to generate BreadcrumbList structured data
export const generateBreadcrumbs = (grade, section = null) => {
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://www.sringlish.com/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': `Grade ${grade}`,
        'item': `https://www.sringlish.com/#grade${grade}`
      }
    ]
  };

  if (section) {
    breadcrumbs.itemListElement.push({
      '@type': 'ListItem',
      'position': 3,
      'name': section,
      'item': `https://www.sringlish.com/#grade${grade}-${section}`
    });
  }

  return breadcrumbs;
};

export default SEO;
