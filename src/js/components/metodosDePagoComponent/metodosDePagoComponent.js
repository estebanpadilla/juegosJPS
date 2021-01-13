import './metodosDePagoComponent.css';
import { Component } from '../component';
import { AppManager } from '../../managers/appManager';
import { div } from '../../libs/html'

export class MetodosDePagoComponent extends Component {
    constructor(parent) {
        super(parent);
        this.container.classList.add('metodosDePagoComponent');

        this.contentSections = [];
        var spacer = div({ 'className': 'topSpacer' }, this.container, null);

        AppManager.instance.dataManager.data.data.contentSections.forEach(contentSection => {
            if (contentSection.title === 'Metodos de Pago') {
                var title = document.createElement('h1');
                title.innerHTML = contentSection.title;
                title.classList.add('title');
                this.container.appendChild(title);
            }
        });

        this.hide();
    }
}