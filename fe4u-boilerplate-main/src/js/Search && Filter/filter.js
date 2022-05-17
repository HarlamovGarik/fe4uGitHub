/* eslint-disable */
class FilterTeachers {

    static onChange(event, input, selector, iput_t_number) {
        event.preventDefault();
        const result = {};
        [...input].forEach(el => {
            result[el.name] = el.checked;
        });
        [...selector].forEach(el => {
            result[el.name] = el.value;
        });
        [...iput_t_number].forEach(el => {
            result[el.name] = el.value;
        });
        return result;
    }

    constructor() {
        this.filerForm = document.getElementById("filterForm");
        this.input = this.filerForm.querySelectorAll('input[type="checkbox"]');
        this.input_n = this.filerForm.querySelectorAll('input[type="number"]');
        this.selector = this.filerForm.querySelectorAll('select');
    }

    start(callback) {
        this.filerForm.onchange = (event) => {
            const result = FilterTeachers.onChange(event, this.input, this.selector, this.input_n);
            callback && callback(result);
        };
    }
}

module.exports = FilterTeachers;