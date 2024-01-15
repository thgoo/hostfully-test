import { render, fireEvent, waitFor } from '@testing-library/react';
import BookingItem from '@/components/BookingList/BookingItem';
import useBookingStore from '@/store/booking';
import { BookingWithProperty } from '@/types';

vi.mock('@/store/booking');

const mockDeleteBooking = vi.fn();
const mockEditBooking = vi.fn();

vi.mocked(useBookingStore).mockReturnValue({
  bookings: [
    {
      id: '086d92d9-9861-4ddf-bc60-760543b7ad29',
      propertyId: 1,
      start: '2024-01-15',
      end: '2024-01-20',
    },
    {
      id: 'c7ec8376-b55f-4404-a4cd-0db84a77417d',
      propertyId: 2,
      start: '2024-01-25',
      end: '2024-01-26',
    },
  ],
  deleteBooking: mockDeleteBooking,
  editBooking: mockEditBooking,
});

describe('BookingItem', () => {
  const booking: BookingWithProperty = {
    id: '086d92d9-9861-4ddf-bc60-760543b7ad29',
    propertyId: 1,
    start: new Date('2024-01-15'),
    end: new Date('2024-01-20'),
    nights: 5,
    property: {
      id: 1,
      name: 'Sunset Villa',
      description: 'Luxurious villa with private pool and breathtaking sunset views.',
      price: 180,
      image: 'facade-x1.jpg',
    },
  };

  it('calls deleteBooking when handleDeleteBooking is called', async () => {
    const { getByText } = render(<BookingItem booking={booking} />);
    fireEvent.click(getByText('Cancel')); // start the deletion
    fireEvent.click(getByText('Yes')); // confirm the deletion
    await waitFor(() => expect(mockDeleteBooking).toHaveBeenCalledWith(booking.id));
  });

  it('calls editBooking when handleConfirmBooking is called', async () => {
    const newDates = {
      endDate: booking.end,
      startDate: booking.start,
    };
    const { getByText } = render(<BookingItem booking={booking} />);
    fireEvent.click(getByText('Edit')); // start the edit
    fireEvent.click(getByText('Confirm')); // confirm the edit
    await waitFor(() => expect(mockEditBooking).toHaveBeenCalledWith(booking.id, newDates)); // Replace newDates with the expected new dates
  });
});
