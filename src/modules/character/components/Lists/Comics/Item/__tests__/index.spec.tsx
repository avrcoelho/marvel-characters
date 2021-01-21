import { render, screen } from '@testing-library/react';

import Item from '..';

const mockAddOrRemoveFavorite = jest.fn();

describe('Comics List item', () => {
  const props = {
    comic: {
      id: 1,
      title: 'John Doe',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
    },
    handleAddOrReoveRavorite: mockAddOrRemoveFavorite,
  };

  it('should be able render comic title', () => {
    render(<Item {...props} />);

    expect(screen.getByText('John Doe')).toBeTruthy();
  });
});
