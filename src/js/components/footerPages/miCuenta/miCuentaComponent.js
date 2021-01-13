import './miCuentaComponent.css'
import { Component } from "../../component";
import { AppManager } from '../../../managers/appManager';
import { div, tag, h1 } from '../../../libs/html';

export class MiCuentaComponent extends Component {
    constructor(parent) {
        super(parent);

        this.container.classList.add('miCuentaComponent');

        this.contentSections = [];
        var spacer = div({ 'className': 'topSpacer' }, this.container, null);

        AppManager.instance.dataManager.data.data.contentSections.forEach(contentSection => {
            if (contentSection.title === 'Mi Cuenta') {
                h1({ 'className': 'title', 'innerHTML': contentSection.title }, this.container, null);
                tag('div', { 'innerHTML': contentSection.text, 'className': 'textCustom' }, this.container, null);
            }
        });

        this.hide();
    }
}