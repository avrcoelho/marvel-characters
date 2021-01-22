import FakeLocalStorageService from '../../../../shared/infra/cache/fakes/FakeLocalStorage';
import { CharacterModel } from '../../models/Character.model';
import SaveFavoriteCharacterService from '../SaveFavoriteCharacter.service';

let fakeLocalStorageService: FakeLocalStorageService;
let saveFavoriteCharacterService: SaveFavoriteCharacterService;

describe('SaveFavoriteCharacterService', () => {
  beforeEach(() => {
    fakeLocalStorageService = new FakeLocalStorageService();
    saveFavoriteCharacterService = new SaveFavoriteCharacterService(
      fakeLocalStorageService,
    );
  });

  const newFavorite = {
    id: 1,
    name: 'John Doe',
    thumbnail: {
      path: 'path',
      extension: 'jpg',
    },
  } as CharacterModel;

  it('should be able to save favorite character when not exists', () => {
    const favorites = saveFavoriteCharacterService.execute(newFavorite);

    expect(favorites).toEqual({
      count: 1,
      results: [{ ...newFavorite, isFavorite: true }],
    });
  });

  it('should be able to save favorite character when exists', () => {
    saveFavoriteCharacterService.execute(newFavorite);
    newFavorite.id = 2;
    const favorites = saveFavoriteCharacterService.execute(newFavorite);

    expect(favorites).toEqual({
      count: 2,
      results: [
        { ...newFavorite, id: 1, isFavorite: true },
        { ...newFavorite, isFavorite: true },
      ],
    });
  });

  it('should be able to return exception error when favorites > 4', () => {
    saveFavoriteCharacterService.execute(newFavorite);
    saveFavoriteCharacterService.execute(newFavorite);
    saveFavoriteCharacterService.execute(newFavorite);
    saveFavoriteCharacterService.execute(newFavorite);
    saveFavoriteCharacterService.execute(newFavorite);

    expect(() => saveFavoriteCharacterService.execute(newFavorite)).toThrow(
      Error,
    );
  });
});
