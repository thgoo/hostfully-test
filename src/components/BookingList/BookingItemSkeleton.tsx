import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useThemeStore from '@/store/theme';

const BookingItemSkeleton = () => {
  const { theme } = useThemeStore();

  return (
    <SkeletonTheme
      baseColor={theme === 'light' ? '#d1d5db' : '#374151'}
      highlightColor={theme === 'light' ? '#c1c5cb' : '#4b5563'}
    >
      <div
        className="flex h-56 gap-x-6 overflow-hidden rounded-xl bg-gray-200 shadow-lg dark:bg-gray-800"
        data-testid="booking-item-skeleton"
      >
        <div className="h-full w-72 leading-none">
          <Skeleton width="100%" height="100%" borderRadius={0} />
        </div>
        <div className="flex flex-col py-4">
          <p className="mb-2 text-3xl">
            <Skeleton width="160px" />
          </p>
          <Skeleton width="320px" />
          <Skeleton width="180px" />
          <div className="mt-auto">
            <Skeleton height="28px" width="80px" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default BookingItemSkeleton;
