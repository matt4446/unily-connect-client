const url = require("url");
const https = require("http");
const env = process.env;

const proxy = {
    protocol: "https:",
    hostname: "https://origin.free.beeceptor.com",
    port: 443,
};
const proxyRequests = function () {
    var proxyUrl = url.format(proxy);
    env.http_proxy = proxyUrl;
    env.https_proxy = proxyUrl;
    env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
};

const unproxyRequests = function () {
    env.http_proxy = "";
    env.https_proxy = "";
    env.NODE_TLS_REJECT_UNAUTHORIZED = "";
}

const setProxy = function (options) {
    if (typeof options === "string") { // options can be URL string.
        options = url.parse(options);
    }
    if (!options.host && !options.hostname) {
        throw new Error("host or hostname must have value.");
    }
    options.path = "/v2/echo"; //url.format(options);
    options.headers = options.headers || {};
    options.headers.Host = options.host || url.format({
        hostname: options.hostname,
        port: options.port
    });
    options.protocol = proxy.protocol;
    options.hostname = proxy.hostname;
    options.port = proxy.port;
    options.href = null;
    options.host = null;
    return options;
}

module.exports = {
    //proxy: proxyRequests,
    unProxy: unproxyRequests,
    setProxy: setProxy
}