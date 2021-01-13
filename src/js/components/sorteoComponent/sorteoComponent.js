import './sorteoComponent.css';
import { Component } from "../component";

export class SorteoComponent extends Component {
    constructor(parent, data) {
        super(parent)
        this.container.classList.add('sorteoComponent');
        this.data = data;

        this.image = document.createElement('img');
        this.image.src = './src/images/' + this.data.image;
        this.container.appendChild(this.image);
        this.image.classList.add('sorteoImage');

        this.priceTitle = document.createElement('p');
        this.priceTitle.classList.add('priceTitle');
        this.container.appendChild(this.priceTitle);
        this.priceTitle.innerHTML = data.priceTitle;

        this.price = document.createElement('p');
        this.price.classList.add('price');
        this.container.appendChild(this.price);
        this.price.innerHTML = data.price;

        this.buttonsContainer = document.createElement('div');
        this.buttonsContainer.classList.add('sorteoButtonContainer');
        this.container.appendChild(this.buttonsContainer);

        this.dateContainer = document.createElement('div');
        this.dateContainer.classList.add('dateContainer');
        this.buttonsContainer.appendChild(this.dateContainer);

        this.dateTitle = document.createElement('p');
        this.dateTitle.classList.add('dateTitle');
        this.dateContainer.appendChild(this.dateTitle);
        this.dateTitle.innerHTML = 'Fecha Sorteo:';

        this.date = document.createElement('p');
        this.date.classList.add('date');
        this.dateContainer.appendChild(this.date);
        this.date.innerHTML = data.date;

        this.time = document.createElement('p');
        this.time.classList.add('time');
        this.dateContainer.appendChild(this.time);
        this.time.innerHTML = data.time;

        this.button = document.createElement('div');
        this.button.innerHTML = 'Comprar';
        this.button.classList.add('sorteoButton');
        this.buttonsContainer.appendChild(this.button);
    }
}