import PropertyList from '@/components/PropertyList/PropertyList';
import Page from '@/components/Page/Page';
import DateRange from '@/components/DateRange/DateRange';
import { DateValueType } from 'react-tailwindcss-datepicker';
import { useState } from 'react';

const HomePage = () => {
  const [selectedDates, setSelectedDates] = useState<DateValueType>();
  const handleDateRangeChange = (value: DateValueType) => {
    setSelectedDates(value);
  };

  return (
    <Page>
      <div className="mx-auto mb-6 w-96">
        <DateRange onChange={handleDateRangeChange} />
      </div>
      {!selectedDates?.endDate || !selectedDates?.startDate ? (
        <p className="mt-20 text-center text-5xl font-thin">
          Select the dates to start.
        </p>
      ) : (
        <>
          <p className="mb-4 text-center text-3xl font-thin">
            Showing properties for the selected dates.
          </p>
          <PropertyList filterBy={selectedDates} />
        </>
      )}
    </Page>
  );
};

export default HomePage;
