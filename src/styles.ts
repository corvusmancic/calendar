import { colors, typography } from '@rgs-ui/design-tokens';
import styled, { css } from 'styled-components';
import { DESELECTION_CLASS_NAME, SELECTION_CLASS_NAME } from '@rgs-ui/date-utils';
import { Chips } from '@rgs-ui/chips';

export const PopOverWrapper = styled.div`
  padding: 2px;
`;

export const PeriodChips = styled(Chips)<{ isOpen: boolean }>`
  z-index: 1000;
  margin: 0;
  padding: 0;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  color: ${colors.gray[80]};

  &:hover {
    background: ${colors.gray[40]};
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      background: ${colors.gray[60]}!important;
    `};
`;

export const Month = styled.span<{ $disabled?: boolean }>`
  padding: 4px;
  height: 100%;
  border-radius: 2px;
  color: ${colors.gray[100]};
  text-transform: capitalize !important;
  pointer-events: all !important;
  ${typography.TEXT_2_ACCENT};

  &:hover,
  &:focus {
    ${({ $disabled }) =>
      $disabled
        ? css`
            cursor: default !important;
            pointer-events: none !important;
          `
        : css`
            background-color: ${colors.gray[40]};
            color: ${colors.gray[200]};
          `}
  }
`;

export const CalendarWrapper = styled.div<{
  $noShadow?: boolean;
  $isMobile: boolean;
  $fullSize?: boolean;
  $backgroundColor?: string;
}>`
  display: flex;
  flex-direction: column;
  width: ${props => (props?.$isMobile || props?.$fullSize ? '100%' : '306px')};
  position: relative;
  ${props =>
    props?.$backgroundColor
      ? css`
          background-color: ${props.$backgroundColor};
        `
      : ''}
  ${props =>
    props?.$isMobile
      ? css`
          max-width: 500px;
        `
      : ''}

  ${props =>
    props.$noShadow
      ? ''
      : css`
          box-shadow: 0 3px 16px rgba(42 49 56 / 8%);
        `}

  .react-calendar {
    background-color: transparent;
  }

  .calendarContainer {
    ${`.${SELECTION_CLASS_NAME}`} {
      border-radius: 0;
      background-color: ${colors.brandRed.red} !important;
      color: ${colors.gray[0]} !important;
    }

    padding: 0 1.2rem;
    width: 100%;
    border: none;

    .react-calendar__month-view__days {
      display: block;
      margin: auto;
    }

    .react-calendar__viewContainer {
      flex-grow: 1;
      min-height: 280px;
    }
  }

  .react-calendar__tile {
    height: 40px;
    border-radius: 2px;
    color: ${colors.gray[200]};
    ${typography.TEXT_2}

    &:hover,
    &:focus {
      background-color: ${colors.gray[40]};
      color: ${colors.gray[120]};
    }

    &:disabled {
      background-color: transparent;
      color: ${colors.gray[60]};
    }

    &--now {
      border: 1px solid ${colors.brandRed.red};
      background-color: ${colors.gray[0]};
    }

    &--active,
    &--hasActive {
      background-color: ${colors.brandRed.red} !important;
      color: ${colors.gray[0]} !important;

      &${`.${DESELECTION_CLASS_NAME}`} {
        background-color: ${colors.gray[0]} !important;
        color: ${colors.gray[200]} !important;
      }
    }

    &--range:not(
        &--rangeStart,
        &--rangeEnd,
        .react-calendar__year-view__months__month,
        .react-calendar__decade-view__years__year,
        .react-calendar__century-view
      ) {
      border-radius: 0 !important;
      background-color: ${colors.additionalRed[20]} !important;
      color: ${colors.gray[200]} !important;
    }

    &:enabled:hover,
    &:enabled:focus {
      background-color: ${colors.gray[40]};
    }
  }

  .react-calendar__month-view,
  .react-calendar__year-view,
  .react-calendar__decade-view {
    display: flex;
    align-items: center;
    min-height: 280px;

    & > div > div {
      display: flex !important;
      flex-direction: column !important;
      flex-grow: 1;
      width: 100% !important;
      height: 280px !important;
    }
  }

  .react-calendar__decade-view__years {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    margin: auto;
    height: 280px;
    text-transform: capitalize !important;
    gap: 8px;
  }

  .react-calendar__navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0;
    border-bottom: 1px solid ${colors.gray[40]};
    gap: 4px;

    .react-calendar__navigation__label {
      pointer-events: none !important;
    }

    .react-calendar__navigation__label__labelText {
      color: ${colors.gray[80]};
    }

    &__arrow {
      color: ${colors.gray[80]};

      &.react-calendar__navigation__prev-button,
      &.react-calendar__navigation__prev2-button,
      &.react-calendar__navigation__next-button,
      &.react-calendar__navigation__next2-button {
        display: grid;
        width: 20px;
        height: 20px;
        place-content: center;
      }

      & svg {
        width: 16px !important;
        height: 16px !important;
      }

      &:enabled:hover,
      &:enabled:focus {
        border-radius: 2px;
        background-color: ${colors.gray[40]};
        color: ${colors.gray[120]};
      }
    }

    & button {
      min-width: 20px !important;

      &:disabled {
        background-color: transparent;
        pointer-events: none;
      }
    }

    &__label {
      color: ${colors.gray[100]};
      text-transform: capitalize !important;
      ${typography.TEXT_2_ACCENT};

      &:enabled:hover,
      &:enabled:focus {
        background-color: transparent;
      }
    }
  }

  .react-calendar__month-view__weekdays__weekday {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: ${colors.gray[80]};
    text-transform: capitalize !important;
    ${typography.TEXT_2};

    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 0.8rem 1.2rem;
  }

  .react-calendar__year-view__months__month,
  .react-calendar__decade-view__years__year {
    flex: 0 0 auto !important;
    height: 32px;
    text-transform: capitalize !important;
  }

  .react-calendar__month-view__days {
    display: block;
    margin-block: auto;
  }

  .react-calendar__year-view__months {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    column-gap: 8px;
    justify-content: center;
    text-transform: capitalize !important;
    row-gap: 24px;
    margin-block: auto;

    & button {
      display: grid;
      place-content: center;
    }
  }

  .react-calendar--selectRange
    .react-calendar__tile--hover:not(.react-calendar__tile--rangeStart, .react-calendar__tile--rangeEnd),
  .react-calendar__tile
    .react-calendar__tile--active
    .react-calendar__tile--range
    .react-calendar__month-view__days__day {
    border-radius: 0 !important;
    background-color: ${colors.additionalRed[20]} !important;
  }
`;

export const LabelControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  gap: 0.4rem;
`;
