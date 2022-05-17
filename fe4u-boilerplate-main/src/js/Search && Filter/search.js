/* eslint-disable */
class Search {

    static onSubmit(form, event) {
        event.preventDefault();
        const formData = new FormData(form);
        return Object.fromEntries(formData.entries()).search;
    }

    constructor() {
        this.searchData = document.forms.searchTeachers;
        this.searchForm = document.getElementById("searchForm");
    }

    start(callback) {
        this.searchForm.onsubmit = (event) => {
            const result = Search.onSubmit(this.searchData, event);
            callback && callback(result);
            this.searchForm.reset();
        };
    }
}

module.exports = Search;