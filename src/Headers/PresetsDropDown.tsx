import React, { useCallback } from 'react';
import { OpUnitType, QUnitType } from 'dayjs';

import { getPresetRange, presetMinMaxClipped } from '@rgs-ui/date-utils';

import { List, ListItem } from './styles';

type PresetsDropDownProps = {
  onChange: (arg: [Date, Date]) => void;
  minDate?: Date;
  maxDate?: Date;
  isMobile?: boolean;
};

const PresetsDropDown = ({ onChange, minDate, maxDate, isMobile }: PresetsDropDownProps) => {
  const handleChange = useCallback(
    (arg: OpUnitType | QUnitType) => {
      onChange(presetMinMaxClipped(getPresetRange(arg), minDate, maxDate));
    },
    [maxDate, minDate, onChange]
  );

  return (
    <List isMobile={isMobile}>
      <ListItem isMobile={isMobile} onClick={() => handleChange('week')}>
        Текущая неделя
      </ListItem>
      <ListItem isMobile={isMobile} onClick={() => handleChange('M')}>
        Текущий месяц
      </ListItem>
      <ListItem isMobile={isMobile} onClick={() => handleChange('quarter')}>
        Текущий квартал
      </ListItem>
      <ListItem isMobile={isMobile} onClick={() => handleChange('year')}>
        Текущий год
      </ListItem>
    </List>
  );
};

export default PresetsDropDown;
