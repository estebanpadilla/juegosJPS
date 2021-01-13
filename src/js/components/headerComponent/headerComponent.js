import './headerComponent.css';
import { Component } from '../component';
import { AppManager } from '../../managers/appManager';

export class HeaderComponent extends Component {
    constructor(parent, mainComponent) {
        super(parent);
        this.container.classList.add('headerComponent');
        this.mainComponent = mainComponent;

        AppManager.instance.dataManager.data.data.contentSections.forEach(contentSection => {
            if (contentSection.title === 'Header') {

                this.logoContainer = document.createElement('div');
                this.logoContainer.classList.add('logoContainer');
                this.container.appendChild(this.logoContainer);

                this.menuButton = document.createElement('img');
                this.menuButton.src = './src/images/menuButton.png';
                this.menuButton.classList.add('menuButton');
                this.logoContainer.appendChild(this.menuButton);
                this.menuButton.onclick = this.showMenu.bind(this);

                this.image = document.createElement('img');
                this.image.src = './src/images/' + contentSection.logo;
                this.image.classList.add('logo');
                this.logoContainer.appendChild(this.image);

                this.buttonsContainer = document.createElement('div');
                this.buttonsContainer.classList.add('buttonsContainer');
                this.container.appendChild(this.buttonsContainer);

                this.button1 = document.createElement('div');
                this.button1.innerHTML = 'Iniciar Sesión';
                this.button1.classList.add('headerButton1');
                this.buttonsContainer.appendChild(this.button1);
                this.button1.onclick = this.button1Action.bind(this);

                this.button2 = document.createElement('div');
                this.button2.innerHTML = 'Crear Cuenta';
                this.button2.classList.add('headerButton2');
                this.buttonsContainer.appendChild(this.button2);
                this.button2.onclick = this.button2Action.bind(this);
            }
        });
    }

    showMenu() {
        AppManager.instance.uiManager.showMenu();
    }

    button1Action() {
        this.mainComponent.showModal(2);
    }

    button2Action() {
        this.mainComponent.showModal(1);
    }

    hideInciarSesionButton() {
        this.buttonsContainer.classList.add('hidden');
        this.buttonsContainer.hidden = true;
        this.button1.hidden = true;
        this.button2.hidden = true;
    }

    button3Action() {
        AppManager.instance.loadPadronData();
    }
}