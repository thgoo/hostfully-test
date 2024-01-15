import { useState } from 'react';
import { toast } from 'react-toastify';
import { BookingWithProperty, Property } from '@/types';
import useBookingStore from '@/store/booking';
import BookingDialog from '@/components/BookingDialog/BookingDialog';
import { DateValueType } from 'react-tailwindcss-datepicker';

type Props = {
  booking: BookingWithProperty;
};

const BookingItem = ({ booking }: Props) => {
  const [isCanceling, setIsCanceling] = useState(false);
  const [editingBooking, setEditingBooking] = useState<BookingWithProperty>();
  const { deleteBooking, editBooking } = useBookingStore();

  const handleDeleteBooking = (id: string) => {
    deleteBooking(id);
    toast.success('Booking canceled!');
  };

  const handleConfirmBooking = (bookingId: string, newDates: DateValueType) => {
    editBooking(bookingId, newDates);
    setEditingBooking(undefined);
    toast.success('Booking updated!');
  };

  return (
    <div className="flex flex-col gap-x-6 overflow-hidden rounded-xl bg-gray-200 shadow-lg md:h-56 md:flex-row dark:bg-gray-800">
      <div
        className="h-60 bg-cover bg-center pr-72 md:h-full"
        style={{
          backgroundImage: `url(src/assets/${
            booking?.property?.image || 'no-image.jpg'
          })`,
        }}
      />
      <div className="flex flex-col px-4 py-6 md:px-0 md:py-4">
        <p className="mb-4 text-3xl md:mb-2">{booking.property.name}</p>
        <p>
          <strong>Period:</strong>{' '}
          {booking.start.toLocaleDateString('en', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          })}{' '}
          to{' '}
          {booking.end.toLocaleDateString('en', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          })}{' '}
          ({booking.nights} night{booking.nights > 1 ? 's' : ''})
        </p>
        <p>
          <strong>Check-in</strong>: from 2 PM onwards
        </p>
        <p>
          <strong>Check-out</strong>: by 12 PM (noon)
        </p>
        {isCanceling ? (
          <div className="mt-6 flex gap-x-4 text-red-600 md:mt-auto">
            Are you sure you want to cancel this booking?
            <button
              className="w-20 rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
              onClick={() => handleDeleteBooking(booking.id)}
            >
              Yes
            </button>
            <button
              className="w-20 rounded bg-gray-500 px-2 py-1 text-sm text-white hover:bg-gray-600"
              onClick={() => setIsCanceling(false)}
            >
              No
            </button>
          </div>
        ) : (
          <div className="mt-6 flex gap-x-4 md:mt-auto">
            <button
              className="w-20 rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
              onClick={() => setEditingBooking(booking)}
            >
              Edit
            </button>
            <button
              className="w-20 rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
              onClick={() => setIsCanceling(true)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {editingBooking && (
        <BookingDialog
          booking={editingBooking}
          property={editingBooking?.property as Property}
          dateRange={{
            startDate: editingBooking?.start as Date,
            endDate: editingBooking?.end as Date,
          }}
          onConfirm={(_, selectedDates) =>
            handleConfirmBooking(editingBooking.id, selectedDates)
          }
          onCancel={() => setEditingBooking(undefined)}
        />
      )}
    </div>
  );
};

export default BookingItem;
