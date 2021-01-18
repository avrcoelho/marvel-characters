import { rest } from 'msw';
import { setupServer } from 'msw/node';

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

let axiosHttpClient: AxiosHttpClient;
let getCharactersService: GetCharactersService;

describe('GetCharactersService', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    axiosHttpClient = new AxiosHttpClient();
    getCharactersService = new GetCharactersService(axiosHttpClient);
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should be able to return success characters', async () => {
    const data = await getCharactersService.execute();

    expect(data).toEqual({
      offset: 0,
      limit: 20,
      total: 1493,
      count: 20,
      results: [],
    });
  });

  it('should be able to return error', async () => {
    server.use(
      rest.get(`${BASE_URL}/characters`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: 'Internal Server Error' }),
        );
      }),
    );
    const data = await getCharactersService.execute('not-found');

    expect(data).not.toEqual({
      offset: 0,
      limit: 20,
      total: 1493,
      count: 20,
      results: [],
    });
  });
});
