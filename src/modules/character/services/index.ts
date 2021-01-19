import AxiosHttpClient from '../../../shared/infra/http/axios-http-client';
import LocalStorage from '../../../shared/infra/cache';
import GetCharactersService from './GetCharacters.service';
import GetCharacterService from './GetCharacter.service';
import SaveFavoriteCharacterService from './SaveFavoriteCharacter.service';
import RemoveFavoriteCharacterService from './RemoveFavoriteCharacter.service';
import GetFavoritesCharactersService from './GetFavoritesCharacters.service';

const axiosHttpClient = new AxiosHttpClient();
const localStorage = new LocalStorage();
const getCharactersService = new GetCharactersService(
  axiosHttpClient,
  localStorage,
);
const getCharacterService = new GetCharacterService(axiosHttpClient);
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
  getCharacterService,
  saveFavoriteCharacterService,
  removeFavoriteCharacterService,
  getFavoritesCharactersService,
};
