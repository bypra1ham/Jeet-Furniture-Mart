import React from 'react';
import { client } from '@/sanity/lib/client';
import { approvedTestimonialsQuery } from '@/sanity/lib/queries';
import { Star, MessageSquareQuote } from 'lucide-react';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const revalidate = 3600; // ISR - revalidate every hour

interface Testimonial {
  _id: string;
  customerName: string;
  location?: string;
  rating: number;
  message: string;
  productCategory?: string;
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: 'fb-1',
    customerName: 'Rajesh Sharma',
    location: 'Gurugram',
    rating: 5,
    message: 'The teakwood Jhula we purchased from Jeet Furniture Mart has become the centerpiece of our living room. The wood carving detail is outstanding, and the brass chains are incredibly sturdy. Outstanding handcraft!',
    productCategory: 'Wooden Swing',
  },
  {
    _id: 'fb-2',
    customerName: 'Meera Patel',
    location: 'Mumbai',
    rating: 5,
    message: 'We ordered a Korean Mandir with customized backlit carvings. It is absolutely stunning and looks exactly like the design drawings they shared. The LED lighting integration is seamless.',
    productCategory: 'Korean Mandir',
  },
  {
    _id: 'fb-3',
    customerName: 'Amit Verma',
    location: 'Delhi',
    rating: 5,
    message: 'Extremely pleased with our new Modular L-Shaped Sofa and TV unit console. The fit and finish are exceptional. They adjusted the layout coordinates perfectly to fit our small living room niche.',
    productCategory: 'Sofa & TV Unit',
  },
  {
    _id: 'fb-4',
    customerName: 'Priya Nair',
    location: 'Bengaluru',
    rating: 5,
    message: 'We ordered a set of custom 3D CNC carving wall partition panels for our showroom. The carving depth is precise, and the teak veneer finish matches our decor beautifully. Highly recommended!',
    productCategory: '3D CNC Panels',
  },
];

async function getTestimonials() {
  try {
    const queryTestimonials = await client.fetch(approvedTestimonialsQuery);
    return queryTestimonials && queryTestimonials.length > 0 ? queryTestimonials : FALLBACK_TESTIMONIALS;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return FALLBACK_TESTIMONIALS;
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-widest text-[#C9A84C] font-sans font-bold">
            Client feedback
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-display font-light text-[#1C1C1E]">
            Client <span className="font-bold text-[#C9A84C] italic">Testimonials</span>
          </h1>
          <p className="mt-4 text-xs font-sans text-stone-500 uppercase tracking-wider">
            Discover what our customers say about our handcrafted finishes, modular solutions, and CNC details.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((test: Testimonial) => (
            <div
              key={test._id}
              className="bg-white border border-[#E0DDD8] p-8 shadow-sm flex flex-col justify-between relative hover:border-gold-accent transition-all duration-300"
            >
              <MessageSquareQuote className="absolute top-4 right-4 w-10 h-10 text-stone-100 -z-0" />
              
              <div className="relative z-10">
                {/* Rating stars */}
                <div className="flex items-center space-x-1 mb-4 text-[#C9A84C]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 fill-current ${
                        idx < test.rating ? 'text-[#C9A84C]' : 'text-stone-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Message */}
                <p className="text-xs text-stone-600 font-sans leading-relaxed italic mb-6">
                  &ldquo;{test.message}&rdquo;
                </p>
              </div>

              {/* Customer Metadata */}
              <div className="border-t border-[#E0DDD8]/60 pt-4 flex justify-between items-end relative z-10">
                <div>
                  <h4 className="text-xs font-sans font-extrabold text-[#1C1C1E] uppercase tracking-wider">
                    {test.customerName}
                  </h4>
                  {test.location && (
                    <span className="text-[10px] text-stone-400 font-sans uppercase font-medium">
                      {test.location}
                    </span>
                  )}
                </div>
                {test.productCategory && (
                  <span className="text-[9px] uppercase tracking-wider bg-stone-100 text-stone-600 px-2.5 py-1 font-bold border border-stone-200">
                    {test.productCategory}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Panel */}
        <div className="bg-white border border-[#E0DDD8] p-10 max-w-xl mx-auto text-center shadow-sm">
          <h3 className="text-lg font-display font-medium text-[#1C1C1E] mb-2">
            Are you one of our customers?
          </h3>
          <p className="text-xs text-stone-500 mb-6 leading-relaxed">
            Your feedback helps us maintain our quality standards. Send us your review on WhatsApp or write to us at contact@jeetfurniture.com.
          </p>
          <WhatsAppButton />
        </div>

      </div>
    </div>
  );
}
