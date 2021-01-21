import { render, screen } from '@testing-library/react';

import Comics from '..';

describe('Comics List', () => {
  const props = {
    comics: [
      {
        id: 1,
        title: 'John Doe',
        thumbnail: {
          path: 'path',
          extension: 'jpg',
        },
      },
      {
        id: 2,
        title: 'John Doe',
        thumbnail: {
          path: 'path',
          extension: 'jpg',
        },
      },
    ],
  };
  it('should be able to render list items', () => {
    render(<Comics {...props} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
