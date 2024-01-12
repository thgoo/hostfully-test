import { Booking, Property } from '@/types';
import { DateValueType } from 'react-tailwindcss-datepicker';
import { isDateRangeOverlapping } from './date';

export function isPropertyAvailable(
  property: Property,
  bookings: Booking[],
  dateRange: DateValueType,
) {
  const propertyBookings = bookings.filter(
    booking => booking.propertyId === property.id,
  );

  return !propertyBookings.some(booking => {
    const bookingStartDate = booking.start;
    const bookingEndDate = booking.end;
    const startDate = dateRange?.startDate as Date;
    const endDate = dateRange?.endDate as Date;

    return isDateRangeOverlapping(
      bookingStartDate,
      bookingEndDate,
      startDate,
      endDate,
    );
  });
}
