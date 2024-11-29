import { Button, TButtonProps } from '@rgs-ui/button';
import { colors, typography } from '@rgs-ui/design-tokens';
import { createPolymorphicComponent } from '@rgs-ui/utils';
import { Input } from '@rgs-ui/input';
import { Toggle } from '@rgs-ui/toggle';
import styled from 'styled-components';

export const Col = styled.div`
  display: flex;
  width: 25%;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 12px;
  width: 100%;
  height: fit-content;
  gap: 12px;
`;

export const SettingsWrapper = styled.div<{ $hidePeriodSwitcher: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => (props.$hidePeriodSwitcher ? 'flex-end' : 'space-between')};
  padding: 0;
  width: 100%;
  gap: 4px;

  & > div {
    column-gap: 0.8rem;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0;
  width: 100%;
  min-height: 40px;
  gap: 4px;

  & input {
    &::selection {
      background: ${colors.blue[40]};
    }

    height: 40px;
    font-size: 14px;
  }
`;

export const ToggleWrapper = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  div {
    justify-content: ${props => (!props?.$isMobile ? 'start' : 'space-between')};
  }
`;

export const StyledToggle = styled(Toggle)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  width: 4rem;
  height: 2rem;
  gap: 8px !important;

  &::after {
    width: 2rem;
    height: 2rem;
  }

  &:checked::after {
    left: calc(100% - 2rem);
  }
`;

export const _ClearButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 2px 4px;
  height: 20px;
  border-radius: 2px;
  background: ${colors.gray[0]};
  color: ${colors.gray[100]};
  gap: 6px;
`;

export const ClearButton = createPolymorphicComponent<'button', TButtonProps>(_ClearButton);

export const PeriodInputStyled = styled(Input)`
  flex: 1;
  min-width: fit-content;

  & ::placeholder {
    color: ${colors.gray[80]} !important;
  }
`;

export const ListWrapper = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  padding-bottom: 28px;
  background: ${colors.gray[0]};
  z-index: 100;
`;

export const ListWrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 12px;
`;

export const List = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 0 12px;
  min-height: 144px;
  border-radius: 2px;
  box-shadow: ${props => (!props?.isMobile ? '0 3px 16px rgb(42 49 56 / 8%)' : 'none')};
  background: ${colors.gray[0]};
  cursor: pointer;
  gap: 4px;
`;

export const ListItem = styled.div<{ isMobile?: boolean }>`
  box-sizing: border-box;
  padding: ${props => (!props?.isMobile ? '8px 12px' : '16px 12px')};
  width: 100%;
  height: ${props => (!props?.isMobile ? '32px' : '48px')};
  color: ${colors.gray[200]};
  border-bottom: ${props => (!props?.isMobile ? 'none' : `1px solid ${colors.gray[40]}`)};
  ${typography.TEXT_2}

  &:hover {
    background: ${colors.gray[40]};
  }
`;

export const SingleInputWrapper = styled.div`
  width: 100%;

  input::placeholder {
    color: ${colors.gray[80]};
  }
`;
