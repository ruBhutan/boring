import { Heart, Users, Award, Mountain, Star } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/constants";
import { ReviewsSection } from "@/components/TrustIndicators";
import { WhyChooseUsSection } from "@/components/WhyChooseUs";
import { useQuery } from "@tanstack/react-query";
import type { Testimonial } from "@shared/schema";

export default function AboutPage() {
  // Fetch testimonials for the reviews section
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  return (
    <div className="pt-20 pb-20">
      {/* Our Story Section */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="brand-section-header">
            <Heart className="w-5 h-5 text-brand-accent" />
            Our Story
          </div>
          <h2 className="text-4xl font-bold brand-heading leading-tight mb-6">
            Born from a Deep Love for the
            <span className="brand-gradient-text block"> Last Shangri-La</span>
          </h2>
          <p className="text-xl brand-body leading-relaxed mx-auto max-w-3xl">
            Bhutan Mind Break was founded by passionate locals who wanted to share the authentic 
            magic of our kingdom with the world. We believe that travel should transform both 
            the visitor and the visited.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-light rounded-2xl transform -rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop"
                alt="Ancient Bhutanese monastery nestled in mountain valley"
                className="relative rounded-2xl shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-brand-secondary" />
                  <span className="font-semibold text-brand-text">7+ Years Experience</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-lg brand-body leading-relaxed">
                Our journey began in 2008 when our founder, Tashi Dorji, realized that most visitors 
                were only seeing the surface of Bhutan's incredible depth. We created Bhutan Mind Break 
                to offer something different—journeys that touch the soul and reveal the true essence 
                of the Land of the Thunder Dragon.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="brand-card p-4 text-center">
                  <div className="text-3xl font-bold text-brand-primary">500+</div>
                  <div className="text-sm text-brand-text-muted">Happy Travelers</div>
                </div>
                <div className="brand-card p-4 text-center">
                  <div className="text-3xl font-bold text-brand-primary">98%</div>
                  <div className="text-sm text-brand-text-muted">Satisfaction Rate</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <div className="bg-brand-secondary/20 text-brand-secondary px-3 py-1 rounded-full text-sm font-medium">
                  Sustainable Tourism
                </div>
                <div className="bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full text-sm font-medium">
                  Cultural Preservation
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Community Impact
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold brand-heading mb-4">
              Our Mission & Values
            </h2>
            <p className="text-xl brand-body max-w-3xl mx-auto">
              Everything we do is guided by Bhutan's philosophy of Gross National Happiness 
              and our commitment to sustainable, transformative travel.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="brand-card p-6 text-center">
              <div className="bg-brand-light rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mountain className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold brand-heading mb-3">Authentic Experiences</h3>
              <p className="brand-body">
                We go beyond tourist attractions to reveal the real Bhutan through genuine cultural exchanges.
              </p>
            </div>
            
            <div className="brand-card p-6 text-center">
              <div className="bg-brand-light rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold brand-heading mb-3">Sustainable Impact</h3>
              <p className="brand-body">
                Every journey contributes positively to local communities and environmental conservation.
              </p>
            </div>
            
            <div className="brand-card p-6 text-center">
              <div className="bg-brand-light rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-brand-secondary" />
              </div>
              <h3 className="text-xl font-bold brand-heading mb-3">Local Expertise</h3>
              <p className="brand-body">
                Our team of local guides shares intimate knowledge passed down through generations.
              </p>
            </div>
            
            <div className="brand-card p-6 text-center">
              <div className="bg-brand-light rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold brand-heading mb-3">Personal Growth</h3>
              <p className="brand-body">
                We design journeys that inspire transformation and lasting positive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GNH Pillars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold brand-heading mb-4">
              The Four Pillars of GNH
            </h2>
            <p className="text-xl brand-body max-w-3xl mx-auto">
              Gross National Happiness is a holistic and sustainable approach to development, which balances material and spiritual well-being.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="brand-card p-6 text-center">
              <h3 className="text-xl font-bold brand-heading mb-3">Sustainable & Equitable Socio-Economic Development</h3>
            </div>
            <div className="brand-card p-6 text-center">
              <h3 className="text-xl font-bold brand-heading mb-3">Preservation & Promotion of Culture</h3>
            </div>
            <div className="brand-card p-6 text-center">
              <h3 className="text-xl font-bold brand-heading mb-3">Environmental Conservation</h3>
            </div>
            <div className="brand-card p-6 text-center">
              <h3 className="text-xl font-bold brand-heading mb-3">Good Governance</h3>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Bhutan Unique Section */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold brand-heading mb-4">
              What Makes Bhutan Unique
            </h2>
            <p className="text-xl brand-body max-w-3xl mx-auto">
              Discover the elements that make Bhutan a truly one-of-a-kind destination.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="brand-card p-6 text-center">
              <h3 className="text-xl font-bold brand-heading mb-3">Carbon Negative</h3>
              <p className="brand-body">
                Bhutan is the world's only carbon-negative country, with over 70% of its land under forest cover.
              </p>
            </div>
            <div className="brand-card p-6 text-center">
              <h3 className="text-xl font-bold brand-heading mb-3">No Traffic Lights</h3>
              <p className="brand-body">
                The capital city, Thimphu, is the only capital in the world without traffic lights.
              </p>
            </div>
            <div className="brand-card p-6 text-center">
              <h3 className="text-xl font-bold brand-heading mb-3">High-Value, Low-Impact Tourism</h3>
              <p className="brand-body">
                Bhutan's tourism policy focuses on sustainability and providing a unique experience for visitors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full mb-4">
                <Users className="w-5 h-5 text-brand-primary mr-2" />
                <span className="text-sm font-medium text-brand-text">Meet Our Team</span>
              </div>
              <h2 className="text-4xl font-bold brand-heading mb-4">Your Bhutanese Family</h2>
              <p className="text-xl brand-body max-w-2xl mx-auto">
                Local experts who don't just show you Bhutan—they help you feel it, understand it, 
                and fall in love with it.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM_MEMBERS.map((member, index) => (
                <div key={index} className="group">
                  <div className="brand-card p-6 hover:-translate-y-2 transition-transform duration-300">
                    <div className="relative mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-white shadow-lg"
                      />
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-brand-gradient-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                        Local Expert
                      </div>
                    </div>
                    <h3 className="text-xl font-bold brand-heading text-center mb-2">{member.name}</h3>
                    <p className="text-brand-primary text-center font-medium mb-3">{member.role}</p>
                    <p className="brand-body text-center text-sm mb-4">{member.bio}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-brand-light text-brand-primary px-2 py-1 rounded-full text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold brand-heading mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl brand-body max-w-3xl mx-auto">
              We measure our success not just in profits, but in the positive impact we create 
              for travelers, communities, and the environment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="brand-card p-8 text-center">
              <div className="text-4xl font-bold text-brand-primary mb-2">500+</div>
              <div className="text-brand-text font-medium">Travelers Transformed</div>
              <div className="text-sm text-brand-text-muted mt-1">From 45+ countries</div>
            </div>
            
            <div className="brand-card p-8 text-center">
              <div className="text-4xl font-bold text-brand-primary mb-2">$250K+</div>
              <div className="text-brand-text font-medium">Community Investment</div>
              <div className="text-sm text-brand-text-muted mt-1">Supporting local families</div>
            </div>
            
            <div className="brand-card p-8 text-center">
              <div className="text-4xl font-bold text-brand-secondary mb-2">15</div>
              <div className="text-brand-text font-medium">Villages Supported</div>
              <div className="text-sm text-brand-text-muted mt-1">Across all 20 districts</div>
            </div>
            
            <div className="brand-card p-8 text-center">
              <div className="text-4xl font-bold text-brand-primary mb-2">98%</div>
              <div className="text-brand-text font-medium">Return Rate</div>
              <div className="text-sm text-brand-text-muted mt-1">Travelers recommending us</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Reviews Section */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header">
              ⭐ Traveler Reviews
            </div>
            <h2 className="text-4xl md:text-5xl font-bold brand-heading mb-4">
              Stories from the
              <span className="brand-gradient-text"> Heart</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex text-brand-secondary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <span className="text-lg font-semibold brand-text">4.9/5</span>
              <span className="brand-body">from 500+ reviews</span>
            </div>
          </div>
          
          {/* Featured Testimonial */}
          {testimonials.length > 0 && (
            <div className="brand-card rounded-3xl p-8 brand-glow mb-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[0].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-brand-secondary fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl brand-text mb-8 italic leading-relaxed font-light">
                  "{testimonials[0].text}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[0].imageUrl}
                    alt={testimonials[0].name}
                    className="w-16 h-16 rounded-full object-cover mr-4 ring-4 ring-white shadow-lg"
                  />
                  <div className="text-left">
                    <div className="font-semibold brand-text text-lg">{testimonials[0].name}</div>
                    <div className="brand-body">{testimonials[0].country} • {testimonials[0].tripName}</div>
                    <div className="text-sm text-brand-primary">{testimonials[0].duration}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Testimonials Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.slice(1, 4).map((testimonial) => (
              <div key={testimonial.id} className="brand-card p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-brand-secondary mr-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm brand-body">{testimonial.tripName}</span>
                </div>
                <blockquote className="brand-text mb-4 italic">
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="font-semibold brand-text">{testimonial.name}</div>
                    <div className="text-sm brand-body">{testimonial.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
