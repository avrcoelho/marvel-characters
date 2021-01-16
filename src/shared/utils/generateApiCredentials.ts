import * as crypto from 'crypto';

interface IResponse {
  ts: number;
  apiKey: string;
  hash: string;
}

const generateApiCredentials = (): IResponse => {
  const ts = new Date().getTime();
  const apiKey = String(process.env.REACT_APP_API_PUBLIC_KEY);
  const privateApiKey = String(process.env.REACT_APP_API_PRIVATE_KEY);
  const hash = crypto
    .createHash('md5')
    .update(ts + privateApiKey + apiKey)
    .digest('hex');

  return { ts, apiKey, hash };
};

export default generateApiCredentials;
