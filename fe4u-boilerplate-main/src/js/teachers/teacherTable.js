/* eslint-disable */
const Process = require('../processRawDate');

class teachersTableList {

    static createTableList(teacher) {
        return {
            id: teacher.id,
            full_name: teacher.full_name,
            specialty: teacher.specialty || '',
            location: teacher.location || '',
            gender: teacher.gender ? (teacher.gender === 'M' ? 'Male' : 'Female') : '',
            age: teacher.age || 0,
        };
    }

    static calculator(pageData) {
        pageData.end = Math.ceil(pageData.length / pageData.max) || 1;
        pageData.remainder = pageData.length % pageData.max;
    }

    SortTeacher(th, teachers) {
        let column = th.dataset.column;
        let order = th.dataset.order;
        if (order === 'desc') {
            th.dataset.order = 'asc';
            teachers = teachers.sort((a, b) => a[column] > b[column] ? 1 : -1);
        } else {
            th.dataset.order = 'desc';
            teachers = teachers.sort((a, b) => a[column] < b[column] ? 1 : -1);
        }
        return teachers;
    }

    static createHTML_td(title, value) {
        const td = document.createElement('td');
        td.dataset.title = title;
        td.innerText = value;
        return td;
    }

    static createHTML_tr(teacher) {
        const tr = document.createElement('tr');
        tr.appendChild(this.createHTML_td('Name', teacher.full_name));
        tr.appendChild(this.createHTML_td('Specialty', teacher.specialty));
        tr.appendChild(this.createHTML_td('Age', teacher.age));
        tr.appendChild(this.createHTML_td('Gender', teacher.gender));
        tr.appendChild(this.createHTML_td('State', teacher.location));
        return tr;
    }

    constructor() {
        this.teachers = [];
        this.page = {
            length: 0,
            max: 10,
            start: 1,
            end: 1,
            current: 1,
            remainder: 0,
        };
        this.tbody = document.getElementById('table-statistic-body');
        this.thead = document.getElementsByClassName('col');
        this.pagination = document.getElementById('pagination');

        const clearSorted = () => {
            [...this.thead].forEach((th) => {
                th.classList.remove('sorted');
            });
        }
        [...this.thead].forEach((th) => {
            th.onclick = () => {
                clearSorted();
                th.classList.add('sorted');
                this.sort(th, this.teachers);
            };
        });
        this.table = document.getElementById('statistic');
    }

    setupPage(number) {
        const teacherStart = (number - 1) * this.page.max;
        const teacherSetup = this.teachers.slice(teacherStart, teacherStart + this.page.max);
        while (this.tbody.firstChild) {
            this.tbody.firstChild.remove();
        }
        teacherSetup.forEach((data) => {
            const teacherSetupElm = teachersTableList.createHTML_tr(data);
            this.tbody.appendChild(teacherSetupElm);
        });
        // this.updatePagination(number);
    }

    onClickPage(number) {
        const pagePrevId = parseInt(this.pagination.dataset.current);
        const pagePrev = this.pagination.querySelector(`.pagination-link[data-value="${pagePrevId}"]`);
        pagePrev.classList.remove('pagination_current');
        // ~~~
        const page = this.pagination.querySelector(`.pagination-link[data-value="${number}"]`);
        this.pagination.dataset.current = number;
        this.page.current = number;
        page.classList.add('pagination_current');
        this.setupPage(number);
    }

    updateTable() {
        this.setupPage(this.page.start);
    }

    add(teacherData) {
        this.teachers.push(teachersTableList.createTableList(teacherData));
        this.page.length++;
        teachersTableList.calculator(this.page);
    }

    getTeachers() {
        return this.teachers;
    }

    sort(th, teacher) {
        this.teachers = this.SortTeacher(th, teacher);
        this.updateTable();
    }
}

module.exports = teachersTableList;