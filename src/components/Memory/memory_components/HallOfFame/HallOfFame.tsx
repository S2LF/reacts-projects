import React from 'react';

import './HallOfFame.css';
import _ from 'lodash';

export type HoFTypes = {
  _id: string;
  guesses: number;
  date: string;
  name: string;
  justNew?: boolean;
};

export type HallOfFameTypes = {
  HoF: Array<HoFTypes>;
};

function HallOfFame({ HoF }: HallOfFameTypes): JSX.Element {
  // console.log(HoF);

  HoF.sort((a: { guesses: number }, b: { guesses: number }) => {
    return a.guesses - b.guesses;
  });
  // console.log('sorted', HoF);

  const HoFUniq = _.uniqBy(HoF, 'name');

  // console.log('uniq', _.uniqBy(HoF, 'name'));

  return (
    <>
      <h2 className="title">HighScores</h2>
      <table className="hallOfFame">
        <thead>
          <tr>
            <th>N°</th>
            <th>Score</th>
            <th>Joueur</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {HoFUniq.slice(0, 10).map(
            ({ _id, guesses, date, name, justNew }, index) => {
              return (
                <tr key={_id} className={justNew ? 'new' : ''}>
                  <td>{index + 1}</td>
                  <td className="score">{guesses}</td>
                  <td className="player">{name}</td>
                  <td className="date">{date}</td>
                </tr>
              );
            }
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="pt-2">
              Nombre total de scores enregistrés : {HoF.length}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default HallOfFame;
