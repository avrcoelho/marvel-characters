import FakeLocalStorageService from '../../../../shared/infra/cache/fakes/FakeLocalStorage';
import GetFavoritesCharactersService from '../GetFavoritesCharacters.service';

let fakeLocalStorageService: FakeLocalStorageService;
let getFavoritesCharactersService: GetFavoritesCharactersService;

describe('GetFavoritesCharactersService', () => {
  beforeEach(() => {
    fakeLocalStorageService = new FakeLocalStorageService();
    getFavoritesCharactersService = new GetFavoritesCharactersService(
      fakeLocalStorageService,
    );
  });

  it('should be able to return empty favorimtes', () => {
    const favorites = getFavoritesCharactersService.execute();

    expect(favorites).toEqual({
      count: 0,
      results: [],
    });
  });

  it('should be able to return favorimtes', () => {
    const newFavorite = {
      id: 1,
      name: 'John Doe',
      thumbnail: 'image',
    };
    const newFavoriteParsed = JSON.stringify([newFavorite]);
    fakeLocalStorageService.save('@characters/favorites', newFavoriteParsed);
    const favorites = getFavoritesCharactersService.execute();

    expect(favorites).toEqual({
      count: 1,
      results: [newFavorite],
    });
  });

  it('should be able to return favorimtes filtered', () => {
    const newFavorite = [
      {
        id: 1,
        name: 'John Doe',
        thumbnail: 'image',
      },
      {
        id: 2,
        name: 'Andre Coelho',
        thumbnail: 'image',
      },
    ];
    const newFavoriteParsed = JSON.stringify(newFavorite);
    fakeLocalStorageService.save('@characters/favorites', newFavoriteParsed);
    const favorites = getFavoritesCharactersService.execute('John');

    expect(favorites).toEqual({
      count: 1,
      results: [newFavorite[0]],
    });
  });
});
