import { RefAttributes } from 'react';
// eslint-disable-next-line import/no-unresolved
import { ArgTypes } from 'storybook/internal/types';
import { GoToDatePresets, ICustomCalendarProps, IQuarterYearView } from '../src/types';

export const SHARED_ARG_TYPES = {
  minDate: {
    control: 'date',
  },
  maxDate: {
    control: 'date',
  },
  selectRange: {
    control: 'boolean',
  },
  minDetail: {
    options: ['month', 'year', 'decade'],
    control: 'radio',
  },
  maxDetail: {
    options: ['month', 'year', 'decade'],
    control: 'radio',
  },
  goToButtonPreset: {
    options: Object.values(GoToDatePresets),
    control: 'radio',
  },
  view: {
    options: ['month', 'year', 'decade'],
    control: 'radio',
  },
  multiple: {
    control: 'boolean',
  },
  fullSize: {
    control: 'boolean',
  },
  backgroundColor: {
    control: 'color',
  },
} as Partial<ArgTypes<ICustomCalendarProps<boolean, boolean, boolean> & RefAttributes<HTMLDivElement>>>;

export const CALENDAR_ARGS_TYPES = {
  ...SHARED_ARG_TYPES,
  placeholder: {
    control: 'text',
  },
  value: {
    control: 'date',
  },
  showHeader: {
    control: 'boolean',
  },
  disableMobileLayout: {
    control: 'boolean',
  },
  quarterlyMonthView: {
    control: 'boolean',
  },
  todayDate: {
    control: 'date',
  },
} as Partial<ArgTypes<ICustomCalendarProps<boolean, boolean, boolean> & RefAttributes<HTMLDivElement>>>;

export const CALENDAR_ARGS_VALUES = {
  selectRange: false,
  minDetail: 'decade',
  maxDetail: 'month',
  goToButtonPreset: GoToDatePresets.DAY,
  view: 'month',
  multiple: false,
  fullSize: false,
  backgroundColor: '#FFFFFF',
  placeholder: 'Введите дату',
  showHeader: true,
  disableMobileLayout: false,
  quarterlyMonthView: false,
} as Partial<ICustomCalendarProps<boolean, boolean, boolean> & RefAttributes<HTMLDivElement>>;

export const QUARTER_PICKER_ARGS_VALUES = {
  goToButtonPreset: GoToDatePresets.DAY,
};

export const QUARTER_PICKER_ARGS_TYPES = {
  ...SHARED_ARG_TYPES,
  quarterValue: {
    control: 'date',
  },
  goToButtonPreset: {
    options: Object.values(GoToDatePresets),
    control: { type: 'radio' },
  },
  activeStartDate: {
    control: 'date',
  },
} as Partial<
  ArgTypes<
    IQuarterYearView<boolean, boolean, boolean> & {
      standAlone?: boolean | undefined;
      selectRange?: boolean | undefined;
    }
  >
>;
