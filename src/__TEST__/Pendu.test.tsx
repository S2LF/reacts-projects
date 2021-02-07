import React from 'react';
import { render, screen } from '@testing-library/react';
import Pendu from '../components/Pendu/Pendu';

describe('Pendu', () => {
  test('renders component & display title', () => {
    render(<Pendu />);

    const linkElement = screen.getByText('Jeu du pendu');
    expect(linkElement).toBeInTheDocument();
  });
});
