import { rest } from 'msw';
import { setupServer } from 'msw/node';

import AxiosHttpClient from '..';

const axiosHttpClient = new AxiosHttpClient();

const BASE_URL = process.env.API_URL;

const server = setupServer(
  rest.get(`${BASE_URL}/`, (req, res, ctx) => {
    return res(ctx.json(['a', 'b', 'c']));
  }),
);

describe('axios-http-client', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should be able to return data on method GET', async () => {
    const { data } = await axiosHttpClient.get({ url: '/' });

    expect(data).toEqual(['a', 'b', 'c']);
  });
});
