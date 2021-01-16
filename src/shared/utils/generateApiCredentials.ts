import * as crypto from 'crypto';

interface IResponse {
  ts: number;
  apikey: string;
  hash: string;
}

const generateApiCredentials = (): IResponse => {
  const ts = new Date().getTime();
  const apikey = String(process.env.REACT_APP_API_PUBLIC_KEY);
  const privateApiKey = String(process.env.REACT_APP_API_PRIVATE_KEY);
  const hash = crypto
    .createHash('md5')
    .update(ts + privateApiKey + apikey)
    .digest('hex');

  return { ts, apikey, hash };
};

export default generateApiCredentials;
