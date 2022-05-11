import * as axios from "axios";


export class Pubg  {

    static pubgApiUrl() {
        return "https://api.pubg.com/shards/";
    }

    static getApiKey() {
        return localStorage.getItem('pubg_api_key') || null;
    }

    static getCurrentPlayerPlatform() {
        return localStorage.getItem('currentPlayerPlateform') || null;
    }

    static getPlayer() {
        return localStorage.getItem('currentPlayer') || null;
    }

    static fetchData(url) {
        let token = localStorage.getItem('pubg_api_key');

        const config = {
            headers:{
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
          };
        return axios.get(url, config).then(res=> res).catch(err=> err)
    }

    static getPlayerIdPubg() {
        let url = this.pubgApiUrl()  + this.getCurrentPlayerPlatform() + "/players?filter[playerNames]=" + this.getPlayer();
        return this.fetchData(url);
    }

    static getPlayerIdStorage() {
        return localStorage.getItem('currentPlayerId') || null;
    }

    static setPlayerId(player) {
        this.getPlayerIdPubg()
        .then((res) => {
            localStorage.setItem('currentPlayerId', res.data.data[0].id)
        });
    }

    static getMasteryData() {
        let url = this.pubgApiUrl()  + this.getCurrentPlayerPlatform() + "/players/"+ this.getPlayerIdStorage() +"/weapon_mastery";
        return this.fetchData(url);
    }

    static getPlayerOverview() {
        let url = this.pubgApiUrl()  + this.getCurrentPlayerPlatform() + "/players/"+ this.getPlayerIdStorage() +"/seasons/lifetime";
        return this.fetchData(url);
    }

    static getMatchesList() {
        let url = '/api/mocks';
    }

    static getMatch(id) {
        let url = this.pubgApiUrl() + this.getCurrentPlayerPlatform() + '/matches/' + id;
        return this.fetchData(url);
    }

}
export default Pubg;    