// Hardocded checks for origins/paths to send credentials to
const whitelistedOrigins = [
    "http://localhost", // dev
    "http://localhost:8080", // dev
    "https://tokenstorage.ropnop.dev", // prod
]

const whitelistedPathRegex = /\/api\/[^.]*$/ // anything under /api

// Global token variable in the service worker
let sessionData = null;
let getVersionPort;
let count = 0;
let baseUrl = 'http://private.gamestudiocr.com:8075/games/aspnet/Launch/Enter.aspx?';

// Exposed "method" for saving the token
self.addEventListener('message', event => {

    if (event.data && event.data.type === 'INIT_PORT') {
        getVersionPort = event.ports[0];
    }

    if (event.data && event.data.type === 'SET_SESSION_DATA') {
        sessionData = event.data.sessionData;
        // console.log("[SW] sessionData set!", sessionData);
    }

    if (event.data && event.data.type === 'GET_SESSION_DATA') {
        getVersionPort.postMessage({ type: 'GET_SESSION_DATA', sessionData: sessionData });
    }

    if (event.data && event.data.type === 'REMOVE_SESSION_DATA') {
        sessionData = null;
        getVersionPort.postMessage({ type: 'REMOVE_SESSION_DATA', sessionData: sessionData });
    }

    if (event.data && event.data.type === 'IS_SESSION_VALID') {
        getVersionPort.postMessage({ type: 'IS_SESSION_VALID', isSessionValid: isSessionValid() });
    }

    if (event.data && event.data.type === 'INCREASE_COUNT') {
        getVersionPort.postMessage({ type: 'INCREASE_COUNT', payload: ++count });
    }

    if (event.data && event.data.type === 'GET_URL_FOR_GAME') {
        getVersionPort.postMessage({ type: 'GET_URL_FOR_GAME', url: getURLForGame() });
    }
});

self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', event => {
    clients.claim();
    // console.log('SW Activate!');
});

function isSessionValid() {

    if (sessionData !== null) {
        var now = new Date();
        if (sessionData.expirationDate < now) {
            sessionData = null;
            // console.log('The token has expired');
            return false;
        } else {
            // console.log('Now', now);
            // console.log('Exp:', sessionData.expirationDate);
            // console.log('The token is still valid');
            return true;
        }
    } else {
        return false;
    }
}

function getURLForGame() {
    if (sessionData === null) {
        return ''
    }
    return baseUrl + 'Token=' + sessionData.token + '&AccountId=' + sessionData.accountId + '&Lang=es&CasinoGameId='
}

// Helper function to add the auth header if the oubound request matches the whitelists
const addAuthHeader = function (event) {
    destURL = new URL(event.request.url);
    if (whitelistedOrigins.includes(destURL.origin) && whitelistedPathRegex.test(destURL.pathname)) {
        const modifiedHeaders = new Headers(event.request.headers);
        if (sessionData.token) {
            modifiedHeaders.append('Authorization', sessionData.token)
        }
        const authReq = new Request(event.request, { headers: modifiedHeaders, mode: 'cors' });
        event.respondWith((async () => fetch(authReq))());
    }
}

// Intercept all fetch requests and add the auth header
self.addEventListener('fetch', addAuthHeader);
