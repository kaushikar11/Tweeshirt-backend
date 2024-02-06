"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var apiHost = (_a = process.env.API_HOST) !== null && _a !== void 0 ? _a : 'https://api.stability.ai';
var url = "".concat(apiHost, "/v1/user/account");
var apiKey = process.env.STABILITY_API_KEY;
if (!apiKey)
    throw new Error('Missing Stability API key.');
var response = await (0, node_fetch_1.default)(url, {
    method: 'GET',
    headers: {
        Authorization: "Bearer ".concat(apiKey),
    },
});
if (!response.ok) {
    throw new Error("Non-200 response: ".concat(await response.text()));
}
// Do something with the user...
var user = (await response.json());
