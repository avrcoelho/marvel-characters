import { rest } from 'msw';
import { setupServer } from 'msw/node';

import AxiosHttpClient from '../../../../shared/infra/http/axios-http-client';
import GetCharacterComicsService from '../GetCharacterComics.service';

const BASE_URL = process.env.REACT_APP_API;

const server = setupServer(
  rest.get(`${BASE_URL}/characters/123/comics`, (req, res, ctx) => {
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

let axiosHttpClient: AxiosHttpClient;
let getCharacterComicsService: GetCharacterComicsService;

describe('GetCharacterComicsService', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    axiosHttpClient = new AxiosHttpClient();
    getCharacterComicsService = new GetCharacterComicsService(axiosHttpClient);
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should be able to return success characters/comics', async () => {
    const data = await getCharacterComicsService.execute('123');

    expect(data).toEqual({
      offset: 0,
      limit: 20,
      total: 1493,
      count: 20,
      results: [],
    });
  });
});
