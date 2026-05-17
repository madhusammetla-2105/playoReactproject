import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGrounds, useAuth, useBookings } from '../../hooks/useContexts';
import { MapPin, Star, Info, Calendar as CalendarIcon, Clock } from 'lucide-react';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import Calendar from '../../components/common/Calendar';

const startHour = 9; // 9 AM
const endHour = 22; // 10 PM

export default function GroundDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { grounds, addGroundReview } = useGrounds();
  const { user } = useAuth();
  const { allBookings } = useBookings();
  
  const [ground, setGround] = useState(null);

  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/grounds/${id}` } } });
      return;
    }
    if (!comment.trim()) {
      alert("Please enter your feedback comment.");
      return;
    }
    setIsSubmittingReview(true);
    setTimeout(() => {
      addGroundReview(id, {
        user: user.name || user.email.split('@')[0],
        rating: newRating,
        comment: comment
      });
      setComment('');
      setNewRating(5);
      setIsSubmittingReview(false);
    }, 400);
  };

  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isContiguous, setIsContiguous] = useState(true);
  
  // Memoize slots to freeze booked ones and add random "Offline" status
  const slots = useMemo(() => {
    const slotsArr = [];
    
    // Find all active bookings for this ground and date
    const bookedForDay = allBookings
      .filter(b => b.groundId === id && b.date === date && b.status !== 'cancelled');
    
    // Create a set of booked time strings for quick lookup
    const bookedTimes = new Set();
    bookedForDay.forEach(b => {
      const times = b.time.split(', ');
      times.forEach(t => bookedTimes.add(t));
    });

    // Seed for "random" but consistent offline slots
    const seed = (id || "").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) + (date || "").split("-").join("");
    const seededRandom = (s) => {
        const x = Math.sin(s) * 10000;
        return x - Math.floor(x);
    };

    for (let i = startHour; i < endHour; i++) {
      const period = i >= 12 ? 'PM' : 'AM';
      const hour12 = i > 12 ? i - 12 : (i === 0 ? 12 : i);
      const nextHour = i + 1;
      const nextHour12 = nextHour > 12 ? nextHour - 12 : (nextHour === 0 ? 12 : nextHour);
      const nextPeriod = nextHour >= 12 && nextHour < 24 ? 'PM' : 'AM';
      
      const timeStr = `${hour12 < 10 ? '0' + hour12 : hour12}:00 ${period} - ${nextHour12 < 10 ? '0' + nextHour12 : nextHour12}:00 ${nextPeriod}`;
      
      const isBooked = bookedTimes.has(timeStr);
      // Randomly freeze 15% of slots as "Offline" (consistent for this ground/date)
      const isRandomlyFrozen = !isBooked && seededRandom(parseInt(seed) + i) < 0.15;

      slotsArr.push({
        id: i,
        time: timeStr,
        isAvailable: !isBooked && !isRandomlyFrozen,
        status: isBooked ? 'Booked' : (isRandomlyFrozen ? 'Offline' : 'Available')
      });
    }
    return slotsArr;
  }, [id, date, allBookings]);

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
      return;
    }

    const sortedSelected = [...selectedSlots].sort((a, b) => a.id - b.id);
    const totalPrice = ground.pricePerHour * sortedSelected.length;
    
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
      <div className="w-full h-96 rounded-2xl overflow-hidden relative border border-borderColor">
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
          <div className="bg-cardBg p-6 rounded-2xl border border-borderColor">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Info size={24} className="text-primary"/> About the Ground</h2>
            <p className="text-textGray leading-relaxed text-lg">{ground.description}</p>
          </div>

          <div className="bg-cardBg p-6 rounded-2xl border border-borderColor">
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
          <div className="bg-cardBg p-6 rounded-2xl border border-borderColor">
             <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Clock size={24} className="text-primary"/> Available Slots for {new Date(date).toLocaleDateString()}</h2>
             <p className="text-textGray mb-4 text-sm">Select one or more continuous slots to book.</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {slots.map((slot) => {
                  const isSelected = selectedSlots.some(s => s.id === slot.id);
                  const isOffline = slot.status === 'Offline';
                  return (
                    <button
                      key={slot.id}
                      disabled={!slot.isAvailable}
                      onClick={() => toggleSlot(slot)}
                      className={`py-3 px-2 text-xs sm:text-sm font-medium rounded-xl border transition-all duration-200 relative overflow-hidden ${
                        !slot.isAvailable 
                          ? isOffline 
                            ? 'bg-red-900/10 border-red-900/30 text-red-500/50 cursor-not-allowed'
                            : 'bg-gray-800/50 border-borderColor text-gray-600 cursor-not-allowed'
                          : isSelected
                            ? 'bg-primary border-primary text-bgDark shadow-[0_0_10px_rgba(34,197,94,0.3)] transform scale-[1.02]'
                            : 'bg-bgDark border-gray-700 text-textGray hover:border-primary hover:text-primary'
                      }`}
                    >
                      {slot.time}
                      {isOffline && (
                        <span className="absolute top-0 right-0 bg-red-500 text-[8px] text-white px-1 font-bold uppercase tracking-tighter">
                          Offline
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-4 mt-6 text-sm text-textGray justify-center md:justify-start">
                  <div className="flex items-center gap-2"><div className="w-4 h-4 bg-bgDark border border-gray-700 rounded-md"></div> Available</div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 bg-primary border border-primary rounded-md"></div> Selected</div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-800/50 border border-borderColor rounded-md"></div> Booked</div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-900/10 border border-red-900/30 rounded-md"></div> Offline / Phone</div>
              </div>
          </div>

          {/* Customer Ratings & Reviews Section */}
          <div className="bg-cardBg p-6 rounded-2xl border border-borderColor space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-borderColor pb-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Star size={24} className="text-yellow-400 fill-yellow-400" /> Customer Reviews
                </h2>
                <p className="text-textGray text-sm mt-1">What players say about their booking experience</p>
              </div>
              <div className="bg-bgDark px-4 py-2 rounded-xl border border-borderColor flex items-center gap-2">
                <span className="text-2xl font-black text-yellow-400">{ground.rating || 0}</span>
                <div className="flex flex-col">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        fill={star <= Math.round(ground.rating || 0) ? "currentColor" : "none"}
                        className="text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-textGray font-semibold uppercase tracking-wider">
                    {ground.reviews?.length || 0} Reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Leave a review form */}
            <form onSubmit={handleAddReview} className="bg-bgDark p-5 rounded-xl border border-borderColor space-y-4">
              <h3 className="font-bold text-lg text-textWhite">Rate Your Experience</h3>
              
              <div>
                <label className="block text-xs font-bold text-textGray uppercase tracking-widest mb-2">Select Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-yellow-400 hover:scale-110 active:scale-95 transition-all focus:outline-none"
                    >
                      <Star
                        size={28}
                        fill={star <= (hoverRating || newRating) ? "currentColor" : "none"}
                        className="transition-colors duration-150"
                      />
                    </button>
                  ))}
                  <span className="text-sm text-textGray font-medium ml-2">
                    ({hoverRating || newRating} / 5 Stars)
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-textGray uppercase tracking-widest">Write a Review</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={
                    user 
                      ? "Describe the ground turf quality, lightings, pricing, amenities..." 
                      : "Please login to leave a review..."
                  }
                  disabled={!user}
                  rows={3}
                  className="w-full p-4 bg-cardBg border border-borderColor rounded-xl text-textWhite focus:outline-none focus:border-primary transition-all text-sm placeholder:text-textGray/45 resize-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmittingReview || !user || !comment.trim()}
                className="w-full sm:w-auto py-2.5 px-6 font-bold shadow-md text-sm cursor-pointer"
              >
                {isSubmittingReview ? "Submitting..." : user ? "Submit Review" : "Login to Review"}
              </Button>
            </form>

            {/* List of reviews */}
            <div className="space-y-4">
              {ground.reviews && ground.reviews.length > 0 ? (
                ground.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-bgDark rounded-xl border border-borderColor space-y-2.5 transition-all hover:border-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-textWhite text-sm flex items-center gap-2">
                          {rev.user}
                          {rev.user === (user?.name || user?.email?.split('@')[0]) && (
                            <span className="bg-primary/20 text-primary border border-primary/30 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest">
                              You
                            </span>
                          )}
                        </span>
                        <div className="flex text-yellow-400 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={12}
                              fill={star <= rev.rating ? "currentColor" : "none"}
                              className="text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-textGray font-semibold">{rev.date}</span>
                    </div>
                    <p className="text-textGray text-sm leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-textGray text-sm">
                  No reviews yet. Be the first to leave one!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-cardBg p-6 rounded-2xl border border-borderColor sticky top-24 shadow-2xl">
            <h3 className="text-xl font-bold mb-2">Book this ground</h3>
            <div className="text-3xl font-bold text-primary mb-6">₹{ground.pricePerHour}<span className="text-sm text-textGray font-normal">/hour</span></div>
            
            <div className="space-y-6">
              {/* Date Selection Calendar */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-textWhite mb-2">
                  <CalendarIcon size={16} className="text-primary"/> Select Date
                </label>
                <Calendar 
                  selectedDate={date}
                  onDateSelect={(newDate) => {
                    setDate(newDate);
                    setSelectedSlots([]); // Clear slots on date change
                  }}
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
                  <span className="font-bold text-primary">₹{totalPrice}</span>
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
