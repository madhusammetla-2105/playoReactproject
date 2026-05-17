import { useState } from 'react';
import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { useBookings, useAuth } from '../../hooks/useContexts';
import { CheckCircle, Smartphone, MapPin, CreditCard as CardIcon, Wallet, Landmark, QrCode } from 'lucide-react';
import Button from '../../components/common/Button';

const PAYMENT_OPTIONS = [
  { id: 'Paytm', icon: <Smartphone size={20} />, label: 'Paytm' },
  { id: 'PhonePe', icon: <Smartphone size={20} />, label: 'PhonePe' },
  { id: 'UPI', icon: <QrCode size={20} />, label: 'UPI' },
  { id: 'Pay at Venue', icon: <MapPin size={20} />, label: 'Pay at Venue' }
];

const SUB_OPTIONS = {
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

const sendConfirmationEmail = (user, details, timeStr, method) => {
  const url = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://workflow.ccbp.in/webhook/confirmation-booking-mail';
  if (!url || url === 'YOUR_N8N_WEBHOOK_URL_HERE') return;

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userName: user?.name || user?.email?.split('@')[0] || 'Player',
      userEmail: user?.email,
      groundName: details.groundName,
      date: details.date,
      time: timeStr,
      price: details.price,
      paymentMethod: method,
      bookingId: Math.floor(100000 + Math.random() * 900000).toString()
    }),
  }).catch(console.warn);
};

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

  const bookingDetails = location.state;
  if (!bookingDetails) return <Navigate to={`/grounds/${id}`} replace />;

  const timeStr = bookingDetails.slots.map(s => s.time).join(', ');
  const displayTime = bookingDetails.slots.length > 1
    ? `${bookingDetails.slots[0].time.split(' - ')[0]} to ${bookingDetails.slots[bookingDetails.slots.length - 1].time.split(' - ')[1]}`
    : bookingDetails.slots[0].time;

  const handlePayment = async () => {
    if (paymentMethod !== 'Pay at Venue' && !subMethod) return alert("Please select a specific payment option.");

    setIsProcessing(true);
    await new Promise(res => setTimeout(res, paymentMethod === 'Pay at Venue' ? 500 : 1500));

    try {
      const finalMethod = subMethod || paymentMethod;
      await createBooking({ groundId: id, date: bookingDetails.date, time: timeStr, totalPrice: bookingDetails.price, paymentMethod: finalMethod });
      setIsSuccess(true);
    } catch {
      alert("Something went wrong with the booking. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDone = () => {
    const finalMethod = subMethod || paymentMethod;
    sendConfirmationEmail(user, bookingDetails, timeStr, finalMethod);
    alert(`Email sent to ${user?.email}:\n\nYou have blocked ${displayTime} on ${bookingDetails.date} in ${bookingDetails.groundName}.`);
    navigate('/dashboard', { replace: true });
  };

  if (isSuccess) return (
    <div className="max-w-md mx-auto py-16 px-4 text-center space-y-6">
      <CheckCircle size={48} className="mx-auto text-primary bg-primary/20 p-2 rounded-full w-24 h-24" />
      <h1 className="text-3xl font-bold text-textWhite">Booking Confirmed!</h1>
      <p className="text-textGray">Your booking for {bookingDetails.groundName} has been secured.</p>

      {paymentMethod === 'Pay at Venue' && (
        <div className="bg-bgDark p-4 rounded-xl border border-borderColor mt-4">
          <p className="text-textWhite font-medium">Payment Method: Pay at Venue</p>
          <p className="text-sm text-textGray mt-1">Please pay ₹{bookingDetails.price} at the facility.</p>
        </div>
      )}

      <Button onClick={handleDone} className="w-full py-4 text-lg font-bold mt-8">Done</Button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-cardBg p-8 rounded-3xl border border-borderColor shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-textWhite">Payment Details</h1>
          <p className="text-textGray mt-1">Amount: <strong className="text-textWhite text-xl">₹{bookingDetails.price}</strong></p>
        </div>

        <div className="space-y-4 mb-8">
          <label className="block text-sm font-bold text-textWhite">Select Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            {PAYMENT_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => { setPaymentMethod(opt.id); setSubMethod(''); }}
                className={`flex flex-col items-center p-4 rounded-xl border transition-all ${paymentMethod === opt.id ? 'bg-primary/10 border-primary text-primary' : 'bg-bgDark border-borderColor text-textGray hover:border-gray-500'}`}
              >
                {opt.icon} <span className="mt-2 text-sm font-bold">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          {paymentMethod === 'Pay at Venue' ? (
            <div className="bg-bgDark p-6 rounded-xl border border-borderColor text-center">
              <MapPin size={32} className="mx-auto text-primary mb-3" />
              <h3 className="text-textWhite font-bold mb-2">Pay at Venue</h3>
              <p className="text-sm text-textGray">Pay ₹{bookingDetails.price} when you arrive.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-textWhite mb-2">Select {paymentMethod} Option</label>
              <div className="space-y-2">
                {SUB_OPTIONS[paymentMethod]?.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSubMethod(opt.id)}
                    className={`flex items-center gap-3 w-full p-4 rounded-xl border transition-all ${subMethod === opt.id ? 'bg-primary/10 border-primary text-primary' : 'bg-bgDark border-borderColor text-textGray'}`}
                  >
                    <div className={`p-2 rounded-lg ${subMethod === opt.id ? 'bg-primary/20 text-primary' : 'bg-bgDark border border-borderColor'}`}>{opt.icon}</div>
                    <span className="font-bold text-sm">{opt.label}</span>
                    {subMethod === opt.id && <CheckCircle size={18} className="ml-auto text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          variant="primary"
          className="w-full py-4 text-lg font-bold shadow-lg flex justify-center gap-2"
          onClick={handlePayment}
          disabled={isProcessing || (paymentMethod !== 'Pay at Venue' && !subMethod)}
        >
          {isProcessing ? 'Processing...' : paymentMethod === 'Pay at Venue' ? 'Confirm Booking' : `Pay ₹${bookingDetails.price}`}
        </Button>
      </div>
    </div>
  );
}
