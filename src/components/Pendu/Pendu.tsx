import React, { useEffect, useState } from 'react';
import './Pendu.css';
import difference from 'lodash.difference';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  Card,
  CardBody,
  CardText,
} from 'reactstrap';
import axios from 'axios';
import Letter from './pendu_components/Letter/Letter';
import GuessCount from './pendu_components/GuessCount';
import GuessWord from './pendu_components/GuessWord';

const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LETTERS = SYMBOLS.split('');

function Pendu(): JSX.Element {
  const [tried, setTried] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<number>(0);
  const [failed, setFailed] = useState<number>(0);
  const [words, setWords] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState(false);
  const [newWordInput, setNewWordInput] = useState<string>('');
  const [fetchData, setFetchData] = useState(false);

  function getFeedbackForLetter(letter: string) {
    const usedLetter = tried.includes(letter);
    if (usedLetter) {
      return 'use';
    }
    return 'not_use';
  }

  function slugify(str: string) {
    const map: Record<string, string> = {
      '-': ' ',
      A: 'á|à|ã|â|À|Á|Ã|Â',
      E: 'é|è|ê|É|È|Ê',
      I: 'í|ì|î|Í|Ì|Î',
      O: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
      U: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
      C: 'ç|Ç',
      N: 'ñ|Ñ',
    };

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const pattern in map) {
      // eslint-disable-next-line no-param-reassign
      str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    }

    return str;
  }

  const [shuffleWord, setShuffleWord] = useState<string[]>([]);

  const generateWord = async () => {
    if (newWordInput !== '') {
      const word = newWordInput;
      setNewWordInput('');
      setShuffleWord(word.toUpperCase().split(''));
    } else {
      words.shift();
      if (words.length !== 0) {
        const wordArr = slugify(words[0].mot).toUpperCase().split('');
        setNewWordInput('');
        setShuffleWord(wordArr);
      } else {
        setFetchData(!fetchData);
      }
    }
  };

  const won =
    tried.length >= 1 && difference(shuffleWord, tried).length === [].length;
  const lost = failed >= 11;

  function getStatusForLetter(letter: string) {
    if (shuffleWord.includes(letter) && tried.includes(letter)) {
      return 'visible';
    }
    if (lost) return 'resolve';
    return 'hidden';
  }

  function handleLetterClick(letter: string) {
    if (!won && !lost) {
      setGuesses(guesses + 1);
      tried.push(letter);
      setTried(tried);
      if (!shuffleWord.includes(letter) && tried.includes(letter))
        setFailed(failed + 1);
    }
  }

  function resetGame() {
    // console.log('reset');
    generateWord();
    setGuesses(0);
    setFailed(0);
    setTried([]);
    setModal(false);
  }

  useEffect(() => {
    setLoading(true);
    const fetchWords = async () => {
      try {
        const result = await axios(
          `https://api.dicolink.com/v1/mots/motsauhasard?avecdef=true&minlong=2&maxlong=8&verbeconjugue=false&limite=15&api_key=${process.env.REACT_APP_API_KEY}`
        );
        setShuffleWord(slugify(result.data[0].mot).toUpperCase().split(''));
        setLoading(false);
        setWords(result.data);
        // console.log('result', result.data);
      } catch (err) {
        console.log(err);
      }
      return false;
    };
    fetchWords();
  }, [fetchData]);

  return (
    <div>
      <h1>Jeu du pendu</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-4 offset-lg-4">
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/img/pendu/pendu${failed}.png`}
                alt="pendu_dessin"
              />
            </div>
            <div className="word">
              <h1>
                Devine le mot :{' '}
                {loading && (
                  <>
                    &nbsp;
                    <Spinner color="info" />
                    &nbsp;
                  </>
                )}
                {!loading &&
                  shuffleWord.map((letter, index) => (
                    <GuessWord
                      status={getStatusForLetter(letter)}
                      letter={letter}
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                    />
                  ))}
              </h1>
            </div>
            <div>
              <GuessCount guesses={guesses} failed={failed} />
            </div>
            <div className="clavier mt-2 mb-2">
              {LETTERS.map((letter, index) => (
                <Letter
                  loading={loading}
                  letter={letter}
                  index={index}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  feedback={getFeedbackForLetter(letter)}
                  onClick={(res: string) => {
                    handleLetterClick(res);
                  }}
                />
              ))}
            </div>
            <div>
              {(won || lost) && (
                <>
                  <div className="border border-primary rounded col-12 m-auto p-4">
                    <h1 className={won ? `text-success` : `text-danger`}>
                      {won ? `GAGNÉ !!` : `PERDU !!`}
                    </h1>
                    <div className="d-flex justify-content-around align-items-center">
                      <a
                        href={`${words[0].dicolinkUrl}`}
                        target="blank"
                        className=""
                      >
                        <Button color="info">Voir la définition</Button>
                      </a>
                      <Button color="success" onClick={() => setModal(true)}>
                        Nouveau mot
                      </Button>
                    </div>
                  </div>
                  <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                    <ModalHeader className="text-center">
                      Choisir le prochain mot
                    </ModalHeader>
                    <ModalBody>
                      <Container className="reset text-center">
                        <Form inline className="justify-content-center">
                          <FormGroup>
                            <Input
                              id="word"
                              value={newWordInput}
                              placeholder="mot à deviner"
                              onChange={(e) => setNewWordInput(e.target.value)}
                            />
                            &nbsp;
                          </FormGroup>
                          <Button
                            color="primary"
                            type="submit"
                            onClick={() => {
                              resetGame();
                            }}
                          >
                            OK
                          </Button>
                        </Form>
                        <hr />
                        <Button
                          color="primary"
                          type="submit"
                          onClick={() => {
                            resetGame();
                          }}
                        >
                          Générer un mot au hasard
                        </Button>
                      </Container>
                    </ModalBody>
                  </Modal>
                </>
              )}
            </div>
          </div>
          <div className="col-lg-4 col-12 pt-3 pt-lg-0 d-flex">
            <Card className="m-auto align-items-center">
              <CardBody>
                <CardText>
                  Ce jeu a été réalisé avec l&apos;API Dicolink
                  <br />
                  qui permet la génération aléatoire des mots.
                </CardText>
                <a href="https://www.dicolink.com" target="blank">
                  <img
                    src="https://www.dicolink.com/imgs/logo-dicolink.png"
                    alt="logo DicoLink"
                  />
                </a>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pendu;
