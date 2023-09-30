import { test } from 'vitest';
import { useLocalStorage } from './index';

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
