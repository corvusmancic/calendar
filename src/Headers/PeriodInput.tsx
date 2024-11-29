import React, { RefObject, useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useKeyPressed } from '@rgs-ui/hooks';
import { Popover } from '@rgs-ui/popover';
import { Tooltip } from '@rgs-ui/tooltip';
import { DATE_FORMAT, DATE_PLACEHOLDER, formatToPeriodDates, getMaskMultiple } from '@rgs-ui/date-utils';

import { Sidebar } from '@rgs-ui/sidebar';
import * as SC from '../styles';

import PresetsDropDown from './PresetsDropDown';
import { ListWrapper, PeriodInputStyled } from './styles';

type ValueType = [string, string];

export type PeriodInputProps = {
  value: ValueType;
  onChange: (arg: [Date, Date], refresh?: boolean) => void;
  mask?: string;
  calendarWrapperRef: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement>;
  inputCleared?: boolean;
  toggleInputCleared(): void;
  minDate?: Date;
  maxDate?: Date;
  isMobile?: boolean;
};

const PeriodInput = ({
  value,
  onChange,
  mask = DATE_FORMAT.toLowerCase(),
  calendarWrapperRef,
  inputRef,
  inputCleared,
  toggleInputCleared,
  minDate,
  maxDate,
  isMobile,
}: PeriodInputProps) => {
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const toggleOpen: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    event => {
      event.stopPropagation();
      setOpen(!open);
    },
    [open]
  );

  const onInputChangeHandler = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const {
      target: { value: currentValue },
    } = ev;

    setInputValue(prev => {
      // Casting is used because of the typescript makes [...prev] as string[], not [string, string]
      const newArray = [...prev] as ValueType;
      newArray[index] = currentValue;

      return newArray;
    });
  }, []);

  const handleConfirm = () => {
    const dates = formatToPeriodDates(inputValue, { minDate, maxDate });

    if (dates.every(Boolean)) {
      startInputRef.current?.blur();
      endInputRef.current?.blur();

      // Typescript doesn't infer the type below from an array's "every" method
      onChange(dates as [Date, Date]);
    }
  };

  useKeyPressed('Enter', handleConfirm);

  const handlePresetClick = useCallback(
    (arg: [Date, Date]) => {
      onChange(arg, true);
      if (isMobile) {
        setOpen(!open);
      }
    },
    [onChange, isMobile, open]
  );

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = useCallback(event => event.target.select(), []);

  useEffect(() => {
    if (inputCleared) {
      toggleInputCleared();
    }
    setInputValue([value[0] || '', value[1] || '']);
  }, [inputCleared, toggleInputCleared, value]);

  const resultingMask = useMemo(() => getMaskMultiple(false, mask), [mask]);

  return (
    <>
      <PeriodInputStyled
        id='calendarFromDate'
        mask={resultingMask}
        label='Начало'
        placeholder={DATE_PLACEHOLDER}
        value={inputValue[0]}
        onChange={event => onInputChangeHandler(event, 0)}
        onBlur={handleConfirm}
        onFocus={handleFocus}
        large={false}
        ref={startInputRef}
      />
      <PeriodInputStyled
        id='calendarToDate'
        mask={resultingMask}
        label='Конец'
        placeholder={DATE_PLACEHOLDER}
        value={inputValue[1]}
        onChange={event => onInputChangeHandler(event, 1)}
        onBlur={handleConfirm}
        onFocus={handleFocus}
        large={false}
        ref={endInputRef}
      />
      <SC.PopOverWrapper>
        {!isMobile && (
          <Popover
            content={<PresetsDropDown onChange={handlePresetClick} minDate={minDate} maxDate={maxDate} />}
            open={open}
            align='end'
            position='bottom'
            container={inputRef.current}
          >
            <Tooltip
              data={{ text: 'Выбрать диапазон дат' }}
              delayDuration={0}
              offset={4}
              container={calendarWrapperRef.current}
            >
              <SC.PeriodChips
                isOpen={open}
                onClick={toggleOpen}
                rightIcon={open ? 'ArrowCloseIcon' : 'ArrowOpenIcon'}
                aria-label='Выбрать диапазон дат'
              />
            </Tooltip>
          </Popover>
        )}
        {isMobile && (
          <>
            <Tooltip
              data={{ text: 'Выбрать диапазон дат' }}
              delayDuration={0}
              offset={4}
              container={calendarWrapperRef.current}
            >
              <SC.PeriodChips
                isOpen={open}
                onClick={toggleOpen}
                rightIcon={open ? 'ArrowCloseIcon' : 'ArrowOpenIcon'}
                aria-label='Выбрать диапазон дат'
              />
            </Tooltip>
            <Sidebar headerText='Выбор периода' closeButtonText='Отменить' opened={open} onClose={() => setOpen(!open)}>
              <ListWrapper>
                <PresetsDropDown onChange={handlePresetClick} minDate={minDate} maxDate={maxDate} isMobile />
              </ListWrapper>
            </Sidebar>
          </>
        )}
      </SC.PopOverWrapper>
    </>
  );
};

export default PeriodInput;
