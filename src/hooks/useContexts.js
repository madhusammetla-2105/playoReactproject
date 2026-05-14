import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { GroundContext } from '../context/GroundContext';
import { BookingContext } from '../context/BookingContext';

export const useAuth = () => useContext(AuthContext);
export const useGrounds = () => useContext(GroundContext);
export const useBookings = () => useContext(BookingContext);
