import { Property } from '@/types';

type Props = {
  property: Property & { isBooked: boolean };
  onClick: () => void;
};

const PropertyItem: React.FC<Props> = ({ property, onClick }) => {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-3xl bg-gray-200 pb-24 text-sm shadow-lg transition duration-300 ease-in-out hover:shadow-xl dark:bg-gray-800${
        property.isBooked ? ' pointer-events-none' : ''
      }`}
    >
      {property.isBooked && (
        <div className="absolute left-0 top-0 z-[1] flex h-full w-full flex-col items-center justify-center bg-gray-200 opacity-85 dark:bg-gray-900">
          <p className="mb-4 text-4xl">Unavailable</p>
          <p className="">Please, change the selected dates</p>
        </div>
      )}
      <div className="h-48 overflow-hidden">
        <div
          className="h-48 w-full bg-cover bg-center bg-no-repeat transition duration-300 group-hover:scale-105"
          role="img"
          style={{
            backgroundImage: `url(src/assets/${
              property.image || 'no-image.jpg'
            })`,
          }}
        />
      </div>
      <div className="p-4 text-left">
        <p className="text-xl font-normal">{property.name}</p>
        <p className="mt-2 font-normal text-slate-500">
          {property.description}
        </p>
        <div className="absolute bottom-4 left-0 w-full px-4 text-3xl font-thin">
          <div aria-label={`$${property.price.toFixed(2)}/day`}>
            ${property.price.toFixed(2)}
            <span className="text-base">/night</span>
          </div>
          <button
            type="button"
            className="ml-auto h-8 rounded bg-green-700 px-4 text-base font-normal text-white hover:bg-green-800"
            onClick={onClick}
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyItem;
