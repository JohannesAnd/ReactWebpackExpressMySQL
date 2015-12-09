import {map, merge} from "lodash";
const STATUS_OK = 200;
const STATUS_MULTIPLE_CHOICES = 300;

/**
 * @param {object} response: fetch response
 * @returns {object}: fetch json response with status between 200 and 300
 */
function checkStatus(response) {
    let json = response.json();
    if (response.status >= STATUS_OK && response.status < STATUS_MULTIPLE_CHOICES) {
        return json;
    }
    return json.then(Promise.reject.bind(Promise));
}

/**
 * @param {string} endpoint: base url
 * @param {object} parameters: query key value pairs
 * @returns {string}: query string
 */
function constructQueryUrl(endpoint, parameters) {
    return `${endpoint}?${map(parameters, (value, key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join("&")}`;
}

/**
 * @param {string} type: request method
 * @param {object} content: request body key value pairs
 * @returns {object}: request options
 */
function jsonOptions(type, content) {
    const options = {credentials: "same-origin", headers: {Accept: "application/json"}};
    let method = type;
    let headers = {};
    let body = null;

    if (method === "GET") {
        return options;
    }
    if (method.startsWith("FILE")) {
        body = new FormData();
        body.append("file", content);
        method = method.split(":")[1];
    } else {
        headers = {"Content-Type": "application/json"};
        body = JSON.stringify(content);
    }
    return merge(options, {method, headers, body});
}

/**
 * @param {string} method: request method
 * @param {string} url: endpoint
 * @param {function} onSuccess: callback to execute on success
 * @param {function} onFailure: callback to execute on failure
 * @param {object} content: query params or body
 * @return {*}: void
 */
export function json(method, url, onSuccess, onFailure, content) {
    let endpoint = url;

    if (method === "GET" && content) {
        endpoint = constructQueryUrl(url, content);
    }
    fetch(endpoint, jsonOptions(method, content)).then(checkStatus).then(onSuccess).catch(onFailure);
}