import { renderHook, act } from '@testing-library/react';
import useDateClick from './useDateClick';

describe('useDateClick', () => {
  const mockCallback = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Инициализация с входящим значением даты', () => {
    const { result } = renderHook(() => useDateClick({ incomingDateValue: new Date('2023-01-01') }));
    expect(result.current.value).toEqual(expect.any(Array));
    expect(result.current.isHoverOn).toBe(false);
  });

  it('Обновления одной даты', () => {
    const { result } = renderHook(() => useDateClick({ incomingDateValue: null }));

    act(() => {
      result.current.handlers.handleDateChange({
        value: { quarter: 2, year: '2023' },
        callback: mockCallback,
      });
    });

    expect(result.current.value).toEqual([{ quarter: 2, year: '2023' }]);
    expect(mockCallback).toHaveBeenCalledWith(expect.any(Array));
  });

  it('Обработка события Hover', () => {
    const { result } = renderHook(() => useDateClick({}));

    act(() => {
      result.current.handlers.handleMouseEnter(1);
    });

    expect(result.current.hoverQuarter).toBe(1);

    act(() => {
      result.current.handlers.handleMouseLeave();
    });

    expect(result.current.hoverQuarter).toBeUndefined();
  });
});
