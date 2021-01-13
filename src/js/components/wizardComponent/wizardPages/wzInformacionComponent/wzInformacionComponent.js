import './wzInformacionComponent.css';
import { Component } from '../../../component';
import { div, p, lbl, input, button } from '../../../../libs/html'
import { AppManager } from '../../../../managers/appManager';

export class WZInformacionComponent extends Component {
    constructor(parent, wizardComponent) {
        super(parent);

        this.container.classList.add('wzInformacionComponent');
        this.wizardComponent = wizardComponent;
        this.isCedulaSelected = false;
        this.isDimexSelected = false;
        this.isValid = false;
        this.cedula2 = '0000';
        this.cedula3 = '0000';

        var label = lbl({ 'innerHTML': 'Selección de Identificación', 'for': 'identificacionSlt' }, this.container, null);

        this.idButtonsContainer = document.createElement('div');
        this.idButtonsContainer.classList.add('idButtonsContainer');
        this.container.appendChild(this.idButtonsContainer);

        this.cedulaButton = document.createElement('div');
        this.cedulaButton.innerHTML = 'CÉDULA';
        this.cedulaButton.classList.add('cedulaButton');
        this.cedulaButton.onclick = this.cedulaButtonAction.bind(this);
        this.idButtonsContainer.appendChild(this.cedulaButton);

        this.dimexButton = document.createElement('div');
        this.dimexButton.innerHTML = 'DIMEX';
        this.dimexButton.classList.add('dimexButton');
        this.dimexButton.onclick = this.dimexButtonAction.bind(this);
        this.idButtonsContainer.appendChild(this.dimexButton);

        //DIMEX
        this.dimexLabel = lbl({ 'innerHTML': 'Número Dimex', 'for': 'dimexTxt' }, this.container, null);
        this.dimexContainer = div({ 'className': 'cedulaContainer' }, this.container, null);
        this.dimexTxt = input({ 'id': 'dimexTxt', 'placeholder': 'Ingrese su número dimex', 'type': 'number', 'onkeyup': this.onDimexKeyUp.bind(this), 'min': "0", 'max': "999999999", 'onkeydown': this.hideCedulaError.bind(this), 'className': 'dimexTxt' }, this.dimexContainer, null);
        this.validarDimexBtn = button({ 'id': 'validarDimexBtn', 'onclick': this.validarDimex.bind(this), 'innerHTML': 'VALIDAR', 'className': 'validarCedulaButton' }, this.dimexContainer, null);

        //CEDULA
        this.cedulaLabel = lbl({ 'innerHTML': 'Número de cédula', 'for': 'cedulaTxt' }, this.container, null);

        this.cedulaContainer = div({ 'className': 'cedulaContainer' }, this.container, null);

        this.cedulaTxt = input({ 'id': 'cedulaTxt', 'placeholder': '1', 'type': 'number', 'onkeyup': this.onCedula1KeyUp.bind(this), 'min': "0", 'max': "9", 'onkeydown': this.hideCedulaError.bind(this), 'className': 'cedula1Txt', 'value': '0' }, this.cedulaContainer, null);

        this.cedula2Txt = input({ 'id': 'cedula2Txt', 'placeholder': '0111', 'type': 'number', 'onkeyup': this.onCedula2KeyUp.bind(this), 'min': "0", 'max': "9999", 'onkeydown': this.hideCedulaError.bind(this), 'className': 'cedula2Txt', 'value': this.cedula2 }, this.cedulaContainer, null);

        this.cedula3Txt = input({ 'id': 'cedula3Txt', 'placeholder': '0111', 'type': 'number', 'onkeyup': this.onCedula3KeyUp.bind(this), 'min': "0", 'max': "9999", 'onkeydown': this.hideCedulaError.bind(this), 'className': 'cedula3Txt', 'value': this.cedula3 }, this.cedulaContainer, null);

        this.validarCedulaBtn = button({ 'id': 'validarCedulaBtn', 'onclick': this.validarCedula.bind(this), 'innerHTML': 'VALIDAR', 'className': 'validarCedulaButton' }, this.cedulaContainer, null);

        this.cedulaErrorMsj = p({ 'innerHTML': 'Por favor, introduzca un número de cédula correcto', 'className': 'cedulaErrorMsj', 'hidden': 'true' }, this.container, null);


        label = lbl({ 'innerHTML': 'Nombre', 'for': 'nameTxt' }, this.container, null);
        this.nameTxt = input({ 'id': 'nameTxt', 'placeholder': 'Nombre', 'disabled': true }, this.container, null);
        this.nameTxt.classList.add('inputDisabled');

        label = lbl({ 'innerHTML': 'Primer Apellido', 'for': 'lastNameTxt' }, this.container, null);
        this.lastNameTxt = input({ 'id': 'lastNameTxt', 'placeholder': 'Primer Apellido', 'disabled': true }, this.container, null);
        this.lastNameTxt.classList.add('inputDisabled');

        label = lbl({ 'innerHTML': 'Segundo Apellido', 'for': 'secondLastNameTxt' }, this.container, null);
        this.secondLastNameTxt = input({ 'id': 'secondLastNameTxt', 'placeholder': 'Segundo Apellido', 'disabled': true }, this.container, null);
        this.secondLastNameTxt.classList.add('inputDisabled');

        this.typingTimer;

        this.cedulaButtonAction();
    }

    onDimexKeyUp(e) {
        var cedula = this.cedulaTxt.value;
        if (cedula !== '') {
            if (cedula.length > 9) {
                cedula = cedula.substring(0, 9)
                this.cedulaTxt.value = cedula;
            }
        }
    }

