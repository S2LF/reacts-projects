import React from 'react';

type GuessWordTypes = {
  letter: string;
  status: string;
};
function GuessWord({ letter, status }: GuessWordTypes): JSX.Element {
  const HIDDEN_SYMBOL = '\u00A0_\u00A0';

  function renderStatus(param: string) {
    switch (param) {
      case 'hidden':
        return <span className="hidden">{HIDDEN_SYMBOL}</span>;
      case 'visible':
        return <span className="visible">{letter}</span>;
      case 'resolve':
        return <span className="text-danger">{letter}</span>;
      default:
        return HIDDEN_SYMBOL;
    }
  }

  return <>{renderStatus(status)}</>;
}

export default GuessWord;
