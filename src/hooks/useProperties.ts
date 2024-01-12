import { DateValueType } from 'react-tailwindcss-datepicker';
import { useQuery } from '@tanstack/react-query';
import PropertyService from '@/services/PropertyService';
import useBookingStore from '@/store/booking';
import { Booking } from '@/types';
import { checkIfDateRangesOverlap } from '@/validators/date';
import moment from 'moment';

const fetchProperties = async (
  bookings: Booking[],
  filterBy?: DateValueType,
) => {
  const propertyServive = new PropertyService();
  const properties = await propertyServive.getProperties();

  if (!filterBy?.startDate || !filterBy.endDate)
    return properties.map(property => ({ ...property, isBooked: false }));

  return properties.map(property => {
    const propertyBookings = bookings.filter(
      booking => booking.propertyId === property.id,
    );

    const isBooked = propertyBookings.some(booking => {
      const bookingStartDate = moment(booking.start).toDate();
      const bookingEndDate = moment(booking.end).toDate();
      const startDate = moment(filterBy.startDate).toDate();
      const endDate = moment(filterBy.endDate).toDate();

      return checkIfDateRangesOverlap(
        bookingStartDate,
        bookingEndDate,
        startDate,
        endDate,
      );
    });

    return {
      ...property,
      isBooked,
    };
  });
};

const useProperties = (filterBy?: DateValueType) => {
  const { bookings } = useBookingStore();
  // react-query is not really needed here since we are getting our data from a local file
  // but it would be useful if we were getting our data from an API.
  // and if we change our servive to get data from an API, we don't need to change anything here
  const { data, isLoading, error } = useQuery({
    queryKey: [
      'properties',
      ...bookings.map(booking => booking.id),
      filterBy?.startDate,
      filterBy?.endDate,
    ],
    queryFn: async () => fetchProperties(bookings, filterBy),
  });

  return {
    properties: data,
    isLoading,
    error,
  };
};

export default useProperties;
