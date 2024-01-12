import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { MockedClass } from 'vitest';
import { fetchBookingsWithProperties } from '@/components/BookingList/bookingUtils';
import PropertyService from '@/services/PropertyService';
import properties from '@/mocks/properties.json';

vi.mock('@/services/PropertyService');

describe('fetchBookingsWithProperties', () => {
  it('should fetch properties for bookings', async () => {
    const mockGetPropertyById = vi.fn().mockResolvedValue(properties[0]);
    (PropertyService as MockedClass<typeof PropertyService>).mockImplementation(() => {
      return {
        getPropertyById: mockGetPropertyById,
        getProperties: vi.fn(),
      };
    });

    const bookings = [
      {
        id: uuidv4(),
        propertyId: 1,
        start: moment().toDate(),
        end: moment().add(2, 'days').toDate(),
      },
    ];

    const result = await fetchBookingsWithProperties(bookings);

    expect(mockGetPropertyById).toHaveBeenCalledWith(1);
    expect(result[0].property).toEqual(properties.find(property => property.id === 1));
    // Add more assertions as needed
  });
});
