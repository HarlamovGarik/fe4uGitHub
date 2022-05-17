/* eslint-disable */
const Validator = require('../RawDate/userValidator');
const {createUser} = require('../processRawDate');

class PopupAddTeacher {
     FormListener(callback) {
        this.popupForm.onsubmit = (event) => {
            this.teacherData = "";
            event.preventDefault();

            const formData = new FormData(this.formData);
            const rawDataForm = Object.fromEntries(formData.entries());

            let dataForm = createUser(rawDataForm, this.index, false);
            console.log(dataForm);
            if (!this.formData.checkValidity()) return null;

            callback && callback(dataForm)
            this.index++;
            this.formData.reset();
        }
    }

    constructor() {
        this.formData = document.forms.addTeacher;
        this.popupForm = document.getElementById('popup-add-teacher');
        this.index = 0;
    };
}

module.exports = PopupAddTeacher;