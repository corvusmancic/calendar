import { useCallback, useReducer, useState } from 'react';
import dayjs from 'dayjs';

import { Quarter } from '../types';
import { viewToQUnit } from '../utils';

import { DateValueState, ClickAction, ClickActionType } from './types';
import { dateValueToQuarterValue, quarterNormalizer, quarterToDate, quarterValueToDateValue } from './utils';

function dateValueReducer(state: DateValueState, action: ClickAction) {
  const {
    type,
    payload: { value, callback },
  } = action;

  switch (type) {
    case ClickActionType.DATE_PERIOD_CLICKED: {
      if (state.isFirstClick) {
        return {
          ...state,
          value: [value],
          isFirstClick: false,
        };
      }

      if (!state.value) return state;

      const newQuarters = [...state.value, value];
      const normalizedValue = quarterNormalizer(newQuarters);

      const res = {
        ...state,
        value: normalizedValue,
        isFirstClick: true,
      };

      callback?.(quarterValueToDateValue(res.value));
      return res;
    }

    case ClickActionType.UPDATE_MULTIPLE_DATE: {
      if (!state.value || !Array.isArray(state.value)) {
        return {
          ...state,
          value: [value],
        };
      }

      let existingQuarter: Quarter | null = null;
      const resultQuarters = state.value.reduce<Quarter[]>((acc, quarterItem) => {
        const isSameQuarter = dayjs(quarterToDate(quarterItem)).isSame(
          dayjs(quarterToDate(value)),
          viewToQUnit('year', true)
        );

        if (isSameQuarter) {
          existingQuarter = quarterItem;

          return acc;
        }

        return [...acc, quarterItem];
      }, []);

      if (!existingQuarter) {
        resultQuarters.push(value);
      }

      callback?.(quarterValueToDateValue(resultQuarters));

      return {
        ...state,
        value: resultQuarters,
      };
    }

    case ClickActionType.UPDATE_DATE: {
      const result = {
        ...state,
        value: [value],
      };

      callback?.(quarterValueToDateValue(result.value));
      return result;
    }

    default:
      return state;
  }
}

interface UseDateClick {
  incomingDateValue?: Date | Date[] | null;
}

const useDateClick = ({ incomingDateValue }: UseDateClick) => {
  const [state, dispatch] = useReducer(dateValueReducer, {
    value: dateValueToQuarterValue(incomingDateValue),
    isFirstClick: true,
  });

  const [hoverQuarter, setHoverQuarter] = useState<number | undefined>();

  const handleDateChange = useCallback((payload: ClickAction['payload']) => {
    dispatch({ type: ClickActionType.UPDATE_DATE, payload });
  }, []);

  const handleMultipleDateChange = useCallback((payload: ClickAction['payload']) => {
    dispatch({ type: ClickActionType.UPDATE_MULTIPLE_DATE, payload });
  }, []);

  const handleDateClick = useCallback(
    (payload: ClickAction['payload']) => {
      dispatch({ type: ClickActionType.DATE_PERIOD_CLICKED, payload });
      if (state.isFirstClick) {
        setHoverQuarter(undefined);
      }
    },
    [state.isFirstClick]
  );

  const handleMouseEnter = useCallback((arg: number) => {
    setHoverQuarter(arg);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverQuarter(undefined);
  }, []);

  return {
    value: state.value,
    isHoverOn: !state.isFirstClick,
    hoverQuarter,
    handlers: { handleDateClick, handleDateChange, handleMultipleDateChange, handleMouseEnter, handleMouseLeave },
  };
};

export default useDateClick;
