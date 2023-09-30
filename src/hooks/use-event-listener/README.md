# Simplify Event Handling in React with the useEventListener Custom Hook

Event handling in React can sometimes be a bit cumbersome, especially when you need to attach and manage event listeners in various scenarios. To address this, I've created the useEventListener custom hook, which streamlines event handling and cleanup. In this article, we'll explore how to use this hook effectively in your React applications.

## Introduction

Event handling is a fundamental part of front-end development, and in React, it's no different. Whether you're working with window events, media queries, or DOM elements, managing event listeners can quickly become complex. The useEventListener hook aims to simplify this process by providing a clean and consistent way to attach and detach event listeners.

## Key Features

✅ **Flexibility**: The useEventListener hook is versatile and can be used for a wide range of event types, including window events, media queries, and DOM elements. It adapts to your specific needs.

✅ **Automatic Cleanup**: No need to worry about cleaning up your event listeners manually. The hook takes care of that for you when the component unmounts, preventing potential memory leaks.

✅ **Improved Code Readability**: By abstracting the event listener logic into a custom hook, your component code becomes cleaner and more readable. It's easier to understand and maintain.

## How to Use useEventListener

Let's dive into some practical examples of how to use the useEventListener hook.

## useEventListener Hook

The useEventListener hook accepts three arguments:

- `eventName`: The name of the event to listen for.
- `handler`: The event handler function.
- `element`: The DOM element to attach the event listener to. If no element is provided, the event listener will be attached to the window.
- `options`: An optional object containing additional options for the event listener. The default value is `{}`.

```ts

import { RefObject, useEffect, useRef } from 'react';

function useEventListener<K extends keyof MediaQueryListEventMap>(
  eventName: K,
  handler: (event: MediaQueryListEventMap[K]) => void,
  element: RefObject<MediaQueryList>,
  options?: boolean | AddEventListenerOptions,
): void;

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions,
): void;

function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
): void;

function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: RefObject<Document>,
  options?: boolean | AddEventListenerOptions,
): void;

function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends HTMLElement | MediaQueryList | void = void,
>(
  eventName: KW | KH | KM,
  handler: (
    event:
    | WindowEventMap[KW]
    | HTMLElementEventMap[KH]
    | MediaQueryListEventMap[KM]
    | Event,
  ) => void,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [ handler ]);

  useEffect(() => {
    const targetElement: T | Window = element?.current ?? window;

    if (!(targetElement?.addEventListener)) return;

    const listener: typeof handler = (event) => savedHandler.current(event);

    targetElement.addEventListener(eventName, listener, options);

    return () => {
      targetElement.removeEventListener(eventName, listener, options);
    };
  }, [ eventName, element, options ]);
}

export default useEventListener;
```


### Example 1: Window Events

In this example, we'll attach a window event listener to the resize event. The event listener will update the windowWidth state variable with the current window width.

```tsx

import React, { useState } from 'react';
import useEventListener from './useEventListener';

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEventListener('resize', handleResize);

  return (
    <div>
      <p>Window width: {windowWidth}</p>
    </div>
  );
};

export default App;
```

### Example 2: DOM Elements

In this example, we'll attach a click event listener to a button element. The event listener will update the buttonClicked state variable with the current click count.

```tsx

import React, { useState } from 'react';

const App = () => {
  const [buttonClicked, setButtonClicked] = useState(0);

  const handleClick = () => {
    setButtonClicked(buttonClicked + 1);
  };

  useEventListener('click', handleClick, buttonRef.current);

  return (
    <div>
      <button ref={buttonRef}>Click me</button>
      <p>Button clicked: {buttonClicked}</p>
    </div>
  );
};

export default App;
```

### Example 3: Media Queries

In this example, we'll attach a media query event listener to the window. The event listener will update the isMobile state variable with the current media query match.

```tsx

import React, { useState } from 'react';

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMediaQueryChange = (e: MediaQueryListEvent) => {
    setIsMobile(e.matches);
  };

  useEventListener('change', handleMediaQueryChange, mediaQueryList);

  return (
    <div>
      <p>Is mobile: {isMobile ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default App;
```

### Example 4: With Ref

In this example, we'll attach a click event listener to a button element. The event listener will update the buttonClicked state variable with the current click count.

```tsx
import React, { useState, useRef } from 'react';
import useEventListener from './useEventListener';

const App = () => {
  const [buttonClicked, setButtonClicked] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setButtonClicked(buttonClicked + 1);
  };

  useEventListener('click', handleClick, buttonRef.current);

  return (
    <div>
      <button ref={buttonRef}>Click me</button>
      <p>Button clicked: {buttonClicked}</p>
    </div>
  );
};

export default App;
```

## Conclusion

The useEventListener custom hook is a powerful tool for simplifying event handling in your React applications. By encapsulating event listener logic, it promotes cleaner and more maintainable code. Say goodbye to manual cleanup and repetitive code!

One of the best things about the useEventListener hook is its flexibility. It can be used for a wide range of event types, including window events, media queries, and DOM elements. It adapts to your specific needs.

To get started with the useEventListener hook and explore more advanced use cases, check out the [Code Gist Link](https://gist.github.com/serifcolakel/5371623d19eee2e4630ff3e11ef3c64e) for the source code and documentation.

Happy coding! 🚀