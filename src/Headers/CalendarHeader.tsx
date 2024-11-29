import React, { FC, RefObject, useRef } from 'react';
import { EToggleLabelPosition } from '@rgs-ui/toggle';
import { EButtonIconPosition, EButtonVariants } from '@rgs-ui/button';

import PeriodInput from './PeriodInput';
import SingleInput from './SingleInput';
import { ClearButton, SettingsWrapper, HeaderWrapper, InputWrapper, StyledToggle, ToggleWrapper } from './styles';

type Single = {
  isPeriod: false;
  value: string;
};

type Period = {
  isPeriod: true;
  value: [string, string];
};

export type CalendarHeaderProps = {
  dateStringValue: Single | Period;
  togglePeriod(): void;
  clearDate(): void;
  onCancel?(): void;
  onPeriodInputChange: (arg: [Date, Date], refresh?: boolean) => void;
  onSingeInputChange: (arg: Date | Date[], refresh?: boolean) => void;
  mask?: string;
  calendarWrapperRef: RefObject<HTMLDivElement>;
  placeholder?: string;
  inputCleared?: boolean;
  toggleInputCleared(): void;
  minDate?: Date;
  maxDate?: Date;
  separator?: string;
  multiple?: boolean;
  hidePeriodSwitcher?: boolean;
  disablePeriodSwitcher?: boolean;
  isMobile: boolean;
  clearButton?: React.ReactNode;
};

const CalendarHeader: FC<CalendarHeaderProps> = ({
  togglePeriod,
  dateStringValue: headerDateStringValue,
  clearDate,
  onCancel,
  placeholder,
  onPeriodInputChange,
  onSingeInputChange,
  mask,
  calendarWrapperRef,
  inputCleared,
  toggleInputCleared,
  minDate,
  maxDate,
  separator,
  multiple = false,
  hidePeriodSwitcher = false,
  disablePeriodSwitcher = false,
  isMobile,
  clearButton,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <HeaderWrapper ref={inputRef} className='calendar-header'>
      <SettingsWrapper $hidePeriodSwitcher={hidePeriodSwitcher}>
        {!hidePeriodSwitcher && (
          <ToggleWrapper $isMobile={isMobile}>
            <StyledToggle
              // TODO Делать уникальным на странице, для этого нужно передавать id календарю
              name='calendar-header-toggle'
              label='Период'
              checked={headerDateStringValue.isPeriod}
              onChange={togglePeriod}
              labelPosition={EToggleLabelPosition.BEFORE}
              disabled={disablePeriodSwitcher}
            />
          </ToggleWrapper>
        )}

        {!isMobile && (
          <ClearButton
            iconName='CloseIcon'
            iconPosition={EButtonIconPosition.AFTER}
            variant={EButtonVariants.GHOST}
            onClick={clearDate}
          >
            Сбросить
          </ClearButton>
        )}
      </SettingsWrapper>

      <InputWrapper style={{ alignItems: 'center' }}>
        {headerDateStringValue.isPeriod ? (
          <PeriodInput
            minDate={minDate}
            maxDate={maxDate}
            inputCleared={inputCleared}
            toggleInputCleared={toggleInputCleared}
            value={headerDateStringValue.value}
            onChange={onPeriodInputChange}
            mask={mask}
            calendarWrapperRef={calendarWrapperRef}
            inputRef={inputRef}
            isMobile={isMobile}
          />
        ) : (
          <SingleInput
            minDate={minDate}
            maxDate={maxDate}
            inputCleared={inputCleared}
            toggleInputCleared={toggleInputCleared}
            placeholder={placeholder}
            onChange={onSingeInputChange}
            value={headerDateStringValue.value}
            mask={mask}
            separator={separator}
            multiple={multiple}
          />
        )}
      </InputWrapper>
    </HeaderWrapper>
  );
};

export default CalendarHeader;
