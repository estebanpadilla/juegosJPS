import './wzDirectionComponent.css';
import { Component } from '../../../component';
import { div, p, lbl, input, select, option } from '../../../../libs/html'
import { AppManager } from '../../../../managers/appManager';

export class WZDirectionComponent extends Component {
    constructor(parent, wizardComponent) {
        super(parent);

        this.container.classList.add('wzDirectionComponent');
        this.wizardComponent = wizardComponent;
        this.isValid = false;

        var label = lbl({ 'innerHTML': 'Dirección de domicilio', 'for': 'addressTxt' }, this.container, null);
        this.addressTxt = input({ 'id': 'addressTxt', 'placeholder': 'Domicilio' }, this.container, null);
        this.addressErrorMsj = p({ 'innerHTML': 'Por favor un domicilio valido', 'className': 'emailErrorMsj', 'hidden': true }, this.container, null);

        label = lbl({ 'innerHTML': 'Provincias', 'for': 'stateSlt' }, this.container, null);
        this.stateSlt = select({ 'id': 'stateSlt', 'onchange': this.onProvinciaChange.bind(this) }, this.container, null);

        option({ 'value': '', 'innerHTML': 'Seleccione una Provincia', }, this.stateSlt, null);

        for (const property in AppManager.instance.dataManager.pais) {
            var sltOption = option({
                'value': property,
                'innerHTML': AppManager.instance.dataManager.pais[property].nombre,
            }, this.stateSlt, null);
            sltOption.provincia = AppManager.instance.dataManager.pais[property];
        }

        label = lbl({ 'innerHTML': 'Cantones', 'for': 'cantonSlt' }, this.container, null);
        this.cantonSlt = select({ 'id': 'cantonSlt', 'onchange': this.onCantonChange.bind(this) }, this.container, null);

        label = lbl({ 'innerHTML': 'Distritos', 'for': 'distritoSlt' }, this.container, null);
        this.distritoSlt = select({ 'id': 'distritoSlt' }, this.container, null);

    }

    onProvinciaChange(e) {
        if (typeof (e.target[e.target.selectedIndex].provincia) !== 'undefined') {
            this.showCantones(e.target[e.target.selectedIndex].provincia);
            this.distritoSlt.innerHTML = '';
        } else {
            this.cantonSlt.innerHTML = '';
            this.distritoSlt.innerHTML = '';
        }
    }

    showCantones(provincia) {
        this.cantonSlt.innerHTML = '';
        option({ 'value': '', 'innerHTML': 'Seleccione un Canton', }, this.cantonSlt, null);
        for (const canton in provincia.cantones) {
            var sltOption = option({
                'value': canton,
                'innerHTML': provincia.cantones[canton].nombre
            }, this.cantonSlt, null);
            sltOption.canton = provincia.cantones[canton]
        }
    }

    onCantonChange(e) {
        if (typeof (e.target[e.target.selectedIndex].canton) !== 'undefined') {
            this.showDistritos(e.target[e.target.selectedIndex].canton);
        } else {
            this.distritoSlt.innerHTML = '';
        }
    }

    showDistritos(canton) {
        this.distritoSlt.innerHTML = '';
        option({ 'value': '', 'innerHTML': 'Seleccione un Distrito', }, this.distritoSlt, null);
        for (const distrito in canton.distritos) {
            var sltOption = option({
                'value': distrito,
                'innerHTML': canton.distritos[distrito].nombre
            }, this.distritoSlt, null);
            sltOption.distrito = canton.distritos[distrito]
        }
    }

    checkValidations() {

        this.isValid = true;
        var address = this.addressTxt.value;
        if (address === '') {
            this.addressErrorMsj.hidden = false;
            this.isValid = false;
        } else {
            this.addressErrorMsj.hidden = true;
        }

        if (this.isValid) {
            this.wizardComponent.signUpData.country = 'Costa Rica';
            this.wizardComponent.signUpData.address = address;
            this.wizardComponent.signUpData.postal = ''
            this.wizardComponent.signUpData.city = this.stateSlt[this.stateSlt.selectedIndex].provincia.nombre;
            this.wizardComponent.signUpData.canton = this.cantonSlt[this.cantonSlt.selectedIndex].canton.nombre;
            this.wizardComponent.signUpData.distrito = this.distritoSlt[this.distritoSlt.selectedIndex].distrito.nombre;
        }

        return this.isValid
    }

    clean() {
        this.isValid = false;
        this.addressTxt.value = '';
    }
}