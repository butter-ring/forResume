import axios from 'axios';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  // console.log('------parseJSON------');
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON);
// }
export default function request(url, optionsReq) {
  const options = {
    method: optionsReq.method,
    headers: {
      Accept: 'application/json;charset=UTF-8',
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  };
  // console.log(options);
  if (optionsReq.method === 'POST') {
    options.data = optionsReq.data;
  }
  if (optionsReq.auth) {
    // console.log('request.js auth check');
    options.headers.Authorization = sessionStorage.getItem('accessToken');
  }

  // id&pw 로그인 요청
  if (optionsReq.basicAuth) {
    options.headers.Authorization = optionsReq.basicAuth;
  }
  // console.log(options);
  if (optionsReq.sse) {
    options.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    if (optionsReq.auth) {
      options.headers.Authorization = sessionStorage.getItem('accessToken');
    }
  }

  return axios(`${process.env.API_URL}${url}`, options)
    .then(checkStatus)
    .then(parseJSON);
}
