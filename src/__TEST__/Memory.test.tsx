import React from 'react';
import { render, screen } from '@testing-library/react';
import Memory from '../components/Memory/Memory';

describe('Memory', () => {
  test('renders component & display title', () => {
    render(<Memory />);

    const linkElement = screen.getByText('Memory');
    expect(linkElement).toBeInTheDocument();
  });
});
