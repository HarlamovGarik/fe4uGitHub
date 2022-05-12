/* eslint-disable */
const {CourseEnum} = require('./Lab2/generateSelectionOption');
const getField = (obj, ...date) => date.reduce((el, level) => el && el[level], obj);

const getCleanObject = (user) => Object.keys(user)
    .reduce((res, key) => {
        (user[key] && user[key] !== '-') && (res[key] = user[key]);
        return res;
    }, {});

function createUser(user, index) {
    const get = (...date) => {
        const res = getField(user, ...date);
        return res && typeof res !== 'object' ? res : null;

    }
    const getSpecialty = () => {
        return CourseEnum[Math.floor(Math.random() * CourseEnum.length)];
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
        specialty: get('specialty') || getSpecialty(),
        favorite: false,
        note: null,
    }
}

function userFormatting(user_random_mock) {
    return user_random_mock.map(createUser);
}

module.exports = {
    userFormatting,
    createUser,
}