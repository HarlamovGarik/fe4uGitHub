/* eslint-disable */

function createTeacherCard(user) {
    let teacherCard = document.createElement("div");
    teacherCard.classList.add("Teacher-card");
    // teacherCard.addEventListener('click', UpdateFavCard);
    teacherCard.id = user.id;
    teacherCard.innerHTML = "<i class='fa-solid fa-crown'></i>" +
        "<div class='flip-card'>" +
        "<div class='front-card'>" +
        "<img alt='avatar' src=" + user.picture_large + " class='avatar'>" +
        "<p class='user-dont-select'>" + user.full_name + "</p>" +
        "<p class='user-dont-select'>" + user.specialty + "</p>" +
        "<p class='user-dont-select'>" + user.location + "</p>" +
        "</div> <div class='back-card'>" +
        "<p class='user-dont-select'>" + user.email + "</p>" +
        "<p class='user-dont-select'>" + user.phone + "</p>" +
        "</div> " +
        "</div>";
    let gallery = document.getElementById("gallery");
    gallery.appendChild(teacherCard);
}

module.exports = {
    createTeacherCard,
}
