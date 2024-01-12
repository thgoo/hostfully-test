import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor, screen } from '@testing-library/react';
import useBookingStore from '@/store/booking';
import BookingList from '@/components/BookingList/BookingList';
import { fetchBookingsWithProperties } from '@/components/BookingList/bookingUtils';

vi.mock('@/store/booking');
vi.mock('@/components/BookingList/bookingUtils');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('BookingList', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    vi.clearAllMocks();
  });

  it('renders loading state', async () => {
    vi.mocked(useBookingStore).mockReturnValue({ bookings: [] });
    vi.mocked(fetchBookingsWithProperties).mockReturnValue(new Promise(resolve => resolve([])));

    render(
      <QueryClientProvider client={queryClient}>
        <BookingList />
      </QueryClientProvider>,
    );
    expect(screen.getByTestId('booking-item-skeleton')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    vi.mocked(useBookingStore).mockReturnValue({ bookings: [] });
    vi.mocked(fetchBookingsWithProperties).mockReturnValue(new Promise((_, reject) => reject(new Error('Oh no!'))));

    render(
      <QueryClientProvider client={queryClient}>
        <BookingList />
      </QueryClientProvider>,
    );
    await waitFor(() => expect(screen.getByText('Oops')).toBeInTheDocument());
  });

  it('renders empty state', async () => {
    vi.mocked(useBookingStore).mockReturnValue({ bookings: [] });
    vi.mocked(fetchBookingsWithProperties).mockReturnValue(new Promise(resolve => resolve([])));

    render(
      <QueryClientProvider client={queryClient}>
        <BookingList />
      </QueryClientProvider>,
    );
    await waitFor(() => expect(screen.getByText('No bookings')).toBeInTheDocument());
  });
});
