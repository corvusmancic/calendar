import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { getPresetRange, presetMinMaxClipped } from '@rgs-ui/date-utils';
import PresetsDropDown from './PresetsDropDown';

jest.mock('@rgs-ui/date-utils', () => ({
  getPresetRange: jest.fn() as jest.Mock,
  presetMinMaxClipped: jest.fn() as jest.Mock,
}));

describe('PresetsDropDown', () => {
  const mockOnChange = jest.fn();
  const minDate = new Date('2021-01-01');
  const maxDate = new Date('2021-12-31');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Вызов onChange с корректными аргументами для недели', () => {
    (getPresetRange as jest.Mock).mockReturnValue([new Date('2021-09-20'), new Date('2021-09-26')]);
    (presetMinMaxClipped as jest.Mock).mockReturnValue([new Date('2021-09-20'), new Date('2021-09-26')]);

    const { getByText } = render(<PresetsDropDown onChange={mockOnChange} minDate={minDate} maxDate={maxDate} />);

    fireEvent.click(getByText('Текущая неделя'));

    expect(getPresetRange).toHaveBeenCalledWith('week');
    expect(presetMinMaxClipped).toHaveBeenCalledWith(
      [new Date('2021-09-20'), new Date('2021-09-26')],
      minDate,
      maxDate
    );
    expect(mockOnChange).toHaveBeenCalledWith([new Date('2021-09-20'), new Date('2021-09-26')]);
  });

  it('Вызов onChange с корректными аргументами для месяца', () => {
    (getPresetRange as jest.Mock).mockReturnValue([new Date('2021-09-01'), new Date('2021-09-30')]);
    (presetMinMaxClipped as jest.Mock).mockReturnValue([new Date('2021-09-01'), new Date('2021-09-30')]);

    const { getByText } = render(<PresetsDropDown onChange={mockOnChange} minDate={minDate} maxDate={maxDate} />);

    fireEvent.click(getByText('Текущий месяц'));

    expect(getPresetRange).toHaveBeenCalledWith('M');
    expect(presetMinMaxClipped).toHaveBeenCalledWith(
      [new Date('2021-09-01'), new Date('2021-09-30')],
      minDate,
      maxDate
    );
    expect(mockOnChange).toHaveBeenCalledWith([new Date('2021-09-01'), new Date('2021-09-30')]);
  });

  it('Вызов onChange с корректными аргументами для квартала', () => {
    (getPresetRange as jest.Mock).mockReturnValue([new Date('2021-07-01'), new Date('2021-09-30')]);
    (presetMinMaxClipped as jest.Mock).mockReturnValue([new Date('2021-07-01'), new Date('2021-09-30')]);

    const { getByText } = render(<PresetsDropDown onChange={mockOnChange} minDate={minDate} maxDate={maxDate} />);

    fireEvent.click(getByText('Текущий квартал'));

    expect(getPresetRange).toHaveBeenCalledWith('quarter');
    expect(presetMinMaxClipped).toHaveBeenCalledWith(
      [new Date('2021-07-01'), new Date('2021-09-30')],
      minDate,
      maxDate
    );
    expect(mockOnChange).toHaveBeenCalledWith([new Date('2021-07-01'), new Date('2021-09-30')]);
  });

  it('Вызов onChange с корректными аргументами для года', () => {
    (getPresetRange as jest.Mock).mockReturnValue([new Date('2021-01-01'), new Date('2021-12-31')]);
    (presetMinMaxClipped as jest.Mock).mockReturnValue([new Date('2021-01-01'), new Date('2021-12-31')]);

    const { getByText } = render(<PresetsDropDown onChange={mockOnChange} minDate={minDate} maxDate={maxDate} />);

    fireEvent.click(getByText('Текущий год'));

    expect(getPresetRange).toHaveBeenCalledWith('year');
    expect(presetMinMaxClipped).toHaveBeenCalledWith(
      [new Date('2021-01-01'), new Date('2021-12-31')],
      minDate,
      maxDate
    );
    expect(mockOnChange).toHaveBeenCalledWith([new Date('2021-01-01'), new Date('2021-12-31')]);
  });
});
