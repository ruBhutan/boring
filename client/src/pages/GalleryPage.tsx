import { useState, useEffect } from "react";
import { Camera, Filter, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GALLERY_IMAGES, BHUTAN_VIDEOS } from "@/lib/constants";
import { VideoGallery } from "@/components/VideoModal";

const categories = [
  { value: "all", label: "All Media" },
  { value: "videos", label: "Videos" },
  { value: "landmarks", label: "Landmarks" },
  { value: "culture", label: "Culture" },
  { value: "nature", label: "Nature" },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    if (filterParam === 'videos') {
      setActiveFilter('videos');
    }
  }, []);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages = GALLERY_IMAGES.filter(image => 
    activeFilter === "all" || image.category === activeFilter
  );

  // Comprehensive gallery showcasing Bhutan's beauty
  const extendedGallery = [
    ...GALLERY_IMAGES,
    {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      alt: "Tiger's Nest Monastery perched on cliff face",
      title: "Tiger's Nest Monastery",
      description: "Bhutan's most iconic sacred site clinging to a dramatic cliff",
      category: "landmarks"
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      alt: "Traditional Bhutanese dzong fortress monastery",
      title: "Punakha Dzong",
      description: "Majestic fortress-monastery at the confluence of two rivers",
      category: "landmarks"
    },
    {
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      alt: "Colorful prayer flags fluttering in mountain breeze",
      title: "Prayer Flags",
      description: "Sacred flags carrying prayers across the Himalayan winds",
      category: "culture"
    },
    {
      src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
      alt: "Traditional Bhutanese architecture with intricate woodwork",
      title: "Traditional Architecture",
      description: "Masterful craftsmanship without using a single nail",
      category: "culture"
    },
    {
      src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop",
      alt: "Pristine alpine lake reflecting snow-capped peaks",
      title: "Sacred Alpine Lakes",
      description: "Crystal clear waters mirror the eternal Himalayas",
      category: "nature"
    },
    {
      src: "https://images.unsplash.com/photo-1464822759844-d150baec0450?w=800&h=600&fit=crop",
      alt: "Rhododendron flowers blooming in spring mountains",
      title: "Rhododendron Blooms",
      description: "Bhutan's national flower painting mountains in vibrant colors",
      category: "nature"
    },
    {
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      alt: "Buddhist monks in traditional red robes during ceremony",
      title: "Monastic Life",
      description: "Ancient Buddhist traditions preserved in daily practice",
      category: "culture"
    },
    {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop",
      alt: "Local Bhutanese people in traditional dress at festival",
      title: "Festival Celebrations",
      description: "Communities gathering in colorful traditional attire",
      category: "culture"
    },
    {
      src: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=800&h=600&fit=crop",
      alt: "Terraced fields in green valley with traditional farmhouses",
      title: "Valley Agriculture",
      description: "Sustainable farming practices in pristine mountain valleys",
      category: "nature"
    },
    {
      src: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=600&fit=crop",
      alt: "Meditation hall with butter lamps and golden statues",
      title: "Sacred Meditation",
      description: "Finding inner peace in ancient monastery halls",
      category: "culture"
    },
    {
      src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
      alt: "Traditional prayer wheels with intricate carvings",
      title: "Prayer Wheels",
      description: "Spinning wheels of dharma spreading compassion",
      category: "culture"
    },
    {
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
      alt: "Traditional Bhutanese cuisine with red rice and chilies",
      title: "Bhutanese Cuisine",
      description: "Authentic flavors reflecting the soul of the Himalayas",
      category: "culture"
    },
    {
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      alt: "Luxury eco-lodge nestled in pristine forest",
      title: "Eco-Luxury Retreats",
      description: "Sustainable luxury harmonizing with nature",
      category: "landmarks"
    },
    {
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      alt: "Traditional weaving loom with colorful Bhutanese textiles",
      title: "Traditional Crafts",
      description: "Ancient weaving techniques creating vibrant textiles",
      category: "culture"
    },
    {
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      alt: "Mountain sunrise illuminating snow-capped Himalayan peaks",
      title: "Himalayan Dawn",
      description: "First light painting the world's highest mountains",
      category: "nature"
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      alt: "Masked dancers performing traditional cham dance",
      title: "Sacred Mask Dances",
      description: "Ancient spiritual performances driving away evil spirits",
      category: "culture"
    },
    {
      src: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop",
      alt: "Yaks grazing in high altitude meadows with mountain backdrop",
      title: "Highland Pastures",
      description: "Yaks thriving in the thin air of Himalayan meadows",
      category: "nature"
    },
    {
      src: "https://images.unsplash.com/photo-1510133744874-e9b47734579a?w=800&h=600&fit=crop",
      alt: "Ancient chorten stupa with prayer flags against blue sky",
      title: "Sacred Chortens",
      description: "Buddhist stupas marking sacred spaces across the landscape",
      category: "landmarks"
    },
    {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop",
      alt: "Local guide in traditional gho sharing cultural stories",
      title: "Cultural Guides",
      description: "Local experts sharing the wisdom of their ancestors",
      category: "culture"
    },
    {
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      alt: "Forest path through ancient blue pine and rhododendron trees",
      title: "Sacred Forests",
      description: "Pristine woodlands protecting Bhutan's biodiversity",
      category: "nature"
    }
  ];

  const displayImages = extendedGallery.filter(image => 
    activeFilter === "all" || image.category === activeFilter
  );

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div className="pt-20 pb-20 bg-brand-light-gradient min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="brand-section-header mb-4">
            <Camera className="w-5 h-5" />
            Gallery
          </div>
          <h1 className="text-4xl md:text-6xl font-bold brand-heading mb-4">
            Visual Journey Through
            <span className="gradient-text"> Bhutan</span>
          </h1>
          <p className="text-xl brand-body max-w-3xl mx-auto">
            Experience the breathtaking beauty of Bhutan through immersive videos and stunning photography. 
            Each frame tells a story of wonder and discovery in the Last Shangri-La.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-brand-emerald-50 border border-brand-primary/20 rounded-full text-sm font-medium text-brand-primary shadow-sm mr-4">
            <Filter className="w-4 h-4 mr-2 text-brand-primary" />
            Filter by:
          </div>
          {categories.map((category) => (
            <Button
              key={category.value}
              onClick={() => setActiveFilter(category.value)}
              className={activeFilter === category.value ? "btn-brand-primary" : "btn-brand-outline"}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Media Count */}
        <div className="mb-8 text-center">
          <p className="brand-body">
            {activeFilter === "videos" 
              ? `Showing ${BHUTAN_VIDEOS.length} videos`
              : `Showing ${displayImages.length} photos`
            }
          </p>
        </div>

        {/* Immersive Bhutan - Video Gallery Section */}
        {activeFilter === "videos" && (
          <div className="mb-16">
            <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold brand-heading mb-4">
              Immersive
              <span className="gradient-text"> Bhutan</span>
            </h2>
            <p className="text-lg brand-body max-w-2xl mx-auto">
                Experience the magic of Bhutan through cinematic journeys that capture 
                the soul of the Last Shangri-La.
              </p>
            </div>
            <VideoGallery videos={BHUTAN_VIDEOS} />
          </div>
        )}

        {/* Photo Gallery Section */}
        {activeFilter !== "videos" && (
          <div>
            <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold brand-heading mb-4">
              Photo
              <span className="gradient-text"> Gallery</span>
            </h2>
            <p className="text-lg brand-body max-w-2xl mx-auto">
                Stunning photography capturing the essence of Bhutan's landscapes, culture, and spiritual heritage.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayImages.map((image, index) => (
                <div 
                  key={index} 
                  className="relative group overflow-hidden rounded-2xl shadow-xl brand-card cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-200">{image.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Previous Button */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Main Image */}
              <div className="relative max-w-full max-h-full">
                <img
                  src={displayImages[currentImageIndex]?.src}
                  alt={displayImages[currentImageIndex]?.alt}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg">
                  <h3 className="text-2xl font-bold mb-2">{displayImages[currentImageIndex]?.title}</h3>
                  <p className="text-gray-200">{displayImages[currentImageIndex]?.description}</p>
                  <div className="mt-2 text-sm text-gray-300">
                    {currentImageIndex + 1} of {displayImages.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photography Tips Section */}
        <section className="mt-20 bg-brand-emerald-50 rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold brand-heading mb-4">Photography Tips for Bhutan</h2>
            <p className="text-lg brand-body max-w-2xl mx-auto">
              Capture the magic of the Last Shangri-La with these expert tips from our photography guides.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-brand-emerald-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Camera className="w-8 h-8 text-brand-emerald-600" />
              </div>
              <h3 className="font-semibold brand-heading mb-2">Golden Hour Magic</h3>
              <p className="brand-body text-sm">
                The soft light during sunrise and sunset creates ethereal shots of monasteries and mountains.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-gold-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-brand-gold-600 font-bold text-lg">📷</span>
              </div>
              <h3 className="font-semibold brand-heading mb-2">Respect & Permission</h3>
              <p className="brand-body text-sm">
                Always ask permission before photographing people and be mindful of sacred spaces.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-brand-primary font-bold text-lg">🏔️</span>
              </div>
              <h3 className="font-semibold brand-heading mb-2">Altitude Preparation</h3>
              <p className="brand-body text-sm">
                Protect your equipment from altitude changes and carry extra batteries in cold conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-brand-primary-gradient rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own Memories?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join our photography tours and capture the essence of Bhutan with expert guidance.
            </p>
            <Button className="bg-white text-brand-primary hover:bg-brand-emerald-50 hover:text-brand-primary px-8 py-3 rounded-full font-semibold text-lg transition-colors">
              Book Photography Tour
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
