import './footerComponent.css';
import { Component } from '../component';
import { AppManager } from '../../managers/appManager'

export class FooterComponent extends Component {
    constructor(parent, mainComponent) {
        super(parent);
        this.container.classList.add('footerComponent');
        this.mainComponent = mainComponent;
        //Col 1
        this.col1 = document.createElement('div');
        this.col1.classList.add('footerCol1');
        this.container.appendChild(this.col1);

        var image = document.createElement('img');
        image.src = './src/images/ssl_secured.png';
        this.col1.appendChild(image);
        image.classList.add('sitioSeguroImage');

        var title = document.createElement('p');
        title.innerHTML = 'SITIO SEGURO';
        title.classList.add('footerTitle');
        this.col1.appendChild(title);

        var subtitle = document.createElement('p');
        subtitle.innerHTML = 'METODOS DE PAGO';
        subtitle.classList.add('visaMasterContainerTitle');
        this.col1.appendChild(subtitle);

        var creditcardsContainer = document.createElement('div');
        creditcardsContainer.classList.add('creditcardsContainer');
        this.col1.appendChild(creditcardsContainer);

        image = document.createElement('img');
        image.src = './src/images/creditcards.png';
        creditcardsContainer.appendChild(image);
        image.classList.add('creditcards');

        this.col2 = document.createElement('div');
        this.col2.classList.add('footerCol2');
        this.container.appendChild(this.col2);

        title = document.createElement('p');
        title.innerHTML = 'ACCESOS';
        title.classList.add('footerTitle');
        this.col2.appendChild(title);

        subtitle = document.createElement('p');
        subtitle.innerHTML = 'PREGUNTAS FRECUENTES';
        subtitle.footerPageId = 8;
        subtitle.onclick = this.showFooterPage.bind(this);
        subtitle.classList.add('footerSubTitle');
        this.col2.appendChild(subtitle);

        subtitle = document.createElement('p');
        subtitle.innerHTML = 'MI CUENTA';
        subtitle.footerPageId = 9;
        subtitle.onclick = this.showFooterPage.bind(this);
        subtitle.classList.add('footerSubTitle');
        this.col2.appendChild(subtitle);

        this.crearCuentaBtn = document.createElement('p');
        this.crearCuentaBtn.innerHTML = 'CREAR CUENTA';
        this.crearCuentaBtn.footerModalId = 1;
        this.crearCuentaBtn.onclick = this.showFooterModal.bind(this);
        this.crearCuentaBtn.classList.add('footerSubTitle');
        this.col2.appendChild(this.crearCuentaBtn);

        subtitle = document.createElement('p');
        subtitle.innerHTML = 'OLVIDE MI CONTRASEÑA';
        subtitle.footerPageId = 11;
        // subtitle.onclick = this.showFooterPage.bind(this);
        subtitle.classList.add('footerSubTitle');
        this.col2.appendChild(subtitle);

        //Col 3
        this.col3 = document.createElement('div');
        this.col3.classList.add('footerCol3');
        this.container.appendChild(this.col3);

        title = document.createElement('p');
        title.innerHTML = 'LEGAL';
        title.classList.add('footerTitle');
        this.col3.appendChild(title);

        subtitle = document.createElement('p');
        subtitle.innerHTML = 'TERMINOS Y CONDICIONES';
        subtitle.footerPageId = 12;
        subtitle.onclick = this.showFooterPage.bind(this);
        subtitle.classList.add('footerSubTitle');
        this.col3.appendChild(subtitle);

        subtitle = document.createElement('p');
        subtitle.innerHTML = 'JUEGO RESPONSABLE';
        subtitle.footerPageId = 13;
        subtitle.onclick = this.showFooterPage.bind(this);
        subtitle.classList.add('footerSubTitle');
        this.col3.appendChild(subtitle);

        subtitle = document.createElement('p');
        subtitle.innerHTML = 'REGLAMENTO DE USO';
        subtitle.footerPageId = 14;
        subtitle.onclick = this.showFooterPage.bind(this);
        subtitle.classList.add('footerSubTitle');
        this.col3.appendChild(subtitle);

        subtitle = document.createElement('p');
        subtitle.innerHTML = 'SEGURIDAD Y PRIVACIDAD';
        subtitle.footerPageId = 15;
        subtitle.onclick = this.showFooterPage.bind(this);
        subtitle.classList.add('footerSubTitle');
        this.col3.appendChild(subtitle);

        //Col 4
        this.col4 = document.createElement('div');
        this.col4.classList.add('footerCol4');
        this.container.appendChild(this.col4);

        title = document.createElement('p');
        title.innerHTML = 'SERVICIO AL CLIENTE';
        title.classList.add('footerCol4Title');
        this.col4.appendChild(title);

        subtitle = document.createElement('p');
        subtitle.innerHTML = 'JUEGOSJPS.COM';
        subtitle.classList.add('footerCol4SubTitle');
        this.col4.appendChild(subtitle);

        var phoneContainer = document.createElement('div');
        phoneContainer.classList.add('phoneContainer');
        this.col4.appendChild(phoneContainer);

        image = document.createElement('img');
        image.src = './src/images/phone_icon.png';
        phoneContainer.appendChild(image);
        image.classList.add('phoneIcon');

        var phoneNumberContainer = document.createElement('div');
        phoneNumberContainer.classList.add('phoneNumberContainer');
        phoneContainer.appendChild(phoneNumberContainer);

        subtitle = document.createElement('p');
        subtitle.innerHTML = '2288-8888';
        subtitle.classList.add('phoneNumber');
        phoneNumberContainer.appendChild(subtitle);

        subtitle = document.createElement('p');
        subtitle.innerHTML = 'Lunes a Viernes 8:00 am - 6:00 pm';
        subtitle.classList.add('phoneNumberSubtitle');
        phoneNumberContainer.appendChild(subtitle);

        var emailContainer = document.createElement('div');
        emailContainer.classList.add('emailContainer');
        this.col4.appendChild(emailContainer);

        image = document.createElement('img');
        image.src = './src/images/email_icon.png';
        emailContainer.appendChild(image);
        image.classList.add('phoneIcon');

        subtitle = document.createElement('p');
        subtitle.innerHTML = 'Envianos un mensaje';
        subtitle.classList.add('emailTitle');
        emailContainer.appendChild(subtitle);
    }

    showFooterPage(e) {
        this.mainComponent.showSection(e.target.footerPageId);
        AppManager.instance.uiManager.hideMenu();
    }

    showFooterModal(e) {
        this.mainComponent.showModal(e.target.footerModalId);
        AppManager.instance.uiManager.hideMenu();
    }

    hideOnUserSessionValid() {
        this.crearCuentaBtn.hidden = true;
    }

    showOnUserSessionValid() {
        this.crearCuentaBtn.hidden = false;
    }
}