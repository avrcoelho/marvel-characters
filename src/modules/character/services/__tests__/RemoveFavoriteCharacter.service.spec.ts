import FakeLocalStorageService from '../../../../shared/infra/cache/fakes/FakeLocalStorage';
import RemoveFavoriteCharacterService from '../RemoveFavoriteCharacter.service';

let fakeLocalStorageService: FakeLocalStorageService;
let removeFavoriteCharacterService: RemoveFavoriteCharacterService;

describe('RemoveFavoriteCharacterService', () => {
  beforeEach(() => {
    fakeLocalStorageService = new FakeLocalStorageService();
    removeFavoriteCharacterService = new RemoveFavoriteCharacterService(
      fakeLocalStorageService,
    );
  });

  it('should be able to remove favorite character', () => {
    const newFavorite = {
      id: 1,
      name: 'John Doe',
      thumbnail: 'image',
    };
    const newFavoriteParsed = JSON.stringify([newFavorite]);
    fakeLocalStorageService.save('@characters/favorites', newFavoriteParsed);
    const favorites = removeFavoriteCharacterService.execute(1);

    expect(favorites).toEqual({
      count: 0,
      results: [],
    });
  });
});
