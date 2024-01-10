import { Property } from '@/types';

type Props = {
  property: Property;
};

const PropertyItem: React.FC<Props> = ({ property }) => {
  return (
    <div
      key={property.id}
      className="group relative overflow-hidden rounded-3xl bg-gray-200 pb-12 text-sm shadow-lg transition duration-300 ease-in-out hover:shadow-xl dark:bg-gray-800"
    >
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
        <p
          className="absolute bottom-4 left-4 text-3xl font-thin"
          aria-label={`$${property.price.toFixed(2)}/day`}
        >
          ${property.price.toFixed(2)}
          <span className="text-base">/day</span>
        </p>
      </div>
    </div>
  );
};

export default PropertyItem;
