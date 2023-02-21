import { AxiosResponse } from 'axios';
/**
 * GET method
 * @param url request path
 * @returns 取得伺服器回應
 */
export declare function GET(url: string): Promise<AxiosResponse>;
/**
 * POST method
 * @param url request path
 * @param content request body
 * @returns 取決於伺服器實作，可能不會出現回傳。
 */
export declare function POST(url: string, header: object, content: object): Promise<AxiosResponse>;
export declare const SetRatePerMin: (ms: number) => void;
export declare const GetRateLimit: () => number;
