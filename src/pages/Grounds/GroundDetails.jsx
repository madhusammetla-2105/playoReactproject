import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGrounds, useAuth } from '../../hooks/useContexts';
import { MapPin, Star, Info, Calendar as CalendarIcon, Clock } from 'lucide-react';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

// Helper to generate dummy time slots with an index to check contiguity
const generateSlots = () => {
  const slots = [];
  const startHour = 9; // 9 AM
  const endHour = 22; // 10 PM
  
  for (let i = startHour; i < endHour; i++) {
    const period = i >= 12 ? 'PM' : 'AM';
    const hour12 = i > 12 ? i - 12 : (i === 0 ? 12 : i);
    const timeStr = `${hour12}:00 ${period} - ${hour12 + 1 > 12 ? (hour12 + 1 - 12) : hour12 + 1}:00 ${i + 1 >= 12 && i + 1 < 24 ? 'PM' : 'AM'}`;
    
    // Randomly mock availability (roughly 30% booked)
    const isAvailable = Math.random() > 0.3;
    
    slots.push({
      id: i, // Use hour as ID for easy contiguous checking
      time: timeStr,
      isAvailable
    });
  }
  return slots;
};

export default function GroundDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { grounds } = useGrounds();
  const { user } = useAuth();
  
  const [ground, setGround] = useState(null);

  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isContiguous, setIsContiguous] = useState(true);
  
  // Memoize slots so they don't change on every re-render, but do change if date changes
  const slots = useMemo(() => generateSlots(), [date, id]);

  useEffect(() => {
    const foundGround = grounds.find(g => g.id === id);
    setGround(foundGround);
    setSelectedSlots([]); // Reset selection when ground changes
  }, [id, grounds]);

  // Validation logic for contiguous slots
  useEffect(() => {
    if (selectedSlots.length <= 1) {
      setIsContiguous(true);
      return;
    }
    
    // Sort selected slot IDs ascending
    const sortedIds = [...selectedSlots].map(s => s.id).sort((a, b) => a - b);
    let contiguous = true;
    for (let i = 1; i < sortedIds.length; i++) {
      if (sortedIds[i] !== sortedIds[i-1] + 1) {
        contiguous = false;
        break;
      }
    }
    setIsContiguous(contiguous);
  }, [selectedSlots]);

  const toggleSlot = (slot) => {
    if (!slot.isAvailable) return;
    
    setSelectedSlots(prev => {
      const exists = prev.find(s => s.id === slot.id);
      if (exists) {
        return prev.filter(s => s.id !== slot.id);
      } else {
        return [...prev, slot];
      }
    });
  };

  const handlePreviewBooking = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/grounds/${id}` } } });
      return;
    }

    if (!date || selectedSlots.length === 0) {
      alert("Please select a date and at least one available time slot.");
      return;
    }

    if (!isContiguous) {
      return; // Do nothing, UI shows error
    }

    // Sort to display neatly
    const sortedSelected = [...selectedSlots].sort((a, b) => a.id - b.id);
    const totalPrice = ground.pricePerHour * sortedSelected.length;
    
    // Navigate to preview page with booking details
    navigate(`/preview-booking/${id}`, {
      state: {
        date,
        slots: sortedSelected,
        price: totalPrice,
        groundName: ground.name,
        groundImage: ground.image
      }
    });
  };

  if (!ground) return <Loader fullScreen />;

  const totalPrice = ground.pricePerHour * selectedSlots.length;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Image */}
      <div className="w-full h-96 rounded-2xl overflow-hidden relative border border-gray-800">
        <img src={ground.image} alt={ground.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bgDark via-bgDark/50 to-transparent" />
        <div className="absolute bottom-6 left-6 max-w-3xl">
          <span className="bg-primary/90 text-bgDark px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">
            {ground.type}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-textWhite leading-tight">{ground.name}</h1>
          <div className="flex items-center gap-4 mt-4 text-textGray text-lg">
            <span className="flex items-center gap-1"><MapPin size={20} className="text-primary"/> {ground.city}</span>
            <span className="flex items-center gap-1 text-yellow-400"><Star size={20} fill="currentColor"/> {ground.rating}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-cardBg p-6 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Info size={24} className="text-primary"/> About the Ground</h2>
            <p className="text-textGray leading-relaxed text-lg">{ground.description}</p>
          </div>

          <div className="bg-cardBg p-6 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-3">
              {ground.amenities.map((amenity, index) => (
                <span key={index} className="bg-bgDark px-4 py-2 rounded-xl border border-gray-700 text-sm font-medium text-textGray">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Moved Available Slots Container */}
          <div className="bg-cardBg p-6 rounded-2xl border border-gray-800">
             <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Clock size={24} className="text-primary"/> Available Slots for {new Date(date).toLocaleDateString()}</h2>
             <p className="text-textGray mb-4 text-sm">Select one or more continuous slots to book.</p>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {slots.map((slot) => {
                  const isSelected = selectedSlots.some(s => s.id === slot.id);
                  return (
                    <button
                      key={slot.id}
                      disabled={!slot.isAvailable}
                      onClick={() => toggleSlot(slot)}
                      className={`py-3 px-2 text-xs sm:text-sm font-medium rounded-xl border transition-all duration-200 ${
                        !slot.isAvailable 
                          ? 'bg-gray-800/50 border-gray-800 text-gray-600 cursor-not-allowed'
                          : isSelected
                            ? 'bg-primary border-primary text-bgDark shadow-[0_0_10px_rgba(34,197,94,0.3)] transform scale-[1.02]'
                            : 'bg-bgDark border-gray-700 text-textGray hover:border-primary hover:text-primary'
                      }`}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-6 text-sm text-textGray justify-center md:justify-start">
                  <div className="flex items-center gap-2"><div className="w-4 h-4 bg-bgDark border border-gray-700 rounded-md"></div> Available</div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 bg-primary border border-primary rounded-md"></div> Selected</div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-800/50 border border-gray-800 rounded-md"></div> Booked</div>
              </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-cardBg p-6 rounded-2xl border border-gray-800 sticky top-24 shadow-2xl">
            <h3 className="text-xl font-bold mb-2">Book this ground</h3>
            <div className="text-3xl font-bold text-primary mb-6">₺{ground.pricePerHour}<span className="text-sm text-textGray font-normal">/hour</span></div>
            
            <div className="space-y-6">
              {/* Date Selection Calendar */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-textWhite mb-2">
                  <CalendarIcon size={16} className="text-primary"/> Select Date
                </label>
                <input 
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setSelectedSlots([]); // Clear slots on date change
                  }}
                  className="w-full px-4 py-3 bg-bgDark border border-gray-700 rounded-xl text-textWhite focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
                />
              </div>

              {/* Selection Summary */}
              <div className="bg-bgDark p-4 rounded-xl border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-textGray">Slots Selected</span>
                  <span className="font-bold text-textWhite">{selectedSlots.length}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-textGray">Total Amount</span>
                  <span className="font-bold text-primary">₺{totalPrice}</span>
                </div>
              </div>
              
              <Button 
                onClick={handlePreviewBooking} 
                className="w-full py-3 text-lg font-bold shadow-lg"
                disabled={selectedSlots.length === 0 || !isContiguous}
              >
                Preview Booking
              </Button>

              {/* Non-contiguous error message */}
              {!isContiguous && selectedSlots.length > 1 && (
                <div className="mt-2 p-3 border border-red-500 bg-red-900/20 text-red-400 text-sm rounded-lg text-center">
                  Please select continuous time slots. Gaps between bookings are not allowed.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
