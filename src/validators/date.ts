import moment from 'moment';

export function checkIfDateRangesOverlap(
  start1: string | Date,
  end1: string | Date,
  start2: string | Date,
  end2: string | Date,
) {
  const startDate1 = moment(start1).toDate();
  const endDate1 = moment(end1).toDate();
  const startDate2 = moment(start2).toDate();
  const endDate2 = moment(end2).toDate();

  return startDate1 <= endDate2 && startDate2 <= endDate1;
}
