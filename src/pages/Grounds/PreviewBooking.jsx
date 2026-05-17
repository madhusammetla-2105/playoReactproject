import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Wallet } from 'lucide-react';
import Button from '../../components/common/Button';

export default function PreviewBooking() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const bookingDetails = location.state;

  if (!bookingDetails) {
    return <Navigate to={`/grounds/${id}`} replace />;
  }

  const handleConfirm = () => {
    navigate(`/payment/${id}`, {
      state: bookingDetails
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-cardBg rounded-3xl border border-borderColor shadow-2xl overflow-hidden">
        
        {/* Venue Image Header */}
        <div className="h-64 w-full relative">
          <img 
            src={bookingDetails.groundImage || "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80"} 
            alt={bookingDetails.groundName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bgDark to-transparent" />
          <div className="absolute bottom-6 left-8">
            <h1 className="text-3xl font-bold text-textWhite">Preview Your Booking</h1>
            <p className="text-textGray mt-1">Review the details before proceeding to payment.</p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-6 bg-bgDark p-6 rounded-2xl border border-borderColor">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm text-textGray font-medium">Venue</p>
                <p className="text-xl font-bold text-textWhite">{bookingDetails.groundName}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm text-textGray font-medium">Date</p>
                <p className="text-xl font-bold text-textWhite">
                  {new Date(bookingDetails.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm text-textGray font-medium">Time Slots ({bookingDetails.slots.length} Hour{bookingDetails.slots.length > 1 ? 's' : ''})</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {bookingDetails.slots.map(slot => (
                    <span key={slot.id} className="bg-cardBg border border-borderColor px-3 py-1 rounded-lg text-sm text-primary font-medium">
                      {slot.time}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-borderColor flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="text-textGray" size={20} />
                <span className="text-textGray font-medium">Total Amount Due</span>
              </div>
              <span className="text-3xl font-bold text-primary">₹{bookingDetails.price}</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              variant="outline" 
              className="w-full py-4 text-lg font-bold" 
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            <Button 
              variant="primary" 
              className="w-full py-4 text-lg font-bold shadow-lg" 
              onClick={handleConfirm}
            >
              Confirm & Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
