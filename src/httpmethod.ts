import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
/**
 * GET method
 * @param url request path
 * @returns 取得伺服器回應
 */
export async function GET(url: string): Promise<AxiosResponse> {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: url,
    headers: {},
    timeout: 15000,
  };
  let data;
  try {
    const wait = GetRateLimit();
    if (wait !== 0) {
      await sleep(wait);
    }
    data = await axios(config);
    cache = new Date();
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
  return data;
}
/**
 * POST method
 * @param url request path
 * @param content request body
 * @returns 取決於伺服器實作，可能不會出現回傳。
 */
export async function POST(
  url: string,
  header: object,
  content: object
): Promise<AxiosResponse> {
  const config = {
    method: 'post',
    url: url,
    data: content,
    headers: header,
  };
  let data;
  try {
    if (waitRateMS !== 0) {
      await sleep(GetRateLimit());
    }
    data = await axios(config);
    cache = new Date();
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
  return data;
}

function sleep(ms: number): Promise<unknown> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/*
    製作目標:
       依照速率阻塞線程。
*/
let waitRateMS = 0;
let cache = new Date();
// 一分鐘可接受次數
export const SetRatePerMin = (ms: number) => {
  waitRateMS = 60000 / ms;
};

export const GetRateLimit = () => {
  const minus = new Date().getMilliseconds() - cache.getMilliseconds();

  return minus <= 0 ? 0 : waitRateMS - minus;
};
