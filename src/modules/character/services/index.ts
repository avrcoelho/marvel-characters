import AxiosHttpClient from '../../../shared/infra/http/axios-http-client';
import LocalStorage from '../../../shared/infra/cache';
import GetCharactersService from './GetCharacters.service';
import SaveFavoriteCharacterService from './SaveFavoriteCharacter.service';
import RemoveFavoriteCharacterService from './RemoveFavoriteCharacter.service';
import GetFavoritesCharactersService from './GetFavoritesCharacters.service';

const axiosHttpClient = new AxiosHttpClient();
const localStorage = new LocalStorage();
const getCharactersService = new GetCharactersService(
  axiosHttpClient,
  localStorage,
);
const saveFavoriteCharacterService = new SaveFavoriteCharacterService(
  localStorage,
);
const removeFavoriteCharacterService = new RemoveFavoriteCharacterService(
  localStorage,
);
const getFavoritesCharactersService = new GetFavoritesCharactersService(
  localStorage,
);

export {
  getCharactersService,
  saveFavoriteCharacterService,
  removeFavoriteCharacterService,
  getFavoritesCharactersService,
};
