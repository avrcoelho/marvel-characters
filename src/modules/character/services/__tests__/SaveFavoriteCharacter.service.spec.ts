import FakeLocalStorageService from '../../../../shared/infra/cache/fakes/FakeLocalStorage';
import SaveFavoriteCharacterService from '../SaveFavoriteCharacter.service';

let fakeLocalStorageService: FakeLocalStorageService;
let getCharactersService: SaveFavoriteCharacterService;

describe('SaveFavoriteCharacterService', () => {
  beforeEach(() => {
    fakeLocalStorageService = new FakeLocalStorageService();
    getCharactersService = new SaveFavoriteCharacterService(
      fakeLocalStorageService,
    );
  });

  it('should be able to save favorite character when not exists', () => {
    const newFavorite = {
      id: 1,
      name: 'John Doe',
      thumbnail: 'image',
    };
    const favorites = getCharactersService.execute(newFavorite);

    expect(favorites).toEqual({
      count: 1,
      results: [newFavorite],
    });
  });

  it('should be able to save favorite character when exists', () => {
    const newFavorite = {
      id: 2,
      name: 'John Doe',
      thumbnail: 'image',
    };
    getCharactersService.execute(newFavorite);
    const favorites = getCharactersService.execute(newFavorite);

    expect(favorites).toEqual({
      count: 2,
      results: [newFavorite, newFavorite],
    });
  });

  it('should be able to return exception error when favorites > 4', () => {
    const newFavorite = {
      id: 2,
      name: 'John Doe',
      thumbnail: 'image',
    };
    getCharactersService.execute(newFavorite);
    getCharactersService.execute(newFavorite);
    getCharactersService.execute(newFavorite);
    getCharactersService.execute(newFavorite);
    getCharactersService.execute(newFavorite);

    expect(() => getCharactersService.execute(newFavorite)).toThrow(Error);
  });
});
