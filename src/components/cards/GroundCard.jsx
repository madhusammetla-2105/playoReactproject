import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

export default function GroundCard({ ground }) {
  return (
    <Link to={`/grounds/${ground.id}`} className="block group">
      <div className="bg-cardBg rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 hover:border-primary hover:shadow-[0_0_15px_rgba(34,197,94,0.15)] h-full flex flex-col">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={ground.image} 
            alt={ground.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-bgDark/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-primary">
            {ground.type}
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-textWhite line-clamp-1">{ground.name}</h3>
            <div className="flex items-center gap-1 text-yellow-400 text-sm shrink-0">
              <Star size={14} fill="currentColor" />
              <span>{ground.rating}</span>
            </div>
          </div>
          <div className="flex items-center text-textGray text-sm mb-4">
            <MapPin size={14} className="mr-1 text-primary" />
            {ground.city}
          </div>
          <div className="mt-auto flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-textWhite">₺{ground.pricePerHour}</span>
              <span className="text-xs text-textGray"> / hour</span>
            </div>
            <span className="text-primary text-sm font-medium group-hover:underline">Book Now</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
