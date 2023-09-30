# Simplify Local Storage Management in React with the useLocalStorage Hook

[Author Twitter](https://twitter.com/ColakelSerif)
[Author GitHub](https://github.com/serifcolakel)

## 🎉 Let's get started!

Are you tired of the hassle that comes with managing local storage in your React applications? If so, I've got some good news for you! Today, we're going to dive into a custom hook called `useLocalStorage` that will make your life as a developer a whole lot easier. 🚀

## ℹ️ What is Local Storage?

`useLocalStorage` is a custom React hook that abstracts away the complexity of working with the browser's local storage. It provides a clean and type-safe API for `setting`, `getting` and `removing` data from local storage. Let's take a closer look.

## ✅ Key Features

- `Type Safety`: One of the primary benefits of using this hook is the type safety it offers. You specify the data type you want to store, and TypeScript ensures that you're always working with the correct data structure.

- `Simplicity`: useLocalStorage provides a straightforward API. You have three essential methods at your disposal: `setter` to store data, `getter` to retrieve it, and `remover` to delete it.

- `JSON Serialization`: The hook takes care of JSON serialization and deserialization for you, so you can store complex data types without worrying about converting them to strings.

- `Name Compatibility`: `useLocalStorage` hook return the array for name compatibility like `useState` hook. The first element of the array is the `getter` function, the second element is the `setter` function, and the third element is the `remover` function.

## 🎉 Getting Started

To get started, we'll need to create custom hook called `useLocalStorage` that will handle all of our local storage operations. This hook will take in a key and an initial value, and it will return a tuple containing the value and a setter function. Let's take a look at the code.

```ts
export type TUseLocalStorage<T> = [
  () => T | undefined,
  (value: T) => void,
  () => void
];

/**
 * @author Serif Colakel
 * @name useLocalStorage
 * @description See the test for this hook {@link https://gist.github.com/serifcolakel/44cb296dd5cb8983a5e2deb14d962878 Gist Link}
 * @description A custom hook that provides methods to interact with the local storage.
 * @template T - The type of the value to be stored in the local storage.
 * @param {string} key - The key to be used to store the value in the local storage.
 * @returns {TUseLocalStorage} - An object containing methods to set, get and remove the value from the local storage.
 */
export function useLocalStorage<T>(key: string): TUseLocalStorage<T> {
  /**
   * @description A function to set the value in the local storage.
   * @param {T} value - The value to be stored in the local storage.
   * @returns {void}
   */
  const setItem = (value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      window.console.log(error);
    }
  };

  /**
   * @description A function to get the value from the local storage.
   * @returns {T | undefined} - The value retrieved from the local storage, or undefined if an error occurred.
   */
  const getItem = (): T | undefined => {
    try {
      const item = window.localStorage.getItem(key);

      if (item === null) return undefined;

      return JSON.parse(item);
    } catch (error) {
      window.console.log(error);

      return undefined;
    }
  };

  /**
   * @description A function to remove the value from the local storage.
   * @returns {void}
   */
  const removeItem = (): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      window.console.log(error);
    }
  };

  return [getItem, setItem, removeItem];
}
```

As you can see, the `useLocalStorage` hook returns a tuple containing three functions: `First Index (getter)`, `Second Index (setter)`, and `Third Index (remover)`. Let's take a closer look at each of these functions.

- `First Index (getter)`: This function retrieves the value from local storage and returns it. If an error occurs, it returns `undefined`.

- `Second Index (setter)`: This function sets the value in local storage. If an error occurs, it logs the error to the console.

- `Third Index (remover)`: This function removes the value from local storage. If an error occurs, it logs the error to the console.

## ⛯ Usage

Now that we've created our custom hook, let's see how we can use it in our React applications. First, we'll need to import the hook into our component.

```tsx
const TOKEN_KEY = 'token';

function UseHook() {
  const [getToken, setToken, removeToken] = useLocalStorage<boolean>(TOKEN_KEY);

  return (
    <div>
      <button
        onClick={() => {
          setToken(Boolean(Math.round(Math.random() * 10) % 2));
        }}
        type="button"
      >
        Set Item
      </button>
      <button
        onClick={() => {
          removeToken();
        }}
        type="button"
      >
        Remove Item
      </button>
      <button
        onClick={() => {
          // eslint-disable-next-line no-alert
          alert(getToken());
        }}
        type="button"
      >
        Show Item
      </button>
    </div>
  );
}
```

## 🧪 Testing with Vitest

We can test our custom hook with vitest. Let's take a look at the code.

```ts
import { test } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

const EMPTY_VALUE = undefined;

test('useLocalStorage hook with string', async ({ expect }) => {
  const TEST_OPTION = {
    KEY: 'test-key-string',
    VALUE: 'test-value',
  };

  const [getItem, setItem, removeItem] = useLocalStorage<string>(
    TEST_OPTION.KEY
  );

  setItem(TEST_OPTION.VALUE);
  const value = getItem();

  expect(value).toEqual(TEST_OPTION.VALUE);

  expect(value).toBe(TEST_OPTION.VALUE);

  removeItem();
  expect(getItem()).toBe(EMPTY_VALUE);
});

test('useLocalStorage hook with object', async ({ expect }) => {
  const TEST_OPTION = {
    KEY: 'test-key-object',
    VALUE: {
      name: 'test-value',
    },
  };

  const [getObject, setObject, removeObject] = useLocalStorage<{
    name: string;
  }>(TEST_OPTION.KEY);

  setObject(TEST_OPTION.VALUE);
  expect(getObject()).toEqual(TEST_OPTION.VALUE);

  const value = getObject();

  expect(value).toEqual(TEST_OPTION.VALUE);

  removeObject();
  expect(getObject()).toBe(EMPTY_VALUE);
});

test('useLocalStorage hook with number', async ({ expect }) => {
  const TEST_OPTION = {
    KEY: 'test-key-number',
    VALUE: 6,
  };

  const [getItem, setItem, removeItem] = useLocalStorage<number>(
    TEST_OPTION.KEY
  );

  setItem(TEST_OPTION.VALUE);
  expect(getItem()).toEqual(TEST_OPTION.VALUE);

  const value = getItem();

  expect(value).toEqual(TEST_OPTION.VALUE);

  removeItem();
  expect(getItem()).toBe(EMPTY_VALUE);
});

test('useLocalStorage hook with boolean', async ({ expect }) => {
  const TEST_OPTION = {
    KEY: 'test-key-boolean',
    VALUE: true,
  };

  const [getItem, setItem, removeItem] = useLocalStorage<boolean>(
    TEST_OPTION.KEY
  );

  setItem(TEST_OPTION.VALUE);
  expect(getItem()).toEqual(TEST_OPTION.VALUE);

  const value = getItem();

  expect(value).toEqual(TEST_OPTION.VALUE);

  removeItem();
  expect(getItem()).toBe(EMPTY_VALUE);
});

test('useLocalStorage hook with array', async ({ expect }) => {
  const TEST_OPTION = {
    KEY: 'test-key-array',
    VALUE: ['test-value-1', 'test-value-2'],
  };

  const [getItem, setItem, removeItem] = useLocalStorage<string[]>(
    TEST_OPTION.KEY
  );

  setItem(TEST_OPTION.VALUE);
  expect(getItem()).toEqual(TEST_OPTION.VALUE);

  const value = getItem();

  expect(value).toEqual(TEST_OPTION.VALUE);

  removeItem();
  expect(getItem()).toBe(EMPTY_VALUE);
});
```

## 📚 Conclusion

In the ever-evolving world of web development, simplifying common tasks like local storage management can significantly boost productivity and reduce potential errors. The `useLocalStorage` hook we've introduced today is a fantastic addition to your toolkit for React applications.

By providing a clean and type-safe interface, handling JSON serialization, and streamlining the process of setting, getting, and removing data from local storage, `useLocalStorage` empowers developers to focus on creating remarkable user experiences rather than wrestling with the intricacies of browser storage.

Whether you're building a small personal project or a large-scale application, this custom hook can save you time, improve code maintainability, and contribute to a smoother development process. It's all about making your life easier and your code more robust.

So, give `useLocalStorage` a try in your next React project and witness firsthand how it simplifies local storage management. You can find the complete source code and usage examples in the GitHub repository linked in the Medium post.

Thank you for joining us on this journey to streamline local storage in React. 

Happy coding, and may your development endeavors be more efficient and enjoyable! 🚀👨‍💻👩‍💻 

#ReactJS #LocalStorage #CustomHook #WebDevelopment