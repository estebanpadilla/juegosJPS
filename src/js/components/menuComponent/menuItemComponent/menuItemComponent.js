import './menuItemComponent.css';
import { Component } from "../../component";

export class MenuItemComponent extends Component {
    constructor(parent, text, menuItemId, callback) {
        super(parent);
        this.container.classList.add('menuItemComponent');
        this.container.classList.add('centerItemText');
        this.container.classList.add('unselected');
        this.container.innerHTML = text;
        this.menuItemId = menuItemId;
        this.callback = callback;
        this.container.onclick = this.onClick.bind(this);
        this.container.onmouseover = this.onMouseOver.bind(this);
        this.container.onmouseout = this.onMouseOut.bind(this);
    }

    onClick(e) {
        this.callback(this);
    }

    select() {
        this.container.classList.remove('unselected');
        this.container.classList.add('selected');
    }

    unselect() {
        this.container.classList.remove('selected');
        this.container.classList.add('unselected');
    }

    onMouseOver() {
        this.container.classList.add('menuItemComponentHover');
    }

    onMouseOut() {
        this.container.classList.remove('menuItemComponentHover');
    }
}