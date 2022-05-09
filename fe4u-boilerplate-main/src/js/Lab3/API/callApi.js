/* eslint-disable */

function callApi(apiURL, endpoint, method){
    const url = apiURL + endpoint;
    const options = {
        method,
    };
    return fetch(url, options)
        .then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to connect to API server'))))
        .then((result) => result.results)
        .then((error)=> {throw error;});

}
module.exports = {
    callApi,
};