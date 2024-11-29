import { Button, TButtonProps } from '@rgs-ui/button';
import { colors, typography } from '@rgs-ui/design-tokens';
import { IconButton } from '@rgs-ui/icon-button';
import { createPolymorphicComponent } from '@rgs-ui/utils';
import styled, { css } from 'styled-components';

export const QuarterYearViewWrapper = styled.div<{ standAlone: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 12px 12px 0;
  width: 100%;
  height: 324px;
  background: ${colors.gray[0]};
  ${({ standAlone }) =>
    standAlone &&
    css`
      box-shadow: 0px 3px 16px rgb(42 49 56 / 8%);
    `}
  gap: 12px;
`;

export const Buttons = styled.div`
  display: flex;
  flex: none;
  flex-direction: row;
  flex-grow: 0;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  width: 100%;
  height: 20px;
`;

export const IconButtonStyled = styled(IconButton)`
  display: flex;
  flex: none;
  flex-direction: row;
  flex-grow: 0;
  align-items: flex-start;
  padding: 2px;
  height: 20px;
  border-radius: 2px;
  color: ${colors.gray[80]};
  gap: 10px;
`;

export const _ButtonStyled = styled(Button)`
  ${typography.TEXT_2_ACCENT}
  display: flex;
  flex: none;
  flex-direction: row;
  flex-grow: 0;
  align-items: center;
  padding: 2px 4px;
  width: 41px;
  height: 20px;
  border-radius: 2px;
  background: ${colors.gray[0]};
  gap: 10px;
`;

export const ButtonStyled = createPolymorphicComponent<'button', TButtonProps>(_ButtonStyled);

export const Quarters = styled.div`
  display: flex;
  flex: none;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  align-self: stretch;
  justify-content: center;
  box-sizing: border-box;
  padding: 0;
  width: 100%;
  border-block-start: 1px solid ${colors.gray[40]};
  gap: 24px;
`;

interface QuartersItemProps {
  selected?: boolean;
  thisQuarter?: boolean;
  isDisabled?: boolean;
  hovered?: boolean;
}
export const QuartersItem = styled.button<QuartersItemProps>`
  padding: 8px 0;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 2px;
  background: ${colors.gray[0]};
  background-color: transparent;
  color: ${colors.gray[200]};
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  ${typography.TEXT_2}

  &:hover {
    border: 1px solid ${colors.gray[0]};
    background: ${colors.gray[40]};
  }

  &:active {
    border: 1px solid transparent;
    background: ${colors.gray[60]};
  }

  ${({ selected, isDisabled }) =>
    selected && !isDisabled
      ? css`
          background: ${colors.brandRed.red};
          color: ${colors.gray[0]};

          &:hover {
            background: ${colors.brandRed.red};
            color: white;
          }

          &:active {
            background: ${colors.brandRed.red};
            color: white;
          }
        `
      : ''}

  ${({ thisQuarter, isDisabled }) =>
    thisQuarter && !isDisabled
      ? css`
          border: 1px solid ${colors.brandRed.red};

          &:hover {
            border: 1px solid ${colors.brandRed.red};
          }

          &:active {
            border: 1px solid ${colors.brandRed.red};
          }
        `
      : ''}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: ${colors.gray[80]};
      pointer-events: none;
    `}

    ${({ hovered, selected, isDisabled }) =>
    hovered && !selected && !isDisabled
      ? css`
          background-color: ${colors.additionalRed[20]}!important;
        `
      : ''}
`;
