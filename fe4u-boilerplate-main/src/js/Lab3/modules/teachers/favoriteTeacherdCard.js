/* eslint-disable */
function createFavoriteCard(user) {
    let favoriteCard = document.createElement("div");
    favoriteCard.id = String("favCard" + user.id);
    favoriteCard.classList.add("Teacher-card");
    favoriteCard.addEventListener('click', UpdateFavPopup);
    favoriteCard.innerHTML = "<a href='#popup'><img alt='avatar' src='+user.picture_large+'class='avatar zoomHove'></a>" +
        "<h4 class='user-dont-select'>" + user.full_name + "</h4>" +
        "<p class='user-dont-select'>" + user.specialty + "</p>" +
        "<p class='user-dont-select'>" + user.address + "</p>";

    let media = document.getElementById("media");
    media.appendChild(favoriteCard);
}

module.exports = {
    createFavoriteCard,
}