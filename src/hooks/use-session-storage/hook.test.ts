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
