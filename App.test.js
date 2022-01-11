import { render, screen } from '@testing-library/react';
import { MyApp } from './pages/_app';

test('renders learn react link', () => {
  render(<MyApp />);
  const linkElement = screen.getByText("zaater");
  expect(linkElement).toBeInTheDocument();
});