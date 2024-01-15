import { useState } from 'react';
import { DateValueType } from 'react-tailwindcss-datepicker';
import useBookingStore from '@/store/booking';
import { Booking, Property } from '@/types';
import DateRange from '@/components/DateRange/DateRange';
import moment from 'moment';

type Props = {
  dateRange: DateValueType;
  property: Property;
  onConfirm: (property: Property, dateRange: DateValueType) => void;
  onCancel: () => void;
  booking?: Booking;
};

const BookingDialog: React.FC<Props> = ({
  dateRange,
  property,
  onConfirm,
  onCancel,
  booking,
}) => {
  const [selectedDates, setSelectedDates] = useState<DateValueType>(dateRange);
  const { bookings } = useBookingStore();

  const disabledDates = bookings
    .filter(b => b.propertyId === property.id && b.id !== booking?.id)
    .map(b => ({
      startDate: moment(b.start).format('YYYY-MM-DD'),
      endDate: moment(b.end).format('YYYY-MM-DD'),
    }));

  const handleDateChange = (value: DateValueType) => {
    setSelectedDates(value);
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex h-dvh w-dvw items-center justify-center bg-slate-800 bg-opacity-80">
      <div className="w-4/5 rounded-xl bg-gray-100 shadow-lg md:w-[488px] dark:bg-gray-800">
        <div
          className="h-48 w-full rounded-t-xl bg-cover bg-center bg-no-repeat md:h-72"
          style={{
            backgroundImage: `url(src/assets/${
              property.image || 'no-image.jpg'
            })`,
          }}
        />
        <div className="p-4">
          <p className="text-xl font-normal">
            {!!booking && 'Editing "'}
            {property.name}
            {!!booking && '" reservation'}
          </p>
          <p className="mt-2 font-normal text-slate-500">
            {property.description}
          </p>
          <div className="mt-4 flex items-center gap-x-4 text-nowrap">
            Date:{' '}
            <DateRange
              value={dateRange}
              onChange={handleDateChange}
              disabledDates={disabledDates}
              direction="up"
            />
          </div>
          <div className="mt-6 flex justify-end gap-x-4">
            <button
              className="h-8 rounded bg-green-800 px-4 text-white hover:bg-green-900"
              onClick={() => onConfirm(property, selectedDates)}
            >
              Confirm
            </button>
            <button
              className="h-8 rounded bg-red-800 px-4 text-white hover:bg-red-900"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDialog;
