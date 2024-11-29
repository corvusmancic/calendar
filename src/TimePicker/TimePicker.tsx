import { memo, forwardRef } from 'react';
import { useIsMobile, useUncontrolled } from '@rgs-ui/hooks';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DATE_FORMAT, TIME_FORMAT } from '@rgs-ui/date-utils';

import { ITimePickerProps, OnChangeHandler, TimePickerChangeObject } from '../types';
import * as SC from '../styles';

import { Calendar } from '../Calendar';
import TimePickerHeader from './TimePickerHeader';
import { useError } from './useError';

dayjs.extend(customParseFormat);

const TimePickerComponent = forwardRef<HTMLDivElement, ITimePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      datePlaceholder,
      timePlaceholder,
      maxDate,
      minDate,
      errorMessage,
      dateMask,
      timeMask,
      ...rest
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const { error, handleError } = useError(errorMessage);

    const [dateState, setDateState] = useUncontrolled<TimePickerChangeObject>({
      value,
      defaultValue,
      onChange,
    });

    const handleDateChange: OnChangeHandler = date => {
      if (Array.isArray(date)) return;

      setDateState({ date });
    };

    const dateString = dateState?.date ? dayjs(dateState.date).format(DATE_FORMAT) : '';
    const timeString = dateState?.time ? dayjs(dateState.time).format(TIME_FORMAT) : '';

    return (
      <SC.CalendarWrapper $isMobile={isMobile} $noShadow={isMobile}>
        <TimePickerHeader
          date={dateString}
          time={timeString}
          onChange={setDateState}
          minDate={minDate}
          maxDate={maxDate}
          errorMessage={error}
          handleError={handleError}
          datePlaceholder={datePlaceholder}
          timePlaceholder={timePlaceholder}
          dateMask={dateMask}
          timeMask={timeMask}
        />

        <Calendar
          noShadow
          ref={ref}
          value={dateState?.date}
          minDate={minDate}
          maxDate={maxDate}
          onChange={handleDateChange}
          {...rest}
        />
      </SC.CalendarWrapper>
    );
  }
);

export const TimePicker = memo(TimePickerComponent);
