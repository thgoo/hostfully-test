import Logo from '@/assets/logo-hostfully.svg?react';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import UserMenu from '../UserMenu/UserMenu';
import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  header?: React.ReactNode;
  title?: string;
};

const Page: React.FC<Props> = ({ header, children, title }) => (
  <div>
    <div className="scroll-shadow sticky top-0 z-10 bg-gray-100 p-6 leading-none dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex h-16 items-center justify-between">
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
        {header || null}
      </div>
    </div>
    <div className="mx-auto max-w-7xl p-6">
      {!!title && <h1 className="mb-4 text-3xl">{title}</h1>}
      {children}
    </div>
  </div>
);

export default Page;
