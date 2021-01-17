import { render, screen } from '@testing-library/react';

import Header from '..';

describe('Hedaer home', () => {
  it('should be able to render component', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeTruthy();
  });
});
