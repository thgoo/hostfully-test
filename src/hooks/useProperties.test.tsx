import { renderHook, waitFor } from '@testing-library/react';
import { Property } from '@/types';
import useProperties from '@/hooks/useProperties';
import PropertyService from '@/services/PropertyService';
import propertiesMock from '@/mocks/properties.json';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useBookingStore from '@/store/booking';

vi.mock('@/services/PropertyService');
vi.mock('@/store/booking');

type WrapperProps = {
  children: React.ReactNode;
};

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
  deleteBooking: vi.fn(),
  editBooking: vi.fn(),
});

describe('useProperties', () => {
  const mockGetProperties = vi.fn();
  const properties: Property[] = propertiesMock;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const wrapper = ({ children }: WrapperProps) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    vi.mocked(PropertyService).mockImplementation(() => ({
      getProperties: mockGetProperties,
      getPropertyById: vi.fn(),
    }));
    mockGetProperties.mockResolvedValue(properties);
  });

  it('fetches properties without filter', async () => {
    const { result } = renderHook(() => useProperties(), { wrapper });
    await waitFor(() => {
      expect(result.current.properties).toEqual(properties.map(property => ({ ...property, isBooked: false })));
    });
  });

  it('fetches properties with filter', async () => {
    const filterBy = {
      startDate: new Date('2024-01-14'),
      endDate: new Date('2024-01-18'),
    };
    const { result } = renderHook(() => useProperties(filterBy), { wrapper });
    await waitFor(() => {
      expect(result.current.properties).toEqual(
        properties.map(property => ({ ...property, isBooked: property.id === 1 })),
      );
    });
  });
});
