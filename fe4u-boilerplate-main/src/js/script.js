/* eslint-disable */
import {hello} from "./test-module";
import TeachersList from "./teachers/teacherList";
import PopupAddTeacher from "./Popup/popupaddTeacher";
import Chart from 'chart.js/auto';
import leaflet from 'leaflet';

(async () => {

    require('./Lab2/add_avatar');
    require('./Lab2/PopupFunctional');

    const DataBase = require('./datebase');
    const TeachersList = require('./teachers/teacherList')
    const TeacherAPI = require("./API/teacherApi");
    const PopupAddTeacher = require('./Popup/popupaddTeacher');
    const SearchTeachers = require('./Search && Filter/search');
    const FilterTeachers = require('./Search && Filter/filter');

    const {generateOption} = require('./Lab2/generateSelectionOption');

    generateOption(56);

    const db = new DataBase();

    const teacherApi = new TeacherAPI({seed: 'HELLTeachinder'});
    const randomTeachers = await teacherApi.getStartPage({results: 50});
    const teacherList = new TeachersList('teacherList', [...randomTeachers]);
    const popupAddTeacher = new PopupAddTeacher();
    const searchTeachers = new SearchTeachers();

    const filterTeachers = new FilterTeachers();


    let titleChart = [];
    let valueChart = [];
    console.log(randomTeachers);


    searchTeachers.start((res) => {
        if (res === "") {
            teacherList.applySearchElements("");
            return null
        }

        const getOpts = createSearchOpts(res)
        console.log(getOpts);
        teacherList.applySearchElements(getOpts);
    });

    filterTeachers.start((res) => {
        if (res === "") {
            teacherList.applySearchElements("");
            return null
        }
        const getOpts = createFilterOpts(res)
        teacherList.applySearchElements(getOpts);
    });

    function createTeacher(teacherData) {
        teacherList.add(teacherData);
        db.post(JSON.stringify(teacherData));
    }

    function createFilterOpts(rawData) {
        const opts = {};
        Object.keys(rawData).forEach(key => {
            if (!(rawData[key] === false || rawData[key] === 'not_specify' || rawData[key] === "")) {
                opts[key] = rawData[key];
                if (key === "age") {
                    opts[key] = parseInt(rawData[key]);
                }
            }
        });
        console.log(opts, rawData);
        return opts;
    }

    function createSearchOpts(rawData) {
        const opts = {};
        const date = rawData.toLowerCase();
        const searchData = rawData.split(" " || "-");
        let name = "";

        opts.gender = date.match(/\b(\bmale\b|\bfemale\b)/) ? date.match(/\b(\bmale\b|\bfemale\b)/)[0] : "";
        opts.age = date.match(/\d{2}/) ? date.match(/\d{2}/)[0] : "";
        opts.favorite = !!date.match(/\b(\bfavorite\b)/);
        opts.isPhoto = !!date.match(/\b(\bphoto\b)/);

        searchData.forEach(data => {
            let res = data.match(/^(?:(?!\bfemale\b|\bmale\b|\bfavorite\b)[^0-9_!¡?÷¿/\\+=@#$%ˆ&*(){}|~<>;:\s[\]])*/);
            if (res) {
                if (!name) {
                    name = res[0];
                    opts.firstname = name;
                } else
                    opts.lastname = res[0];
            } else if (data.length > 15) opts['note'] = data
        });
        Object.keys(opts).forEach(key => {
            if (opts[key] === "" || opts[key] === false) delete opts[key];
        });
        console.log(opts);
        return opts;
    }

    teacherList.setStartTeacherList();
    popupAddTeacher.FormListener(createTeacher);


    let countTeacher = randomTeachers.length;
    const MAX_TEACHER = 100;

    teacherList.activeMore(() => {
        const limit = 10;
        countTeacher += limit;

        const page = Math.ceil(countTeacher / 10);
        return Promise.resolve()
            .then(() => teacherApi.getLimitedResult({page, limit}))
            .then((teachers) => {
                console.log(teachers);
                titleChart = teacherList.setDataForChart().title;
                valueChart = teacherList.setDataForChart().value;
                if (countTeacher > MAX_TEACHER) {
                    return Promise.resolve({ok: false});
                } else teacherList.addTeachers(teachers);
                return Promise.resolve({ok: true});
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    })
    titleChart = teacherList.setDataForChart().title;
    valueChart = teacherList.setDataForChart().value;
    console.log(teacherList.setDataForChart());

    let barColors = [
        "#b91d47",
        "#00aba9",
        "#2b5797",
        "#e8c3b9",
        "#1e7145",
        "#dfe362",
        "#9741f3",
        "#3f8c61",
        "#091c3a",
        "#3a8383",
        "#931d92",
        "#ec8e2c",
        "#c9d3e5",
    ];

    new Chart("Country-users", {
        type: "doughnut",
        data: {
            labels: titleChart,
            datasets: [{
                backgroundColor: barColors,
                data: valueChart
            }]
        },
        options: {
            title: {
                display: true,
                text: "World Wide Wine Production 2018"
            }
        }
    });
    console.log(hello);

})();
