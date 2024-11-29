import React, { FC } from 'react';
import { EButtonVariants } from '@rgs-ui/button';

import { GoToTodayLink, GoToTodayLinkWrapper } from './styles';

type TodayButtonProps = {
  onClick: () => void;
  text?: string;
};

const TodayButton: FC<TodayButtonProps> = ({ onClick, text }) => (
  <GoToTodayLinkWrapper>
    <GoToTodayLink variant={EButtonVariants.LINK} onClick={onClick}>
      {text}
    </GoToTodayLink>
  </GoToTodayLinkWrapper>
);

export default TodayButton;
