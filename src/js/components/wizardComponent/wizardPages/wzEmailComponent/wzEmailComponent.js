import './wzEmailComponent.css';

import { Component } from '../../../component';
import { div, p, lbl, input } from '../../../../libs/html'

export class WZEmailComponent extends Component {
    constructor(parent, wizardComponent) {
        super(parent);

        this.isValid = false;
        this.container.classList.add('wzEmailComponent');
        this.wizardComponent = wizardComponent;

        var label = lbl({ 'innerHTML': 'Dirección de correo electrónico', 'for': 'emailTxt' }, this.container, null);
        this.emailTxt = input({ 'id': 'emailTxt', 'placeholder': 'Ingrese su correo' }, this.container, null);

        this.emailErrorMsj = p({ 'innerHTML': 'Por favor, introduzca un correo electronico valido', 'className': 'emailErrorMsj', 'hidden': true }, this.container, null);



        label = lbl({ 'innerHTML': 'Contraseña.', 'for': 'passwordTxt' }, this.container, null);
        this.passwordTxt = input({ 'id': 'passwordTxt', 'placeholder': 'Contraseña', 'type': 'password' }, this.container, null);
        this.passwordErrorMsj = p({ 'innerHTML': 'Por favor, introduzca una contraseña valida', 'className': 'passwordErrorMsj', 'hidden': true }, this.container, null);

        label = lbl({ 'innerHTML': 'Repetir contraseña', 'for': 'password2Txt' }, this.container, null);
        this.password2Txt = input({ 'id': 'password2Txt', 'placeholder': 'Ingrese la misma contraseña', 'type': 'password' }, this.container, null);
        this.password2Txt.classList.add('password2Txt');
        this.password2ErrorMsj = p({ 'innerHTML': 'Las constraseñas no son iguales.', 'className': 'passwordErrorMsj', 'hidden': true }, this.container, null);

        var notaDeContrasena = p({ 'innerHTML': 'La contraseña debe tener un mínimo de 6 y un máximo de 20 caracteres y debe incluir una mayúscula y un número.', 'className': 'notaDeContrasena' }, this.container, null);

    }

    checkValidations() {
        this.isValid = true;
        var email = this.emailTxt.value;
        if (email === '') {
            this.emailErrorMsj.hidden = false;
            this.isValid = false;
        }

        if (!this.isValidateEmail(email)) {
            this.emailErrorMsj.hidden = false;
            this.isValid = false;
        } else {
            this.emailErrorMsj.hidden = true;
        }

        var password1 = this.passwordTxt.value;

        if (password1 === '') {
            this.passwordErrorMsj.hidden = false;
            this.isValid = false;
        }

        if (!this.isValidPassword(password1)) {
            this.passwordErrorMsj.hidden = false;
            this.isValid = false;
        } else {
            this.passwordErrorMsj.hidden = true;
        }

        var password2 = this.password2Txt.value;

        if (password2 === '') {
            this.password2ErrorMsj.hidden = false;
            this.isValid = false;
        } else if (!this.isSamePassword(password1, password2)) {
            this.password2ErrorMsj.hidden = false;
            this.isValid = false;
        } else {
            this.password2ErrorMsj.hidden = true;
        }

        if (this.isValid) {
            this.wizardComponent.signUpData.email = email;
            this.wizardComponent.signUpData.cemail = email;
            this.wizardComponent.signUpData.password = password1;
            this.wizardComponent.signUpData.cpassword = password1;
        }

        return this.isValid
    }

    isValidateEmail(email) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return true;
        }
        return false;
    }

    //To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
    isValidPassword(password) {
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (password.match(passw)) {
            return true;
        } else {
            return false;
        }
    }

    isSamePassword(password1, password2) {
        return password1 === password2
    }

    clean() {
        this.isValid = false;
        this.emailTxt.value = '';
        this.passwordTxt.value = '';
        this.password2Txt.value = '';
    }
}