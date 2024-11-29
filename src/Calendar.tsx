import React, { useCallback, useEffect, useMemo, useRef, useState, forwardRef } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import ReactCalendar, { CalendarTileProperties, DateCallback, Detail, ViewCallbackProperties } from 'react-calendar';
import { useMergedRef } from '@rgs-ui/hooks';
import {
  formatDateToStringRu,
  DATE_MULTIPLE_SEPARATOR,
  DATE_RANGE_SEPARATOR,
  DESELECTION_CLASS_NAME,
  SELECTION_CLASS_NAME,
} from '@rgs-ui/date-utils';
import { useMatchMedia } from '@rgs-ui/design-tokens';

import { GO_TO_PRESET_CONFIG } from './const';

import TodayButton from './GoToPresetButton/GoToPresetButton';
import CalendarHeader from './Headers/CalendarHeader';
import { NavigationLabel } from './NavigationLabel';
import { QuarterYearView } from './QuarterYearView/QuarterYearView';
import { TimePicker } from './TimePicker/TimePicker';

import * as SC from './styles';
import locales from './locales';
import { GoToDatePresets, ICustomCalendarProps } from './types';
import { getAllowedView, getArrow, viewToQUnit } from './utils';

import 'react-calendar/dist/Calendar.css';

dayjs.extend(quarterOfYear);
dayjs.extend(customParseFormat);

