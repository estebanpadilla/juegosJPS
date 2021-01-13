import './slotComponent.css';
import { Component } from '../component';
import { AppManager } from '../../managers/appManager';

export class SlotComponent extends Component {
    constructor(parent, slotData) {
        super(parent);
        this.container.classList.add('slotComponent');
        this.slotData = slotData;

        this.image = document.createElement('img');
        this.image.src = './src/images/' + this.slotData.image;
        this.container.appendChild(this.image);
        this.image.classList.add('slotImage');

        this.title = document.createElement('p');
        this.title.classList.add('slotTitle');
        this.container.appendChild(this.title);
        this.title.innerHTML = slotData.title;

        this.subtitle1 = document.createElement('p');
        this.subtitle1.classList.add('slotSubtitle1');
        this.container.appendChild(this.subtitle1);
        this.subtitle1.innerHTML = slotData.subtitle1;

        this.subtitle2 = document.createElement('p');
        this.subtitle2.classList.add('slotSubtitle2');
        this.container.appendChild(this.subtitle2);
        this.subtitle2.innerHTML = slotData.subtitle2;

        this.buttonsContainer = document.createElement('div');
        this.buttonsContainer.classList.add('slotButtonContainer');
        this.container.appendChild(this.buttonsContainer);

        this.button1 = document.createElement('div');
        this.button1.innerHTML = 'Modo Prueba';
        this.button1.classList.add('slotButton1');
        this.buttonsContainer.appendChild(this.button1);
        this.button1.onclick = this.button1Action.bind(this);

        this.button2 = document.createElement('div');
        this.button2.innerHTML = 'Jugar';
        this.button2.classList.add('slotButton2');
        this.buttonsContainer.appendChild(this.button2);
        this.button2.onclick = this.button2Action.bind(this);
    }

    button1Action() {
        AppManager.instance.openCasinoGame(this.slotData.casinoGameId);
    }

    button2Action() {
        AppManager.instance.openCasinoGame(this.slotData.casinoGameId);
    }
}