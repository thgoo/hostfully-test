import { render, screen } from '@testing-library/react';
import PropertyItem from '@/components/PropertyList/PropertyItem/PropertyItem';

describe('PropertyItem', () => {
  const property = {
    id: 1,
    image: 'test.jpg',
    name: 'Test Property',
    description: 'This is a test property.',
    price: 100,
  };

  it('renders without crashing', () => {
    render(<PropertyItem property={property} />);
  });

  it('displays property details', () => {
    render(<PropertyItem property={property} />);

    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveStyle(
      `backgroundImage: url(src/assets/${property.image})`,
    );
    expect(screen.getByText(property.name)).toBeInTheDocument();
    expect(screen.getByText(property.description)).toBeInTheDocument();
    expect(
      screen.getByLabelText(`$${property.price.toFixed(2)}/day`),
    ).toBeInTheDocument();
  });

  it('displays default image when property image is not provided', () => {
    const property = {
      id: 1,
      name: 'Test Property',
      description: 'This is a test property.',
      price: 100.0,
    };

    render(<PropertyItem property={property} />);

    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveStyle(
      `backgroundImage: url(src/assets/no-image.jpg)`,
    );
  });
});
