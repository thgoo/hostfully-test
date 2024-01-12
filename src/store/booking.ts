import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { createJSONStorage, persist } from 'zustand/middleware';
import { DateValueType } from 'react-tailwindcss-datepicker';
import { Booking } from '@/types';
import moment from 'moment';

type BookingState = {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  deleteBooking: (bookingId: string) => void;
  editBooking: (bookingId: string, newDates: DateValueType) => void;
};

const useBookingStore = create(
  persist<BookingState>(
    set => ({
      bookings: [],
      addBooking: booking =>
        set(state => ({
          bookings: [
            ...state.bookings,
            {
              ...booking,
              id: uuidv4(),
            },
          ],
        })),
      editBooking: (bookingId, newDates) =>
        set(state => {
          const bookingIndex = state.bookings.findIndex(
            b => b.id === bookingId,
          );
          const updatedBooking = {
            ...state.bookings[bookingIndex],
            start: moment(newDates?.startDate).toDate(),
            end: moment(newDates?.endDate).toDate(),
          } as Booking;
          const updatedState = [...state.bookings];
          updatedState.splice(
            updatedState.findIndex(b => b.id === bookingId),
            1,
            updatedBooking,
          );
          return {
            bookings: updatedState,
          };
        }),
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
