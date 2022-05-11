import { Axios } from "axios";


export default class Pubg {

    apiKey = null;
    player = null;
    plateform = null;

    config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    constructor() {
        if(localStorage.getItem('pubg_api_key')) {
            this.apiKey = localStorage.get('pubg_api_key');
        }
        if(localStorage.getItem('currentPlayer')) {
            this.player = localStorage.get('currentPlayer');
        }
        if(localStorage.getItem('currentPlayerPlateform')) {
            this.plateform = localStorage.getItem('currentPlayerPlateform');
        }
    }

    getPlayerId(player) {
        console.log(apiKey + ' ' + player + ' ' + this.plateform)
    }
}