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
    customerName: 'Neelay Gandhi',
    rating: 5,
    message: 'Anyone looking for high quality furniture, custom made from India, he does great work. Have had a swing and temple made. Very well made. I am in the US and have had them both shipped to me. Came very well packed and easy to reassemble. Highly recommend!',
  },
  {
    _id: 'fb-2',
    customerName: 'Nick Patel',
    rating: 5,
    message: "A Dream Mandir Brought to Life!!\nIf you're looking for someone to create a custom mandir that is both beautiful and meaningful, look no further than Jeet Furniture. You won't be disappointed!",
  },
  {
    _id: 'fb-3',
    customerName: 'Vikram Jangir',
    rating: 5,
    message: 'Excellent location for purchasing any form of wooden furniture for your home. You may find the captivating wooden carving patterns you like here.',
  },
  {
    _id: 'fb-4',
    customerName: 'Chetan Jangid',
    rating: 5,
    message: "Great place for all types of wooden furniture in Home required,here you'll get mesmerizing wooden carved designs you want 🙌🙌",
  },
  {
    _id: 'fb-5',
    customerName: 'Shiv Mahant',
    rating: 5,
    message: "Nice work done by this company i really like it's finishing.",
  },
  {
    _id: 'fb-6',
    customerName: 'Bob Patel',
    rating: 5,
    message: 'I am so satisfied of mandir made from saag wood., And Jeet furniture has carved out the design with passion so it looks very attractive with ancient touch.\nI would recommend all my Indian NRI with my highest regard.',
  },
  {
    _id: 'fb-7',
    customerName: 'Nilesh Patel',
    rating: 5,
    message: 'Bought wooden temple and very satisfied with purchase and quality service. Detailed carving with great finish. Excellent packaging in strong wooden box and delivered to given address for international shipping and received in Australia intact. Great work by Jeet furniture. Thank you very much.',
  },
  {
    _id: 'fb-8',
    customerName: 'Abdul Khan',
    rating: 5,
    message: 'Very nice work by this company I had purchase sofa from there it was very nice finished I have no words to tell about that',
  },
  {
    _id: 'fb-9',
    customerName: 'Parth Mistry',
    rating: 5,
    message: 'Best place for furniture.Every type of furniture is available here in every type of wood and marble.',
  },
  {
    _id: 'fb-10',
    customerName: 'Dinesh Sutar',
    rating: 5,
    message: 'Best customer service is provided to me here',
  },
  {
    _id: 'fb-11',
    customerName: 'Mohan Mistry',
    rating: 5,
    message: "I can't say anything other than 'Amazing'....",
  },
  {
    _id: 'fb-12',
    customerName: 'nachiket jani',
    rating: 5,
    message: 'Excellent place for beautiful Mandirs',
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
              <div className="border-t border-[#E0DDD8]/60 pt-4 relative z-10">
                <h4 className="text-xs font-sans font-extrabold text-[#1C1C1E] uppercase tracking-wider">
                  {test.customerName}
                </h4>
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
            Your feedback helps us maintain our quality standards. Send us your review on WhatsApp.
          </p>
          <WhatsAppButton />
        </div>

      </div>
    </div>
  );
}
