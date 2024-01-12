import moment from 'moment';
import { areIntervalsOverlapping } from 'date-fns';

export function isDateRangeOverlapping(
  start1: string | Date,
  end1: string | Date,
  start2: string | Date,
  end2: string | Date,
) {
  const interval1 = {
    start: moment(start1).toDate(),
    end: moment(end1).toDate(),
  };
  const interval2 = {
    start: moment(start2).toDate(),
    end: moment(end2).toDate(),
  };

  return areIntervalsOverlapping(interval1, interval2);
}
