import { useState } from 'react';
import { DateValueType } from 'react-tailwindcss-datepicker';
import { Property } from '@/types';
import Alert from '@/components/Alert/Alert';
import BookingDialog from '@/components/BookingDialog/BookingDialog';
import PropertyItem from '@/components/PropertyList/PropertyItem';
import PropertyItemSkeleton from '@/components/PropertyList/PropertyItemSkeleton';
import useProperties from '@/hooks/useProperties';
import useBookingStore from '@/store/booking';
import { isPropertyAvailable } from '@/validators/booking';
import toast from 'react-hot-toast';

type Props = {
  filterBy?: DateValueType;
};

const PropertyList: React.FC<Props> = ({ filterBy }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property>();
  const { bookings, addBooking } = useBookingStore();
  const { properties, isLoading, error } = useProperties(filterBy);

  const handlePropertyClick = (propertyId: number) => {
    setSelectedProperty(properties?.find(p => p.id === propertyId));
  };

  const handleBookingConfirmation = (
    property: Property,
    dateRange: DateValueType,
  ) => {
    if (isPropertyAvailable(property, bookings, dateRange)) {
      addBooking({
        propertyId: property.id,
        start: dateRange?.startDate as Date,
        end: dateRange?.endDate as Date,
      });
      setSelectedProperty(undefined);
      toast.success('Booking confirmed!');
    }
  };

  const handleBookingCancel = () => {
    setSelectedProperty(undefined);
  };

  if (error) return <Alert title="Oops" message={error.message} type="error" />;

  if (properties?.length === 0 && !isLoading) {
    return (
      <Alert
        type="neutral"
        title="No properties yet"
        message="Looks like there aren't any properties yet. Please check back later."
      />
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? [...Array(4)].map((_, i) => (
              <li key={i}>
                <PropertyItemSkeleton />
              </li>
            ))
          : properties
              ?.sort((p1, p2) => +p1.isBooked - +p2.isBooked)
              .map(property => (
                <li key={property.id}>
                  <PropertyItem
                    property={property}
                    onClick={() => handlePropertyClick(property.id)}
                  />
                </li>
              ))}
      </ul>
      {selectedProperty && (
        <BookingDialog
          onConfirm={handleBookingConfirmation}
          onCancel={handleBookingCancel}
          property={selectedProperty}
          dateRange={filterBy as DateValueType}
        />
      )}
    </>
  );
};

export default PropertyList;
