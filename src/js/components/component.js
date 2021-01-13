import '../../css/global.css';

export class Component {
    constructor(parent) {
        this.container = document.createElement('div');
        this.parent = parent;
        this.parent.appendChild(this.container);
    }

    show() {
        this.container.hidden = false;
        this.container.classList.remove('hide');
    }

    hide() {
        this.container.hidden = true;
        this.container.classList.add('hide');
    }

    destroy() {
        this.parent.removeChild(this.container);
    }
}