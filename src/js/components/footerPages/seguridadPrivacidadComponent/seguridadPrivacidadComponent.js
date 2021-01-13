import './seguridadPrivacidadComponent.css'
import { Component } from "../../component";
import { AppManager } from '../../../managers/appManager';
import { div, tag, h1 } from '../../../libs/html';

export class SeguridadPrivacidadComponent extends Component {
    constructor(parent) {
        super(parent);

        this.container.classList.add('seguridadPrivacidadComponent');

        this.contentSections = [];
        var spacer = div({ 'className': 'topSpacer' }, this.container, null);

        AppManager.instance.dataManager.data.data.contentSections.forEach(contentSection => {
            if (contentSection.title === 'Seguridad y Privacidad') {
                h1({ 'className': 'title', 'innerHTML': contentSection.title }, this.container, null);
                tag('div', { 'innerHTML': contentSection.text, 'className': 'textCustom' }, this.container, null);
            }
        });

        this.hide();
    }
}