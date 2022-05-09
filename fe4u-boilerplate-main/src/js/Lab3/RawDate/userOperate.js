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

const checkForCompliance = (user, opts) => {
    const keys = Object.keys(opts);
    return keys.length > 0 && keys.every((key) => opts[key] === user[key]);
};

function SearchUser(users, opts) {
    return users.find((user) => checkForCompliance(user, opts)) || null;
}

module.exports =
    {
        filterUsers,
        anyCompare,
        SearchUser,
    };