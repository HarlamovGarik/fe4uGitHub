/* eslint-disable */
require('../css/app.css');
require('./Lab2/PopupFunctional');
require('./Lab2/add_avatar')

let selectOptionMonth = document.getElementById("fmonth")
const monhts = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
for (let i = 0; i < monhts.length; i++) {
    selectOptionMonth.append(new Option(monhts[i], i))
}

let selectOptionYears = document.getElementById("fyear")
var currentYear = new Date().getFullYear();
var _maxYear = currentYear - 17;
var _minYear = _maxYear - 60;

for (let i = _maxYear; i > _minYear; i--) {
    selectOptionYears.append(new Option(i, i));
}