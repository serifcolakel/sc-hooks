# Simplify Session Storage in React with the useSessionStorage Hook

[Author Twitter](https://twitter.com/ColakelSerif)
[Author GitHub](https://github.com/serifcolakel)
[Github Repository](https://github.com/serifcolakel/sc-hooks)

## 🎉 Let's get started!

If you've ever found session storage management in your React applications to be a bit cumbersome, I have some exciting news for you! Today, we're unveiling the `useSessionStorage` hook, a powerful tool that simplifies the way you work with session storage. 🚀

## ℹ️ What is useSessionStorage?

`useSessionStorage` is a custom React hook that streamlines the process of interacting with session storage. It offers a clean and type-safe API for setting, getting, and removing session storage items. Let's dive in!

## ✅ Key Features

- `Type Safety`:  Say goodbye to runtime errors! `useSessionStorage` ensures type safety by allowing you to specify the data type you want to store, reducing the risk of unexpected bugs.

- `Ease of Use`: `useSessionStorage` provides a straightforward API. You have three essential methods at your disposal: `setter` to store data, `getter` to retrieve it, and `remover` to delete it.

- `JSON Serialization`: Complex data types? No problem! The hook handles JSON serialization and deserialization for you, making it a breeze to work with various data structures.

- `Name Compatibility`: `useSessionStorage` hook return the array for name compatibility like `useState` hook. The first element of the array is the `getter` function, the second element is the `setter` function, and the third element is the `remover` function.

## 🎉 Getting Started

To get started, we'll need to create a custom hook called `useSessionStorage` that will handle all of our session storage operations. This hook will take in a key and an initial value, and it will return a tuple containing the value and a setter function. Let's take a look at the code.

```ts
export type TUseSessionStorage<T> = [
  () => T | undefined,
  (value: T) => void,
  () => void,
];

/**
 * @description A hook that provides functions to interact with a session storage item.
 * @param key - The key of the session storage item.
 * @returns An array of functions to get, set and remove the session storage item.
 */
export function useSessionStorage<T>(key: string): TUseSessionStorage<T> {
  /**
   * @description Sets the session storage item with the provided value.
   * @param value - The value to set the session storage item to.
   * @returns {void}
   */
  const setSessionStorageItem = (value: T): void => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      window.console.error(error);
    }
  };

  /**
   * @description Gets the session storage item.
   * @returns {T | undefined} The session storage item or undefined if it does not exist.
   */
  const getSessionStorageItem = (): T | undefined => {
    try {
      const item = window.sessionStorage.getItem(key);

      if (item === null) return undefined;

      return JSON.parse(item);
    } catch (error) {
      window.console.error(error);

      return undefined;
    }
  };

  /**
   * @description Removes the session storage item.
   * @returns {void}
   */
  const removeSessionStorageItem = (): void => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      window.console.error(error);
    }
  };

  return [
    getSessionStorageItem,
    setSessionStorageItem,
    removeSessionStorageItem,
  ];
}
```

As you can see, the `useSessionStorage` hook returns a tuple containing three functions: `First Index (getter)`, `Second Index (setter)`, and `Third Index (remover)`. Let's take a closer look at each of these functions.

- `First Index (getter)`: This function retrieves the value from local storage and returns it. If an error occurs, it returns `undefined`.

- `Second Index (setter)`: This function sets the value in local storage. If an error occurs, it logs the error to the console.

- `Third Index (remover)`: This function removes the value from local storage. If an error occurs, it logs the error to the console.

## ⛯ Usage

Now that we've created our custom hook, let's see how we can use it in our React applications. First, we'll need to import the hook into our component.

```tsx
import { useSessionStorage } from './useSessionStorage';

const COUNT_KEY = 'count';

export default function UsageSessionStorage() {
  // Use the useSessionStorage hook to store and retrieve a value
  const [getSessionCount, setSessionCount, removeSessionCount] =
    useSessionStorage<number>(COUNT_KEY);

  const handleIncrement = () => {
    const currentCount = getSessionCount() || 0;

    setSessionCount(currentCount + 1);
  };

  const handleDecrement = () => {
    const currentCount = getSessionCount() || 0;

    setSessionCount(currentCount - 1);
  };

  const handleShow = () => {
    // eslint-disable-next-line no-alert
    alert(
      `The current count is ${
        getSessionCount() ??
        'undefined. Please click on Increment or Decrement.'
      }`
    );
    window.console.log(getSessionCount(), 'getSessionCount');
  };

  return (
    <div>
      <h1>useSessionStorage</h1>
      <button onClick={handleShow} type="button">
        Show
      </button>
      <button onClick={handleIncrement} type="button">
        Increment
      </button>
      <button onClick={handleDecrement} type="button">
        Decrement
      </button>
      <button onClick={removeSessionCount} type="button">
        Reset
      </button>
    </div>
  );
}
```

## 🧪 Testing with Vitest

We can test our custom hook with vitest. Let's take a look at the code.

```ts
import { test } from 'vitest';
import { useSessionStorage } from './index';

test('useSessionStorage hook with string', async ({ expect }) => {
  const TEST_OPTION = {
    KEY: 'test-key-string',
    VALUE: 'test-value',
  };

  const [getString, setString, removeString] = useSessionStorage<string>(
    TEST_OPTION.KEY
  );

  setString(TEST_OPTION.VALUE);
  const value = getString();

  expect(value).toEqual(TEST_OPTION.VALUE);

  expect(value).toBe(TEST_OPTION.VALUE);

  removeString();
  expect(getString()).toBeUndefined();
});

test('useSessionStorage hook with object', async ({ expect }) => {
  const TEST_OPTION = {
    KEY: 'test-key-object',
    VALUE: {
      name: 'test-value',
    },
  };

  const [getObject, setObject, removeObject] = useSessionStorage<{
    name: string;
  }>(TEST_OPTION.KEY);

  setObject(TEST_OPTION.VALUE);
  expect(getObject()).toEqual(TEST_OPTION.VALUE);

  const value = getObject();

  expect(value).toEqual(TEST_OPTION.VALUE);

  removeObject();
  expect(getObject()).toBeUndefined();
});

test('useSessionStorage hook with number', async ({ expect }) => {
  const TEST_OPTION = {
    KEY: 'test-key-number',
    VALUE: 11,
  };

  const [getNumber, setNumber, removeNumber] = useSessionStorage<number>(
    TEST_OPTION.KEY
  );

  setNumber(TEST_OPTION.VALUE);
  expect(getNumber()).toEqual(TEST_OPTION.VALUE);

  const value = getNumber();

  expect(value).toEqual(TEST_OPTION.VALUE);

  removeNumber();
  expect(getNumber()).toBeUndefined();
});

test('useSessionStorage hook with boolean', async ({ expect }) => {
  const TEST_OPTION = {
    KEY: 'test-key-boolean',
    VALUE: true,
  };

  const [getBoolean, setBoolean, removeBoolean] = useSessionStorage<boolean>(
    TEST_OPTION.KEY
  );

  setBoolean(TEST_OPTION.VALUE);
  expect(getBoolean()).toEqual(TEST_OPTION.VALUE);

  const value = getBoolean();

  expect(value).toEqual(TEST_OPTION.VALUE);

  removeBoolean();
  expect(getBoolean()).toBeUndefined();
});

test('useSessionStorage hook with array', async ({ expect }) => {
  const TEST_OPTION = {
    KEY: 'test-key-array',
    VALUE: ['test-value-1', 'test-value-2'],
  };

  const [getArray, setArray, removeArray] = useSessionStorage<string[]>(
    TEST_OPTION.KEY
  );

  setArray(TEST_OPTION.VALUE);
  expect(getArray()).toEqual(TEST_OPTION.VALUE);

  const value = getArray();

  expect(value).toEqual(TEST_OPTION.VALUE);

  removeArray();
  expect(getArray()).toBeUndefined();
});

```

## 📚 Conclusion

In the realm of web development, simplicity and efficiency are key to creating outstanding user experiences. With the introduction of the `useSessionStorage` hook, managing session storage in your React applications has never been easier.

This custom hook offers a clean, type-safe interface for performing session storage operations. It takes care of JSON serialization, simplifies the process of setting, retrieving, and removing session storage items, and significantly reduces the potential for runtime errors.

Whether you're building a small-scale web app or a complex enterprise-level application, `useSessionStorage` empowers you to work with session storage seamlessly, ensuring that user data and state are stored and managed effortlessly between sessions.

Give `useSessionStorage` a try in your next React project and experience firsthand how it simplifies session storage management. You can find the complete source code and usage examples in the GitHub repository linked in the Medium post.

Thank you for joining us on this journey to streamline session storage in React. May your development endeavors be more efficient and user-centric with the help of `useSessionStorage`! 🚀👩‍💻👨‍💻 

#ReactJS #SessionStorage #CustomHook #WebDevelopment