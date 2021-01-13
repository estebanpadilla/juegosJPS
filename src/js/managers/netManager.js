const soapRequest = require('easy-soap-request');

export class NetManager {
  constructor(am, dm) {
    this.am = am;
    this.dm = dm;
    // this.url = 'http://private.gamestudiocr.com:8075/games/aspnet/Launch/Enter.aspx?AccountId=-1&CasinoGameId=';
  }

  loadInitialData(callback) {
    fetch('../data/data.json')
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        console.error(error);
      });
  }


  loadPaisData(callback) {
    fetch('../data/pais.json')
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        console.error(error);
      });
  }

  openCasinoGame(url) {

    // var url = 'http://private.gamestudiocr.com:8075/games/aspnet/Launch/Enter.aspx?Token=3_55262_307657924_9FBEDDD5AB9E954403A00142C9E8DE72&AccountId=1&Lang=es&CasinoGameId=' + gameId + ''
    // var casinoGameUrl = url;
    window.open(url);
  }

  sendLoginRequest(login, password) {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.onload = function (e) {
        if (this.status >= 200 && this.status < 300) {
          resolve(request.response);
        } else {
          reject({
            status: this.status,
            statusText: request.statusText
          });
        }
      }
      request.onerror = function () {
        reject({
          status: this.status,
          statusText: request.statusText
        });
      };
      var body = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <LoginMethod xmlns="http://casino-solutions.com/CasinoLobby">
            <param>
              <UserId>${login}</UserId>
              <UserKey>${password}</UserKey>
              <IPList>182.168.1.1</IPList>
              <Provider></Provider>
              <Partner></Partner>
              <Language>en</Language>
            </param>
          </LoginMethod>
        </soap:Body>
      </soap:Envelope>`;

      request.open("POST", 'http://private.gamestudiocr.com:8075/games/aspNET/CasinoLobby/Services.asmx?op=LoginMethod');
      // request.open("POST", '/games/aspNET/CasinoLobby/Services.asmx?op=LoginMethod');
      request.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
      // request.setRequestHeader('Host', 'private.gamestudiocr.com');
      request.setRequestHeader('SOAPAction', 'http://casino-solutions.com/CasinoLobby/LoginMethod');
      request.send(body);
    });
  }

  loadPadronData(callback) {

  }

  getUserByCedula(cedula, callback) {
    var url = 'https://juegosjps-b273e.firebaseio.com/' + cedula + '.json'
    fetch(url)
      .then((response) => response.json())
      .then((data) => callback(data, null))
      .catch((error) => {
        callback(null, error)
      });
  }
}