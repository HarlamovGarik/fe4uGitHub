/* eslint-disable */
const api = require("./callApi");

class API{
    constructor(apiURL) {
        this.URL = apiURL;
    }
    async get(options){
        const endpoint = API.toStringOptions(options);
        let illusoryResult = null;
        try{
            illusoryResult = await api.callApi(this.URL, endpoint, 'GET');
        }catch (error){
            console.log(error);
        }
        return illusoryResult;

    }
    static toStringOptions(options){
        const result = Object.keys(options).reduce((res, key, index) => {
            res += index > 0 ? '&' : '?';
            res += `${key}=${options[key]}`;
            return res;
        }, '');
        return result;
    }
}

module.exports = API;