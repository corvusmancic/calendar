import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { EButtonVariants } from '@rgs-ui/button';
import { EIconButtonSize } from '@rgs-ui/icon-button';
import { isDateWithinRange, QUARTERS, QUARTER_DATE_FORMAT } from '@rgs-ui/date-utils';
import dayjs from 'dayjs';

import { GO_TO_PRESET_CONFIG } from '../const';
import { GoToDatePresets } from '../types';
import TodayButton from '../GoToPresetButton/GoToPresetButton';

import { Buttons, ButtonStyled, IconButtonStyled, Quarters, QuartersItem, QuarterYearViewWrapper } from './styles';
import { quarterIsWithinRange, quarterIsSelected, quarterToDate } from './utils';
import useDateClick from './useDateClick';
import { IQuarterYearViewProps, YearActions } from './types';

const QuarterYearViewComponent = <R extends boolean = false, M extends boolean = false, H extends boolean = false>(
  props: IQuarterYearViewProps<R, M, H>
) => {
  const {
    activeStartDate: viewDateExternal = new Date(),
    quarterValue: valueExternal,
    onQuarterChange,
    maxDetail = 'decade',
    minDetail = 'year',
    maxDate,
    minDate,
    onViewChange,
    onActiveStartDateChange,
    standAlone = true,
    goToButtonPreset = GoToDatePresets.MONTH,
    selectRange = false,
    multiple = false,
  } = props;
  const { value, isHoverOn, handlers, hoverQuarter } = useDateClick({ incomingDateValue: valueExternal });
  const [viewDate, setViewDate] = useState<Date>(viewDateExternal);

  const goToPreset = useCallback(() => {
    if (!goToButtonPreset) return;

    setViewDate(GO_TO_PRESET_CONFIG[goToButtonPreset].activeStartDate);
  }, [goToButtonPreset]);

  const handleYearChange = useCallback((arg: YearActions) => {
    setViewDate(prevDate => {
      const date =
        arg === YearActions.ADD
          ? dayjs(prevDate).add(1, 'year').toDate()
          : dayjs(prevDate).subtract(1, 'year').toDate();
      return date;
    });
  }, []);

  const handleTileClick = useCallback(
    (event: MouseEvent, arg: number) => {
      event?.stopPropagation();

      if (!maxDetail || maxDetail === 'year') {
        // date setting
        const qValue = { year: viewDate.getFullYear().toString(), quarter: arg };

        if (selectRange) {
          handlers.handleDateClick({ value: qValue, callback: onQuarterChange });
        } else if (multiple) {
          handlers.handleMultipleDateChange({ value: qValue, callback: onQuarterChange });
        } else {
          handlers.handleDateChange({ value: qValue, callback: onQuarterChange });
        }
      } else {
        // view drilling
        onViewChange?.({
          view: 'month',
          activeStartDate: quarterToDate({ year: viewDate?.getFullYear().toString(), quarter: arg }),
        });
      }
    },
    [maxDetail, viewDate, selectRange, multiple, handlers, onQuarterChange, onViewChange]
  );

  useEffect(() => {
    onActiveStartDateChange?.({ activeStartDate: viewDate });
  }, [onActiveStartDateChange, viewDate]);

  const getIsSelected = useCallback(
    (quarter: number) => {
      if (!value) return false;

      const currentQuarter = { quarter, year: viewDate.getFullYear().toString() };

      if (selectRange) {
        return quarterIsWithinRange(currentQuarter, value);
      }

      return quarterIsSelected(currentQuarter, value);
    },
    [selectRange, value, viewDate]
  );

  const getIsHovered = useCallback(
    (quarter: number) => {
      if (isHoverOn && hoverQuarter && selectRange && value?.length === 1) {
        const currentYear = viewDate.getFullYear().toString();
        const currentQuarter = { quarter, year: currentYear };
        const quartersRange = [value[0], { quarter: hoverQuarter, year: currentYear }];

        return quarterIsWithinRange(currentQuarter, quartersRange);
      }

      return false;
    },
    [hoverQuarter, isHoverOn, value, viewDate, selectRange]
  );

  const currentQuarter = useCallback(
    (index: number) => dayjs().isSame(dayjs(viewDate).quarter(index), 'quarter'),
    [viewDate]
  );

  const getDisabled = useCallback(
    (arg: number) => {
      const quarter = {
        quarter: arg,
        year: viewDate.getFullYear?.().toString(),
      };

      return !isDateWithinRange({
        value: quarterToDate(quarter),
        minDate,
        maxDate,
        unit: 'quarter',
      });
    },
    [maxDate, minDate, viewDate]
  );

  const handleButtonClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onViewChange?.({
        view: 'decade',
        activeStartDate: viewDate,
      });
    },
    [onViewChange, viewDate]
  );

  return (
    <QuarterYearViewWrapper standAlone={standAlone}>
      <input type='hidden' value={value?.map(_value => _value.quarter).join(',') ?? ''} />
      <Buttons>
        <IconButtonStyled
          iconName='MenuOpenedIcon'
          variant={EButtonVariants.GHOST}
          size={EIconButtonSize.SMALL}
          onClick={() => handleYearChange(YearActions.SUBTRACT)}
        />
        <ButtonStyled disabled={minDetail !== 'decade'} variant={EButtonVariants.GHOST} onClick={handleButtonClick}>
          {dayjs(viewDate).format(QUARTER_DATE_FORMAT)}
        </ButtonStyled>
        <IconButtonStyled
          iconName='MenuClosedIcon'
          variant={EButtonVariants.GHOST}
          size={EIconButtonSize.SMALL}
          onClick={() => handleYearChange(YearActions.ADD)}
        />
      </Buttons>

      <Quarters>
        {QUARTERS.map((item, index) => (
          <QuartersItem
            type='button'
            role='button'
            onMouseEnter={isHoverOn ? () => handlers.handleMouseEnter(index + 1) : undefined}
            onMouseLeave={isHoverOn ? () => handlers.handleMouseLeave() : undefined}
            thisQuarter={currentQuarter(index + 1)}
            selected={getIsSelected(index + 1)}
            data-selected={getIsSelected(index + 1)}
            hovered={getIsHovered(index + 1)}
            key={index}
            onClick={event => handleTileClick(event, index + 1)}
            isDisabled={getDisabled(index + 1)}
          >
            {item}
          </QuartersItem>
        ))}
      </Quarters>

      {!!standAlone && !!goToButtonPreset && (
        <TodayButton onClick={goToPreset} text={GO_TO_PRESET_CONFIG[goToButtonPreset].buttonText} />
      )}
    </QuarterYearViewWrapper>
  );
};

export const QuarterYearView = QuarterYearViewComponent;
