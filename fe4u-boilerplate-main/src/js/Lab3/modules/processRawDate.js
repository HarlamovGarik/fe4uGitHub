/* eslint-disable */
const getField = (obj, ...date) => date.reduce((el, level) => el && el[level], obj);

const createUser = (user, index) => {
    const get = (...date) => {
        const res = getField(user, ...date);
        return res && typeof res !== 'object' ? res : null;

    }
    const id = get('id') || `${get('id', 'name') || ''}${get('id', 'value') || ''}`;
    const full_name = `${get('name', 'first') || ''} ${get('name', 'last') || ''}`.trim();
    const location = `${get('location', 'country') || ''} ${get('location', 'city') || ''}`.trim();

    return {
        id: id || `NEW${1000 + index}`,
        gender: get('gender'),
        full_name: get('full_name') || full_name,

        // state: get('state') || get('location', 'state'),
        location: get('location') || location,
        postcode: get('postcode') || get('location', 'postcode'),

        email: get('email'),
        phone: get('phone'),

        age: get('age') || get('dob', 'age'),
        birthday: get('birthday') || get('dob', 'date'),
        picture_large: get('picture_large') || get('picture', 'large'),
        specialty: get('specialty'),
        favorite: false,
        note: null,
    }
}

function userFormatting(user_random_mock) {
    const users = user_random_mock.map(createUser);
    return users.map((user, index, array) => {
        if (user) {
            // search clone user
            const userCloneIndex = array.findIndex((oldUser, oldIndex) => oldUser && index !== oldIndex
                && oldUser.full_name === user.full_name && (oldUser.id === user.id
                    || oldUser.phone === user.phone || oldUser.email === user.email));
            // check if we found
            if (userCloneIndex !== -1) {
                const cloneUser = getCleanObject(array[userCloneIndex]);
                const resUser = Object.assign(user, cloneUser);
                array[userCloneIndex] = null;
                return resUser;
            }
            return user;
        }
        return false;
    }).filter(Boolean);
}

module.exports = {
    userFormatting,
}