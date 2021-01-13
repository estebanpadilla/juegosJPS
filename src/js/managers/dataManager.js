export class DataManager {
    constructor(am) {
        this.am = am;
        this.data = null;
        this.pais = null;
    }

    receivedInitialData(data) {
        this.data = data;
        this.am.netManager.loadPaisData(
            this.receivedPaisData.bind(this)
        );

    }

    receivedPaisData(data) {
        this.pais = data;
        this.am.createApp();
    }
}
