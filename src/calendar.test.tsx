import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestUtils from 'react-dom/test-utils';
import dayjs from 'dayjs';
import 'jest-styled-components';
import '@testing-library/jest-dom';

import { Calendar, ICustomCalendarProps } from '../index';
import locales from './locales';

const ALL_PARAMS: ICustomCalendarProps<false, false, false> = {
  placeholder: 'Выберите дату',
  minDate: new Date('December 17, 1995 03:24:00'),
  maxDate: new Date('October 28, 2020 04:54:00'),
  value: new Date('March 3, 2007 06:21:00'),
};

const changeInputMaskValue = (element: HTMLInputElement, value: string) => {
  if (typeof value === 'string') {
    element.value = value;
  }
  element.selectionStart = value.length;
  element.selectionEnd = value.length;

  TestUtils.Simulate.change(element);
};

describe('Calendar', () => {
  beforeAll(() => {
    window.matchMedia = query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
  });

  describe('Calendar Standalone Component', () => {
    it('Default calendar snapshot', () => {
      const { container } = render(<Calendar value={ALL_PARAMS.value} />);

      expect(container).toMatchSnapshot();
    });

    it('hidePeriodSwitcher snapshot', () => {
      const { container } = render(<Calendar value={ALL_PARAMS.value} showHeader hidePeriodSwitcher />);

      expect(container).toMatchSnapshot();
    });

    it('MultiSelect calendar snapshot', () => {
      const { container } = render(
        <Calendar multiple value={[new Date('March 3, 2007 06:21:00'), new Date('March 8, 2007 06:21:00')]} />
      );
      expect(container).toMatchSnapshot();
    });

    it('Renders default calendar with controls ', () => {
      const onChange = jest.fn();
      render(<Calendar onChange={onChange} />);
      const [month, year] = dayjs().locale(locales.ru.name).format('MMMM YYYY').split(' ');
      expect(screen.getByText(month)).toBeInTheDocument();
      expect(screen.getByText(year)).toBeInTheDocument();
      expect(screen.getByText('Сегодня')).toBeInTheDocument();
    });

    it('Renders with header', async () => {
      const onChange = jest.fn();

      render(<Calendar onChange={onChange} showHeader />);

      expect(screen.getByRole('textbox')).toHaveValue('');

      await act(async () => {
        await userEvent.click(screen.getByText('Сбросить'));
      });
      expect(screen.getByRole('textbox')).toHaveValue('');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('Range Selection available', async () => {
      render(<Calendar showHeader />);
      const periodRadioButton = screen.getByLabelText('Период');

      expect(periodRadioButton).not.toBeChecked();
      await act(async () => {
        await userEvent.click(periodRadioButton);
      });
      expect(periodRadioButton).toBeChecked();

      // TODO появились два инпута для выбора интервала
    });
  });

  describe('QuarterPicker Standalone Component', () => {
    it('Default quarterView snapshot', () => {
      const { container } = render(<Calendar.QuarterPicker quarterValue={ALL_PARAMS.value} />);
      expect(container).toMatchSnapshot();
    });

    it('Можно выбрать квартал', async () => {
      const onChange = jest.fn();

      render(<Calendar.QuarterPicker onQuarterChange={onChange} maxDetail='year' />);

      await act(async () => {
        await userEvent.click(screen.getByText('II квартал'));
      });

      expect(onChange).toHaveBeenCalledTimes(1);

      await waitFor(() => {
        expect(screen.getByText('II квартал')).toHaveAttribute('data-selected', 'true');
        expect(screen.getByText('III квартал')).toHaveAttribute('data-selected', 'false');
      });
    });

    it('Выбрать диапазон дат', async () => {
      render(<Calendar showHeader />);

      await act(async () => {
        await userEvent.click(screen.getByLabelText('Период'));
        await userEvent.click(screen.getByLabelText('Выбрать диапазон дат'));
      });

      expect(screen.getByText('Текущая неделя')).toBeInTheDocument();
    });
  });

  describe('TimePicker Standalone Component', () => {
    it('Default snapshot', () => {
      const { container } = render(<Calendar.TimePicker value={{ date: ALL_PARAMS.value, time: ALL_PARAMS.value }} />);
      expect(container).toMatchSnapshot();
    });

    it('With errors snapshot', () => {
      const { container } = render(
        <Calendar.TimePicker
          value={{ date: ALL_PARAMS.value, time: ALL_PARAMS.value }}
          errorMessage={{ date: 'Ошибка даты', time: 'Ошибка времени' }}
        />
      );
      expect(container).toMatchSnapshot();
    });

    it('onChange', async () => {
      const onChange = jest.fn();

      render(<Calendar.TimePicker onChange={onChange} />);

      await act(async () => {
        await userEvent.click(screen.getByLabelText('Дата'));
        changeInputMaskValue(screen.getByLabelText('Дата'), '01012023');
      });

      await act(async () => {
        await userEvent.click(screen.getByLabelText('Время'));
        changeInputMaskValue(screen.getByLabelText('Время'), '1030');
      });

      await act(async () => {
        await userEvent.click(screen.getByLabelText('Дата'));
        await userEvent.type(screen.getByLabelText('Дата'), '{enter}');
      });

      expect(onChange).toHaveBeenCalled();
      expect(screen.getByLabelText('Дата')).toHaveValue('01.01.2023');
      expect(screen.getByLabelText('Время')).toHaveValue('10:30');
    });
  });
});
