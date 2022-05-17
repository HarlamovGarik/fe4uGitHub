/* eslint-disable */
function callApi(apiURL, endpoint, method) {
    const url = apiURL + endpoint;
    const options = {
        method: method,
    };
    return fetch(url, options)
        .then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
        .then((res) => res.results)
        .catch((error) => {throw error;});
}

module.exports = {
    callApi,
};