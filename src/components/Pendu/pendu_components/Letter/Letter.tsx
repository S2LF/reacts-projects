import React from 'react';

import './Letter.css';

type LetterTypes = {
  letter: string;
  feedback: string;
  index: number;
  loading: boolean;
  onClick: (res: string) => void;
};
function Letter({
  letter,
  feedback,
  onClick,
  index,
  loading,
}: LetterTypes): JSX.Element {
  return (
    <button
      type="button"
      className={`letter ${feedback} `}
      disabled={feedback === 'use' || loading}
      onKeyDown={() => onClick(letter)}
      onClick={() => onClick(letter)}
    >
      <span data-id={index}>{letter}</span>
    </button>
  );
}

export default Letter;
