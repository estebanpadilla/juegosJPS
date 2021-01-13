import './reglamentoDeUsoComponent.css'
import { Component } from "../../component";
import { AppManager } from '../../../managers/appManager';
import { div, tag, h1 } from '../../../libs/html';

export class ReglamentoDeUsoComponent extends Component {
    constructor(parent) {
        super(parent);

        this.container.classList.add('reglamentoDeUsoComponent');

        this.contentSections = [];
        var spacer = div({ 'className': 'topSpacer' }, this.container, null);

        AppManager.instance.dataManager.data.data.contentSections.forEach(contentSection => {
            if (contentSection.title === 'Reglamento de Uso') {
                h1({ 'className': 'title', 'innerHTML': contentSection.title }, this.container, null);
                tag('div', { 'innerHTML': contentSection.text, 'className': 'textCustom' }, this.container, null);
            }
        });

        this.hide();
    }
}