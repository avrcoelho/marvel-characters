import { render, screen, fireEvent } from '@testing-library/react';

import CharactersDetails from '..';

const mockAddOrRemoveFavorite = jest.fn();

describe('ChracterDetails', () => {
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
      series: {
        returned: 3,
      },
      description: 'description',
      isFavorite: false,
    },
    dateOfLastComic: '2020',
    handleAddOrRemoveFavorite: mockAddOrRemoveFavorite,
  };

  it('should be able to call function', () => {
    render(<CharactersDetails {...props} />);
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(mockAddOrRemoveFavorite).toHaveBeenCalled();
  });

  it('should be able to render charcter name', () => {
    render(<CharactersDetails {...props} />);

    expect(screen.getByText(props.character.name)).toBeTruthy();
  });
});
