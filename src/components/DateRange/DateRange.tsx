import moment from 'moment';
import { useState } from 'react';
import Datepicker, {
  DateRangeType,
  DateValueType,
} from 'react-tailwindcss-datepicker';

type Props = {
  onChange: (value: DateValueType) => void;
  value?: DateValueType;
  disabledDates?: DateRangeType[];
};

const DateRange: React.FC<Props> = ({
  onChange,
  disabledDates,
  value: initialValue,
}) => {
  const [value, setValue] = useState<DateValueType>(
    initialValue || {
      startDate: null,
      endDate: null,
    },
  );

  const handleValueChange = (newValue: DateValueType) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Datepicker
      value={value}
      onChange={handleValueChange}
      separator="to"
      placeholder="Select a start and end date"
      minDate={moment().toDate()}
      disabledDates={disabledDates}
    />
  );
};

export default DateRange;
