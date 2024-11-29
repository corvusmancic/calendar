import { CalendarProps, Detail, ViewCallbackProperties } from 'react-calendar';

export type DateValue = Date | Date[] | [Date, Date] | undefined;

export type OnChangeHandler = (arg?: DateValue) => void;

export type ArrowTypes = 'prev2Label' | 'prevLabel' | 'nextLabel' | 'next2Label';

export type Quarter = {
  /** Значение Квартала */
  quarter: number;

  /** Значение года */
  year: string;
};

export interface IQuarterYearView<R extends boolean, M extends boolean, H extends boolean>
  extends Pick<
    ICustomCalendarProps<R, M, H>,
    'maxDate' | 'minDate' | 'maxDetail' | 'minDetail' | 'goToButtonPreset' | 'multiple'
  > {
  /** Дата начала текущего квартала */
  activeStartDate?: Date;

  /** Колбэк который сообщает об изменении viewDate внутри компонент */
  onViewChange?(arg: Partial<ViewCallbackProperties>): void;

  /** Колбэк который сообщает об изменении activeStartDate внутри компонент */
  onActiveStartDateChange?(arg: Partial<ViewCallbackProperties>): void;

  /** Функция изменения календаря */
  onQuarterChange?: ICustomCalendarProps<R, M, H>['onChange'];

  /** Значение квартала */
  quarterValue?: Date | Date[] | null;
}

export interface ICalendarSharedProps
  extends Omit<
    CalendarProps,
    'onChange' | 'defaultValue' | 'className' | 'minDate' | 'value' | 'maxDetail' | 'minDetail' | 'selectRange'
  > {
  /** Скрывает переключатель включения режима периода */
  hidePeriodSwitcher?: boolean;

  /** Убирает возможность включить режим выбора периода */
  disablePeriodSwitcher?: boolean;

  /** Маска ввода */
  mask?: string;

  /** placeholder внутри инпута в хедере */
  placeholder?: string;

  /** Текст footer календаря / квартала */
  goToButtonPreset?: GoToDatePresets | false;

  /** Callback вызываемый на кнопку "сегодня" */
  onGoToPreset?: (view: Detail, activeStartDate: Date) => void;

  /** Минимально возможная дата для выбора */
  minDate?: CalendarProps['minDate'];

  /** Максимально возможная дата для выбора */
  maxDate?: CalendarProps['maxDate'];

  /** Самый не детализированный вид */
  minDetail?: 'month' | 'year' | 'decade';

  /** Самый подробный/детальный вид */
  maxDetail?: 'month' | 'year' | 'decade';

  /** Вид квартала  */
  view?: 'month' | 'year' | 'decade';
}

export type CalendarValueWithoutHeader<R extends boolean, M extends boolean> = R extends true
  ? [Date, Date]
  : M extends true
  ? Date[]
  : Date;

export type CalendarValueWithHeader<M extends boolean> = M extends true ? Date[] | [Date, Date] : Date | [Date, Date];

export type CalendarValue<R extends boolean, M extends boolean, H extends boolean> = H extends true
  ? CalendarValueWithHeader<M>
  : CalendarValueWithoutHeader<R, M>;

export interface ICustomCalendarProps<R extends boolean, M extends boolean, H extends boolean>
  extends ICalendarSharedProps {
  /** Переключатель хедера календаря */
  showHeader?: H;

  /** Отключение режима мобильного отображения элементов управления календаря */
  disableMobileLayout?: boolean;

  /** Кнопка сброса */
  clearButton?: React.ReactNode;

  /** Коллбэк для управления закрытием календаря извне */
  onCancel?(): void;

  /** Функция изменения календаря */
  onChange?: OnChangeHandler;

  /** Разрешить выбор диапазона дат */
  selectRange?: R;

  /** Колбэк при смене диапазона в хедере */
  onPeriodChange?(isPeriod: boolean): void;

  /** Значение даты */
  value?: CalendarValue<R, M, H> | null;

  /** Управляет отображением тени вокруг календаря */
  noShadow?: boolean;

  /** разделитель строки даты в инпуте */
  dateStringSeparator?: string;

  /** Отображать вид квартала при view === year */
  quarterlyMonthView?: boolean;

  /** Вид квартала  */
  view?: 'month' | 'year' | 'decade';

  /** Флаг множественного выбора */
  multiple?: M;

  /** Флаг полной ширины календаря */
  fullSize?: boolean;

  /** Цвет заливки фона календаря */
  backgroundColor?: string;

  /** Дата "сегодня", которая может быть отлична от локального времени юзера */
  todayDate?: Date;
}

export interface ITimePickerValue<T = Date, K = string> {
  date: T;
  time: K;
}

export type TimePickerChangeObject = {
  date?: Date | null;
  time?: Date | null;
};

export interface ITimePickerProps extends Omit<ICalendarSharedProps, 'placeholder' | 'mask'> {
  value?: TimePickerChangeObject;

  defaultValue?: TimePickerChangeObject;

  onChange?: (value?: TimePickerChangeObject) => void;

  /** Вид квартала  */
  view?: 'month' | 'year' | 'decade';

  /** Сообщение об ошибке  */
  errorMessage?: Partial<ITimePickerValue<string>>;

  /** Placeholder поля ввода даты */
  datePlaceholder?: string;

  /** Placeholder поля ввода времени */
  timePlaceholder?: string;

  /** Маска ввода даты */
  dateMask?: string;

  /** Маска ввода времени */
  timeMask?: string;
}

export enum GoToDatePresets {
  'DAY' = 'day',
  'MONTH' = 'month',
  'QUARTER' = 'quarter',
}
