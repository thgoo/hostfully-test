import { render, screen, waitFor } from '@testing-library/react';
import PropertyList from './PropertyList';
import { Property } from '@/types';
import useProperties from '@/hooks/useProperties';

vi.mock('@/hooks/useProperties');

describe('PropertyList', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders without crashing when no data or errors are present', () => {
    vi.mocked(useProperties).mockReturnValue({
      properties: undefined,
      error: null,
      isLoading: false,
    });
    render(<PropertyList />);
  });

  it('displays the error state when there is an error', async () => {
    const mockError = new Error('An error occurred');
    vi.mocked(useProperties).mockReturnValue({
      properties: undefined,
      error: mockError,
      isLoading: false,
    });
    render(<PropertyList />);
    expect(await screen.findByText(`${mockError.message}`)).toBeInTheDocument();
  });

  it('displays the loading state', () => {
    vi.mocked(useProperties).mockReturnValue({
      properties: undefined,
      error: null,
      isLoading: true,
    });
    render(<PropertyList />);
    expect(screen.getAllByTestId('property-item-skeleton')).toHaveLength(4);
  });

  it('renders properties when data is available', async () => {
    const mockProperties: (Property & { isBooked: boolean })[] = [
      {
        id: 1,
        name: 'Sunset Villa',
        description:
          'Luxurious villa with private pool and breathtaking sunset views.',
        price: 180,
        image: 'facade-x1.jpg',
        isBooked: false,
      },
      {
        id: 2,
        name: 'Oceanview Estate',
        description:
          'Spacious estate overlooking the ocean, perfect for large gatherings. with some random text to make it bigger',
        price: 175,
        image: 'facade-x2.jpg',
        isBooked: true,
      },
      {
        id: 3,
        name: 'Whispering Pines Cabin',
        description:
          'Cozy cabin nestled among the pines, ideal for a serene getaway.',
        price: 200,
        image: 'facade-x3.jpg',
        isBooked: false,
      },
    ];
    vi.mocked(useProperties).mockReturnValue({
      properties: mockProperties,
      error: null,
      isLoading: false,
    });
    render(<PropertyList />);
    await waitFor(() => {
      mockProperties.forEach(property => {
        expect(screen.getByText(property.name)).toBeInTheDocument();
      });
    });
  });
});
