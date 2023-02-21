"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRateLimit = exports.SetRatePerMin = exports.POST = exports.GET = void 0;
const axios_1 = require("axios");
/**
 * GET method
 * @param url request path
 * @returns 取得伺服器回應
 */
async function GET(url) {
    const config = {
        method: 'get',
        url: url,
        headers: {},
        timeout: 15000,
    };
    let data;
    try {
        const wait = (0, exports.GetRateLimit)();
        if (wait !== 0) {
            await sleep(wait);
        }
        data = await (0, axios_1.default)(config);
        cache = new Date();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
    return data;
}
exports.GET = GET;
/**
 * POST method
 * @param url request path
 * @param content request body
 * @returns 取決於伺服器實作，可能不會出現回傳。
 */
async function POST(url, header, content) {
    const config = {
        method: 'post',
        url: url,
        data: content,
        headers: header,
    };
    let data;
    try {
        if (waitRateMS !== 0) {
            await sleep((0, exports.GetRateLimit)());
        }
        data = await (0, axios_1.default)(config);
        cache = new Date();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
    return data;
}
exports.POST = POST;
function sleep(ms) {
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
const SetRatePerMin = (ms) => {
    waitRateMS = 60000 / ms;
};
exports.SetRatePerMin = SetRatePerMin;
const GetRateLimit = () => {
    const minus = new Date().getMilliseconds() - cache.getMilliseconds();
    return minus <= 0 ? 0 : waitRateMS - minus;
};
exports.GetRateLimit = GetRateLimit;
//# sourceMappingURL=httpmethod.js.map