/* eslint-disable */
function filterUsers(users, opts) {
    return users.filter((user) => Object.keys(opts).every((key) => opts[key] === user[key]));
}

function anyCompare(elm1, elm2) {
    if (typeof (elm1) !== typeof (elm2)) {
        throw Error("It is not possible to compare two values of different types.");
    }
    return (elm1 > elm2) ? 1 : ((elm2 > elm1) ? -1 : 0);
}

// function SearchUser(users, opts) {
//     const fields = [];
//     console.log(users);
//     users.forEach((user) => {
//         Object.keys(opts).forEach(key => {
//             if (opts[key] !== "" && key === 'firstname') {
//                 console.log(user[key].slice(0,opts[key].length));
//                 if (user[key].slice(0,opts[key].length).toLowerCase() === opts[key].toLowerCase()) fields.push(user);
//             }else if(key !== 'age'){
//                 if (user[key].toLowerCase() === opts[key])
//                     fields.push(user);
//             }else if (user[key] == opts[key]) fields.push(user);
//
//         });
//     });
//     console.log(fields);
//     return fields;
// }

const checkForCompliance = (user, opts) => {
    const keys = Object.keys(opts);
    return keys.every((key) => opts[key] == user[key]);
};

function SearchUser(users, opts) {
    return users.filter((user) => checkForCompliance(user, opts)) || null;
}

module.exports =
    {
        filterUsers,
        anyCompare,
        SearchUser,
    };