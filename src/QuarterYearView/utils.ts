import dayjs from 'dayjs';
import { QUARTER_DATE_FORMAT } from '@rgs-ui/date-utils';

import { Quarter } from '../types';

export const dateToQuarter = (arg?: Date): Quarter => {
  const dJDate = dayjs(arg);

  return { quarter: dJDate.quarter(), year: dJDate.year().toString() };
};

export const quarterToDate = (arg: Quarter) => {
  const { quarter, year } = arg;

  return dayjs(year, QUARTER_DATE_FORMAT)
    .quarter(quarter || 1)
    .toDate();
};

export const quarterNormalizer = (value: Quarter[]) => {
  if (value.length < 2) return value;

  const [start, end] = value.slice(0, 2);
  const startDate = quarterToDate(start);
  const endDate = quarterToDate(end);

  if (dayjs(startDate).isAfter(endDate)) return [end, start];

  return [start, end];
};

export const quarterValueToDateValue = (value: Quarter | Quarter[]) => {
  if (Array.isArray(value)) {
    return value.map(qItem => quarterToDate(qItem));
  }

  return quarterToDate(value);
};

export const dateValueToQuarterValue = (value?: Date | Date[] | null) => {
  if (Array.isArray(value)) {
    return value.map(dateItem => dateToQuarter(dateItem));
  }

  return value ? [dateToQuarter(value)] : null;
};

export const quarterIsWithinRange = (value: Quarter, quarterRange: Quarter[]): boolean => {
  const [startQuarter, endQuarter] = quarterNormalizer(quarterRange);

  if (startQuarter && endQuarter) {
    return (
      dayjs(quarterToDate(value)).isSame(dayjs(quarterToDate(startQuarter)), 'quarter') ||
      dayjs(quarterToDate(value)).isSame(dayjs(quarterToDate(endQuarter)), 'quarter') ||
      (dayjs(quarterToDate(value)).isAfter(dayjs(quarterToDate(startQuarter)), 'quarter') &&
        dayjs(quarterToDate(value)).isBefore(dayjs(quarterToDate(endQuarter)), 'quarter'))
    );
  }

  if (startQuarter) {
    return dayjs(quarterToDate(value)).isSame(dayjs(quarterToDate(startQuarter)), 'quarter');
  }

  return false;
};

export const quarterIsSelected = (value: Quarter, quarterRange: Quarter[]): boolean => {
  const date = quarterToDate(value);

  return !!quarterRange.find(quarter => dayjs(quarterToDate(quarter)).isSame(dayjs(date), 'quarter'));
};
