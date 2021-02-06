import React from 'react';

import './Letter.css';

type LetterTypes = {
  letter: string;
  feedback: string;
  index: number;
  onClick: (res: string) => void;
};
function Letter({
  letter,
  feedback,
  onClick,
  index,
}: LetterTypes): JSX.Element {
  return (
    <button
      type="button"
      className={`letter ${feedback} `}
      disabled={feedback === 'use'}
      onKeyDown={() => onClick(letter)}
      onClick={() => onClick(letter)}
    >
      <span data-id={index}>{letter}</span>
    </button>
  );
}

export default Letter;
