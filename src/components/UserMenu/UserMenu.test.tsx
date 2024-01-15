import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserMenu from '@/components/UserMenu/UserMenu';

describe('UserMenu', () => {
  it('renders menu items with correct links', () => {
    render(<UserMenu />, { wrapper: BrowserRouter });
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(2);
    expect(menuItems[0]).toHaveAttribute('href', '/');
    expect(menuItems[1]).toHaveAttribute('href', '/bookings');
  });
});
