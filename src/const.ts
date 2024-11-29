import dayjs from 'dayjs';
import ReactCalendar, { Detail } from 'react-calendar';
import { QuarterYearView } from './QuarterYearView/QuarterYearView';
import { ArrowTypes, GoToDatePresets } from './types';

export const ViewArrowIconMap: Record<ArrowTypes, Record<Detail, string>> = {
  prev2Label: {
    month: 'MenuOpenedIcon',
    year: '',
    decade: '',
    century: '',
  },
  prevLabel: {
    month: 'ArrowHideIcon',
    year: 'MenuOpenedIcon',
    decade: 'MenuOpenedIcon',
    century: '',
  },
  nextLabel: {
    month: 'ArrowExpandIcon',
    year: 'MenuClosedIcon',
    decade: 'MenuClosedIcon',
    century: '',
  },
  next2Label: {
    month: 'MenuClosedIcon',
    year: '',
    decade: '',
    century: '',
  },
};

export const GO_TO_PRESET_CONFIG: Record<
  GoToDatePresets,
  {
    buttonText: string;
    view: Detail;
    activeStartDate: (value?: Date) => Date;
  }
> = {
  [GoToDatePresets.DAY]: {
    buttonText: 'Сегодня',
    view: 'month',
    activeStartDate: value => dayjs(value).toDate(),
  },
  [GoToDatePresets.MONTH]: {
    buttonText: 'Текущий месяц',
    view: 'year',
    activeStartDate: value => dayjs(value).toDate(),
  },
  [GoToDatePresets.QUARTER]: {
    buttonText: 'Текущий квартал',
    view: 'year',
    activeStartDate: value => dayjs(value).startOf('quarter').toDate(),
  },
};

export const COMPONENTS_MAP = { Calendar: ReactCalendar, Quarter: QuarterYearView };

export const DetailValues: Record<Detail, number> = {
  month: 1,
  year: 2,
  decade: 3,
  century: 4,
};
