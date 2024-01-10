import PropertyItem from '@/components/PropertyList/PropertyItem/PropertyItem';
import useFetch from '@/hooks/useFetch';
import PropertyService from '@/services/PropertyService';
import PropertyItemSkeleton from './PropertyItem/PropertyItemSkeleton';

const propertyService = new PropertyService();

const PropertyList = () => {
  const {
    data: properties,
    error,
    isLoading,
  } = useFetch(propertyService.getProperties);

  if (error) {
    return <p>{error.toString()}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading
        ? [...Array(4)].map((_, i) => <PropertyItemSkeleton key={i} />)
        : properties?.map(property => (
            <PropertyItem key={property.id} property={property} />
          ))}
    </div>
  );
};

export default PropertyList;
