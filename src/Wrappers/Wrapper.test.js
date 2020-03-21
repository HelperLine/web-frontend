import React from 'react';
import { render } from '@testing-library/react';
import Wrapper from './Wrapper';

test('renders learn react link', () => {
  const { getByText } = render(<Wrapper />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
