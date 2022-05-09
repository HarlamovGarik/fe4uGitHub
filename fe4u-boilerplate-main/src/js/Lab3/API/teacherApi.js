/* eslint-disable */
const API = require("./API");

const API_RANDOM_USER_URL = 'https://randomuser.me/api/';
const RandomUsers = new API(API_RANDOM_USER_URL);

class teacherApi {

    constructor({seed}) {
        this.seed = seed;
    }
    getPath(options) {
        return API_RANDOM_USER_URL + API.toStringOptions(options);
    }
    async getStartPage({count}){
        const options = {
            page: 1,
            seed: this.seed,
            results: count
        };
        return await RandomUsers.get(options);
    }
    async getLimitedResult({page,limit}){
        const options = {
            page,
            seed: this.seed,
            results: limit
        };
        return await RandomUsers.get({options});
    }
}
module.exports = teacherApi;