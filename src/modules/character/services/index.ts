import AxiosHttpClient from '../../../shared/infra/http/axios-http-client';
import LocalStorage from '../../../shared/infra/cache';
import GetCharactersService from './GetCharacters.service';
import SaveFavoriteCharacterService from './SaveFavoriteCharacter.service';

const axiosHttpClient = new AxiosHttpClient();
const localStorage = new LocalStorage();
const getCharactersService = new GetCharactersService(axiosHttpClient);
const saveFavoriteCharacterService = new SaveFavoriteCharacterService(
  localStorage,
);

export { getCharactersService, saveFavoriteCharacterService };
