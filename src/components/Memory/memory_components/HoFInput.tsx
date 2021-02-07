import Axios from 'axios';
import React, { FormEvent, useState } from 'react';
import { Button, Form, Input, Label } from 'reactstrap';

type HoFInputType = {
  guesses: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: any;
};

function HoFInput({ guesses, onSuccess }: HoFInputType): JSX.Element {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const date = new Date().toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  });
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (name === '') {
      setError('Le nom doit avoir au moins 1 caractère');
    } else {
      try {
        const result = await Axios.post(
          `${process.env.REACT_APP_API_CALL}/api/memories`,
          {
            name,
            guesses,
            date,
          }
        );
        if (result.data.success) {
          setError('');
          setName('');
          // console.log(result.data.result);
          onSuccess(result.data.result);
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
      }
    }
  };

  return (
    <div className="mt-4 ">
      <Form onSubmit={submit} inline className="justify-content-center">
        <Label className="pl-1">
          Bravo ! Votre score est de&nbsp;
          <span className={`h1 ${guesses >= 60 ? `red` : `green`} `}>
            {guesses}
          </span>
          &nbsp;, quel est votre nom ?&nbsp;&nbsp;
        </Label>
        <Input
          className="rounded p-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom"
        />
        <Button color="primary" type="submit">
          OK
        </Button>
        {error !== '' && <span className="text-danger">{error}</span>}
      </Form>
    </div>
  );
}

export default HoFInput;
