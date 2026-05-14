import { v4 as uuidv4 } from 'uuid';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const bookingService = {
  createBooking: async (bookingData) => {
    await delay(800);
    const newBooking = {
      ...bookingData,
      id: uuidv4(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));
    
    return newBooking;
  },

  getUserBookings: async (userId) => {
    await delay(500);
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return existingBookings.filter(b => b.userId === userId);
  },

  cancelBooking: async (bookingId) => {
    await delay(600);
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = existingBookings.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled' } : b
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    return true;
  }
};
