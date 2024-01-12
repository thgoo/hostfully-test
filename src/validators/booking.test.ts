import moment from 'moment';
import { isPropertyAvailable } from '@/validators/booking';
import properties from '@/mocks/properties.json';
import bookings from '@/mocks/bookings.json';

describe('validators/booking', () => {
  it('interval b ends in interval a', () => {
    const property = properties[0]; // id 1
    const bookingsWithDate = bookings.map(booking => ({
      ...booking,
      start: moment(booking.start).toDate(),
      end: moment(booking.end).toDate(),
    }));
    const start = moment('2024-01-13');
    const end = start.clone().add(3, 'days');
    const dateRange = { startDate: start.toDate(), endDate: end.toDate() };

    const result = isPropertyAvailable(property, bookingsWithDate, dateRange);

    expect(result).toBe(false);
  });

  it('interval a in interval b', () => {
    const property = properties[0];
    const bookingsWithDate = bookings.map(booking => ({
      ...booking,
      start: moment(booking.start).toDate(),
      end: moment(booking.end).toDate(),
    }));
    const start = moment('2024-01-14');
    const end = start.clone().add(8, 'days');
    const dateRange = { startDate: start.toDate(), endDate: end.toDate() };

    const result = isPropertyAvailable(property, bookingsWithDate, dateRange);

    expect(result).toBe(false);
  });

  it('interval b in interval a', () => {
    const property = properties[0];
    const bookingsWithDate = bookings.map(booking => ({
      ...booking,
      start: moment(booking.start).toDate(),
      end: moment(booking.end).toDate(),
    }));
    const start = moment('2024-01-16');
    const end = start.clone().add(2, 'days');
    const dateRange = { startDate: start.toDate(), endDate: end.toDate() };

    const result = isPropertyAvailable(property, bookingsWithDate, dateRange);

    expect(result).toBe(false);
  });

  it('interval b starts in interval a', () => {
    const property = properties[0];
    const bookingsWithDate = bookings.map(booking => ({
      ...booking,
      start: moment(booking.start).toDate(),
      end: moment(booking.end).toDate(),
    }));
    const start = moment('2024-01-17');
    const end = start.clone().add(9, 'days');
    const dateRange = { startDate: start.toDate(), endDate: end.toDate() };

    const result = isPropertyAvailable(property, bookingsWithDate, dateRange);

    expect(result).toBe(false);
  });

  it('no overlapping', () => {
    const property = properties[0];
    const bookingsWithDate = bookings.map(booking => ({
      ...booking,
      start: moment(booking.start).toDate(),
      end: moment(booking.end).toDate(),
    }));
    const start = moment('2024-01-10');
    const end = start.clone().add(5, 'days');
    const dateRange = { startDate: start.toDate(), endDate: end.toDate() };

    const result = isPropertyAvailable(property, bookingsWithDate, dateRange);

    expect(result).toBe(true);
  });
});
