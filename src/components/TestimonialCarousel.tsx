import { useState, useEffect, memo } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Frontend Developer",
    quote: "PIGEN helped me build my portfolio with unique project ideas that impressed recruiters and landed me my dream job.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Startup Founder",
    quote: "I was stuck on what to build next. This tool gave me a brilliant SaaS idea that I've now raised seed funding for!",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "CS Student",
    quote: "As a student learning to code, finding meaningful projects was hard until I discovered PIGEN. It's been a game-changer.",
    avatar: "https://i.pravatar.cc/150?img=11",
  }
];

const TestimonialCarousel = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        rotateTestimonial();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const rotateTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };

  const selectTestimonial = (index: number) => {
    if (index !== activeIndex && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-12">
      <div className="absolute left-0 right-0 top-1/4 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Main testimonial */}
      <div className="relative">
        <div 
          className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/5 blur-lg opacity-70 scale-110"></div>
              <img 
                src={testimonials[activeIndex].avatar} 
                alt={testimonials[activeIndex].name} 
                className="w-20 h-20 rounded-full border-2 border-white/10 object-cover relative"
              />
            </div>
            
            <blockquote className="text-xl text-white/90 mb-4 max-w-3xl font-light italic">
              "{testimonials[activeIndex].quote}"
            </blockquote>
            
            <div className="flex flex-col items-center">
              <div className="text-white font-medium">{testimonials[activeIndex].name}</div>
              <div className="text-gray-400 text-sm">{testimonials[activeIndex].role}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => selectTestimonial(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-white scale-100'
                : 'bg-white/30 scale-75 hover:bg-white/50'
            }`}
            aria-label={`View testimonial ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Subtle decorative elements */}
      <div className="absolute -top-8 -left-8 w-16 h-16 border border-white/10 rounded-full"></div>
      <div className="absolute -bottom-4 -right-12 w-24 h-24 border border-white/5 rounded-full"></div>
    </div>
  );
});

export default TestimonialCarousel; 