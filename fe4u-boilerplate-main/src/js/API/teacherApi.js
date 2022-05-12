/* eslint-disable */
const API = require("./API");

const API_RANDOM_USER_URL = 'https://randomuser.me/api/';
const RandomUsers = new API(API_RANDOM_USER_URL);

class teacherApi {

    constructor({seed}) {
        this.seed = seed;
    }

    getPath(options = "") {
        return API_RANDOM_USER_URL + API.toStringOptions(options);
    }

    async getStartPage({results}) {
        const options = {
            page: 1,
            seed: this.seed,
            results: results,
        };
        console.log(this.getPath({options}));
        return await RandomUsers.get(options);
    }
    async getLimitedResult({page, limit}) {
        const options = {
            page,
            seed: this.seed,
            results: limit
        };
        console.log(this.getPath({options}));
        return await RandomUsers.get({options});
    }
    async getFilterResult({page, limit, filterOptions = {}}){
        const  options = {
            page,
            results: limit,
            ...filterOptions,
        }
        console.log(this.getPath({options}));
        return await RandomUsers.get({options});
    }
}

module.exports = teacherApi;