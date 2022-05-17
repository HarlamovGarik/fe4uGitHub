/* eslint-disable */
const {CourseEnum} = require('./Lab2/generateSelectionOption');
const getField = (obj, ...date) => date.reduce((el, level) => el && el[level], obj);

const getCleanObject = (user) => Object.keys(user)
    .reduce((res, key) => {
        (user[key] && user[key] !== '-') && (res[key] = user[key]);
        return res;
    }, {});


function createUser(user, index, form = false) {
    let birthday = "";
    let age = "";
    let idForm = "";
    const get = (...date) => {
        const res = getField(user, ...date);
        return res && typeof res !== 'object' ? res : null;

    }

    const getSpecialty = () => {
        return CourseEnum[Math.floor(Math.random() * CourseEnum.length)];
    }

    const id = get('id') || `${get('id', 'name') || ''}${get('id', 'value') || ''}`;

    const firstname = get('name', 'first') || get("name") || '';
    const lastname = get('name', 'last') || get("lastname") || '';
    const full_name = firstname + " " + lastname;

    const location = `${get('location', 'country') || get('country' || "")}, ${get('location', 'city') || get('city') || ""}`.trim();
    if (!form) {
        birthday = new Date(user.fyear, user.fmonth, user.fday);
        age = new Date().getFullYear() - user.fyear;
        idForm = `FORM${index}`;
    }
    return {
        id: id || idForm || `NEW${1000 + index}`,
        gender: get('gender'),
        full_name: get('full_name') || full_name,
        firstname: firstname,
        lastname: lastname,
        // state: get('state') || get('location', 'state'),
        country: get('location', 'country') || get('country') || null,
        city: get('location', 'city') || get('city') || "",
        // location: get('location') || location,
        postcode: get('postcode') || get('location', 'postcode') || null,

        email: get('email'),
        phone: get('phone'),

        age: get('age') || get('dob', 'age') || age,
        birthday: get('birthday') || get('dob', 'date') || birthday,
        picture_large: get('picture_large') || get('picture', 'large') || null,
        specialty: get('specialty') || getSpecialty(),

        latitude: get('latitude') || get('location', 'coordinates', 'latitude') || '',
        longitude: get('longitude') || get('location', 'coordinates', 'longitude') || '',
        isPhoto: !!get('picture', 'large'),
        favorite: false,
        note: get("note") || null,
    }
}
function generateOptions(list){
    const optionsRegion = document.getElementById("select-region");
    for (let obj of list) {
        optionsRegion.append(new Option(obj, obj));
    }
}
const uniqueOption = (list) => {
    const result = [];
    for (let obj of list) {
        if (!result.includes(obj.country)) {
            result.push(obj.country);
        }
    }
    return result;
}

function userFormatting(user_random_mock) {
    let list = user_random_mock.map(createUser);
    generateOptions(uniqueOption(list));

    return list;
}


module.exports = {
    userFormatting,
    createUser,
    uniqueOption,
}