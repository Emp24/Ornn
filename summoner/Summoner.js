const { summoner_info, get_match_history } = require("./api");
class Summoner {
  constructor() {
    this.summonerInfo;
    this.matchHistory;
  }

  async init(SummonerName) {
    this.summonerInfo = await summoner_info(SummonerName);
    this.matchHistory = await get_match_history(this.summonerInfo.accountId);
  }
}

module.exports = Summoner;
