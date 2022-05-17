/* eslint-disable */
const L = require('leaflet');
const {content, popupModalInfo} = require('../Lab2/PopupFunctional')

class popupTeacherCard {
    constructor() {
        this.teacher = null;
        this.favCallBack = null;
        this.isCliked = false;
        this.favbtn = document.getElementById('ifavorite');
        this.closebtn = document.getElementById('close-popup')
        this.mapbtn = document.getElementById('map-btn')

        this.infoteacherPopup = document.getElementById('infoPopup');
        this.headerPopup = document.getElementById('headerPopup');
        this.mapPopup = document.getElementById('map-content');
        this.favbtn.onclick = () => {
            if (!this.teacher) return;
            this.teacher.favorite = !this.teacher.favorite;
            this.teacher.favorite ? this.favbtn.classList.add('selected') : this.favbtn.classList.remove('selected');
            if (this.favCallBack) this.favCallBack(this.teacher.favorite);
        };
    }

    clean() {
        this.infoteacherPopup.innerHTML = "";
        this.headerPopup.innerHTML = "";
    }

    initMap(teacherData) {
        const map = L.map('map')
            .setView([teacherData.latitude, teacherData.longitude], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoiam9yZ2VzYW5jaGV6NDE4MyIsImEiOiJja3dpNW54MTQxNTd3Mm9wbXJ4eGM5MXF6In0.QfxusUycYfyzYvbM5xYA9w',
        })
            .addTo(map);

        L.marker([teacherData.latitude, teacherData.longitude])
            .addTo(map);
    }

    initPopup(teacherData) {
        let isClicked = false;
        this.clean();
        this.teacher = teacherData;
        this.teacher.favorite ? this.favbtn.classList.add('selected') : this.favbtn.classList.remove('selected');
        popupModalInfo.style.display = 'block';
        content.classList.toggle('background');

        const note = teacherData.note || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n" +
            "                        incididunt ut labore et dolore magna aliqua. Eget nunc scelerisque viverra mauris\n" +
            "                        in aliquam sem fringilla. Nisl rhoncus mattis rhoncus urna neque. Neque convallis\n" +
            "                        a cras semper auctor neque vitae tempus quam. Donec pretium vulputate sapien nec\n" +
            "                        sagittis. Gravida neque convallis a cras. Et molestie ac feugiat sed lectus vestibulum mattis\n" +
            "                        ullamcorper velit. Tortor pretium viverra suspendisse potenti.";
        this.headerPopup.innerHTML = "Teacher: " + teacherData.full_name;
        this.infoteacherPopup.innerHTML =

            "<div class=\"modal-top-info\">" +
            "<div class=\"modal-info-img\">" +
            "<img alt='avatar' src=" + teacherData.picture_large + " class=\"avatar\">\n" +
            "</div>\n" +
            "<div class=\"modal-text\">" +
            "<h2 class='modal-header'>" + teacherData.full_name + "</h2>" +
            "<p>" + teacherData.country + "," + teacherData.city + "</p>" +
            "<p>" + teacherData.age + ", " + teacherData.gender + "</p>" +
            "<p ><a href=''>" + teacherData.email + "</a></p>" +
            "<p>" + teacherData.phone + "</p>" +
            "</div>" +
            "</div>" +
            "<div class=\"modal-bottom-info\">" +
            "<hr>" +
            "<div class=\"modal-info-note\">" +
            "<p>" + note + "</p>" +
            "</div>" +
            "</div>";
        if (teacherData.latitude) {
            this.mapbtn.onclick = () => {
                if (isClicked) {
                    isClicked = false;
                    this.mapPopup.innerHTML = '';
                } else {
                    const mapInst = document.getElementById('map');
                    if (mapInst) mapInst.remove();
                    this.mapPopup.innerHTML = '<div id="map"></div>';
                    this.initMap(teacherData);
                    isClicked = true;

                }
            }
        }
    }
}

module.exports = popupTeacherCard;