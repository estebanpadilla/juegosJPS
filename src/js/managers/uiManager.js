
import { MainComponent } from '../components/mainComponent/mainComponent';
import { } from '../components/headerComponent/headerComponent';
import { LoaderComponent } from '../components/loaderComponent/loaderComponent';

export class UIManager {
    constructor(am) {
        this.am = am;
        this.loaderComponent = null;
        this.mainComponent = null;
        this.createLoader();
    }

    createLoader() {
        this.loaderComponent = new LoaderComponent(document.body);
    }

    createApp() {
        this.loaderComponent.destroy();
        this.mainComponent = new MainComponent(document.body);
    }

    showMenu() {
        this.mainComponent.showMenu();
    }

    hideMenu() {
        this.mainComponent.hideMenu();
    }

    showLoginError(text) {
        this.mainComponent.showLoginError(text);
    }

    hideInciarSesionModal() {
        this.mainComponent.hideInciarSesionModal();
    }

    showError(text) {
        this.mainComponent.showError(text);
    }
}