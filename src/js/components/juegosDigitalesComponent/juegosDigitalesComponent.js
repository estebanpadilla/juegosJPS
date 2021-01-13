import './juegosDigitalesComponent.css';
import { Component } from '../component';
import { SlotsComponent } from '../slotsComponent/slotsComponent';
import { AppManager } from '../../managers/appManager';
import { div } from '../../libs/html'

export class JuegosDigitalesComponent extends Component {
    constructor(parent) {
        super(parent);
        this.container.classList.add('juegosDigitalesComponent');

        this.contentSections = [];
        var spacer = div({ 'className': 'topSpacer' }, this.container, null);

        AppManager.instance.dataManager.data.data.contentSections.forEach(contentSection => {
            if (contentSection.title === 'Juegos Digitales') {
                var slotsComponent = new SlotsComponent(this.container, contentSection);
                this.contentSections.push(slotsComponent);
            }
        });

        this.hide();
    }
}