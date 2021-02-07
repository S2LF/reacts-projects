import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  test('renders with react-router & display title', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = screen.getByText('Mes Projets React & NodeJs');
    expect(linkElement).toBeInTheDocument();
  });
  test('renders with react-router & display header', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = screen.getByText('Mes Projets');
    expect(linkElement).toBeInTheDocument();
  });
  test('renders with react-router & display footer', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    // const linkElement = screen.getByText('©Syl20 - sylvainallain.fr - @2021');
    const linkElement = screen.getByRole('link', { name: 'sylvainallain.fr' });
    expect(linkElement).toBeInTheDocument();
  });
});
