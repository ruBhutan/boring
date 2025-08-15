interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

interface RouteConfig {
  path: string;
  priority: number;
  changefreq: SitemapEntry['changefreq'];
  dynamic?: boolean;
  dataSource?: () => Promise<Array<{ slug: string; lastmod: string }>>;
}

class SitemapGenerator {
  private baseUrl: string;
  private routes: RouteConfig[];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.routes = [
      // Static pages
      { path: '/', priority: 1.0, changefreq: 'daily' },
      { path: '/tours', priority: 0.9, changefreq: 'daily' },
      { path: '/about', priority: 0.8, changefreq: 'monthly' },
      { path: '/contact', priority: 0.8, changefreq: 'monthly' },
      { path: '/blog', priority: 0.9, changefreq: 'daily' },
      { path: '/festivals', priority: 0.8, changefreq: 'weekly' },
      { path: '/hotels', priority: 0.8, changefreq: 'weekly' },
      { path: '/gallery', priority: 0.7, changefreq: 'weekly' },
      { path: '/visa-info', priority: 0.7, changefreq: 'monthly' },
      { path: '/flights', priority: 0.7, changefreq: 'weekly' },
      { path: '/geography', priority: 0.6, changefreq: 'monthly' },
      { path: '/unique-experiences', priority: 0.7, changefreq: 'monthly' },
      { path: '/travel-tips', priority: 0.7, changefreq: 'monthly' },
      { path: '/faq', priority: 0.6, changefreq: 'monthly' },
      { path: '/custom-tour', priority: 0.8, changefreq: 'monthly' },
      
      // Tour category pages
      { path: '/tours/cultural', priority: 0.8, changefreq: 'weekly' },
      { path: '/tours/luxury', priority: 0.8, changefreq: 'weekly' },
      { path: '/tours/adventure', priority: 0.8, changefreq: 'weekly' },
      { path: '/tours/spiritual', priority: 0.8, changefreq: 'weekly' },
      { path: '/tours/festival', priority: 0.8, changefreq: 'weekly' },
      { path: '/tours/bespoke', priority: 0.8, changefreq: 'weekly' },
      { path: '/tours/photography', priority: 0.8, changefreq: 'weekly' },
      { path: '/tours/birdwatching', priority: 0.8, changefreq: 'weekly' },
      { path: '/tours/cycling', priority: 0.8, changefreq: 'weekly' },
      { path: '/tours/pilgrimage', priority: 0.8, changefreq: 'weekly' },
      { path: '/tours/wellness', priority: 0.8, changefreq: 'weekly' },
      
      // Hotel category pages
      { path: '/hotels/luxury', priority: 0.7, changefreq: 'weekly' },
      { path: '/hotels/boutique', priority: 0.7, changefreq: 'weekly' },
      { path: '/hotels/homestays', priority: 0.7, changefreq: 'weekly' },
      { path: '/hotels/farmstays', priority: 0.7, changefreq: 'weekly' },
      
      // Dynamic pages
      {
        path: '/tours/',
        priority: 0.9,
        changefreq: 'weekly',
        dynamic: true,
        dataSource: this.getTourPages
      },
      {
        path: '/blog/',
        priority: 0.8,
        changefreq: 'weekly',
        dynamic: true,
        dataSource: this.getBlogPosts
      },
      {
        path: '/destinations/',
        priority: 0.7,
        changefreq: 'monthly',
        dynamic: true,
        dataSource: this.getDestinations
      }
    ];
  }

  private async getTourPages(): Promise<Array<{ slug: string; lastmod: string }>> {
    // In a real implementation, this would fetch from your API
    // For now, returning mock data
    return [
      { slug: 'bhutan-cultural-heritage-tour', lastmod: new Date().toISOString() },
      { slug: 'himalayan-trekking-adventure', lastmod: new Date().toISOString() },
      { slug: 'tigers-nest-monastery-hike', lastmod: new Date().toISOString() },
      { slug: 'bhutan-photography-expedition', lastmod: new Date().toISOString() },
      { slug: 'festival-tour-paro-tsechu', lastmod: new Date().toISOString() }
    ];
  }

  private async getBlogPosts(): Promise<Array<{ slug: string; lastmod: string }>> {
    // Mock blog posts data
    return [
      { slug: 'discovering-hidden-gems-bhutan', lastmod: '2024-01-15T10:00:00Z' },
      { slug: 'best-time-visit-bhutan-seasonal-guide', lastmod: '2024-01-20T09:00:00Z' },
      { slug: 'bhutan-cultural-festivals-complete-guide', lastmod: '2024-01-10T14:30:00Z' },
      { slug: 'tigers-nest-monastery-hiking-guide', lastmod: '2024-01-05T11:45:00Z' }
    ];
  }

  private async getDestinations(): Promise<Array<{ slug: string; lastmod: string }>> {
    // Mock destinations data
    return [
      { slug: 'thimphu', lastmod: new Date().toISOString() },
      { slug: 'paro', lastmod: new Date().toISOString() },
      { slug: 'punakha', lastmod: new Date().toISOString() },
      { slug: 'bumthang', lastmod: new Date().toISOString() },
      { slug: 'wangdue', lastmod: new Date().toISOString() }
    ];
  }

  public async generateSitemap(): Promise<string> {
    const entries: SitemapEntry[] = [];

    // Add static pages
    for (const route of this.routes) {
      if (!route.dynamic) {
        entries.push({
          url: `${this.baseUrl}${route.path}`,
          lastmod: new Date().toISOString(),
          changefreq: route.changefreq,
          priority: route.priority.toString()
        });
      } else {
        // Handle dynamic pages
        if (route.dataSource) {
          try {
            const dynamicPages = await route.dataSource();
            for (const page of dynamicPages) {
              entries.push({
                url: `${this.baseUrl}${route.path}${page.slug}`,
                lastmod: page.lastmod,
                changefreq: route.changefreq,
                priority: route.priority.toString()
              });
            }
          } catch (error) {
            console.error(`Error fetching dynamic pages for ${route.path}:`, error);
          }
        }
      }
    }

    // Generate XML sitemap
    return this.generateXMLSitemap(entries);
  }

  private generateXMLSitemap(entries: SitemapEntry[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const entry of entries) {
      xml += '  <url>\n';
      xml += `    <loc>${this.escapeXML(entry.url)}</loc>\n`;
      xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
      xml += `    <priority>${entry.priority}</priority>\n`;
      xml += '  </url>\n';
    }

    xml += '</urlset>';
    return xml;
  }

  public async generateSitemapIndex(): Promise<string> {
    // Generate sitemap index for large sites
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    const sitemaps = [
      { loc: `${this.baseUrl}/sitemap-pages.xml`, lastmod: new Date().toISOString() },
      { loc: `${this.baseUrl}/sitemap-tours.xml`, lastmod: new Date().toISOString() },
      { loc: `${this.baseUrl}/sitemap-blog.xml`, lastmod: new Date().toISOString() },
      { loc: `${this.baseUrl}/sitemap-destinations.xml`, lastmod: new Date().toISOString() }
    ];

    for (const sitemap of sitemaps) {
      xml += '  <sitemap>\n';
      xml += `    <loc>${this.escapeXML(sitemap.loc)}</loc>\n`;
      xml += `    <lastmod>${sitemap.lastmod}</lastmod>\n`;
      xml += '  </sitemap>\n';
    }

    xml += '</sitemapindex>';
    return xml;
  }

  public async generateRobotsTxt(): Promise<string> {
    let robotsTxt = 'User-agent: *\n';
    robotsTxt += 'Allow: /\n';
    robotsTxt += 'Disallow: /admin/\n';
    robotsTxt += 'Disallow: /dashboard/\n';
    robotsTxt += 'Disallow: /api/\n';
    robotsTxt += 'Disallow: /private/\n';
    robotsTxt += '\n';
    robotsTxt += `Sitemap: ${this.baseUrl}/sitemap.xml\n`;
    robotsTxt += '\n';
    robotsTxt += '# Crawl-delay for specific bots\n';
    robotsTxt += 'User-agent: Bingbot\n';
    robotsTxt += 'Crawl-delay: 1\n';
    robotsTxt += '\n';
    robotsTxt += 'User-agent: Slurp\n';
    robotsTxt += 'Crawl-delay: 1\n';

    return robotsTxt;
  }

  public generateCanonicalTags(currentUrl: string): Array<{ rel: string; href: string }> {
    const tags = [];
    
    // Canonical tag
    tags.push({ rel: 'canonical', href: currentUrl });
    
    // Alternate language versions (if applicable)
    const languages = ['en', 'es', 'fr', 'de', 'ja', 'zh'];
    for (const lang of languages) {
      if (lang !== 'en') { // Assuming 'en' is the default
        tags.push({
          rel: 'alternate',
          href: `${currentUrl}?lang=${lang}`
        });
      }
    }

    return tags;
  }

  public generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': crumb.name,
        'item': crumb.url
      }))
    };
  }

  public generateNewsArticleSchema(article: {
    headline: string;
    description: string;
    author: string;
    publishDate: string;
    modifiedDate: string;
    image: string;
    url: string;
    publisher: {
      name: string;
      logo: string;
    };
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'headline': article.headline,
      'description': article.description,
      'image': article.image,
      'datePublished': article.publishDate,
      'dateModified': article.modifiedDate,
      'author': {
        '@type': 'Person',
        'name': article.author
      },
      'publisher': {
        '@type': 'Organization',
        'name': article.publisher.name,
        'logo': {
          '@type': 'ImageObject',
          'url': article.publisher.logo
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': article.url
      }
    };
  }

  private escapeXML(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  // URL optimization utilities
  public optimizeUrl(url: string): string {
    return url
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  public generateMetaRobots(page: {
    index: boolean;
    follow: boolean;
    archive: boolean;
    snippet: boolean;
    imageIndex: boolean;
  }): string {
    const robots = [];
    
    robots.push(page.index ? 'index' : 'noindex');
    robots.push(page.follow ? 'follow' : 'nofollow');
    
    if (!page.archive) robots.push('noarchive');
    if (!page.snippet) robots.push('nosnippet');
    if (!page.imageIndex) robots.push('noimageindex');
    
    return robots.join(', ');
  }

  // Performance optimization for SEO
  public generatePreloadTags(resources: Array<{
    href: string;
    as: string;
    type?: string;
    crossorigin?: boolean;
  }>): Array<{ rel: string; href: string; as: string; type?: string; crossorigin?: string }> {
    return resources.map(resource => {
      const tag: any = {
        rel: 'preload',
        href: resource.href,
        as: resource.as
      };

      if (resource.type) {
        tag.type = resource.type;
      }

      if (resource.crossorigin) {
        tag.crossorigin = 'anonymous';
      }

      return tag;
    });
  }

  // Social media optimization
  public generateTwitterCardMeta(card: {
    type: 'summary' | 'summary_large_image' | 'app' | 'player';
    title: string;
    description: string;
    image: string;
    site: string;
    creator?: string;
  }) {
    const meta = [
      { name: 'twitter:card', content: card.type },
      { name: 'twitter:title', content: card.title },
      { name: 'twitter:description', content: card.description },
      { name: 'twitter:image', content: card.image },
      { name: 'twitter:site', content: card.site }
    ];

    if (card.creator) {
      meta.push({ name: 'twitter:creator', content: card.creator });
    }

    return meta;
  }

  // Analytics and tracking
  public generateAnalyticsSchema(analytics: {
    gtmId?: string;
    gaId?: string;
    fbPixelId?: string;
    hotjarId?: string;
  }) {
    const scripts = [];

    // Google Tag Manager
    if (analytics.gtmId) {
      scripts.push({
        type: 'gtm',
        id: analytics.gtmId,
        code: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${analytics.gtmId}');
        `
      });
    }

    // Google Analytics 4
    if (analytics.gaId) {
      scripts.push({
        type: 'ga4',
        id: analytics.gaId,
        code: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analytics.gaId}');
        `
      });
    }

    return scripts;
  }
}

export default SitemapGenerator;

// Usage example and export
export const createSitemapGenerator = (baseUrl: string = 'https://bhutanmindbreak.com') => {
  return new SitemapGenerator(baseUrl);
};

// Utility functions for common SEO tasks
export const seoUtils = {
  // Generate meta description from content
  generateMetaDescription: (content: string, maxLength: number = 160): string => {
    const cleanContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return cleanContent.length > maxLength 
      ? `${cleanContent.substring(0, maxLength - 3)}...`
      : cleanContent;
  },

  // Extract keywords from content
  extractKeywords: (content: string, maxKeywords: number = 10): string[] => {
    const words = content
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);

    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, maxKeywords)
      .map(([word]) => word);
  },

  // Calculate reading time
  calculateReadingTime: (content: string, wordsPerMinute: number = 200): number => {
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  },

  // Validate SEO requirements
  validateSEO: (page: {
    title: string;
    description: string;
    keywords: string;
    content: string;
  }) => {
    const issues = [];

    if (!page.title) issues.push('Missing title');
    if (page.title.length > 60) issues.push('Title too long (>60 chars)');
    if (page.title.length < 30) issues.push('Title too short (<30 chars)');

    if (!page.description) issues.push('Missing meta description');
    if (page.description.length > 160) issues.push('Description too long (>160 chars)');
    if (page.description.length < 120) issues.push('Description too short (<120 chars)');

    if (!page.keywords) issues.push('Missing keywords');
    if (page.keywords.split(',').length < 3) issues.push('Too few keywords (<3)');

    if (page.content.length < 300) issues.push('Content too short (<300 words)');

    return {
      isValid: issues.length === 0,
      issues,
      score: Math.max(0, 100 - (issues.length * 10))
    };
  }
};
