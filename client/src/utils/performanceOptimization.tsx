import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';

// Lazy Loading Image Component with Intersection Observer
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  srcSet?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder = '/images/placeholder.jpg',
  onLoad,
  onError,
  sizes,
  srcSet
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      <img
        ref={imgRef}
        src={placeholder}
        alt=""
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      />
      
      {/* Actual Image */}
      {isInView && (
        <img
          src={hasError ? placeholder : src}
          srcSet={hasError ? undefined : srcSet}
          sizes={sizes}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      
      {/* Loading indicator */}
      {isInView && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

// Lazy Loading Component Wrapper
interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export const LazyComponent: React.FC<LazyComponentProps> = ({
  children,
  fallback,
  className = '',
  threshold = 0.1,
  rootMargin = '50px'
}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {isInView ? children : fallback}
    </div>
  );
};

// Code Splitting Utilities
export const lazyComponentImport = (importFunction: () => Promise<any>) => {
  return lazy(() => importFunction().catch(() => import('./ErrorBoundary')));
};

// Pre-defined lazy loaded components for common sections
export const LazyTourGrid = lazy(() => import('../components/TourGrid'));
export const LazyTestimonialCarousel = lazy(() => import('../components/TestimonialCarousel'));
export const LazyBlogSection = lazy(() => import('../components/BlogSection'));
export const LazyGallery = lazy(() => import('../components/Gallery'));

// Loading Skeleton Components
export const TourCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-6 bg-gray-200 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  </div>
);

export const BlogCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-32 bg-gray-200"></div>
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);

// Performance Monitoring Hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<{
    loadTime: number;
    renderTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
  } | null>(null);

  useEffect(() => {
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const paintEntries = entries.filter(entry => entry.entryType === 'paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        
        if (fcpEntry) {
          setMetrics(prev => ({
            ...prev,
            firstContentfulPaint: fcpEntry.startTime,
            loadTime: performance.now(),
            renderTime: performance.now()
          } as any));
        }
      });

      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });

      return () => observer.disconnect();
    }
  }, []);

  return metrics;
};

// Caching Utilities
class PerformanceCache {
  private cache = new Map();
  private maxSize: number;

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
  }

  set(key: string, value: any, ttl = 300000): void { // 5 minutes default TTL
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string): any {
    const item = this.cache.get(key);
    
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

export const performanceCache = new PerformanceCache();

// Image Optimization Utilities
export class ImageOptimizer {
  static generateSrcSet(baseSrc: string, sizes: number[] = [480, 768, 1024, 1200, 1600]): string {
    return sizes
      .map(size => `${baseSrc}?w=${size}&q=80 ${size}w`)
      .join(', ');
  }

  static generateSizes(breakpoints: { [key: string]: string } = {
    '(max-width: 768px)': '100vw',
    '(max-width: 1024px)': '50vw',
    default: '33vw'
  }): string {
    const entries = Object.entries(breakpoints);
    const mediaQueries = entries.slice(0, -1).map(([query, size]) => `${query} ${size}`);
    const defaultSize = breakpoints.default || '100vw';
    
    return [...mediaQueries, defaultSize].join(', ');
  }

  static preloadCriticalImages(images: string[]): void {
    images.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  static convertToWebP(src: string): string {
    // Simple WebP conversion URL modifier
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
}

// Bundle Size Monitoring
export const getBundleInfo = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    const jsResources = resources.filter(resource => 
      resource.name.includes('.js') && !resource.name.includes('analytics')
    );
    
    const cssResources = resources.filter(resource => resource.name.includes('.css'));
    
    const totalJSSize = jsResources.reduce((total, resource) => 
      total + (resource.transferSize || 0), 0
    );
    
    const totalCSSSize = cssResources.reduce((total, resource) => 
      total + (resource.transferSize || 0), 0
    );

    return {
      totalJSSize: Math.round(totalJSSize / 1024), // KB
      totalCSSSize: Math.round(totalCSSSize / 1024), // KB
      jsResourceCount: jsResources.length,
      cssResourceCount: cssResources.length,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart
    };
  }

  return null;
};

// Virtual Scrolling Component for Large Lists
interface VirtualScrollProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  overscan?: number;
}

