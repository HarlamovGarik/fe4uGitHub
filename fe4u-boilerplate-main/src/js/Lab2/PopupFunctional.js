/* eslint-disable */
let modal = document.getElementById("modal-menu");
let content = document.getElementById("main-content");
let modal_info = document.getElementById("modal-info");
let add_teacher = document.getElementById("popupaddteacher");

window.onclick = function (event) {
    if (event.target === modal || event.target === modal_info) {
        modal_info.style.display = "none";
        modal.style.display = "none";
        content.classList.toggle("background");
    }
}

$(".toggle").on('click', function () {
    $("div.sidebar").toggleClass("selected");
    add_teacher.classList.toggle("selected");
});

$("div.addteacher").on('click', function () {
    modal.style.display = "block";
    content.classList.toggle("background");
});

$(".close").on('click', function () {
    modal.style.display = "none";
    modal_info.style.display = "none";
    content.classList.toggle("background");
});