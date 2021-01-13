import './mainComponent.css';
import { Component } from '../component';
import { HeaderComponent } from '../headerComponent/headerComponent';
import { MenuComponent } from '../menuComponent/menuComponent';
import { FooterComponent } from '../footerComponent/footerComponent';
import { HomeComponent } from '../homeComponent/homeComponent';
import { RaspasDigitalesComponent } from '../raspasDigitalesComponent/raspasDigitalesComponent';
import { JuegosDigitalesComponent } from '../juegosDigitalesComponent/juegosDigitalesComponent';
import { LoteriaYChancesComponent } from '../loteriaYChancesComponent/loteriaYChancesComponent';
import { BilletesActivosComponent } from '../billetesActivosComponent/billetesActivosComponent';
import { HistorialComponent } from '../historialComponent/historialComponent';
import { MetodosDePagoComponent } from '../metodosDePagoComponent/metodosDePagoComponent';
import { MenuShadowComponent } from '../menuShadowComponent/menuShadowComponent';
import { PreguntasFrecuentesComponent } from '../footerPages/preguntasFrecuentesComponent/preguntasFrecuentesComponent';
import { TerminosCondicionesComponent } from '../footerPages/terminosCondicionesComponent/terminosCondicionesComponent';
import { JuegoResponsableComponent } from '../footerPages/juegoResponsable/juegoResponsableComponent';
import { ReglamentoDeUsoComponent } from '../footerPages/reglamenteDeUsoComponent/reglamentoDeUsoComponent';
import { SeguridadPrivacidadComponent } from '../footerPages/seguridadPrivacidadComponent/seguridadPrivacidadComponent';
import { MiCuentaComponent } from '../footerPages/miCuenta/miCuentaComponent';
import { WizardComponent } from '../wizardComponent/wizardComponent';
import { IniciarSesionComponent } from '../iniciarSesionComponent/iniciarSesionComponent';
import { ErrorComponent } from '../errorComponent/errorComponent';

export class MainComponent extends Component {
    constructor(parent) {
        super(parent);
        this.container.classList.add('mainComponent');
        this.homeComponent = new HomeComponent(this.container);
        this.loteriaYChancesComponent = new LoteriaYChancesComponent(this.container);
        this.raspasDigitalesComponent = new RaspasDigitalesComponent(this.container);
        this.juegosDigitalesComponent = new JuegosDigitalesComponent(this.container);
        this.billetesActivosComponent = new BilletesActivosComponent(this.container);
        this.historialComponent = new HistorialComponent(this.container);
        this.metodosDePagoComponent = new MetodosDePagoComponent(this.container);

        //Footer Pages
        this.preguntasFrecuentesComponent = new PreguntasFrecuentesComponent(this.container);
        this.miCuentaComponent = new MiCuentaComponent(this.container);
        this.terminosCondicionesComponent = new TerminosCondicionesComponent(this.container);
        this.juegoResponsableComponent = new JuegoResponsableComponent(this.container);
        this.reglamentoDeUsoComponent = new ReglamentoDeUsoComponent(this.container);
        this.seguridadPrivacidadComponent = new SeguridadPrivacidadComponent(this.container);

        this.footerComponent = new FooterComponent(this.container, this);
        this.headerComponent = new HeaderComponent(this.container, this);
        this.menuShadowComponent = new MenuShadowComponent(this.container);
        this.menuComponent = new MenuComponent(this.container, this);

        //Crear Cuenta
        this.wizardComponent = new WizardComponent(this.container, this);
        this.iniciarSesionComponent = new IniciarSesionComponent(this.container, this);

        this.errorComponent = new ErrorComponent(this.container, this);

        this.homeComponent.show();
    }

    showSection(menuItemId) {

        window.scrollTo(0, 0);
        this.homeComponent.hide();
        this.raspasDigitalesComponent.hide();
        this.juegosDigitalesComponent.hide();
        this.loteriaYChancesComponent.hide();
        this.billetesActivosComponent.hide();
        this.historialComponent.hide();
        this.metodosDePagoComponent.hide();

        this.preguntasFrecuentesComponent.hide();
        this.miCuentaComponent.hide();
        this.terminosCondicionesComponent.hide();
        this.juegoResponsableComponent.hide();
        this.reglamentoDeUsoComponent.hide();
        this.seguridadPrivacidadComponent.hide();

        switch (menuItemId) {
            case 1:
                this.homeComponent.show();
                break;
            case 2:
                this.loteriaYChancesComponent.show();
                break;
            case 3:
                this.raspasDigitalesComponent.show();
                break;
            case 4:
                this.juegosDigitalesComponent.show();
                break;
            case 5:
                this.billetesActivosComponent.show();
                break;
            case 6:
                this.historialComponent.show();
                break;
            case 7:
                this.metodosDePagoComponent.show();
                break;
            case 8:
                this.preguntasFrecuentesComponent.show();
                break;
            case 9:
                this.miCuentaComponent.show();
                break;
            case 11:
                break;
            case 12:
                this.terminosCondicionesComponent.show();
                break;
            case 13:
                this.juegoResponsableComponent.show();
                break;
            case 14:
                this.reglamentoDeUsoComponent.show();
                break;
            case 15:
                this.seguridadPrivacidadComponent.show();
                break;
        }
    }

    showModal(modalId) {

        switch (modalId) {
            case 1:
                this.wizardComponent.show();
                break;
            case 2:
                this.iniciarSesionComponent.show();
                break;
        }
    }

    showMenu() {
        this.menuComponent.moveIn();
        this.menuShadowComponent.fadeIn();
    }

    hideMenu() {
        this.menuComponent.moveOut();
        this.menuShadowComponent.fadeOut();
    }

    showLoginError(text) {
        this.errorComponent.showError(text);
        this.iniciarSesionComponent.showLoginError();
    }

    hideInciarSesionModal() {
        this.iniciarSesionComponent.hide();
        this.headerComponent.hideInciarSesionButton();
        this.footerComponent.hideOnUserSessionValid();
    }

    showError(text) {
        this.errorComponent.showError(text);
    }
}