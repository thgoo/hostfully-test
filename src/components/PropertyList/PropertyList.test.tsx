import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PropertyList from './PropertyList';
import { Property } from '@/types';
import useProperties from '@/hooks/useProperties';
import properties from '@/mocks/properties.json';
import { ToastContainer } from 'react-toastify';

vi.mock('@/hooks/useProperties');

describe('PropertyList', () => {
  const mockedProperties: (Property & { isBooked: boolean })[] = properties.map(
    property => ({
      ...property,
      isBooked: property.id === 2,
    }),
  );

  it('renders without crashing when no data or errors are present', () => {
    vi.mocked(useProperties).mockReturnValue({
      properties: [],
      error: null,
      isLoading: false,
    });
    render(<PropertyList />);
    expect(
      screen.getByText(
        "Looks like there aren't any properties yet. Please check back later.",
      ),
    ).toBeInTheDocument();
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
    vi.mocked(useProperties).mockReturnValue({
      properties: mockedProperties,
      error: null,
      isLoading: false,
    });
    render(<PropertyList />);
    await waitFor(() => {
      mockedProperties.forEach(property => {
        expect(screen.getByText(property.name)).toBeInTheDocument();
      });
    });
  });

  it('handles property booking', async () => {
    render(
      <div>
        <PropertyList
          filterBy={{
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-02-02'),
          }}
        />
        <ToastContainer />
      </div>,
    );

    fireEvent.click(screen.getAllByText('Book now')[0]);
    fireEvent.click(await screen.findByText('Confirm'));
    expect(await screen.findByText('Booking confirmed!')).toBeInTheDocument();
  });

  it('handles property already booked', async () => {
    render(
      <div>
        <PropertyList
          filterBy={{
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-02-02'),
          }}
        />
        <ToastContainer />
      </div>,
    );

    fireEvent.click(screen.getAllByText('Book now')[0]);
    fireEvent.click(await screen.findByText('Confirm'));
    expect(
      await screen.findByText(
        'Oops, looks like this property is not available. Please change your dates.',
      ),
    ).toBeInTheDocument();
  });
});
