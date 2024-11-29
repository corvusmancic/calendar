import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Calendar } from '../src/Calendar';
import { CALENDAR_ARGS_TYPES, CALENDAR_ARGS_VALUES } from './const';

export default {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component:
          'Компонент используется в фильтре для выбора дат. Можно изменять заголовок, плейсхолдер, минимальное, максимальное и дефолтное значения',
      },
    },
  },
} as Meta<typeof Calendar>;

const calendarTemplateExample: StoryFn<typeof Calendar> = args => {
  const fixedArgs = {
    ...args,
    value: typeof args.value === 'number' ? new Date(args.value) : args.value,
    minDate: typeof args.minDate === 'number' ? new Date(args.minDate) : args.minDate,
    maxDate: typeof args.maxDate === 'number' ? new Date(args.maxDate) : args.maxDate,
  };

  return <Calendar {...fixedArgs} />;
};

export const CalendarExample: StoryObj<typeof Calendar> = {
  render: calendarTemplateExample,
  args: CALENDAR_ARGS_VALUES,
  argTypes: CALENDAR_ARGS_TYPES,
};

const Template: StoryFn<typeof Calendar> = () => (
  <>
    <p>
      <b>Calendar</b>
    </p>
    <p>CalendarYearView</p>
    <Calendar maxDetail='year' selectRange={false} />
    <hr />
    <p>CalendarYearViewMultiSelect</p>

    <Calendar multiple selectRange={false} maxDetail='year' />
    <hr />
    <p>CalendarYearViewRange</p>

    <Calendar selectRange maxDetail='year' />
    <hr />
    <p>CalendarDecadeView</p>
    <Calendar selectRange={false} maxDetail='decade' />
    <hr />
    <p>CalendarDecadeViewRange</p>
    <Calendar selectRange maxDetail='decade' />
    <hr />

    <p>CalendarDecadeViewMulti</p>

    <Calendar multiple maxDetail='decade' />
    <hr />
    <p>CalendarYearQuarterView</p>

    <Calendar quarterlyMonthView minDetail='decade' maxDetail='year' />

    <hr />
    <p>CalendarYearQuarterViewSelectionMulti</p>

    <Calendar quarterlyMonthView minDetail='decade' maxDetail='year' multiple />

    <hr />
    <p>CalendarYearQuarterViewSelectionRange</p>

    <Calendar quarterlyMonthView minDetail='decade' maxDetail='year' selectRange />
  </>
);

export const VariousStylesExample: StoryObj<typeof Calendar> = {
  render: Template,
};