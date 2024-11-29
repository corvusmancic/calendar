import { useRef } from 'react';
import { useKeyPressed } from '@rgs-ui/hooks';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  getDateWithinRange,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_ERROR_CONST,
  DATE_PLACEHOLDER,
  TIME_PLACEHOLDER,
  DATE_MASK,
  TIME_MASK,
} from '@rgs-ui/date-utils';

import { ITimePickerValue, TimePickerChangeObject } from '../types';

import { HeaderWrapper, InputWrapper, PeriodInputStyled } from '../Headers/styles';

dayjs.extend(customParseFormat);

const validateDate = (dateInputValue: string) => {
  const isValid = dayjs(dateInputValue, DATE_FORMAT, true).isValid();
  if (!isValid) return { date: DATE_ERROR_CONST.DATE_FORMAT_ERROR };
};

const validateTime = (timeInputValue: string) => {
  const isValid = dayjs(timeInputValue, TIME_FORMAT, true).isValid();
  if (!isValid) return { time: DATE_ERROR_CONST.TIME_FORMAT_ERROR };
};

const createDate = (dateInputValue: string, timeInputValue?: string, minDate?: Date, maxDate?: Date) => {
  const dateTime = `${dateInputValue}${timeInputValue ? `-${timeInputValue}` : ''}`;

  const dateTimeFormat = `${DATE_FORMAT}${timeInputValue ? `-${TIME_FORMAT}` : ''}`;

  const resultDate = getDateWithinRange({
    value: dayjs(dateTime, dateTimeFormat).toDate(),
    minDate,
    maxDate,
  });

  return resultDate || undefined;
};

export type TimePickerHeaderProps = {
  date: string;
  time: string;
  onChange: (arg: TimePickerChangeObject) => void;
  minDate?: Date;
  maxDate?: Date;
  errorMessage?: Partial<ITimePickerValue<string>>;
  handleError(arg?: Partial<ITimePickerValue<string>>): void;
  datePlaceholder?: string;
  timePlaceholder?: string;
  dateMask?: string;
  timeMask?: string;
};

const TimePickerHeader = ({
  date,
  time,
  onChange,
  minDate,
  maxDate,
  errorMessage,
  handleError,
  datePlaceholder = 'Дата',
  timePlaceholder = 'Время',
  dateMask = DATE_MASK,
  timeMask = TIME_MASK,
}: TimePickerHeaderProps) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = () => {
    const dateInputValue = dateInputRef.current?.value;
    const timeInputValue = timeInputRef.current?.value;

    if (!dateInputValue) {
      handleError({ date: DATE_ERROR_CONST.DATE_REQUIRED });
      return;
    }

    if (dateInputValue) {
      const error = validateDate(dateInputValue);
      if (error) {
        handleError(error);
        return;
      }
    }

    if (timeInputValue) {
      const error = validateTime(timeInputValue);
      if (error) {
        handleError(error);
        return;
      }
    }
    // Если не вызвать этот метод без значения, флк с ошибкой времени не исчезнет. С датой такого не наблюдал
    handleError();

    const result = createDate(dateInputValue, timeInputValue, minDate, maxDate);

    onChange?.({ date: dateInputValue ? result : undefined, time: timeInputValue ? result : undefined });
  };

  useKeyPressed('Enter', handleConfirm);

  return (
    <HeaderWrapper>
      <InputWrapper>
        <PeriodInputStyled
          id='timePickerDate'
          value={date}
          onClick={event => {
            // Предотвращает закрытие по clickAway в IWD
            event.stopPropagation();
          }}
          onBlur={handleConfirm}
          large={false}
          label={datePlaceholder}
          mask={{ mask: dateMask, showMaskOnHover: false, placeholder: DATE_PLACEHOLDER }}
          placeholder={DATE_PLACEHOLDER}
          ref={dateInputRef}
          isInvalid={Boolean(errorMessage?.date)}
          errorMessage={errorMessage?.date}
        />

        <PeriodInputStyled
          id='timePickerTime'
          value={time}
          onClick={event => {
            // Предотвращает закрытие по clickAway в IWD
            event.stopPropagation();
          }}
          onBlur={handleConfirm}
          large={false}
          label={timePlaceholder}
          mask={{ alias: timeMask, showMaskOnHover: false, placeholder: TIME_PLACEHOLDER }}
          placeholder={TIME_PLACEHOLDER}
          ref={timeInputRef}
          isInvalid={Boolean(errorMessage?.time)}
          errorMessage={errorMessage?.time}
        />
      </InputWrapper>
    </HeaderWrapper>
  );
};

export default TimePickerHeader;