    onCedula1KeyUp(e) {
        var cedula = this.cedulaTxt.value;
        var numbers = Array.from(cedula);

        if (cedula.length === 0) {
            numbers = ['0'];
        } else if (cedula.length >= 1) {
            numbers = [numbers[numbers.length - 1]];
        }
        this.cedulaTxt.value = numbers.join('')
    }

    formatCedulaNumber(number) {
        var numbers = Array.from(number);

        if (number.length === 0) {
            numbers = ['0', '0', '0', '0'];
        } else if (number.length <= 3) {
            numbers = ['0', '0', '0', numbers[0]];
        }
        var format = numbers.splice(numbers.length - 4, 4).join('')
        return format;
    }

    onCedula2KeyUp(e) {
        this.cedula2Txt.value = this.formatCedulaNumber(this.cedula2Txt.value);
    }

    onCedula3KeyUp(e) {
        this.cedula3Txt.value = this.formatCedulaNumber(this.cedula3Txt.value);
    }

    validarCedula() {
        var isOK = true;
        if (this.cedulaTxt.value === '' || this.cedulaTxt.value === '0') {
            this.cedulaTxt.classList.add('errorOnCedula');
            isOK = false;
        } else {
            this.cedulaTxt.classList.remove('errorOnCedula');
        }

        if (this.cedula2Txt.value === '' || this.cedula2Txt.value === '0000') {
            this.cedula2Txt.classList.add('errorOnCedula');
            isOK = false;
        } else {
            this.cedula2Txt.classList.remove('errorOnCedula');
        }

        if (this.cedula3Txt.value === '' || this.cedula3Txt.value === '0000') {
            this.cedula3Txt.classList.add('errorOnCedula');
            isOK = false;
        } else {
            this.cedula3Txt.classList.remove('errorOnCedula');
        }

        if (isOK) {
            this.doneTyping();
        } else {
            this.isValid = false;
            this.nameTxt.value = '';
            this.lastNameTxt.value = '';
            this.secondLastNameTxt.value = '';
        }
    }

    validarDimex() {
        var isOK = true;
        if (this.dimexTxt.value === '') {
            this.dimexTxt.classList.add('errorOnCedula');
            isOK = false;
        } else {
            this.dimexTxt.classList.remove('errorOnCedula');
        }
    }

    doneTyping() {
        var cedula1 = this.cedulaTxt.value;
        var cedula2 = this.cedula2Txt.value;
        var cedula3 = this.cedula3Txt.value;
        if (cedula1 === '' && cedula2 === '' && cedula3 === '') {

        } else {
            var value = cedula1 + cedula2 + cedula3;
            AppManager.instance.netManager.getUserByCedula(value, this.receivedUserInfo.bind(this));
        }
    }

    receivedUserInfo(data, error) {
        if (data === null) {
            this.showCedulaError();
        } else {
            this.hideCedulaError();
            var user = data[Object.keys(data)[0]];
            this.nameTxt.value = user.nombre;
            this.lastNameTxt.value = user.primerApellido;
            this.secondLastNameTxt.value = user.segundoApellido;
            this.isValid = true;
            this.wizardComponent.signUpData.salutation = '';
            this.wizardComponent.signUpData.nickname = user.cedula;
            this.wizardComponent.signUpData.username = user.cedula;
            this.wizardComponent.signUpData.fname = user.nombre;
            this.wizardComponent.signUpData.lname = user.primerApellido
            this.wizardComponent.signUpData.lname2 = user.segundoApellido
        }
    }

    showCedulaError() {
        this.isValid = false;
        this.cedulaErrorMsj.hidden = false;
        this.nameTxt.value = '';
        this.lastNameTxt.value = '';
        this.secondLastNameTxt.value = '';
    }

    hideCedulaError() {
        this.cedulaTxt.classList.remove('inputWithError');
        this.cedulaErrorMsj.hidden = true;
    }

    checkValidations() {
        return this.isValid;
    }

    cedulaButtonAction(e) {
        this.isCedulaSelected = true;
        this.isDimexSelected = false;
        this.cedulaButton.classList.add('idButtonSelected');
        this.cedulaButton.classList.remove('idButtonNotSelected');
        this.dimexButton.classList.remove('idButtonSelected');
        this.dimexButton.classList.add('idButtonNotSelected');

        this.cedulaLabel.hidden = false;
        this.cedulaTxt.hidden = false;
        this.cedula2Txt.hidden = false;
        this.cedula3Txt.hidden = false;
        this.validarCedulaBtn.hidden = false;
        this.dimexLabel.hidden = true;
        this.dimexTxt.hidden = true;
        this.validarDimexBtn.hidden = true;
    }

    dimexButtonAction(e) {
        this.isCedulaSelected = false;
        this.isDimexSelected = true;
        this.dimexButton.classList.add('idButtonSelected');
        this.dimexButton.classList.remove('idButtonNotSelected');
        this.cedulaButton.classList.remove('idButtonSelected');
        this.cedulaButton.classList.add('idButtonNotSelected');

        this.cedulaLabel.hidden = true;
        this.cedulaTxt.hidden = true;
        this.cedula2Txt.hidden = true;
        this.cedula3Txt.hidden = true;
        this.validarCedulaBtn.hidden = true;
        this.dimexLabel.hidden = false;
        this.dimexTxt.hidden = false;
        this.validarDimexBtn.hidden = false;
    }

    clean() {
        this.cedula2 = '0000';
        this.cedula3 = '0000';
        this.isValid = false;
        this.dimexTxt.value = '';
        this.cedulaTxt.value = '';
        this.cedula2Txt.value = '';
        this.cedula3Txt.value = '';
        this.nameTxt.value = '';
        this.lastNameTxt.value = '';
        this.secondLastNameTxt.value = '';
    }
}