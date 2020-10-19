const Riot_Api = require("./api");
const api = new Riot_Api();
class Summoner {
  constructor() {
    this.summonerInfo;
    this.matchHistory;
  }

  async init(SummonerName) {
    await api.init(SummonerName);
    this.summonerInfo = await api.summoner_info();
    this.matchHistory = await api.create_match_history();
  }
}

module.exports = Summoner;
