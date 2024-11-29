import { Meta, StoryFn } from '@storybook/react';

import { Calendar } from '../index';
import { GoToDatePresets } from '../src/types';

export default {
  title: 'Components/Calendar/TimePicker',
  component: Calendar.TimePicker,
  parameters: {
    docs: {
      description: {
        component:
          'Календарь с инпутом. Используется для выбора времени. Используется при создании задач для выбора конкретной даты и времени выполнения.',
      },
    },
  },
  argTypes: {
    minDate: {
      control: 'date',
    },
    maxDate: {
      control: 'date',
    },
    minDetail: {
      defaultValue: 'decade',
      options: ['month', 'year', 'decade'],
      control: { type: 'radio' },
    },
    maxDetail: {
      defaultValue: 'month',
      options: ['month', 'year', 'decade'],
      control: { type: 'radio' },
    },
    goToButtonPreset: {
      defaultValue: 'day',
      options: [GoToDatePresets.DAY, GoToDatePresets.MONTH, GoToDatePresets.QUARTER],
      control: { type: 'radio' },
    },
    view: {
      defaultValue: 'month',
      options: ['month', 'year', 'decade'],
      control: 'radio',
    },
    datePlaceholder: {
      defaultValue: 'Дата',
      control: 'text',
    },
    timePlaceholder: {
      defaultValue: 'Время',
      control: 'text',
    },
    dateValue: {
      control: false,
    },
    defaultDateValue: {
      control: 'Date',
    },
    errorMessage: {
      defaultValue: {
        date: '',
        time: '',
      },
      control: 'object',
    },
    dateMask: {
      control: false,
    },
    timeMask: {
      control: false,
    },
  },
} as Meta<typeof Calendar.TimePicker>;

const Template: StoryFn<typeof Calendar.TimePicker> = args => <Calendar.TimePicker {...args} />;

export const TimePickerExample = {
  render: Template,
};
