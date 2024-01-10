import { render, screen, waitFor } from '@testing-library/react';
import PropertyList from './PropertyList';
import { Property } from '@/types';
import useFetch from '@/hooks/useFetch';

vi.mock('@/hooks/useFetch');

describe('PropertyList', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders without crashing when no data or errors are present', () => {
    vi.mocked(useFetch<Property[]>).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
    });
    render(<PropertyList />);
  });

  it('displays the error state when there is an error', async () => {
    const mockError = new Error('An error occurred');
    vi.mocked(useFetch<Property[]>).mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
    });
    render(<PropertyList />);
    expect(
      await screen.findByText(`Error: ${mockError.message}`),
    ).toBeInTheDocument();
  });

  it('displays the loading state', () => {
    vi.mocked(useFetch<Property[]>).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    render(<PropertyList />);
    expect(screen.getAllByTestId('property-item-skeleton')).toHaveLength(4);
  });

  it('renders properties when data is available', async () => {
    const mockProperties: Property[] = [
      {
        id: 1,
        name: 'Sunset Villa',
        description:
          'Luxurious villa with private pool and breathtaking sunset views.',
        price: 180,
        image: 'facade-x1.jpg',
      },
      {
        id: 2,
        name: 'Oceanview Estate',
        description:
          'Spacious estate overlooking the ocean, perfect for large gatherings. with some random text to make it bigger',
        price: 175,
        image: 'facade-x2.jpg',
      },
      {
        id: 3,
        name: 'Whispering Pines Cabin',
        description:
          'Cozy cabin nestled among the pines, ideal for a serene getaway.',
        price: 200,
        image: 'facade-x3.jpg',
      },
    ];
    vi.mocked(useFetch<Property[]>).mockReturnValue({
      data: mockProperties,
      error: undefined,
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
