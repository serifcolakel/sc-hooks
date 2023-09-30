import './App.css';
import UsageEventLister from './hooks/use-event-listener/use';
import UsageLocalStorage from './hooks/use-local-storage/use';
import UsageSessionStorage from './hooks/use-session-storage/use';

function App() {
  window.console.log(import.meta.env);

  return (
    <main>
      <UsageEventLister />
      <UsageLocalStorage />
      <UsageSessionStorage />
    </main>
  );
}

export default App;
