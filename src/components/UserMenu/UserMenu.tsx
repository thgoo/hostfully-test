import { Link } from 'react-router-dom';

const menuItems = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'My bookings',
    link: '/bookings',
  },
];

const UserMenu = () => {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 bg-cover bg-center bg-no-repeat text-2xl font-bold hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
        style={{ backgroundImage: `url(src/assets/user-image.jpeg)` }}
        tabIndex={0}
      />
      <ul
        className="invisible absolute left-[-9999px] right-0 z-10 mt-2 w-56 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none group-focus-within:visible group-focus-within:left-auto dark:bg-gray-800 dark:text-white"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        {menuItems.map(item => (
          <li key={item.name}>
            <Link
              to={item.link}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              role="menuitem"
              tabIndex={0}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserMenu;
