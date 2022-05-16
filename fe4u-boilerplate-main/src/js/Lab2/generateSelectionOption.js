/* eslint-disable */

const CourseEnum = [
    'Mathematics',
    'Physics',
    'English',
    'Computer Science',
    'Dancing',
    'Chess',
    'Biology',
    'Chemistry',
    'Law',
    'Art',
    'Medicine',
    'Statistics',
];
const MonthEnum = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function generateOption(ageRange) {
    let selectOptionMonth = document.getElementById("fmonth")
    for (let i = 0; i < MonthEnum.length; i++) {
        selectOptionMonth.append(new Option(MonthEnum[i], i));
    }

    let selectOptionYears = document.getElementById("fyear")
    let currentYear = new Date().getFullYear();
    let _maxYear = currentYear - 16;
    let _minYear = _maxYear - ageRange;

    let selectOptionSpec = document.getElementById("specialty")
    CourseEnum.forEach(course => {
        selectOptionSpec.append(new Option(course, course));
    });

    for (let i = _maxYear; i > _minYear; i--) {
        selectOptionYears.append(new Option(i, i));
    }
}

module.exports = {
    generateOption,
    CourseEnum,
    MonthEnum,
};