import './homeComponent.css';
import { Component } from '../component';
import { SlotsComponent } from '../slotsComponent/slotsComponent';
import { AppManager } from '../../managers/appManager';
import { div } from '../../libs/html'
import { NewsComponent } from '../newsComponent/newsComponent';

export class HomeComponent extends Component {
    constructor(parent) {
        super(parent);
        this.container.classList.add('homeComponent');

        this.contentSections = [];
        var spacer = div({ 'className': 'topSpacer' }, this.container, null);

        this.newsComponent = new NewsComponent(this.container);

        var spacer = div({ 'className': 'spacer' }, this.container, null);
        AppManager.instance.dataManager.data.data.contentSections.forEach(contentSection => {
            if (contentSection.slots.length > 0) {
                var slotsComponent = new SlotsComponent(this.container, contentSection);
                this.contentSections.push(slotsComponent);
            }
        });
    }
}