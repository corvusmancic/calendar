import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Calendar } from '../src/Calendar';
import { QUARTER_PICKER_ARGS_TYPES, QUARTER_PICKER_ARGS_VALUES } from './const';

export default {
  title: 'Components/Calendar/QuarterView',
  component: Calendar.QuarterPicker,
  parameters: {
    docs: {
      description: {
        component:
          'Компонент используется для выбора квартала. Квартал, как и год, можно выбрать только один. Для выбора года можно использовать календарь',
      },
    },
  },
} as Meta<typeof Calendar.QuarterPicker>;
const QuarterYearViewTemplate: StoryFn<typeof Calendar.QuarterPicker> = args => (
  <Calendar.QuarterPicker {...args} standAlone />
);

export const QuarterYearViewExample: StoryObj<typeof Calendar.QuarterPicker> = {
  render: QuarterYearViewTemplate,
  args: QUARTER_PICKER_ARGS_VALUES,
  argTypes: QUARTER_PICKER_ARGS_TYPES,
};
