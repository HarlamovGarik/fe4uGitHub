/* eslint-disable */
function generateOption(ageRange){
    let selectOptionMonth = document.getElementById("fmonth")
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    for (let i = 0; i < MONTHS.length; i++) {
        selectOptionMonth.append(new Option(MONTHS[i], i))
    }

    let selectOptionYears = document.getElementById("fyear")
    let currentYear = new Date().getFullYear();
    let _maxYear = currentYear - 16;
    let _minYear = _maxYear - ageRange;

    for (let i = _maxYear; i > _minYear; i--) {
        selectOptionYears.append(new Option(i, i));
    }
}
module.exports = generateOption;