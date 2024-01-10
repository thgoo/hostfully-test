import Logo from '@/assets/logo-hostfully.svg?react';

type Props = {
  children: React.ReactNode;
};

const Page: React.FC<Props> = ({ children }) => (
  <div className="mx-auto max-w-7xl p-5">
    <div className="mb-20 w-48 leading-none">
      <Logo />
    </div>
    {children}
  </div>
);

export default Page;