export const VirtualScroll: React.FC<VirtualScrollProps> = ({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight),
    items.length - 1
  );

  const startIndex = Math.max(0, visibleStart - overscan);
  const endIndex = Math.min(items.length - 1, visibleEnd + overscan);

  const visibleItems = items.slice(startIndex, endIndex + 1);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Critical Resource Loading
export const loadCriticalResources = async (resources: Array<{
  type: 'script' | 'style' | 'image';
  src: string;
  async?: boolean;
  defer?: boolean;
}>) => {
  const promises = resources.map(resource => {
    return new Promise((resolve, reject) => {
      let element: HTMLScriptElement | HTMLLinkElement | HTMLImageElement;

      switch (resource.type) {
        case 'script':
          element = document.createElement('script') as HTMLScriptElement;
          element.src = resource.src;
          if (resource.async) element.async = true;
          if (resource.defer) element.defer = true;
          break;
          
        case 'style':
          element = document.createElement('link') as HTMLLinkElement;
          element.rel = 'stylesheet';
          element.href = resource.src;
          break;
          
        case 'image':
          element = document.createElement('img') as HTMLImageElement;
          element.src = resource.src;
          break;
          
        default:
          reject(new Error(`Unsupported resource type: ${resource.type}`));
          return;
      }

      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error(`Failed to load ${resource.src}`));

      if (resource.type !== 'image') {
        document.head.appendChild(element);
      }
    });
  });

  try {
    await Promise.all(promises);
    console.log('Critical resources loaded successfully');
  } catch (error) {
    console.error('Error loading critical resources:', error);
  }
};

// Service Worker Registration for Caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available
              if (confirm('New version available! Reload to update?')) {
                window.location.reload();
              }
            }
          });
        }
      });

      console.log('ServiceWorker registered successfully');
      return registration;
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  }
};

// Performance Metrics Reporter
export class PerformanceReporter {
  private static instance: PerformanceReporter;
  private metrics: any[] = [];

  static getInstance(): PerformanceReporter {
    if (!PerformanceReporter.instance) {
      PerformanceReporter.instance = new PerformanceReporter();
    }
    return PerformanceReporter.instance;
  }

  recordMetric(name: string, value: number, category?: string): void {
    this.metrics.push({
      name,
      value,
      category,
      timestamp: Date.now()
    });

    // Auto-report if metrics exceed threshold
    if (this.metrics.length >= 50) {
      this.reportMetrics();
    }
  }

  recordCustomTiming(name: string, startTime: number): void {
    const endTime = performance.now();
    this.recordMetric(name, endTime - startTime, 'timing');
  }

  reportMetrics(): void {
    if (this.metrics.length === 0) return;

    // In a real application, send to analytics service
    console.log('Performance Metrics:', this.metrics);
    
    // Optional: Send to analytics service
    // fetch('/api/analytics/performance', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(this.metrics)
    // });

    this.metrics = [];
  }

  getWebVitals(): Promise<any> {
    return new Promise((resolve) => {
      if ('web-vitals' in window) {
        // @ts-ignore
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          const vitals: any = {};

          getCLS((metric: any) => { vitals.CLS = metric; });
          getFID((metric: any) => { vitals.FID = metric; });
          getFCP((metric: any) => { vitals.FCP = metric; });
          getLCP((metric: any) => { vitals.LCP = metric; });
          getTTFB((metric: any) => { vitals.TTFB = metric; });

          setTimeout(() => resolve(vitals), 1000);
        });
      } else {
        resolve({});
      }
    });
  }
}

// Export performance utilities
export const performanceUtils = {
  preloadRoute: (routePath: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = routePath;
    document.head.appendChild(link);
  },

  preconnectToOrigin: (origin: string) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    document.head.appendChild(link);
  },

  deferNonCriticalCSS: (href: string) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = () => { link.media = 'all'; };
    document.head.appendChild(link);
  },

  measureFirstInputDelay: (): Promise<number> => {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fidEntry = entries.find(entry => entry.name === 'first-input');
          if (fidEntry) {
            resolve(fidEntry.processingStart - fidEntry.startTime);
            observer.disconnect();
          }
        });

        observer.observe({ entryTypes: ['first-input'] });
      } else {
        resolve(0);
      }
    });
  }
};

export default {
  LazyImage,
  LazyComponent,
  performanceCache,
  ImageOptimizer,
  VirtualScroll,
  PerformanceReporter,
  performanceUtils
};
