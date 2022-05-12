/* eslint-disable */

const FavoriteTeacherCard = require('./teacherFavoriteList');
const TeacherTableList = require('./teacherTable');
const PopupTeacherCard = require('../Popup/popupTeacherCard');

const Process = require('../processRawDate');

class teacherList {
    static fieldHTML(teacherCard, teacher) {
        teacherCard.innerHTML = "<i class='fa-solid fa-crown favorite'></i>" +
            "<div class='flip-card'>" +
            "<div class='front-card'>" +
            "<img alt='avatar' src=" + teacher.picture_large + " class='avatar'>" +
            "<p class='user-dont-select'>" + teacher.full_name + "</p>" +
            "<p class='user-dont-select'>" + teacher.specialty + "</p>" +
            "<p class='user-dont-select'>" + teacher.location + "</p>" +
            "</div> <div class='back-card'>" +
            "<p class='user-dont-select'>" + teacher.email + "</p>" +
            "<p class='user-dont-select'>" + teacher.phone + "</p>" +
            "</div> " +
            "</div>";
    }

    static createTeacherCard(teacher) {
        const teacherCard = document.createElement("div");
        teacherCard.classList.add("Teacher-card");
        teacherCard.id = teacher.id;
        teacherList.fieldHTML(teacherCard, teacher);
        return teacherCard;
    }

    constructor(listIDm, teachers) {
        this.teachers = teachers;
        this.teacherGallery = document.getElementById("gallery");
        this.teacherTableList = new TeacherTableList();
    };

    onClickCardTeacher(teacher) {

    };

    clear() {

    };

    createTeacherList(teachers) {
        if (teachers.length > 0) {
            teachers.forEach((teacher) => {
                const teacherCard = teacherList.createTeacherCard(teacher);
                teacherCard.onclick = () => this.onClickCardTeacher(teacher);
                this.teacherGallery.appendChild(teacherCard);
            });
        }
    }

    setStartTeacherList() {
        this.createTeacherList(this.teachers);
        this.teachers.forEach((teacher) => {
            this.teacherTableList.add(teacher);
            if (teacher.favorite) {
                // const teacherLiElm = this.createFavoritesLiElm(teacher);
                // this.teacherFavoriteList.add(teacherLiElm);
                // this.teacherFavoriteList.updateListElements();
            }
        });
        this.teacherTableList.updateTable();
    }

    // add new data (load more)
    add(teacherDate) {
        const teacher = Process.createUser(teacherDate, this.teachers.length + 1);
        const teacherCard = teacherList.createTeacherCard(teacherDate);
        teacherCard.onclick = () => this.onClickCardTeacher(teacher);
        this.teachers.push(teacherDate);
        this.teacherGallery.appendChild(teacherCard);
        this.teacherTableList.add(teacher);
    };

    addTeachers(teachers) {
        teachers.forEach((teacher) => this.add(teacher));
    }
}

module.exports = teacherList;