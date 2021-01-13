import './iniciarSesionComponent.css';
import { Component } from '../component';
import { AppManager } from '../../managers/appManager';
import { div, p, lbl, input } from '../../libs/html';
import gsap from "gsap";
import { IniciarSesionFormComponent } from './iniciarSesionPages/iniciarSesionFormComponent';

export class IniciarSesionComponent extends Component {
    constructor(parent, mainComponent) {
        super(parent);

        this.container.classList.add('iniciarSesionComponent');
        this.mainComponent = mainComponent;

        this.iniciarSesionFullPage = div({ 'className': 'iniciarSesionFullPage' }, this.container, null);

        this.iniciarSesionContainer = document.createElement('div');
        this.iniciarSesionContainer.classList.add('iniciarSesionContainer');
        this.iniciarSesionFullPage.appendChild(this.iniciarSesionContainer);

        //HEADER
        this.iniciarSesionHeaderContainer = div({ 'className': 'iniciarSesionHeaderContainer' }, this.iniciarSesionContainer, null);
        this.iniciarSesionTitle = p({ 'innerHTML': 'Iniciar Sesión', 'className': 'iniciarSesionTitle' }, this.iniciarSesionHeaderContainer, null);

        this.iniciarSesionPageContainer = document.createElement('div');
        this.iniciarSesionPageContainer.classList.add('iniciarSesionPageContainer');
        this.iniciarSesionContainer.appendChild(this.iniciarSesionPageContainer);

        this.pageContainer = div({ 'className': 'pageContainer' }, this.iniciarSesionPageContainer, null);
        this.iniciarSesionFormComponent = new IniciarSesionFormComponent(this.pageContainer, this);

        //Buttons container
        this.buttonsContainer = document.createElement('div');
        this.buttonsContainer.classList.add('iniciarSesionButtonsContainer');
        this.iniciarSesionContainer.appendChild(this.buttonsContainer);

        this.continuarButton = document.createElement('div');
        this.continuarButton.innerHTML = 'INICIAR';
        this.continuarButton.classList.add('continuarButton');
        this.continuarButton.onclick = this.login.bind(this);
        this.buttonsContainer.appendChild(this.continuarButton);

        this.cancelarButton = document.createElement('div');
        this.cancelarButton.innerHTML = 'CANCELAR';
        this.cancelarButton.classList.add('cancelarButton');
        this.cancelarButton.onclick = this.cancelar.bind(this);
        this.buttonsContainer.appendChild(this.cancelarButton);

        this.forgotPasswordP = p({ 'innerHTML': '<a href="https://www.w3schools.com">¿Perdiste tu contraseña?</a>', 'className': 'forgotPasswordP' }, this.buttonsContainer, null);

        this.container.hidden = true;
    }

    cancelar() {
        this.hide();
    }

    login() {
        let data = this.iniciarSesionFormComponent.getFormData();
        if (data.username === '') {
            this.iniciarSesionFormComponent.showUserNameError();
        } else if (data.password === '') {
            this.iniciarSesionFormComponent.showPasswordError();
        } else {
            AppManager.instance.sendLoginRequest(data.username, data.password);
        }
    }

    show() {
        // debugger;

        this.container.hidden = false;
        this.fadeIn();
    }

    hide() {
        this.fadeOut();
    }

    fadeIn() {
        gsap.to(this.iniciarSesionContainer, { duration: 0.15, opacity: 1, ease: "power1.out" });
    }

    fadeOut() {
        // debugger;
        gsap.to(this.iniciarSesionContainer, { duration: 0.15, opacity: 0, ease: "power1.out", onComplete: this.fadeOutComplete.bind(this) });
    }

    fadeOutComplete() {
        this.container.hidden = true;
    }

    showLoginError() {
        this.iniciarSesionFormComponent.showUserNameError();
        this.iniciarSesionFormComponent.showPasswordError();
    }
}