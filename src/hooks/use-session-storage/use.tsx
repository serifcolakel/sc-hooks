import { useSessionStorage } from '.';

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
