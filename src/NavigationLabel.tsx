import dayjs from 'dayjs';
import { Detail } from 'react-calendar';

import * as SC from './styles';
import { onCustomViewClick } from './utils';

export const NavigationLabel = (
  { view, locale, date }: { date: Date; locale: string; view: Detail },
  fn: (arg: Detail) => void
) => {
  switch (view) {
    case 'month':
      return (
        <SC.LabelControl>
          <SC.Month role='button' onClick={onCustomViewClick(() => fn('year'))}>
            {dayjs(date).locale(locale).format('MMMM')}
          </SC.Month>

          <SC.Month role='button' onClick={onCustomViewClick(() => fn('decade'))}>
            {dayjs(date).locale(locale).format('YYYY')}
          </SC.Month>
        </SC.LabelControl>
      );

    case 'year':
      return (
        <SC.Month role='button' onClick={onCustomViewClick(() => fn('decade'))}>
          {dayjs(date).format('YYYY')}
        </SC.Month>
      );

    default:
      return 'Годы';
  }
};
