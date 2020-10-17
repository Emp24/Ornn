const { Kayn, REGIONS } = require("kayn");
const kayn = Kayn("RGAPI-52a10787-05fa-4fdb-91c5-5808b0a98ecb")({
  region: REGIONS.EUROPE_WEST,
});

async function get_champion_info(champId) {
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

async function summoner_info(summonerName) {
  const sum = await kayn.Summoner.by.name(summonerName);
  const summoner = await {
    accountId: sum.accountId,
    name: sum.name,
    profileIconId: sum.profileIconId,
    summonerLevel: sum.summonerLevel,
  };
  return summoner;
}

async function get_match_history(accountId) {
  const match_hstory = await kayn.Matchlist.by.accountID(accountId);
  const match = await kayn.Match.get(match_hstory.matches[0].gameId);
  const IDS = await match.participants;
  const list_of_participants = [];
  for (let i = 0; i < 10; i++) {
    let participant = {
      summoner_name: match.participantIdentities[i].player.summonerName,
      champ_name: await get_champion_info(String(IDS[i].championId)).then(
        (name) => {
          return name;
        }
      ),
      team: IDS[i].teamId,
      spell1: IDS[i].spell1Id,
      spell2: IDS[i].spell2Id,
      stats: IDS[i].stats,
    };
    list_of_participants.push(participant);
  }
  return list_of_participants;
}

module.exports.summoner_info = summoner_info;
module.exports.get_match_history = get_match_history;
