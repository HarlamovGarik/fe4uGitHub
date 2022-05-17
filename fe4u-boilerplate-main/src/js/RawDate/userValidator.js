/* eslint-disable */
const regular_exp = {
    string: /^[A-Za-z]{5,10}\s[A-Za-z]{5,10}/,
    email: /^[^\W\d_]\w+@\w+\.\w+(\.\w+)?$/,
    phoneNumber: /(\+)?([- _():=+]?\d[- _():=+]?){8,14}/,
}
const validString = (str) => {
    if(!regular_exp.string.test(str))
        console.log("Name or second name failed");
    return regular_exp.string.test(str);
};

const validArrStrings = (strArr) => strArr.every((str) => validString(str) === true);

const validIsInteger = (num) => Number.isInteger(num) && num > 0;


const validIsEmail = (email) => {
    regular_exp.email.test(email);
    console.log("Email is invalid")
};

const validIsPhoneNumber = (number) => {
    regular_exp.phoneNumber.test(number);
    console.log("Email is invalid")
}
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
            // user.location,
        ])
        && validIsInteger(user.age)
        && validIsPhoneNumber(user.phone)
        && validIsEmail(user.email);
}

module.exports = {
    ValidationUser
}