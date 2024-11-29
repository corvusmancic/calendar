import { Button, TButtonProps } from '@rgs-ui/button';
import { colors, typography } from '@rgs-ui/design-tokens';
import { createPolymorphicComponent } from '@rgs-ui/utils';
import styled from 'styled-components';

export const GoToTodayLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 2.4rem);
  height: 25px;
  border-top: 1px solid ${colors.gray[40]};
  ${typography.TEXT_1}
  margin-inline: 1.2rem;
  padding-block: 1.2rem;
`;

export const _GoToTodayLink = styled(Button)`
  color: ${colors.blue[80]};

  &:hover,
  &:active {
    color: ${colors.blue[100]};
  }
`;

export const GoToTodayLink = createPolymorphicComponent<'button', TButtonProps>(_GoToTodayLink);
