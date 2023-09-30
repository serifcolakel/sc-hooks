import { useLocalStorage } from '.';

const TOKEN_KEY = 'token';

export default function UsageLocalStorage() {
  const [getToken, setToken, removeToken] = useLocalStorage<boolean>(TOKEN_KEY);

  return (
    <div>
      <h1>useLocalStorage</h1>
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
