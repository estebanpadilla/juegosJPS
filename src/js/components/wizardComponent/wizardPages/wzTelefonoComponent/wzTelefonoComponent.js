import './wzTelefonoComponent.css';
import { Component } from '../../../component';
import { div, p, lbl, input, select, option, button } from '../../../../libs/html'

export class WZTelefonoComponent extends Component {
    constructor(parent, wizardComponent) {
        super(parent);

        this.container.classList.add('wzTelefonoComponent');
        this.wizardComponent = wizardComponent;
        this.isValid = false;

        var label = lbl({ 'innerHTML': 'Teléfono', 'for': 'phoneTxt' }, this.container, null);
        this.phoneTxt = input({ 'id': 'phoneTxt', 'placeholder': '88007700', 'className': 'phoneTxt' }, this.container, null);
        this.phoneErrorMsj = p({ 'innerHTML': 'Por favor, introduzca un número de télefono valido, ejemplo 8888-1010 o 88881010.', 'className': 'phoneErrorMsj', 'hidden': true }, this.container, null);

        label = lbl({ 'innerHTML': 'Fecha de Nacimiento', 'for': 'dateContainer' }, this.container, null);
        this.dateContainer = div({ 'id': 'dateContainer', 'className': 'birthdateContainer' }, this.container, null);

        var dateCol1 = document.createElement('div');
        dateCol1.classList.add('dateColContainer');
        this.dateContainer.appendChild(dateCol1);

        label = lbl({ 'innerHTML': 'Día', 'for': 'daySlt' }, dateCol1, null);
        this.daySlt = select({ 'id': 'daySlt', 'placeholder': 'Provincia' }, dateCol1, null);
        this.daySlt.classList.add('dateSelect');
        option({ 'value': 0, 'innerHTML': 'Día' }, this.daySlt, null);
        for (var i = 1; i <= 31; i++) {
            option({ 'value': i, 'innerHTML': i }, this.daySlt, null);
        }

        var dateCol2 = document.createElement('div');
        dateCol2.classList.add('dateColContainer');
        this.dateContainer.appendChild(dateCol2);

        label = lbl({ 'innerHTML': 'Mes', 'for': 'memesSltsTxt' }, dateCol2, null);
        this.mesSlt = select({ 'id': 'mesSlt', 'placeholder': 'Provincia' }, dateCol2, null);
        this.mesSlt.classList.add('dateSelect');
        option({ 'value': 0, 'innerHTML': 'Mes' }, this.mesSlt, null);
        var meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
        for (var i = 0; i < meses.length; i++) {
            option({ 'value': meses[i], 'innerHTML': meses[i] }, this.mesSlt, null);
        }

        var dateCol3 = document.createElement('div');
        dateCol3.classList.add('dateColContainer');
        this.dateContainer.appendChild(dateCol3);

        label = lbl({ 'innerHTML': 'Año', 'for': 'annoTxt' }, dateCol3, null);
        this.annoSlt = select({ 'id': 'annoSlt', 'placeholder': 'Provincia' }, dateCol3, null);
        this.annoSlt.classList.add('dateSelect');
        option({ 'value': 0, 'innerHTML': 'Año' }, this.annoSlt, null);
        var dt = new Date();
        for (var i = 1940; i <= dt.getFullYear(); i++) {
            option({ 'value': i, 'innerHTML': i }, this.annoSlt, null);
        }

        this.dateErrorMsj = p({ 'innerHTML': 'Por favor, elija la fecha de su nacimiento.', 'className': 'phoneErrorMsj', 'hidden': true }, this.container, null);

        var horizontalContainer = div({ 'className': 'horizontalContainer' }, this.container, null);
        this.conditionsCheck = input({ 'id': 'conditionsCheck', 'type': 'checkbox' }, horizontalContainer, null);
        this.conditionsCheck.classList.add('conditionsCheck');

        var text = 'Al marcar esta casilla, acepto los <a href="/document/terms-of-use" target="_blank">Términos y Condiciones</a> , <a href="/document/security-and-privacy" target="_blank">y Política de Privacidad </a>  y confirmo que soy mayores de 18 años.'

        var conditionsP = p({ 'id': 'conditionsP', 'innerHTML': text }, horizontalContainer, null);
        conditionsP.classList.add('conditionsP');

        this.conditionsErrorMsj = p({ 'innerHTML': 'Debe aceptar los terminos y condiciones.', 'className': 'passwordErrorMsj', 'hidden': true }, this.container, null);

        // var validatePhoneBtn = button({ 'innerHTML': 'Phone', 'onclick': this.validatePhoneBtnAction.bind(this) }, this.container, null);
    }

    validatePhoneBtnAction() {
        var phone = this.phoneTxt.value;
        if (phone === '') {
            this.phoneErrorMsj.hidden = false;
        }

        if (!this.isValidPhone(phone)) {
            this.phoneErrorMsj.hidden = false;
        } else {
            this.phoneErrorMsj.hidden = true;
        }
    }

    areaCodes() {
        return `&#x1F1E8&#x1F1F7 +506`;
    }

    onPhoneKeyUp(e) {
        var phone = this.phoneTxt.value;
        // var numbers = Array.from(phone);

        // if (phone.length === 0) {
        //     numbers = ['0', '0', '0', '0', '0', '0', '0', '0'];
        // } else if (phone.length <= 7) {
        //     numbers = ['0', '0', '0', '0', '0', '0', '0', '0'];
        // }
        // var format = numbers.splice(numbers.length - 8, 8).join('')
        // debugger;
        if (phone !== '') {
            if (phone.length > 8) {
                phone = phone.substring(0, 8)
                this.phoneTxt.value = phone;
            }
        }


        // this.phoneTxt.value = format;
    }

    checkValidations() {

        this.isValid = true;
        var phone = this.phoneTxt.value;
        if (phone === '') {
            this.phoneErrorMsj.hidden = false;
            this.isValid = false;
        }

        if (!this.isValidPhone(phone)) {
            this.phoneErrorMsj.hidden = false;
            this.isValid = false;
        } else {
            this.phoneErrorMsj.hidden = true;
        }

        if (!this.conditionsCheck.checked) {
            this.conditionsErrorMsj.hidden = false;
            this.isValid = false;
        } else {
            this.conditionsErrorMsj.hidden = true;
        }

        if (this.daySlt.value === 0 || this.mesSlt.value === 0 || this.annoSlt.value === 0) {
            this.isValid = false;
            this.dateErrorMsj.hidden = true;
        } else {
            this.dateErrorMsj.hidden = false;
        }

        if (this.isValid) {
            this.wizardComponent.signUpData.phone = phone;
            this.wizardComponent.signUpData.phonetype = 'Home';
            this.wizardComponent.signUpData.phone2 = phone;
            this.wizardComponent.signUpData.phonetype2 = 'Mobile';
            this.wizardComponent.signUpData.birthday = this.daySlt.value;
            this.wizardComponent.signUpData.birthmonth = this.mesSlt.value;
            this.wizardComponent.signUpData.birthyear = this.annoSlt.value;
        }

        return this.isValid;
    }

    isValidPhone(phone) {
        var phoneno = /^([0-9]{4})[-]?([0-9]{4})$/;
        // var phoneno = /^\d{8}$/;
        if (phone.match(phoneno)) {
            return true;
        } else {
            return false;
        }
    }

    clean() {
        this.isValid = false;
        this.conditionsCheck.checked = false;
        this.phoneTxt.value = ''
    }
}