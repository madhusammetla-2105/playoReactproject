import { useState } from 'react';
import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { useBookings, useAuth } from '../../hooks/useContexts';
import { CheckCircle, Smartphone, MapPin, CreditCard as CardIcon, Wallet, Landmark, QrCode } from 'lucide-react';
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
  const [subMethod, setSubMethod] = useState('');

  const paymentOptions = [
    { id: 'Paytm', icon: <Smartphone size={20} />, label: 'Paytm' },
    { id: 'PhonePe', icon: <Smartphone size={20} />, label: 'PhonePe' },
    { id: 'UPI', icon: <QrCode size={20} />, label: 'UPI' },
    { id: 'Pay at Venue', icon: <MapPin size={20} />, label: 'Pay at Venue' }
  ];

  const subOptions = {
    Paytm: [
      { id: 'paytm_wallet', label: 'Paytm Wallet', icon: <Wallet size={18} /> },
      { id: 'paytm_netbanking', label: 'Net Banking', icon: <Landmark size={18} /> },
      { id: 'paytm_postpaid', label: 'Paytm Postpaid', icon: <Smartphone size={18} /> }
    ],
    PhonePe: [
      { id: 'phonepe_wallet', label: 'PhonePe Wallet', icon: <Wallet size={18} /> },
      { id: 'phonepe_card', label: 'Saved Card', icon: <CardIcon size={18} /> },
      { id: 'phonepe_netbanking', label: 'Net Banking', icon: <Landmark size={18} /> }
    ],
    UPI: [
      { id: 'gpay', label: 'Google Pay', icon: <Smartphone size={18} /> },
      { id: 'phonepe_upi', label: 'PhonePe UPI', icon: <Smartphone size={18} /> },
      { id: 'paytm_upi', label: 'Paytm UPI', icon: <Smartphone size={18} /> },
      { id: 'bhim_upi', label: 'BHIM UPI', icon: <Smartphone size={18} /> }
    ]
  };

  const bookingDetails = location.state;

  if (!bookingDetails) {
    return <Navigate to={`/grounds/${id}`} replace />;
  }

  const handlePayment = async () => {
    if (paymentMethod !== 'Pay at Venue' && !subMethod) {
      alert("Please select a specific payment option.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing delay (shorter for pay at venue)
    await new Promise(resolve => setTimeout(resolve, paymentMethod === 'Pay at Venue' ? 500 : 1500));
    
    try {
      await createBooking({
        groundId: id,
        date: bookingDetails.date,
        time: bookingDetails.slots.map(s => s.time).join(', '),
        totalPrice: bookingDetails.price,
        paymentMethod: subMethod || paymentMethod
      });
      setIsSuccess(true);
    } catch (err) {
      alert("Something went wrong with the booking. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDone = () => {
    const timeStr = bookingDetails.slots.length > 1 
      ? `${bookingDetails.slots[0].time.split(' - ')[0]} to ${bookingDetails.slots[bookingDetails.slots.length - 1].time.split(' - ')[1]}`
      : bookingDetails.slots[0].time;

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
          <div className="bg-bgDark p-4 rounded-xl border border-borderColor mt-4">
            <p className="text-textWhite font-medium">Payment Method: Pay at Venue</p>
            <p className="text-sm text-textGray mt-1">Please pay ₹{bookingDetails.price} at the facility.</p>
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
      <div className="bg-cardBg p-8 rounded-3xl border border-borderColor shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-textWhite">Payment Details</h1>
          <p className="text-textGray mt-1">Amount to pay: <strong className="text-textWhite text-xl">₹{bookingDetails.price}</strong></p>
        </div>

        {/* Payment Methods Selection */}
        <div className="space-y-4 mb-8">
          <label className="block text-sm font-bold text-textWhite">Select Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            {paymentOptions.map(option => (
              <button
                key={option.id}
                onClick={() => {
                  setPaymentMethod(option.id);
                  setSubMethod('');
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
                  paymentMethod === option.id
                    ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                    : 'bg-bgDark border-borderColor text-textGray hover:border-gray-500'
                }`}
              >
                {option.icon}
                <span className="mt-2 text-sm font-bold">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic UI based on selected method */}
        <div className="mb-8">
          {paymentMethod === 'Pay at Venue' ? (
            <div className="bg-bgDark p-6 rounded-xl border border-borderColor text-center">
              <MapPin size={32} className="mx-auto text-primary mb-3" />
              <h3 className="text-textWhite font-bold mb-2">Pay at Venue</h3>
              <p className="text-sm text-textGray">You will pay the total amount of ₹{bookingDetails.price} when you arrive at the ground.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-textWhite mb-2">Select {paymentMethod} Option</label>
              <div className="space-y-2">
                {subOptions[paymentMethod]?.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSubMethod(option.id)}
                    className={`flex items-center gap-3 w-full p-4 rounded-xl border transition-all duration-200 ${
                      subMethod === option.id
                        ? 'bg-primary/10 border-primary text-primary shadow-[0_0_10px_rgba(34,197,94,0.1)]'
                        : 'bg-bgDark border-borderColor text-textGray hover:border-gray-500'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${subMethod === option.id ? 'bg-primary/20 text-primary' : 'bg-bgDark border border-borderColor text-textGray'}`}>
                      {option.icon}
                    </div>
                    <span className="font-bold text-sm">{option.label}</span>
                    {subMethod === option.id && <CheckCircle size={18} className="ml-auto text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button 
          variant="primary" 
          className="w-full py-4 text-lg font-bold shadow-lg flex items-center justify-center gap-2" 
          onClick={handlePayment}
          disabled={isProcessing || (paymentMethod !== 'Pay at Venue' && !subMethod)}
        >
          {isProcessing 
            ? 'Processing...' 
            : paymentMethod === 'Pay at Venue' 
              ? 'Confirm Booking' 
              : `Pay ₹${bookingDetails.price}`
          }
        </Button>
      </div>
    </div>
  );
}
