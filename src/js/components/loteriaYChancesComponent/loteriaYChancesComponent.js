import './loteriaYChancesComponent.css';
import { Component } from '../component';
import { AppManager } from '../../managers/appManager';
import { div } from '../../libs/html'

export class LoteriaYChancesComponent extends Component {
    constructor(parent) {
        super(parent);
        this.container.classList.add('loteriaYChancesComponent');

        this.contentSections = [];
        var spacer = div({ 'className': 'topSpacer' }, this.container, null);

        AppManager.instance.dataManager.data.data.contentSections.forEach(contentSection => {
            if (contentSection.title === 'Loteria y Chances') {
                var title = document.createElement('h1');
                title.innerHTML = contentSection.title;
                title.classList.add('title');
                this.container.appendChild(title);
            }
        });

        this.hide();
    }
}