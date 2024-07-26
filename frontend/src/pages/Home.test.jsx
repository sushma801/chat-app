import { render, screen } from '@testing-library/react';
import { it, describe } from 'vitest';
import Home from './Home';

describe('Home Page', () => {
  it('Render Home Page', () => {
    const { container } = render(<Home />);
    screen.debug(container);
  });
});
