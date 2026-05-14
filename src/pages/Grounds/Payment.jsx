import { useState } from 'react';
import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { useBookings, useAuth } from '../../hooks/useContexts';
import { CheckCircle, Smartphone, MapPin, CreditCard as CardIcon } from 'lucide-react';
import Button from '../../components/common/Button';

export default function Payment() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { createBooking } = useBookings();
  const { user } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState('Paytm');

  const paymentOptions = [
    { id: 'Paytm', icon: <Smartphone size={20} />, label: 'Paytm' },
    { id: 'PhonePe', icon: <Smartphone size={20} />, label: 'PhonePe' },
    { id: 'UPI', icon: <Smartphone size={20} />, label: 'UPI' },
    { id: 'Pay at Venue', icon: <MapPin size={20} />, label: 'Pay at Venue' }
  ];

  const bookingDetails = location.state;

  if (!bookingDetails) {
    return <Navigate to={`/grounds/${id}`} replace />;
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing delay (shorter for pay at venue)
    await new Promise(resolve => setTimeout(resolve, paymentMethod === 'Pay at Venue' ? 500 : 1500));
    
    try {
      await createBooking({
        groundId: id,
        date: bookingDetails.date,
        // Save the first slot's time for compatibility with the old system,
        // or join them together. The user requested multiple slots so we save an array or string
        time: bookingDetails.slots.map(s => s.time).join(', '),
        totalPrice: bookingDetails.price,
        paymentMethod: paymentMethod // New field added
      });
      setIsSuccess(true);
    } catch (err) {
      alert("Something went wrong with the booking. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDone = () => {
    // Format the time string nicely if multiple slots
    const timeStr = bookingDetails.slots.length > 1 
      ? `${bookingDetails.slots[0].time.split(' - ')[0]} to ${bookingDetails.slots[bookingDetails.slots.length - 1].time.split(' - ')[1]}`
      : bookingDetails.slots[0].time;

    // Simulate email delivery with alert
    alert(`Email sent to ${user?.email}:\n\nYou have blocked ${timeStr} on ${bookingDetails.date} in ${bookingDetails.groundName}.`);
    navigate('/dashboard', { replace: true });
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-3xl font-bold text-textWhite">Booking Confirmed!</h1>
        <p className="text-textGray">Your booking for {bookingDetails.groundName} has been secured.</p>
        
        {paymentMethod === 'Pay at Venue' && (
          <div className="bg-bgDark p-4 rounded-xl border border-gray-800 mt-4">
            <p className="text-textWhite font-medium">Payment Method: Pay at Venue</p>
            <p className="text-sm text-textGray mt-1">Please pay ₺{bookingDetails.price} at the facility.</p>
          </div>
        )}

        <Button onClick={handleDone} className="w-full py-4 text-lg font-bold mt-8 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          Done
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-cardBg p-8 rounded-3xl border border-gray-800 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-textWhite">Payment Details</h1>
          <p className="text-textGray mt-1">Amount to pay: <strong className="text-textWhite text-xl">₺{bookingDetails.price}</strong></p>
        </div>

        {/* Payment Methods Selection */}
        <div className="space-y-3 mb-8">
          <label className="block text-sm font-bold text-textWhite mb-3">Select Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            {paymentOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setPaymentMethod(option.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
                  paymentMethod === option.id
                    ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                    : 'bg-bgDark border-gray-700 text-textGray hover:border-gray-500'
                }`}
              >
                {option.icon}
                <span className="mt-2 text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic UI based on selected method */}
        {paymentMethod === 'Pay at Venue' ? (
          <div className="bg-bgDark p-6 rounded-xl border border-gray-800 mb-8 text-center">
            <MapPin size={32} className="mx-auto text-primary mb-3" />
            <h3 className="text-textWhite font-bold mb-2">Pay at Venue</h3>
            <p className="text-sm text-textGray">You will pay the total amount of ₺{bookingDetails.price} when you arrive at the ground.</p>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            <div className="bg-bgDark p-4 rounded-xl border border-gray-800 text-center pointer-events-none opacity-60">
               <CardIcon size={32} className="mx-auto text-textGray mb-2" />
               <p className="text-sm text-textGray">Mock {paymentMethod} Integration</p>
               <p className="text-xs text-gray-500 mt-1">Click pay to simulate processing</p>
            </div>
          </div>
        )}

        <Button 
          variant="primary" 
          className="w-full py-4 text-lg font-bold shadow-lg flex items-center justify-center gap-2" 
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing 
            ? 'Processing...' 
            : paymentMethod === 'Pay at Venue' 
              ? 'Confirm Booking' 
              : `Pay ₺${bookingDetails.price}`
          }
        </Button>
      </div>
    </div>
  );
}
