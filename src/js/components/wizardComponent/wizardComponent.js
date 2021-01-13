import './wizardComponent.css';
import { Component } from '../component';
import { AppManager } from '../../managers/appManager';
import { div, p, lbl, input } from '../../libs/html'
import gsap from "gsap";
import { WZTelefonoComponent } from './wizardPages/wzTelefonoComponent/wzTelefonoComponent';
import { WZInformacionComponent } from './wizardPages/wzInformacionComponent/wzInformacionComponent';
import { WZDirectionComponent } from './wizardPages/wzDirectionComponent/wzDirectionComponent';
import { WZEmailComponent } from './wizardPages/wzEmailComponent/wzEmailComponent';

export class WizardComponent extends Component {
    constructor(parent, mainComponent) {
        super(parent);

        this.container.classList.add('wizardComponent');
        this.mainComponent = mainComponent;

        this.pageTitles = ['Información Personal', 'Dirección', 'Datos Personales', 'Correo Electronico'];
        this.points = [];
        this.lines = [];
        this.pages = [];
        this.currentPage = 0;
        this.signUpData = {};

        this.wizardFullPage = div({ 'className': 'wizardFullPage' }, this.container, null);
        this.wizardContainer = document.createElement('div');
        this.wizardContainer.classList.add('wizardContainer');
        this.wizardFullPage.appendChild(this.wizardContainer);

        //WIZARD HEADER
        this.wizardHeaderContainer = div({ 'className': 'wizardHeaderContainer' }, this.wizardContainer, null);
        this.wizardTitle = p({ 'innerHTML': this.pageTitles[this.currentPage], 'className': 'wizardTitle' }, this.wizardHeaderContainer, null);
        this.pointsContainer = div({ 'className': 'pointsContainer' }, this.wizardHeaderContainer, null);


        this.wizardPageContainer = document.createElement('div');
        this.wizardPageContainer.classList.add('wizardPageContainer');
        this.wizardContainer.appendChild(this.wizardPageContainer);

        this.pageContainer = div({ 'className': 'pageContainer' }, this.wizardPageContainer, null);

        //Page 1 
        this.wzInformacionComponent = new WZInformacionComponent(this.pageContainer, this);
        this.pages.push(this.wzInformacionComponent);
        // this.wzInformacionComponent.hide();

        //Page 2 
        this.wzDirectionComponent = new WZDirectionComponent(this.pageContainer, this);
        this.pages.push(this.wzDirectionComponent);
        this.wzDirectionComponent.hide();

        //Page 1 
        this.wzTelefonoComponent = new WZTelefonoComponent(this.pageContainer, this);
        this.pages.push(this.wzTelefonoComponent);
        this.wzTelefonoComponent.hide();

        //Page 3 
        this.wzEmailComponent = new WZEmailComponent(this.pageContainer, this);
        this.pages.push(this.wzEmailComponent);
        this.wzEmailComponent.hide();

        //Buttons container
        this.buttonsContainer = document.createElement('div');
        this.buttonsContainer.classList.add('crearCuentaButtonsContainer');
        this.wizardContainer.appendChild(this.buttonsContainer);

        this.cancelarButton = document.createElement('div');
        this.cancelarButton.innerHTML = 'CANCELAR';
        this.cancelarButton.classList.add('cancelarButtonAbrirCuenta');
        this.cancelarButton.onclick = this.cancelar.bind(this);
        this.buttonsContainer.appendChild(this.cancelarButton);

        this.continuarButton = document.createElement('div');
        this.continuarButton.innerHTML = 'AVANZAR';
        this.continuarButton.classList.add('continuarButtonAbrirCuenta');
        this.continuarButton.onclick = this.avanzar.bind(this);
        this.buttonsContainer.appendChild(this.continuarButton);

        this.createPoints();
        this.container.hidden = true;
    }

    cancelar() {
        this.currentPage = 0;
        this.hide();
    }

    avanzar() {
        //1. Check all is ok on page
        if (this.pages[this.currentPage].checkValidations()) {
            this.lines[this.currentPage].classList.remove('pointLineCurrent');
            this.points[this.currentPage].classList.remove('pointCurrent');
            this.lines[this.currentPage].classList.add('pointLineDone');
            this.points[this.currentPage].classList.add('pointDone');
            this.pages[this.currentPage].hide();
        } else {
            return;
        }

        this.currentPage++;

        if (this.currentPage <= (this.pageTitles.length - 1)) {
            this.wizardTitle.innerHTML = this.pageTitles[this.currentPage];
            this.lines[this.currentPage].classList.add('pointLineCurrent');
            this.points[this.currentPage].classList.add('pointCurrent');
            this.pages[this.currentPage].show();
        } else {

            this.pages.forEach(page => {
                page.clean();
            });

            console.log(this.signUpData);
            this.cancelar();
        }
    }


    show() {
        this.container.hidden = false;
        this.fadeIn();

        this.currentPage = 0;

        this.lines.forEach(line => {
            line.classList.remove('pointLineDone');
            line.classList.remove('pointLineCurrent');
        });

        this.points.forEach(point => {
            point.classList.remove('pointDone');
            point.classList.remove('pointCurrent');
        });

        this.pages.forEach(page => {
            page.hide();
        });


        this.pages[this.currentPage].show();
        this.lines[this.currentPage].classList.remove('pointLineDone');
        this.points[this.currentPage].classList.remove('pointDone');
        this.lines[this.currentPage].classList.add('pointLineCurrent');
        this.points[this.currentPage].classList.add('pointCurrent');
    }

    hide() {
        this.fadeOut();
    }

    fadeIn() {
        gsap.to(this.wizardContainer, { duration: 0.15, opacity: 1, ease: "power1.out" });
    }

    fadeOut() {
        gsap.to(this.wizardContainer, { duration: 0.15, opacity: 0, ease: "power1.out", onComplete: this.fadeOutComplete.bind(this) });
    }

    fadeOutComplete() {
        this.container.hidden = true;
    }

    createPoints() {
        var line = div({ 'className': 'pointLine' }, this.pointsContainer, null);
        line.classList.add('pointLineCurrent');


        this.pages.forEach((page, index) => {
            var point = div({ 'className': 'point', 'onclick': this.onPointClick.bind(this) }, this.pointsContainer, null);
            point.pointIndex = index;
            point.classList.add('pointCurrent');
            line = div({ 'className': 'pointLine' }, this.pointsContainer, null);
            this.lines.push(line);
            this.points.push(point);
        });
    }

    startSingUpRequest() {

    }

    onPointClick(e) {
        if (this.pages[e.target.pointIndex].isValid) {
            this.pages[this.currentPage].hide();
            this.currentPage = e.target.pointIndex;
            this.pages[this.currentPage].show();
            this.wizardTitle.innerHTML = this.pageTitles[this.currentPage];
        }
    }
}