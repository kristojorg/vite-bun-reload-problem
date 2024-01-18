import { css } from '../styled-system/css';

function App() {
  return (
    <div>
      <p
        className={css({
          bg: 'red.200',
          padding: '4',
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: 'pink.500',
        })}
      >
        Hello World, I should be pink.
      </p>
      <button
        className={css({
          rounded: 'sm',
          color: "blue.700",
          fontFamily: 'mono',
          px: '4',
          py: '2',
          _hover: {
            bg: 'gray.200',
          },
        })}
      >
        Click me. I am blue.
      </button>
    </div>
  );
}

export default App;
