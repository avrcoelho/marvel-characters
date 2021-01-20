import { rest } from 'msw';
import { setupServer } from 'msw/node';

import FakeLocalStorageService from '../../../../shared/infra/cache/fakes/FakeLocalStorage';
import AxiosHttpClient from '../../../../shared/infra/http/axios-http-client';
import GetCharactersService from '../GetCharacters.service';

const BASE_URL = process.env.REACT_APP_API;

const server = setupServer(
  rest.get(`${BASE_URL}/characters`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          offset: 0,
          limit: 20,
          total: 1493,
          count: 20,
          results: [],
        },
      }),
    );
  }),
);

let fakeLocalStorageService: FakeLocalStorageService;
let axiosHttpClient: AxiosHttpClient;
let getCharactersService: GetCharactersService;

describe('GetCharactersService', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    axiosHttpClient = new AxiosHttpClient();
    fakeLocalStorageService = new FakeLocalStorageService();
    getCharactersService = new GetCharactersService(
      axiosHttpClient,
      fakeLocalStorageService,
    );
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should be able to return success characters', async () => {
    const data = await getCharactersService.execute('john');

    expect(data).toEqual({
      offset: 0,
      limit: 20,
      total: 1493,
      count: 20,
      results: [],
    });
  });

  it('should be able to return characters with favorite', async () => {
    const results = [
      {
        id: 1,
        name: 'John Doe',
        thumbnail: 'test',
      },
    ];
    const newFavoriteParsed = JSON.stringify([results[0]]);
    fakeLocalStorageService.save('@characters/favorites', newFavoriteParsed);
    server.use(
      rest.get(`${BASE_URL}/characters`, (req, res, ctx) => {
        return res(
          ctx.json({
            data: {
              offset: 0,
              limit: 20,
              total: 1493,
              count: 20,
              results,
            },
          }),
        );
      }),
    );
    const data = await getCharactersService.execute();

    expect(data.results[0].isFavorite).toBe(true);
  });

  it('should be able to return characters without favorite', async () => {
    const results = [
      {
        id: 1,
        name: 'John Doe',
        thumbnail: 'test',
      },
    ];
    const newFavoriteParsed = JSON.stringify([results[0]]);
    fakeLocalStorageService.save('@characters/favorites', newFavoriteParsed);
    results[0].id = 2;
    server.use(
      rest.get(`${BASE_URL}/characters`, (req, res, ctx) => {
        return res(
          ctx.json({
            data: {
              offset: 0,
              limit: 20,
              total: 1493,
              count: 20,
              results,
            },
          }),
        );
      }),
    );
    const data = await getCharactersService.execute();

    expect(data.results[0]).not.toHaveProperty('isFavorite');
  });
});
