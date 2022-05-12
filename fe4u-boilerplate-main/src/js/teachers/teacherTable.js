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
        console.log(teachers, order, column);
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

    static createPaginationPage(pageNumber, isCurrent = false) {
        const page = document.createElement('a');
        page.classList.add('pagination-link');
        isCurrent && page.classList.add('pagination-active');
        page.dataset.value = pageNumber;
        page.innerText = pageNumber;
        return page;
    }

    static createPaginationPoints() {
        const points = document.createElement('a');
        points.classList.add('pagination-points');
        points.innerText = '...';
        return points;
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
        this.tbody = document.getElementById('table-body');
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
        console.log(this.pagination);
        // this.thead.appendChild(this.Header(this.teachers));
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
        this.updatePagination(number);
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

    updatePagination(pageCurrent) {
        while (this.pagination.firstChild) {
            this.pagination.firstChild.remove();
        }
        const addPage = (number, isCurrent = false) => {
            const page = teachersTableList.createPaginationPage(number, isCurrent);
            page.onclick = () => this.onClickPage(number);
            this.pagination.appendChild(page);
        };

        const addPoints = () => {
            const points = teachersTableList.createPaginationPoints();
            this.pagination.appendChild(points);
        };
        // ~~~
        let isPointsStart = false;
        let isPointsLast = false;
        const length = this.page.end;
        // ~~~
        if (length >= 3) {
            addPage(1);
        }
        if (pageCurrent > 3 && !isPointsStart) {
            addPoints();
            isPointsStart = true;
        }

        if (pageCurrent - 1 > 1) {
            addPage(pageCurrent - 1);
        }

        if (pageCurrent !== 1 && pageCurrent !== length) {
            addPage(pageCurrent);
        }

        if (pageCurrent + 1 < length) {
            addPage(pageCurrent + 1);
        }

        if (pageCurrent + 2 < length && !isPointsLast) {
            addPoints();
            isPointsLast = true;
        }
        if (length >= 3) {
            addPage(length);
        }
        // ~~~
        this.pagination.dataset.current = pageCurrent;
        const page = this.pagination.querySelector(`.pagination-link[data-value="${pageCurrent}"]`);
        page.classList.add('pagination-active');
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