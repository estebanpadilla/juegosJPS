import './slotsComponent.css';
import { Component } from '../component';
import { SlotComponent } from '../slotComponent/slotComponent';

export class SlotsComponent extends Component {
    constructor(parent, slotsData) {
        super(parent);
        this.container.classList.add('slotsComponent');
        this.slotsData = slotsData;
        this.slots = [];

        this.title = document.createElement('h1');
        this.title.innerHTML = this.slotsData.title;
        this.title.classList.add('slotsTitle');
        this.container.appendChild(this.title);

        this.slotsContainer = document.createElement('div');
        this.slotsContainer.classList.add('slotsContainer');
        this.container.appendChild(this.slotsContainer);

        this.slotsData.slots.forEach(slot => {
            this.slots.push(new SlotComponent(this.slotsContainer, slot));
        });
    }
}