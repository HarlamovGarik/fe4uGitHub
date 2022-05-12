/* eslint-disable */
import {hello} from "./test-module";

(async () => {
    require('./Lab2/PopupFunctional');
    require('./Lab2/add_avatar');


    const TeachersList = require('./teachers/teacherList')
    const TeacherAPI = require("./API/teacherApi");

    const GenerateOption = require('./Lab2/generateSelectionOption');

    GenerateOption.generateOption(56);

    const teacherApi = new TeacherAPI({seed: 'HELLTeachinder'});
    const randomTeachers = await teacherApi.getStartPage({results: 20});
    console.log(randomTeachers);
    const teacherList = new TeachersList('teacherList', [...randomTeachers]);
    teacherList.setStartTeacherList();
    console.log(hello);
})();
