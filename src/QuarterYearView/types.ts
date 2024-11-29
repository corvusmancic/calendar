import { IQuarterYearView, Quarter } from '../types';

export enum YearActions {
  ADD = 1,
  SUBTRACT = -1,
}

export enum ClickActionType {
  DATE_PERIOD_CLICKED = 'DATE_PERIOD_CLICKED',
  UPDATE_DATE = 'UPDATE_DATE',
  UPDATE_MULTIPLE_DATE = 'UPDATE_MULTIPLE_DATE',
}

export interface DateValueState {
  value: Quarter[] | null;
  isFirstClick: boolean;
}

export interface ClickAction {
  type: ClickActionType;
  payload: { value: Quarter; callback?: (values: Date | Date[]) => void };
}

export type IQuarterYearViewProps<R extends boolean, M extends boolean, H extends boolean> = IQuarterYearView<
  R,
  M,
  H
> & {
  standAlone?: boolean;
  selectRange?: boolean;
};
