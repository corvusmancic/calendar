import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import { useKeyPressed } from '@rgs-ui/hooks';
import { Input } from '@rgs-ui/input';

import {
  formatStringRuToDate,
  getMaskMultiple,
  validateDateArrayString,
  DATE_PLACEHOLDER,
  DATE_FORMAT,
} from '@rgs-ui/date-utils';

import { CalendarHeaderProps } from './CalendarHeader';
import { SingleInputWrapper } from './styles';

type ValueType = string;
type HeaderProps = Pick<
  CalendarHeaderProps,
  'mask' | 'minDate' | 'maxDate' | 'inputCleared' | 'placeholder' | 'separator'
>;

export type SingleInputProps = HeaderProps & {
  value: ValueType;
  onChange: (arg: Date | Date[]) => void;
  toggleInputCleared(): void;
  separator?: string;
  multiple: boolean;
};

const SingleInput = ({
  value,
  onChange,
  mask = DATE_FORMAT.toLowerCase(),
  inputCleared,
  toggleInputCleared,
  minDate,
  maxDate,
  separator = '',
  multiple,
}: SingleInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState(value);

  const handleConfirm = () => {
    const isValidValue = validateDateArrayString(inputValue);

    if (!inputValue || inputValue.endsWith('_') || !isValidValue) {
      return;
    }

    const dates = formatStringRuToDate(inputValue, { minDate, maxDate, separator, multiple });

    if (dates) {
      inputRef.current?.blur();
      onChange(dates);
    }
  };

  useKeyPressed('Enter', handleConfirm);

  const onInputChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value),
    []
  );

  useEffect(() => {
    if (inputCleared) {
      toggleInputCleared();
    }
    setInputValue(value);
  }, [inputCleared, toggleInputCleared, value]);

  const resultingMask = useMemo(() => getMaskMultiple(false, mask, separator, multiple), [mask, multiple, separator]);

  return (
    <SingleInputWrapper>
      <Input
        id='calendarDate'
        ref={inputRef}
        value={inputValue}
        mask={resultingMask}
        label='Введите дату'
        onChange={onInputChangeHandler}
        onBlur={handleConfirm}
        placeholder={DATE_PLACEHOLDER}
        large={false}
      />
    </SingleInputWrapper>
  );
};

export default SingleInput;
