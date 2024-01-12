import useBookingStore from '@/store/booking';
import { useQuery } from '@tanstack/react-query';
import Alert from '@/components/Alert/Alert';
import BookingItem from '@/components/BookingList/BookingItem';
import BookingItemSkeleton from '@/components/BookingList/BookingItemSkeleton';
import { fetchBookingsWithProperties } from '@/components/BookingList/bookingUtils';

const BookingList = () => {
  const { bookings } = useBookingStore();
  const { data, isLoading, error } = useQuery({
    queryKey: [
      'booking-with-properties',
      ...bookings,
      ...bookings.map(booking => booking.propertyId),
    ],
    queryFn: () => fetchBookingsWithProperties(bookings),
  });

  if (error) return <Alert type="error" title="Oops" message={error.message} />;

  if (isLoading) return <BookingItemSkeleton />;

  if (data?.length === 0) {
    return (
      <Alert
        type="neutral"
        title="No bookings"
        message="Looks like there aren't any bookings yet. Ready to make your first one?"
      />
    );
  }

  return (
    <ul className="flex flex-col gap-y-4">
      {data?.map(booking => (
        <li key={booking.id}>
          <BookingItem booking={booking} />
        </li>
      ))}
    </ul>
  );
};

export default BookingList;
