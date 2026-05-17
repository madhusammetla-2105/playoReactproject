import { Link } from 'react-router-dom';
import { MapPin, Star, ChevronRight } from 'lucide-react';

export default function GroundCard({ ground }) {
  return (
    <Link to={`/grounds/${ground.id}`} className="block group">
      <div className="bg-cardBg rounded-xl overflow-hidden border border-borderColor transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] h-full flex flex-col">
        <div className="h-52 overflow-hidden relative">
          <img 
            src={ground.image} 
            alt={ground.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-bgDark/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-borderColor flex items-center gap-1.5 shadow-lg">
            <MapPin size={14} className="text-primary" />
            <span className="text-xs font-bold text-textWhite">{ground.location.split(',')[0]}</span>
          </div>
          <div className="absolute bottom-3 right-3 bg-primary px-2.5 py-1 rounded-lg text-bgDark font-bold text-xs shadow-lg">
            {ground.type}
          </div>
        </div>
        <div className="p-5 space-y-4 flex-grow">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg font-extrabold text-textWhite line-clamp-1 group-hover:text-primary transition-colors">{ground.name}</h3>
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg text-primary border border-primary/20 shrink-0">
              <Star size={14} fill="currentColor" />
              <span className="text-xs font-bold">{ground.rating}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-borderColor/50">
            <div className="flex flex-col">
              <span className="text-[10px] text-textGray uppercase font-bold tracking-wider">Starts from</span>
              <span className="text-xl font-black text-primary">₹{ground.pricePerHour}<span className="text-xs font-normal text-textGray ml-1">/hr</span></span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-bgDark transition-all duration-300">
               <ChevronRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
