function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response && response.json();
}

const addParamToUrl = (relativeUrl, queryParam = {}) => {
  const kvp = relativeUrl.split('?');
  let existing = [];
  if (kvp.length > 1) {
    existing = kvp[1].split('&');
  }
  const queryParamArr =
    Object.keys(queryParam).map(
      key => `${key}=${encodeURI(queryParam[key])}`,
    ) || [];
  existing = existing.concat(queryParamArr);
  return `${kvp[0]}${existing.length ? '?' : ''}${existing.join('&')}`;
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status == 401) {
    console.log('Auth required');
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function checkNetworkStatus() {
  if (!navigator.onLine) {
    const error = new Error('No Network Available');
    throw error;
  }
}
/** * Requests a URL, returning a promise * * @param {string} url The URL we want to request * @param {object} [options] The options we want to pass to "fetch" * * @return {object} The response data */

export default function request(url, options = {}) {
  checkNetworkStatus();
  const defaults = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      fe_client: 'APP',
    },
  };
  let { query = {} } = options;
  //   if (options.includeSSO) {
  //     query = { ...query, sso_token: Token.getToken() };
  //   }
  let dataHeaders = {};
  dataHeaders = { ...defaults.headers };
  //   if (options.includeTokens) {
  //     const xxsrfToken = getCookie && getCookie('XSRF-TOKEN');
  //     dataHeaders = {
  //       ...dataHeaders,
  //       'X-XSRF-TOKEN': xxsrfToken,
  //       'X-CSRF-TOKEN': xxsrfToken,
  //     };
  //   }
  dataHeaders = { ...dataHeaders, ...options.headers };
  const data = {
    ...defaults,
    method: options.method || defaults.method,
    credentials: 'same-origin',
    body: options.body,
  };
  data.headers = dataHeaders;
  const augmentedURL = addParamToUrl(url, query);
  return fetch(augmentedURL, data)
    .then(checkStatus)
    .then(parseJSON);
}
