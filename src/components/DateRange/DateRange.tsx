import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Datepicker, {
  DateRangeType,
  DateValueType,
} from 'react-tailwindcss-datepicker';

type Props = {
  onChange: (value: DateValueType) => void;
  value?: DateValueType;
  disabledDates?: DateRangeType[];
  direction?: 'up' | 'down';
};

const DateRange: React.FC<Props> = ({
  onChange,
  disabledDates,
  value: initialValue,
  direction,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const parentElement = parentRef.current;
    if (parentElement) {
      const input = parentElement.querySelector('input');
      input?.addEventListener('focus', () => {
        input.blur();
      });
    }

    return () => {
      if (parentElement) {
        const input = parentElement.querySelector('input');
        input?.removeEventListener('focus', () => {
          input.blur();
        });
      }
    };
  }, []);

  return (
    <div ref={parentRef}>
      <Datepicker
        value={value}
        onChange={handleValueChange}
        separator="to"
        placeholder="Select a start and end date"
        minDate={moment().toDate()}
        disabledDates={disabledDates}
        popoverDirection={direction}
      />
    </div>
  );
};

export default DateRange;
