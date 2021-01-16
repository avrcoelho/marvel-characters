import AxiosHttpClient from '../../../shared/infra/http/axios-http-client';
import GetCharactersService from './GetCharacters.service';

const axiosHttpClient = new AxiosHttpClient();
const getCharactersService = new GetCharactersService(axiosHttpClient);

export { getCharactersService };
