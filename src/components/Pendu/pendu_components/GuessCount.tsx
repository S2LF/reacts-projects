import React from 'react';

type GuessCountType = {
  guesses: number;
  failed: number;
};
function GuessCount({ guesses, failed }: GuessCountType): JSX.Element {
  return (
    <div className={`guesses ${failed > 6 ? 'text-danger' : 'text-success'}`}>
      Tentative : {guesses}
    </div>
  );
}
export default GuessCount;
