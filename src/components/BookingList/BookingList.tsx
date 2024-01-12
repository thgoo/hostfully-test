import useBookingStore from '@/store/booking';
import { useQuery } from '@tanstack/react-query';
import PropertyService from '@/services/PropertyService';
import { Booking, Property } from '@/types';
import Alert from '@/components/Alert/Alert';
import BookingItem from '@/components/BookingList/BookingItem';
import BookingItemSkeleton from './BookingItemSkeleton';
import moment from 'moment';

const fetchBookingsWithProperties = async (bookings: Booking[]) => {
  const propertyService = new PropertyService();
  const properties = await Promise.all(
    bookings.map(booking =>
      propertyService.getPropertyById(booking.propertyId),
    ),
  );

  return bookings.map(booking => ({
    ...booking,
    start: moment(booking.start).toDate(),
    end: moment(booking.end).toDate(),
    nights: Math.ceil(
      (moment(booking.end).unix() - moment(booking.start).unix()) / (3600 * 24),
    ),
    property: properties.find(
      property => property.id === booking.propertyId,
    ) as Property,
  }));
};

const BookingList = () => {
  const { bookings } = useBookingStore();
  const { data, isLoading, error } = useQuery({
    queryKey: [
      'booking-with-properties',
      bookings,
      ...bookings.map(booking => booking.propertyId),
    ],
    queryFn: async () => fetchBookingsWithProperties(bookings),
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
