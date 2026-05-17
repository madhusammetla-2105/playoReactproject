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
  },

  getAllBookings: async () => {
    await delay(300);
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    if (bookings.length === 0) {
      bookings = bookingService.initializeDummyBookings();
    }
    return bookings;
  },

  initializeDummyBookings: () => {
    const dummyBookings = [];
    const grounds = ["1", "2", "3", "4", "5", "6", "10", "31", "34", "36"]; // Selection of popular grounds
    const dates = [
      new Date().toISOString().split('T')[0],
      new Date(Date.now() + 86400000).toISOString().split('T')[0],
      new Date(Date.now() + 172800000).toISOString().split('T')[0]
    ];
    const times = ["06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM", "06:00 PM - 07:00 PM", "08:00 PM - 09:00 PM", "09:00 PM - 10:00 PM"];

    grounds.forEach(groundId => {
      dates.forEach(date => {
        // Randomly add 1-2 bookings per ground per day
        const numBookings = Math.floor(Math.random() * 3);
        for (let i = 0; i < numBookings; i++) {
          const time = times[Math.floor(Math.random() * times.length)];
          dummyBookings.push({
            id: uuidv4(),
            groundId,
            userId: 'dummy-user-' + Math.floor(Math.random() * 1000),
            date,
            time,
            totalPrice: 1200, // Approximate
            status: 'confirmed',
            createdAt: new Date().toISOString(),
            paymentMethod: 'Pre-booked'
          });
        }
      });
    });

    localStorage.setItem('bookings', JSON.stringify(dummyBookings));
    return dummyBookings;
  }
};
