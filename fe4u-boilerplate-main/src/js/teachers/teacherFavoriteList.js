/* eslint-disable */
class teacherFavoriteList {
    constructor() {
        this.FavList = document.getElementById('media');
        this.list = {};
        this.count = 0;
    }

    add(teacherCard) {
        const teacherId = teacherCard.dataset.id;
        this.list[teacherId] = {};
        this.FavList.appendChild(teacherCard);
        this.list[teacherId].element = teacherCard;
        this.count++;
    }

    remove(teacherId) {
        const teacher = this.list[teacherId];
        if (!teacher) return;
        this.FavList.removeChild(teacher.element);
        delete this.list[teacherId];
        this.count--;
    }
}

module.exports = teacherFavoriteList;
