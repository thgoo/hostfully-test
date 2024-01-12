import moment from 'moment';
import { Booking, Property } from '@/types';
import PropertyService from '@/services/PropertyService';

export const fetchBookingsWithProperties = async (bookings: Booking[]) => {
  const propertyService = new PropertyService();
  const properties = await Promise.all(bookings.map(booking => propertyService.getPropertyById(booking.propertyId)));

  return bookings.map(booking => ({
    ...booking,
    start: moment(booking.start).toDate(),
    end: moment(booking.end).toDate(),
    nights: Math.ceil((moment(booking.end).unix() - moment(booking.start).unix()) / (3600 * 24)),
    property: properties.find(property => property.id === booking.propertyId) as Property,
  }));
};
