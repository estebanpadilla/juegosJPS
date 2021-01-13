import './errorComponent.css';
import { Component } from '../component';
import { AppManager } from '../../managers/appManager';
import { div, p, lbl, input } from '../../libs/html';
import gsap from "gsap";

export class ErrorComponent extends Component {
    constructor(parent, mainComponent) {
        super(parent);
        this.container.classList.add('errorComponent');
        this.mainComponent = mainComponent;
        this.text = p({ 'innerHTML': 'ERROR', 'className': 'errorText' }, this.container, null);
        this.isShowing = false;
    }

    showError(text) {
        this.text.innerHTML = text;
        this.show();
    }

    show() {
        if (!this.isShowing) {
            this.isShowing = true;
            this.container.hidden = false;
            this.moveDown();
        }
    }

    hide() {
        this.moveUp();
    }

    moveDown() {
        gsap.to(this.container, { duration: 0.15, top: 0, ease: "power1.out", onComplete: this.delayToMoveUp.bind(this) });
    }

    delayToMoveUp() {
        gsap.to(this.container, { duration: 3, top: 0, ease: "power1.out", onComplete: this.moveUp.bind(this) });
    }

    moveUp() {
        // debugger;
        gsap.to(this.container, { duration: 0.15, top: -80, ease: "power1.out", onComplete: this.moveUpComplete.bind(this) });
    }

    moveUpComplete() {
        this.container.hidden = true;
        this.isShowing = false;
    }
}