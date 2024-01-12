import Logo from '@/assets/logo-hostfully.svg?react';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import UserMenu from '../UserMenu/UserMenu';
import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  title?: string;
};

const Page: React.FC<Props> = ({ children, title }) => (
  <div className="mx-auto max-w-7xl p-5">
    <div className="mb-14 flex w-full items-center justify-between leading-none">
      <div className="w-36">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center gap-x-4">
        <ThemeToggler />
        <UserMenu />
      </div>
    </div>
    {!!title && <h1 className="mb-4 text-3xl">{title}</h1>}
    {children}
  </div>
);

export default Page;
