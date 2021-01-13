// import '../../../css/global.css';
import './menuComponent.css';
import { Component } from '../component';
import { MenuItemComponent } from './menuItemComponent/menuItemComponent';
import gsap from "gsap";
import { AppManager } from '../../managers/appManager';

export class MenuComponent extends Component {
    constructor(parent, mainComponent) {
        super(parent);
        this.mainComponent = mainComponent;
        this.container.classList.add('menuComponent');

        this.menuItemContainer = document.createElement('div');
        this.menuItemContainer.classList.add('menuItemContainer');
        this.container.appendChild(this.menuItemContainer);

        this.closeButtonContainer = document.createElement('div');
        this.closeButtonContainer.classList.add('closeButtonContainer');
        this.menuItemContainer.appendChild(this.closeButtonContainer);

        this.closeButton = document.createElement('img');
        this.closeButton.src = './src/images/closeButton.png';
        this.closeButton.classList.add('closeButton');
        this.closeButtonContainer.appendChild(this.closeButton);
        this.closeButton.onclick = AppManager.instance.uiManager.hideMenu.bind(AppManager.instance.uiManager);

        this.item1 = new MenuItemComponent(this.menuItemContainer, 'INICIO', 1, this.onItemClick.bind(this));
        this.item1.select();
        this.item2 = new MenuItemComponent(this.menuItemContainer, 'LOTERIA Y CHANCES', 2, this.onItemClick.bind(this));
        this.item3 = new MenuItemComponent(this.menuItemContainer, 'RASPAS DIGITALES', 3, this.onItemClick.bind(this));
        this.item4 = new MenuItemComponent(this.menuItemContainer, 'JUEGOS DIGITALES', 4, this.onItemClick.bind(this));
        this.item5 = new MenuItemComponent(this.menuItemContainer, 'BILLETES ACTIVOS', 5, this.onItemClick.bind(this));
        this.item6 = new MenuItemComponent(this.menuItemContainer, 'HISTORIAL', 6, this.onItemClick.bind(this));
        this.item7 = new MenuItemComponent(this.menuItemContainer, 'METODOS DE PAGO', 7, this.onItemClick.bind(this));
        this.items = [this.item1, this.item2, this.item3, this.item4, this.item5, this.item6, this.item7];
    }

    onItemClick(itemSeleted) {

        itemSeleted.select();

        this.items.forEach(item => {
            if (itemSeleted.menuItemId !== item.menuItemId) {
                item.unselect();
            }
        });

        this.mainComponent.showSection(itemSeleted.menuItemId);
        AppManager.instance.uiManager.hideMenu();
    }

    moveIn() {
        gsap.to(this.container, { duration: 0.25, x: 0, ease: "power1.out" });
    }

    moveOut() {
        gsap.to(this.container, { duration: 0.1, x: -200, ease: "power1.in" });
    }
}