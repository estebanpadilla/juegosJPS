import './menuShadowComponent.css';
import { Component } from "../component";
import gsap from "gsap";

export class MenuShadowComponent extends Component {
    constructor(parent) {
        super(parent);
        this.container.classList.add('menuShadowComponent');
    }

    fadeIn() {
        gsap.to(this.container, { duration: 0.25, opacity: 1, ease: "power1.out" });
    }

    fadeOut() {
        gsap.to(this.container, { duration: 0.75, opacity: 0, ease: "power1.out" });
    }
}