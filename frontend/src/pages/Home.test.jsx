import { render, screen } from '@testing-library/react';
import { it, describe } from 'vitest';
import Home from './Home';

describe('Home Page', () => {
  it('Render Home Page', async () => {
    const { container } = await render(<Home />);
    screen.debug(container);
  });
});
