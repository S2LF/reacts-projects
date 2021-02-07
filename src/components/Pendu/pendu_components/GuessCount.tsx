import React from 'react';

type GuessCountType = {
  guesses: number;
  failed: number;
};
function GuessCount({ guesses, failed }: GuessCountType): JSX.Element {
  return (
    <div className={`${failed > 6 ? 'text-danger' : 'text-success'}`}>
      <h3>Tentative : {guesses}</h3>
    </div>
  );
}
export default GuessCount;
