/* eslint-disable */
const API_DATA_URL = 'http://localhost:3001/teachers';

class Database {
    async post(data) {
        const ajax = new XMLHttpRequest();
        ajax.open('POST', API_DATA_URL, true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(data);
    }
}

module.exports = Database;