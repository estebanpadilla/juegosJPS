import { DataManager } from './dataManager';
import { UIManager } from './uiManager';
import { NetManager } from './netManager';

export class AppManager {
    constructor() {
        if (AppManager.instance) {
            return AppManager.instance;
            // throw new Error("Singleton classes can't be instantiated more than once.")
        } else {
            AppManager.instance = this;
        }
        // ... your rest of the constructor code goes after this
        this.dataManager = new DataManager(this);
        this.uiManager = new UIManager(this);
        this.netManager = new NetManager(this, this.dataManager);
        this.netManager.loadInitialData(
            this.dataManager.receivedInitialData.bind(this.dataManager)
        );

        this.isUserIn = false;
        this.json = null;
        this.casinoGameId = -1;

        // app.js - somewhere in our main app
        const messageChannel = new MessageChannel();

        // First we initialize the channel by sending
        // the port to the Service Worker (this also
        // transfers the ownership of the port)
        navigator.serviceWorker.controller.postMessage({
            type: 'INIT_PORT',
        }, [messageChannel.port2]);

        // Listen to the response
        messageChannel.port1.onmessage = (event) => {
            // Print the result
            // console.log('Print the result', event.data.type);
            if (event.data !== null) {
                // console.log(event.data);
                if (event.data.type === 'IS_SESSION_VALID') {
                    if (event.data.isSessionValid) {
                        AppManager.instance.isUserIn = true;
                        AppManager.instance.uiManager.hideInciarSesionModal();
                    }
                } else if (event.data.type === 'REMOVE_SESSION_DATA') {
                    console.log('Session is removed!');
                } else if (event.data.type === 'GET_URL_FOR_GAME') {
                    var url = event.data.url;
                    if (url === '') {
                        AppManager.instance.uiManager.showError('Debes iniciar sesión primero!');
                    } else {
                        url += this.casinoGameId;
                        // console.log(url);
                        AppManager.instance.netManager.openCasinoGame(url);
                    }
                }
            }
        };

        // navigator.serviceWorker.controller.postMessage({
        //     type: 'GET_SESSION_DATA',
        // });
    }

    openCasinoGame(gameId) {
        this.casinoGameId = gameId;
        navigator.serviceWorker.controller.postMessage({
            type: 'GET_URL_FOR_GAME',
        });
    }

    checkSessionValid() {
        navigator.serviceWorker.controller.postMessage({
            type: 'IS_SESSION_VALID',
        });
    }

    removeSession() {
        navigator.serviceWorker.controller.postMessage({
            type: 'REMOVE_SESSION_DATA',
        });
    }

    createApp() {
        this.uiManager.createApp();
        this.checkSessionValid();
    }

    sendLoginRequest(login, password) {
        this.netManager.sendLoginRequest(login, password)
            .then(function (data) {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(data, "text/xml");
                var loginResponse = xmlDoc.getElementsByTagName("LoginMethodResult")[0];
                var parsedData = {};
                for (var i = 0; i < loginResponse.childNodes.length; i++) {
                    const childNode = loginResponse.childNodes[i];
                    parsedData[childNode.nodeName] = childNode.innerHTML;
                }
                if (parsedData !== null) {
                    if (parsedData.ErrorCode) {
                        AppManager.instance.uiManager.showLoginError('Usuario y/o clave incorrectos');
                    } else {
                        var text, parser, xmlDoc;
                        var parser = new DOMParser();
                        var xmlDoc = parser.parseFromString(data, "text/xml");
                        var sessionData = {};
                        sessionData.token = null;

                        console.log(xmlDoc)

                        var token = xmlDoc.getElementsByTagName("Token")[0].innerHTML;
                        var customerId = xmlDoc.getElementsByTagName("CustomerId")[0].innerHTML;
                        var accountId = xmlDoc.getElementsByTagName("AccountId")[0].innerHTML;
                        var loginSessionId = xmlDoc.getElementsByTagName("LoginSessionId")[0].innerHTML;
                        var loginSessionKey = xmlDoc.getElementsByTagName("LoginSessionKey")[0].innerHTML;
                        var partnerId = xmlDoc.getElementsByTagName("PartnerId")[0].innerHTML;
                        var affiliateId = xmlDoc.getElementsByTagName("AffiliateId")[0].innerHTML;
                        var customerGuid = xmlDoc.getElementsByTagName("CustomerGuid")[0].innerHTML;
                        var partnerGuid = xmlDoc.getElementsByTagName("PartnerGuid")[0].innerHTML;
                        var affiliateGuid = xmlDoc.getElementsByTagName("AffiliateGuid")[0].innerHTML;
                        var accountBalance = xmlDoc.getElementsByTagName("AccountBalance")[0].innerHTML;

                        sessionData.token = token;
                        sessionData.customerId = customerId;
                        sessionData.accountId = accountId;
                        sessionData.loginSessionId = loginSessionId;
                        sessionData.loginSessionKey = loginSessionKey;
                        sessionData.partnerId = partnerId;
                        sessionData.affiliateId = affiliateId;
                        sessionData.customerGuid = customerGuid;
                        sessionData.partnerGuid = partnerGuid;
                        sessionData.affiliateGuid = affiliateGuid;
                        sessionData.accountBalance = accountBalance;

                        var days = AppManager.instance.dataManager.data.data.expirationData.days;
                        var hours = AppManager.instance.dataManager.data.data.expirationData.hours;
                        var minutes = AppManager.instance.dataManager.data.data.expirationData.minutes;
                        var seconds = AppManager.instance.dataManager.data.data.expirationData.seconds;

                        var now = new Date();
                        var time = now.getTime();
                        // var expireTime = time + (days * hours * minutes * seconds * 1000);
                        var expireTime = time + (seconds * 1000);
                        now.setTime(expireTime);
                        sessionData.expirationDate = now;

                        // console.log(now.toUTCString());  // 'Wed, 31 Oct 2012 08:50:17 UTC'

                        if ('serviceWorker' in navigator) {
                            // Do a one-off check to see if a service worker's in control.
                            if (navigator.serviceWorker.controller) {
                                // console.log(`This page is currently controlled by: ${navigator.serviceWorker.controller}`);
                                navigator.serviceWorker.controller.postMessage({
                                    type: 'SET_SESSION_DATA',
                                    sessionData: sessionData
                                });
                            } else {
                                console.log('This page is not currently controlled by a service worker.');
                            }
                        } else {
                            console.log('Service workers are not supported.');
                        }

                        AppManager.instance.isUserIn = true;
                        AppManager.instance.uiManager.hideInciarSesionModal();
                    }
                }
            })
            .catch(function (err) {
                console.error('Login Request Error', err);
            });
    }
}