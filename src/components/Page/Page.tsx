import Logo from '@/assets/logo-hostfully.svg?react';
import ThemeToggler from '../ThemeToggler/ThemeToggler';

type Props = {
  children: React.ReactNode;
};

const Page: React.FC<Props> = ({ children }) => (
  <div className="mx-auto max-w-7xl p-5">
    <div className="mb-20 flex w-full justify-between align-middle leading-none">
      <div className="w-36">
        <Logo />
      </div>
      <ThemeToggler />
    </div>
    {children}
  </div>
);

export default Page;
