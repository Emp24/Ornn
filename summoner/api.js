const { Kayn, REGIONS } = require("kayn");
const kayn = Kayn("RGAPI-7cbb5264-ea6e-4461-a29c-601f0a2b0266")({
  region: REGIONS.EUROPE_WEST,
});
class Riot_Api {
  constructor() {
    this.numberOfMatches = 5;
    this.summoner;
    this.accountId;
    this.matchHistory = [];
  }
  async init(summonerName) {
    this.summoner = await kayn.Summoner.by.name(summonerName);
    this.accountId = await this.summoner.accountId;
    const matchHistory = await kayn.Matchlist.by.accountID(this.accountId);
    for (let i = 0; i < this.numberOfMatches; i++) {
      await this.matchHistory.push(
        await kayn.Match.get(matchHistory.matches[i].gameId)
      );
    }
  }
  summoner_info() {
    const sum_object = {
      accountId: this.summoner.accountId,
      name: this.summoner.name,
      profileIconId: this.summoner.profileIconId,
      summonerLevel: this.summoner.summonerLevel,
    };
    return sum_object;
  }

  async get_champion_info(champId) {
    const { data } = await kayn.DDragon.Champion.listDataById(champId).catch(
      (err) => {
        console.log(err);
      }
    );
    //   for (champ in champion.data) {
    //     console.log(champ);

    //   }
    for (const [key, value] of Object.entries(data)) {
      if (champId === value.id) {
        return value.name;
      }
    }
  }

  // async get_match_history(accountId) {
  //   const match_hstory = await kayn.Matchlist.by.accountID(accountId);
  //   const match = await kayn.Match.get(match_hstory.matches[0].gameId);
  //   const IDS = await match.participants;
  //   const list_of_participants = [];
  //   for (let i = 0; i < 10; i++) {
  //     let participant = {
  //       summoner_name: match.participantIdentities[i].player.summonerName,
  //       champ_name: await get_champion_info(String(IDS[i].championId)).then(
  //         (name) => {
  //           return name;
  //         }
  //       ),
  //       team: IDS[i].teamId,
  //       spell1: IDS[i].spell1Id,
  //       spell2: IDS[i].spell2Id,
  //       stats: IDS[i].stats,
  //     };
  //     list_of_participants.push(participant);
  //   }
  //   return list_of_participants;
  // }

  async create_participants(match) {
    const listOfParticipants = [];
    for (let i = 0; i < 10; i++) {
      let participant = {
        summonerName: match.participantIdentities[i].player.summonerName,
        championName: await this.get_champion_info(
          String(match.participants[i].championId)
        ).then((name) => {
          return name;
        }),
        team: match.participants[i].teamId,
        spell1: match.participants[i].spell1Id,
        spell2: match.participants[i].spell2Id,
        stats: match.participants[i].stats,
      };
      listOfParticipants.push(participant);
    }
    return listOfParticipants;
  }

  async get_match_state(list_of_participants) {
    for (let i = 0; i < 10; i++) {
      if (list_of_participants[i].summonerName === this.summoner.name) {
        return list_of_participants[i].stats.win;
      }
    }
  }

  async create_match_history() {
    const match_history = [];
    for (let i = 0; i < this.numberOfMatches; i++) {
      let participants = await this.create_participants(this.matchHistory[i]);
      let state = await this.get_match_state(participants);
      let match = {
        participants: participants,
        state: state,
      };
      match_history.push(match);
    }
    return match_history;
  }
}

module.exports = Riot_Api;
