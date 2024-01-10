import { Booking } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type BookingState = {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  deleteBooking: (bookingId: number) => void;
};

const useBookingStore = create(
  persist<BookingState>(
    set => ({
      bookings: [],
      addBooking: booking =>
        set(state => ({
          bookings: [...state.bookings, booking],
        })),
      deleteBooking: bookingId =>
        set(state => ({
          bookings: state.bookings.filter(b => b.id !== bookingId),
        })),
    }),
    {
      name: 'booking-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useBookingStore;
