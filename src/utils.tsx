import { MouseEvent } from 'react';
import { QUnitType } from 'dayjs';
import { Detail } from 'react-calendar';
import { getIconFromLibrary } from '@rgs-ui/icons';

import { DetailValues, ViewArrowIconMap } from './const';
import { ArrowTypes } from './types';

export const onCustomViewClick = (callback: () => void) => (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();

  callback();
};

export const getArrow = (arrowName: ArrowTypes, view: Detail) => {
  const arrow = ViewArrowIconMap[arrowName][view];

  return arrow ? getIconFromLibrary(arrow) : null;
};

export const getAllowedView = (detail: Detail, minDetail: Detail = 'century', maxDetail: Detail = 'month'): Detail => {
  const compIn = Math.max(Math.min(DetailValues[detail], DetailValues[minDetail]), DetailValues[maxDetail]);

  return (
    (Object.entries(DetailValues).find(objectArrays => objectArrays[1] === compIn)?.[0] as Detail | undefined) ||
    'month'
  );
};

export const viewToQUnit = (view: Detail, isQuarterView: boolean): QUnitType => {
  switch (view) {
    case 'month':
      return 'D';

    case 'year':
      return isQuarterView ? 'Q' : 'M';

    case 'decade':
      return 'y';

    default:
      return 'y';
  }
};
