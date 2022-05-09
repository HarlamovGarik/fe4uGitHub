/* eslint-disable */
const TeacherCard = require('./teacherCard');
const FavoriteTeacherCard = require('./favoriteTeacherdCard');
const Process = require('../processRawDate');

class teacherList {
    constructor(listIDm, teachers) {
        this.teachers = Process.userFormatting(teachers);
        this.teachers.forEach(teacher => {
            TeacherCard.createTeacherCard(teacher);
        })
    };
}

module.exports = teacherList;