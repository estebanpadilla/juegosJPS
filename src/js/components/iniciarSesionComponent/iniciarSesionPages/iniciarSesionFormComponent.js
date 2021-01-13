import './iniciarSesionFormComponent.css';
import { Component } from '../../component';
import { div, p, lbl, input, select, option } from '../../../libs/html'
import { AppManager } from '../../../managers/appManager';
import gsap from "gsap";

export class IniciarSesionFormComponent extends Component {
    constructor(parent, iniciarSesionComponent) {
        super(parent);

        this.container.classList.add('iniciarSesionFormComponent');
        this.iniciarSesionComponent = iniciarSesionComponent;

        var label = lbl({ 'innerHTML': 'Usuario', 'for': 'usernameTxt' }, this.container, null);
        this.usernameTxt = input({ 'id': 'usernameTxt', 'placeholder': 'Ingrese su usuario' }, this.container, null);
        this.usernameTxt.onkeydown = this.hideUserNameError.bind(this);
        this.usernameTxt.classList.add('iniciarSesionFormInput');

        this.usernameErrorMsj = p({ 'innerHTML': 'Por favor, introduzca su dirección de correo electrónico', 'className': 'inputErrorMsj', 'hidden': 'true' }, this.container, null);


        label = lbl({ 'innerHTML': 'Clave', 'for': 'playerPasswordTxt', 'className': 'playerPasswordTxt' }, this.container, null);
        this.playerPasswordTxt = input({ 'id': 'playerPasswordTxt', 'placeholder': 'Ingrese su clave', 'type': 'password' }, this.container, null);
        this.playerPasswordTxt.onkeydown = this.hidePasswordError.bind(this);
        this.playerPasswordTxt.classList.add('iniciarSesionFormInput');

        this.playerPasswordMsj = p({ 'innerHTML': 'Por favor, introduzca su contraseña', 'className': 'inputErrorMsj', 'hidden': 'true' }, this.container, null);

    }

    getFormData() {
        return { username: this.usernameTxt.value, password: this.playerPasswordTxt.value };
    }

    showUserNameError() {
        this.usernameTxt.focus();
        this.usernameTxt.classList.add('inputWithError');
        this.usernameErrorMsj.hidden = false;
    }

    hideUserNameError() {
        this.usernameTxt.classList.remove('inputWithError');
        this.usernameErrorMsj.hidden = true;
    }

    showPasswordError() {
        this.usernameTxt.focus();
        this.playerPasswordTxt.classList.add('inputWithError');
        this.playerPasswordMsj.hidden = false;
    }

    hidePasswordError() {
        this.playerPasswordTxt.classList.remove('inputWithError');
        this.playerPasswordMsj.hidden = true;
    }
}