const CalendarComponent = <R extends boolean = false, M extends boolean = false, H extends boolean = false>(
  props: ICustomCalendarProps<R, M, H>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    selectRange = false,
    showHeader = false,
    disableMobileLayout,
    clearButton,
    onChange,
    onCancel,
    value,
    onPeriodChange,
    dateStringSeparator,
    mask,
    placeholder = 'Введите дату',
    quarterlyMonthView = false,
    view: externalView = 'month',
    minDetail,
    maxDetail,
    maxDate,
    minDate,
    goToButtonPreset = GoToDatePresets.DAY,
    onGoToPreset = () => undefined,
    multiple = false,
    noShadow = false,
    activeStartDate: _activeStartDate,
    hidePeriodSwitcher,
    disablePeriodSwitcher,
    fullSize,
    backgroundColor,
    todayDate,
    ...rest
  } = props;

  const calendarWrapperRef = useRef<HTMLDivElement>(null);

  const [period, setPeriod] = useState(selectRange);

  const dateSeparatorFinal = useMemo(
    () => dateStringSeparator || (period ? DATE_RANGE_SEPARATOR : DATE_MULTIPLE_SEPARATOR),
    [dateStringSeparator, period]
  );

  const [localDate, setLocalDate] = useState<Date | [Date, Date]>();
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);
  // react-calendar нативно не поддерживает "unselect" даты, этот стейт чтобы задать стили для unselect
  const [removedActiveDate, setRemovedActiveDate] = useState<Date>();

  const [view, setView] = useState<Detail>(externalView);
  const [activeStartDate, setActiveStartDate] = useState<Date | undefined>(_activeStartDate);
  const [inputCleared, setInputCleared] = useState(false);
  const [calendarKey, setCalendarKey] = useState(1);

  const { isMobile: _isMobile } = useMatchMedia();
  const isMobile = !disableMobileLayout && _isMobile;

  const goToPreset = useCallback(() => {
    if (!goToButtonPreset) return;

    const allowedView = getAllowedView(GO_TO_PRESET_CONFIG[goToButtonPreset].view, minDetail, maxDetail);
    const today = todayDate ? new Date(todayDate) : new Date();

    setView(allowedView);
    setActiveStartDate(GO_TO_PRESET_CONFIG[goToButtonPreset].activeStartDate(today));
    onGoToPreset(allowedView, GO_TO_PRESET_CONFIG[goToButtonPreset].activeStartDate(today));

    if (!selectRange) {
      setLocalDate(today);
      onChange?.(today);
    }

    if (multiple) {
      setMultipleDates([today]);
      onChange?.([today]);
    }
  }, [goToButtonPreset, minDetail, maxDetail, onGoToPreset, selectRange, multiple, onChange, todayDate]);

  const handleViewChange = useCallback(
    (viewArg: Detail, activeStartDateArg: Date) => {
      setActiveStartDate(activeStartDateArg);
      setView(getAllowedView(viewArg, minDetail, maxDetail));
    },
    [maxDetail, minDetail]
  );

  const onActiveStartDateChange = useCallback((val: Date) => setActiveStartDate(val), []);

  const handleChange = useCallback(
    (payload: Date | [Date, Date]) => {
      if (Array.isArray(payload) || !multiple) {
        setLocalDate(payload);
        onChange?.(payload);

        return;
      }

      let existingDate: Date | null = null;

      const result = multipleDates.reduce<Date[]>((acc, date) => {
        const isSameDate = dayjs(date).isSame(dayjs(payload), viewToQUnit(view, quarterlyMonthView));

        if (isSameDate) {
          existingDate = date;
          return acc;
        }

        return [...acc, date];
      }, []);

      setRemovedActiveDate(existingDate || undefined);

      if (!existingDate) {
        result.push(payload);
      }

      setMultipleDates(result);
      onChange?.(result);
    },
    [multiple, multipleDates, onChange, quarterlyMonthView, view]
  );

  const refreshCalendar = useCallback(() => setCalendarKey(prevState => prevState + 1), []);

  const togglePeriod = useCallback(() => {
    setLocalDate(undefined);
    setRemovedActiveDate(undefined);
    setMultipleDates([]);
    setPeriod(prevPeriod => !prevPeriod);
    onPeriodChange?.(!period);
  }, [onPeriodChange, period]);

  const handlePeriodInputChange = useCallback(
    (payload: [Date, Date], refresh?: boolean) => {
      if (refresh) refreshCalendar();

      setLocalDate(payload);
      setRemovedActiveDate(undefined);
      onChange?.(payload);
    },
    [onChange, refreshCalendar]
  );

  const handleSingleInputChange = useCallback(
    (payload: Date | Date[], refresh?: boolean) => {
      if (refresh) refreshCalendar();

      if (Array.isArray(payload)) {
        setMultipleDates(payload);
      } else {
        setLocalDate(payload);
      }

      setRemovedActiveDate(undefined);
      onChange?.(payload);
    },
    [onChange, refreshCalendar]
  );

  const toggleInputCleared = useCallback(() => {
    setInputCleared(prev => !prev);
  }, []);

  const clearDate = useCallback(() => {
    setLocalDate(undefined);
    setMultipleDates([]);
    onChange?.(undefined);
    refreshCalendar();
    toggleInputCleared();
  }, [refreshCalendar, toggleInputCleared, onChange]);

  const handleNavigationLabel = useCallback(
    (payload: { date: Date; label: string; locale: string; view: Detail }) =>
      NavigationLabel(payload, newView => setView(getAllowedView(newView, minDetail, maxDetail))),
    [maxDetail, minDetail]
  );

  useEffect(() => {
    const startDate = Array.isArray(localDate) ? localDate[0] : localDate;
    setActiveStartDate(startDate);
  }, [localDate]);

  useEffect(() => setView(getAllowedView(externalView, minDetail, maxDetail)), [externalView, maxDetail, minDetail]);

  // Change the value from the outside
  useEffect(() => {
    if (!value) {
      setMultipleDates([]);
      setLocalDate(undefined);

      return;
    }

    if (multiple && !selectRange) {
      const result: Date[] = Array.isArray(value) ? value : [value];

      setMultipleDates(result);
      setLocalDate(result[0]);

      return;
    }

    // Casting is used because typescript can't infer a tuple type [Date, Date] from a slice and a Date type from a CalendarValue generic
    const result = Array.isArray(value) ? (value.slice(0, 2) as [Date, Date]) : (value as Date);

    setLocalDate(result);
    setMultipleDates([]);
  }, [value, selectRange, multiple]);

  // Change the period from the outside
  useEffect(() => {
    if (selectRange === undefined) return;

    setPeriod(selectRange);
  }, [selectRange]);

  useEffect(() => {
    refreshCalendar();
  }, [value, period, multiple, refreshCalendar]);

  useEffect(() => {
    // Уберёт выделение рамкой "сегодня", если требуется дата в другом часовом поясе
    const todayTile = document.querySelector('.react-calendar__tile--now');
    if (todayTile && todayDate) {
      todayTile.classList.remove('react-calendar__tile--now');
    }
  }, [activeStartDate, todayDate]);

  const CurrentCalendarComponent = useMemo(() => {
    if (quarterlyMonthView && view === 'year') return QuarterYearView;

    return ReactCalendar;
  }, [quarterlyMonthView, view]);

  const handleClickDay: DateCallback = (_arg, event) => {
    event.stopPropagation();
  };

  const handleClassName = useCallback(
    ({ view: tileView, date }: CalendarTileProperties) => {
      if (!multiple) return '';

      const isInArray = multipleDates.find(item =>
        dayjs(item).isSame(dayjs(date), viewToQUnit(tileView, quarterlyMonthView))
      );

      if (isInArray) return SELECTION_CLASS_NAME;

      if (dayjs(removedActiveDate).isSame(dayjs(date), viewToQUnit(tileView, quarterlyMonthView))) {
        return DESELECTION_CLASS_NAME;
      }

      return null;
    },
    [multiple, multipleDates, quarterlyMonthView, removedActiveDate]
  );

  const typeMemoised = useMemo(() => {
    if (period) {
      return {
        isPeriod: true,
        // Casting is used because typescript can't infer a tuple type [string, string] from a split function
        value: (localDate
          ? formatDateToStringRu(localDate, dateSeparatorFinal).split(dateSeparatorFinal)
          : ['', '']) as [string, string],
      } as const;
    }
    return {
      isPeriod: false,
      value: formatDateToStringRu(multiple ? multipleDates : localDate, dateSeparatorFinal),
    } as const;
  }, [period, multiple, multipleDates, localDate, dateSeparatorFinal]);

  return (
    <SC.CalendarWrapper
      ref={useMergedRef(calendarWrapperRef, ref)}
      $noShadow={noShadow}
      $isMobile={isMobile}
      $fullSize={fullSize}
      $backgroundColor={backgroundColor}
    >
      {showHeader && (
        <CalendarHeader
          toggleInputCleared={toggleInputCleared}
          inputCleared={inputCleared}
          dateStringValue={typeMemoised}
          togglePeriod={togglePeriod}
          clearDate={clearDate}
          onCancel={onCancel}
          onPeriodInputChange={handlePeriodInputChange}
          onSingeInputChange={handleSingleInputChange}
          mask={mask}
          calendarWrapperRef={calendarWrapperRef}
          placeholder={placeholder}
          minDate={minDate}
          maxDate={maxDate}
          separator={dateSeparatorFinal}
          multiple={multiple}
          hidePeriodSwitcher={hidePeriodSwitcher}
          disablePeriodSwitcher={disablePeriodSwitcher}
          isMobile={isMobile}
          clearButton={clearButton}
        />
      )}

      <CurrentCalendarComponent
        {...rest}
        key={calendarKey}
        locale={locales.ru.name}
        value={localDate}
        quarterValue={period || multiple ? multipleDates : localDate}
        className='calendarContainer'
        prev2Label={getArrow('prev2Label', view)}
        prevLabel={getArrow('prevLabel', view)}
        nextLabel={getArrow('nextLabel', view)}
        next2Label={getArrow('next2Label', view)}
        navigationLabel={handleNavigationLabel}
        showNeighboringMonth={false}
        onViewChange={(val: ViewCallbackProperties) => handleViewChange(val.view, val.activeStartDate)}
        view={view}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={(val: ViewCallbackProperties) => onActiveStartDateChange(val.activeStartDate)}
        selectRange={period}
        maxDate={maxDate}
        minDate={minDate}
        minDetail={minDetail}
        maxDetail={maxDetail}
        onChange={handleChange}
        onQuarterChange={onChange}
        standAlone={false}
        onClickDay={handleClickDay}
        onClickYear={handleClickDay}
        onClickMonth={handleClickDay}
        onClickDecade={handleClickDay}
        tileClassName={handleClassName}
        multiple={multiple}
      />
      {goToButtonPreset && <TodayButton onClick={goToPreset} text={GO_TO_PRESET_CONFIG[goToButtonPreset].buttonText} />}
    </SC.CalendarWrapper>
  );
};

// Не вышло помирить между собой сочетание forwardRef, compound компоненты и generic параметры,
// получилось только через assign
export const Calendar = Object.assign(forwardRef(CalendarComponent), { QuarterPicker: QuarterYearView, TimePicker });
