import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1551280857-2b9bbe52ccbd?auto=format&fit=crop&q=80&w=2000"
];

export default function AuthLayout({ children }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % SLIDER_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex w-full bg-bgDark">
      {/* Left Side: Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 relative z-10">
        <div className="absolute top-8 left-8">
          <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2 hover:text-hoverGreen transition-colors">
            Playo
          </Link>
        </div>
        
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Right Side: Image Slider */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-cardBg overflow-hidden">
        {SLIDER_IMAGES.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-bgDark/80 via-transparent to-transparent z-10" />
            <img 
              src={img} 
              alt={`Cricket Ground ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Decorative Overlay Text/Content */}
        <div className="absolute bottom-16 right-16 z-20 max-w-md text-right">
          <h2 className="text-4xl font-bold text-textWhite mb-4 drop-shadow-lg">
            Elevate Your Game
          </h2>
          <p className="text-lg text-textGray drop-shadow-md">
            Book premium turf and stadium experiences instantly. Join the largest sports community.
          </p>
          
          {/* Slider Indicators */}
          <div className="flex justify-end gap-2 mt-6">
            {SLIDER_IMAGES.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 rounded-full transition-all duration-500 ${index === currentImageIndex ? 'w-8 bg-primary' : 'w-2 bg-textGray/50'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
