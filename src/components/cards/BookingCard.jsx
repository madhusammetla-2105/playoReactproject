import { Calendar, Clock, CreditCard } from 'lucide-react';

export default function BookingCard({ booking, groundName, onCancel, showCancel = false }) {
  const isCancelled = booking.status === 'cancelled';

  return (
    <div className={`bg-cardBg p-5 rounded-2xl border ${isCancelled ? 'border-red-900/50 opacity-70' : 'border-gray-800 shadow-lg'}`}>
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xl font-bold text-textWhite">{groundName || "Ground Booking"}</h4>
        <span className={`text-xs px-3 py-1.5 rounded-full font-bold ${isCancelled ? 'bg-red-900/30 text-red-400' : 'bg-primary/20 text-primary'}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>
      <div className="space-y-3 text-sm text-textGray mb-5 bg-bgDark p-4 rounded-xl border border-gray-800/50">
        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-primary/70" />
          <span className="font-medium">{booking.date || "TBD"}</span>
        </div>
        <div className="flex items-start gap-3">
          <Clock size={18} className="text-primary/70 mt-0.5" />
          <span className="font-medium leading-relaxed">{booking.time || "TBD"}</span>
        </div>
        <div className="flex items-center gap-3">
          <CreditCard size={18} className="text-primary/70" />
          <span className="font-medium text-textWhite">
            {booking.paymentMethod ? `Paid via ${booking.paymentMethod}` : 'Standard Payment'}
          </span>
        </div>
        <div className="pt-3 mt-3 border-t border-gray-800 flex justify-between items-center text-textWhite font-bold text-base">
          <span>Total Amount:</span>
          <span className="text-primary text-lg">₺{booking.totalPrice || 0}</span>
        </div>
      </div>
      
      {showCancel && !isCancelled && (
        <button 
          onClick={() => onCancel(booking.id)}
          className="w-full mt-2 py-3 text-sm font-bold text-red-400 border border-red-900/50 rounded-xl hover:bg-red-900/20 transition-colors"
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
}
