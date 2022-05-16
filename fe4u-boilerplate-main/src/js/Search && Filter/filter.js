/* eslint-disable */
class FilterTeachers {

    static onChange(event, input, selector) {
        event.preventDefault();
        const result = {};
        [...input].forEach(el => {
            console.log(el.checked);
            result[el.name] = el.checked;
        });
        [...selector].forEach(el => {
            console.log(el.value);
            result[el.name] = el.value;
        });
        return result;
    }

    constructor() {
        this.filerForm = document.getElementById("filterForm");
        this.input = this.filerForm.querySelectorAll('input[type="checkbox"]');
        this.selector = this.filerForm.querySelectorAll('select');
    }

    start(callback) {
        this.filerForm.onchange = (event) => {
            const result = FilterTeachers.onChange(event, this.input, this.selector);
            callback && callback(result);
        };
    }
}

module.exports = FilterTeachers;