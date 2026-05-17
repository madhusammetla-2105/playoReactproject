import { createContext, useState, useEffect, useContext } from 'react';
import { bookingService } from '../services/bookingService';
import { AuthContext } from './AuthContext';

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadAllBookings();
  }, []);

  useEffect(() => {
    if (user) {
      loadUserBookings();
    } else {
      setBookings([]);
    }
  }, [user]);

  const loadUserBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingService.getUserBookings(user.id);
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadAllBookings = async () => {
    try {
      const data = await bookingService.getAllBookings();
      setAllBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const createBooking = async (bookingData) => {
    const newBooking = await bookingService.createBooking({
      ...bookingData,
      userId: user.id
    });
    setBookings(prev => [...prev, newBooking]);
    setAllBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  const cancelBooking = async (bookingId) => {
    await bookingService.cancelBooking(bookingId);
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
    setAllBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
  };

  return (
    <BookingContext.Provider value={{ bookings, allBookings, loading, createBooking, cancelBooking, loadUserBookings, loadAllBookings }}>
      {children}
    </BookingContext.Provider>
  );
}
