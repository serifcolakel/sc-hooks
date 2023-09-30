import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import useEventListener from './index';

describe('useEventListener', () => {
  it('should add and remove event listener for window', () => {
    const eventHandler = vi.fn();

    const { unmount } = renderHook(() => {
      const elementRef = useRef(null);

      useEventListener('resize', eventHandler);

      return elementRef;
    });

    window.dispatchEvent(new Event('resize'));

    expect(eventHandler).toHaveBeenCalled();

    unmount();

    window.dispatchEvent(new Event('resize'));

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });

  it('should add and remove event listener for a specific element', () => {
    const eventHandler = vi.fn();

    const element = document.createElement('div');

    const { unmount } = renderHook(() => {
      const elementRef = useRef<HTMLDivElement>(element);

      useEventListener('click', eventHandler, elementRef);

      return elementRef;
    });

    element.click();

    expect(eventHandler).toHaveBeenCalled();

    unmount();

    element.click();

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });
});

describe('useEventListener with options', () => {
  it('should add and remove event listener for window', () => {
    const eventHandler = vi.fn();

    const { unmount } = renderHook(() => {
      const elementRef = useRef(null);

      useEventListener('resize', eventHandler, elementRef, {
        passive: true,
      });

      return elementRef;
    });

    window.dispatchEvent(new Event('resize'));

    expect(eventHandler).toHaveBeenCalled();

    unmount();

    window.dispatchEvent(new Event('resize'));

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });

  it('should add and remove event listener for a specific element', () => {
    const eventHandler = vi.fn();

    const element = document.createElement('a');

    const { unmount } = renderHook(() => {
      const elementRef = useRef<HTMLAnchorElement>(element);

      useEventListener('click', eventHandler, elementRef, {
        passive: true,
      });

      return elementRef;
    });

    element.click();

    expect(eventHandler).toHaveBeenCalled();

    unmount();

    element.click();

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });
});

describe('useEventListener with valid event names', () => {
  it('should add and remove event listener for window', () => {
    const eventHandler = vi.fn();

    const { unmount } = renderHook(() => {
      const elementRef = useRef(null);

      useEventListener('resize', eventHandler, elementRef);

      return elementRef;
    });

    window.dispatchEvent(new Event('resize'));

    expect(eventHandler).toHaveBeenCalled();

    unmount();

    window.dispatchEvent(new Event('resize'));

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });

  it('should add and remove event listener for a specific element', () => {
    const eventHandler = vi.fn();

    const element = document.createElement('div');

    const { unmount } = renderHook(() => {
      const elementRef = useRef<HTMLDivElement>(element);

      useEventListener('click', eventHandler, elementRef);

      return elementRef;
    });

    element.click();

    expect(eventHandler).toHaveBeenCalled();

    unmount();

    element.click();

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });
});

describe('useEventListener with valid event names and options', () => {
  it('should add and remove event listener for window', () => {
    const eventHandler = vi.fn();

    const { unmount } = renderHook(() => {
      const elementRef = useRef(null);

      useEventListener('resize', eventHandler, elementRef, {
        passive: true,
      });

      return elementRef;
    });

    window.dispatchEvent(new Event('resize'));

    expect(eventHandler).toHaveBeenCalled();

    unmount();

    window.dispatchEvent(new Event('resize'));

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });

  it('should add and remove event listener for a specific element', () => {
    const eventHandler = vi.fn();

    const element = document.createElement('a');

    const { unmount } = renderHook(() => {
      const elementRef = useRef<HTMLAnchorElement>(element);

      useEventListener('click', eventHandler, elementRef, {
        passive: true,
      });

      return elementRef;
    });

    element.click();

    expect(eventHandler).toHaveBeenCalled();

    unmount();

    element.click();

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });
});
