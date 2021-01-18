import { render, screen } from '@testing-library/react';

import Characters from '..';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../../../hooks/context/character', () => {
  return {
    useCharacter: () => ({
      characters: {
        results: [
          {
            id: 1,
            name: 'John Doe',
            thumbnail: {
              path: 'path',
              extension: 'jpg',
            },
          },
          {
            id: 2,
            name: 'John Doe',
            thumbnail: {
              path: 'path',
              extension: 'jpg',
            },
          },
        ],
      },
    }),
  };
});

describe('Characters List', () => {
  it('should be able to render list items', () => {
    render(<Characters />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
