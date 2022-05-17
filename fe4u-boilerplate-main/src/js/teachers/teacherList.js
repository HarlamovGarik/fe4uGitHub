/* eslint-disable */

const FavoriteTeacherCard = require('./teacherFavoriteList');
const TeacherTableList = require('./teacherTable');
const PopupTeacherCard = require('../Popup/popupTeacherCard');

const Process = require('../processRawDate');
const {SearchUser} = require('../RawDate/userOperate');

const popupTeacherCard = new PopupTeacherCard();

class TeacherList {
    static fieldHTML(teacherCard, teacher) {
        const picture_src = teacher.picture_large ? teacher.picture_large : '';
        teacherCard.innerHTML = "<i class='fa-solid fa-crown favorite'></i>" +
            "<div class='flip-card'>" +
            "<div class='front-card'>" +
            "<img alt='avatar' src=" + picture_src + " class='avatar'>" +
            "<p class='user-dont-select'>" + teacher.full_name + "</p>" +
            "<p class='user-dont-select'>" + teacher.specialty + "</p>" +
            "<p class='user-dont-select'>" + teacher.country + "," + teacher.city + "</p>" +
            "</div> <div class='back-card'>" +
            "<p class='user-dont-select'>" + teacher.email + "</p>" +
            "<p class='user-dont-select'>" + teacher.phone + "</p>" +
            "</div> " +
            "</div>";
        if (teacher.favorite)
            teacherCard.getElementsByTagName("i")[0].classList.add("selected");
    }

    static fieldFavHTML(favTeacherCard, teacher) {
        favTeacherCard.innerHTML = "<i class='fa-solid fa-crown favorite'></i><img alt='avatar' src=" + teacher.picture_large + " class='avatar'>" +
            "<p class='user-dont-select'>" + teacher.full_name + "</p>" +
            "<p class='user-dont-select'>" + teacher.specialty + "</p>" +
            "<p class='user-dont-select'>" + teacher.location + "</p>";
        if (teacher.favorite)
            favTeacherCard.getElementsByTagName("i")[0].classList.add("selected");
    }

    static createTeacherCard(teacher, fav = false) {
        const className = `teacher-card ${teacher.favorite ? 'favorite' : ''}`;
        const teacherCard = document.createElement("div");
        teacherCard.className = className.trim();
        teacherCard.dataset.id = teacher.id;
        teacherCard.id = teacher.id;

        if (!fav) {
            TeacherList.fieldHTML(teacherCard, teacher);
        } else TeacherList.fieldFavHTML(teacherCard, teacher);
        return teacherCard;
    }

    createFavTeacherCard(teacher) {
        const favoriteTeacherCard = TeacherList.createTeacherCard(teacher, true);
        favoriteTeacherCard.onclick = () => this.onClickCardTeacher(teacher);
        return favoriteTeacherCard;
    };

    constructor(listIDm, teachers) {
        this.teachers = Process.userFormatting(teachers);
        console.log(this.teachers);
        this.teacherGallery = document.getElementById("gallery");

        this.teacherTableList = new TeacherTableList();
        this.teacherFavList = new FavoriteTeacherCard();

        this.loadMoreBtn = document.getElementById("loadMore");
        this.resetBtn = document.getElementById("resetBtn");
        this.resetBtn.onclick = () => this.resetFilterElements();
        this.teacherList = null;
        this.teacherlistFiltered = [];
    };

    static getTeacherElement(teacherCard, teacherId) {
        let getTeacherCard = null;
        if (teacherCard) {
            teacherCard.childNodes.forEach((item) => {
                getTeacherCard = (item.dataset.id === teacherId) ? item : getTeacherCard;
            });
        }
        return getTeacherCard;
    }

    onClickFavorite(isFavorite, teacher) {
        console.log(teacher, isFavorite);
        const teacherCard = document.getElementById(teacher.id);
        if (isFavorite) {
            const cloneTeacherLiEml = this.createFavTeacherCard(teacher);
            this.teacherFavList.add(cloneTeacherLiEml);
            teacherCard.getElementsByTagName("i")[0].classList.add("selected");
        } else {
            this.teacherFavList.remove(teacher.id);
            teacherCard.getElementsByTagName("i")[0].classList.remove("selected");
        }
    };

