import './historialComponent.css';
import { Component } from '../component';
import { AppManager } from '../../managers/appManager';
import { div } from '../../libs/html'

export class HistorialComponent extends Component {
    constructor(parent) {
        super(parent);
        this.container.classList.add('historialComponent');

        this.contentSections = [];
        var spacer = div({ 'className': 'topSpacer' }, this.container, null);

        AppManager.instance.dataManager.data.data.contentSections.forEach(contentSection => {
            if (contentSection.title === 'Historial') {
                var title = document.createElement('h1');
                title.innerHTML = contentSection.title;
                title.classList.add('title');
                this.container.appendChild(title);
            }
        });

        this.hide();
    }
}