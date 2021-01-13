import './loaderComponent.css';
import { Component } from '../component';

export class LoaderComponent extends Component {
    constructor(parent) {
        super(parent);
        this.container.classList.add('loaderComponent');
        this.title = document.createElement('p');
        this.title.innerHTML = 'Loading...';
        this.title.classList.add('title');
        this.container.appendChild(this.title);
    }
}