/* eslint-disable */
const regular_exp = {
    string: /^[\p{Lu}]{1}[\p{Ll}]+$/u,
    email: /^[^\W\d_]\w+@\w+\.\w+(\.\w+)?$/,
    phoneNumber: /(\+)?([- _():=+]?\d[- _():=+]?){8,14}/,
    date: /^\d{1,4}-(0(?=[1-9])|1(?=[0-2]))[0-9]-(0(?=[1-9])|(1|2)(?=[0-9])|3(?=[0-1]))[0-9]T((0|1|2)(?=[0-9]))[0-9]:((0|1|2|3|4|5)(?=[0-9]))[0-9]:((0|1|2|3|4|5)(?=[0-9]))[0-9]\.[0-9]{1,3}Z$/,
}
const validString = (str) => regular_exp.string.test(str);

const validArrStrings = (strArr) => strArr.every((str) => validString(str) === true);

const validIsInteger = (num) => Number.isInteger(num) && num > 0;

const validIsEmail = (email) => regular_exp.email.test(email);

const validIsPhoneNumber = (number) => regular_exp.phoneNumber.test(number);

// const dateCompare = (date1, date2) => {
//     if (typeof (date1) !== 'string' || typeof (date2) !== 'string' || !TEST.date.test(date1) || !TEST.date.test(date2)) {
//         throw Error("Date format is incorrect.");
//     }
//     const d1 = Date.parse(date1);
//     const d2 = Date.parse(date2);
//     return d1 > 0 ? (d2 > 0 ? ((d1 > d2) ? 1 : ((d2 > d1) ? -1 : 0)) : 1)
//         : (d2 > 0 ? -1 : ((d1 > d2) ? 1 : ((d2 > d1) ? -1 : 0)));
// };

function ValidationUser(user) {
    return validArrStrings([
            user.full_name,
            user.gender,
            user.note,
            user.state,
            user.city,
            user.country,
        ])
        && validIsInteger(user.age)
        && validIsPhoneNumber(user.number)
        && validIsEmail(user.email);
}
module.exports = {
    ValidationUser
}