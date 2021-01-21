import { render, screen } from '@testing-library/react';

import Page404 from '..';

describe('404 page', () => {
  it('should be able to render title', () => {
    render(<Page404 />);

    expect(screen.getByText('404')).toBeTruthy();
  });
});
