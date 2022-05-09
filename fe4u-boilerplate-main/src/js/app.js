/* eslint-disable */
// (async () => {
    require('../css/app.css');
    require('./Lab2/PopupFunctional');
    require('./Lab2/add_avatar');
    const TeachersList = require('./Lab3/modules/teachers/teacherList')
    const TeacherAPI = require("./Lab3/API/teacherApi");

    const Generate_OPTIONS = require('./Lab2/generateSelectionOption');
    Generate_OPTIONS(56);

    const teacherApi = new TeacherAPI({seed: 'teachinder'});
    const randomTeachers = teacherApi.getStartPage({count: 4});
    console.log(randomTeachers);
    const teachersList = new TeachersList('topTeachers', randomTeachers);
// });