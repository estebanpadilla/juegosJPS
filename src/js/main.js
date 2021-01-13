/**
 * @name main.js
 * @file Add a small description for this file.
 * @author Esteban Padilla, ep@estebanpadilla.com
 * @version 1.0.0
 */

'use strict';

import '../css/style.css';
// import '../index.html'
import { AppManager } from './managers/appManager';

window.addEventListener('load', init, false);

function init() {

    console.log('App running OK!');
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/serviceWorker.js', { scope: './' }).then(function (registration) {
            // console.log('ServiceWorker registration succesful!');
        }, function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }

    const appManager = new AppManager();

    //TODO: Remove this line later
    window.appManager = appManager;
    //TODO: Remove the line above later
}
