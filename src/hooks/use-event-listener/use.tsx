import { useRef, useState } from 'react';
import useEventListener from '.';

export default function UsageEventLister() {
  const [buttonClicked, setButtonClicked] = useState(0);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setButtonClicked(buttonClicked + 1);
  };

  useEventListener('click', handleClick, buttonRef);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEventListener('resize', handleResize);

  useEventListener('contextmenu', (contextMenuEvent) => {
    window.console.log({ contextMenuEvent });
  });

  return (
    <div>
      <h1>useEventListener</h1>
      <button ref={buttonRef} type="button">
        Click me
      </button>
      <p>Button clicked: {buttonClicked}</p>
      <p>Window width: {windowWidth}</p>
    </div>
  );
}
