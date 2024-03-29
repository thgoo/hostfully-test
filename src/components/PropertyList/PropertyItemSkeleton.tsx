import useThemeStore from '@/store/theme';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PropertyItemSkeleton: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <SkeletonTheme
      baseColor={theme === 'light' ? '#d1d5db' : '#374151'}
      highlightColor={theme === 'light' ? '#c1c5cb' : '#4b5563'}
    >
      <div
        className="group relative h-full overflow-hidden rounded-3xl bg-gray-200 pb-24 text-sm shadow-lg transition duration-300 ease-in-out hover:shadow-xl dark:bg-gray-800"
        data-testid="property-item-skeleton"
      >
        <div className="h-48 overflow-hidden">
          <div className="h-48 w-full leading-none transition duration-300 group-hover:scale-105">
            <Skeleton width="100%" height="100%" borderRadius={0} />
          </div>
        </div>
        <div className="p-4 text-left">
          <p className="text-xl font-normal">
            <Skeleton width="40%" height="1.25rem" />
          </p>
          <p className="mt-2 font-normal text-slate-500">
            <Skeleton width="100%" height="1rem" />
            <Skeleton width="100%" height="1rem" />
            <Skeleton width="80%" height="1rem" />
          </p>
          <p className="absolute bottom-4 left-4 text-3xl font-thin">
            <Skeleton width="100px" height="2rem" />
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default PropertyItemSkeleton;