    onClickCardTeacher(teacher) {
        popupTeacherCard.initPopup(teacher);
        popupTeacherCard.favCallBack = (isFavorite) => this.onClickFavorite(isFavorite, teacher);
    };

    createTeacherList(teachers) {
        const teacherList = document.createElement('div')
        teacherList.classList.add("gallery-teachers");
        if (teachers.length > 0) {
            teachers.forEach((teacher) => {
                const teacherCard = TeacherList.createTeacherCard(teacher);
                teacherCard.onclick = () => this.onClickCardTeacher(teacher);
                teacherList.appendChild(teacherCard);
            });
        }
        return teacherList;
    }

    setStartTeacherList() {
        if (this.teacherList) return;
        this.teacherList = this.createTeacherList(this.teachers);
        this.teacherList.firstChild && this.teacherGallery.appendChild(this.teacherList);
        this.teachers.forEach((teacher) => {
            this.teacherTableList.add(teacher);
            if (teacher.favorite) {
                const teacherLiElm = this.createFavTeacherCard(teacher);
                this.teacherFavList.add(teacherLiElm);
            }
        });
        this.teacherTableList.updateTable();
    }

    add(teacherDate) {
        const teacher = Process.createUser(teacherDate, this.teachers.length + 1, true);
        const teacherCard = TeacherList.createTeacherCard(teacher);
        teacherCard.onclick = () => this.onClickCardTeacher(teacher);
        this.teachers.push(teacher);
        this.teacherList.appendChild(teacherCard);

        this.teacherTableList.add(teacher);
        this.teacherTableList.setupPage(this.teacherTableList.page.current);

    };

    activeMore(onClickMore) {
        this.loadMoreBtn.addEventListener('click', async () => {
            this.loadMoreBtn.classList.add('active');
            onClickMore()
                .then((res) => {
                    this.loadMoreBtn.classList.remove('active');
                    if (!res.ok) {
                        this.loadMoreBtn.classList.add('not_work');
                        this.loadMoreBtn.setAttribute("disabled", "");
                    }
                });
        });
    }

    clear() {
        if (this.teacherList && this.teacherGallery.firstChild === this.teacherList) {
            this.teacherGallery.removeChild(this.teacherList);
        } else if (this.teacherlistFiltered && this.teacherGallery.firstChild === this.teacherlistFiltered) {
            this.teacherGallery.removeChild(this.teacherlistFiltered);
        }
    }

    applySearchElements(opts = {}) {
        if (!Object.keys(opts).length) {
            this.resetFilterElements();
            this.teacherlistFiltered = [];
        } else {
            const teachersSearched = SearchUser(this.teachers, opts);
            console.log(teachersSearched);
            this.teacherlistFiltered = this.createTeacherList(teachersSearched);
            this.teacherGallery.innerHTML = ""
            this.teacherGallery.appendChild(this.teacherlistFiltered);
        }
    }

    setDataForChart() {
        const TitleValue = Process.uniqueOption(this.teachers);
        const Value = {};
        const value = [];
        TitleValue.forEach(titleEl =>{
            Value[titleEl] = 0;
        });
        this.teachers.forEach(el => {
            TitleValue.forEach(titleEl =>{
               if(el.country === titleEl) Value[titleEl]++;
            });
        });
        Object.keys(Value).forEach(key => {
            value.push(Value[key]);
        });
        return {title: TitleValue, value: value};
    }

    resetFilterElements() {
        this.clear();
        this.teacherList.firstChild && this.teacherGallery.appendChild(this.teacherList);
    }

    addTeachers(teachers) {
        teachers.forEach((teacher) => this.add(teacher));
        this.resetFilterElements();
        this.teacherlistFiltered = [];
    }
}

module
    .exports = TeacherList;