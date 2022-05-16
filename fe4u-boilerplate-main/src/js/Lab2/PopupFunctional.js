/* eslint-disable */
const formAddTeacher = document.getElementById("modal-menu");
const content = document.getElementById("main-content");
const popupModalInfo = document.getElementById("modal-info");
const popupAddTeacher = document.getElementById("popup-add-teacher");

window.onclick = function (event) {
    if (event.target === formAddTeacher || event.target === popupModalInfo) {
       close();
    }
}
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && (popupModalInfo.style.display === "block" || formAddTeacher.style.display === "block")) {
       close();
    }
});

$(".toggle").on('click', function () {
    $("div.sidebar").toggleClass("selected");
    popupAddTeacher.classList.toggle("selected");
});

$("div.add-teacher").on('click', function () {
    formAddTeacher.style.display = "block";
    content.classList.toggle("background");
});

$(".close").on('click', function () {
    close();
});
function close(){
    formAddTeacher.style.display = "none";
    popupModalInfo.style.display = "none";
    content.classList.toggle("background");
}
module.exports = {
    content,
    popupModalInfo,
}