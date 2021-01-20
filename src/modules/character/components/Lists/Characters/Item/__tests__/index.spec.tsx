import { render, screen } from '@testing-library/react';

import Item from '..';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Characters List item', () => {
  const props = {
    character: {
      id: 1,
      name: 'John Doe',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
      comics: {
        returned: 3,
      },
      description: 'description',
      isFavorite: false,
    },
  };

  it('should be able to render character name', () => {
    render(<Item {...props} />);

    expect(screen.getByText('John Doe')).toBeTruthy();
  });
});
