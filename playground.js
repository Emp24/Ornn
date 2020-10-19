const { Kayn, REGIONS } = require("kayn");
const kayn = Kayn("RGAPI-52a10787-05fa-4fdb-91c5-5808b0a98ecb")({
  region: REGIONS.EUROPE_WEST,
});
class Middlelayer {
  constructor() {
    this.accountId;
    this.match_list;
    this.match;
  }

  async get_middle_info(summonerName) {
    this.accountId = await (await kayn.Summoner.by.name(summonerName))
      .accountId;
    this.match_list = await (await kayn.Matchlist.by.accountID(sum)).matches;
  }
}

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

get_champion_info(String(22)).then((name) => {
  console.log(name);
});

async function playground() {
  const summoner = await (await kayn.Summoner.by.name("Empti")).accountId;
  const match_hstory = await kayn.Matchlist.by.accountID(summoner);
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
  console.log(list_of_participants);
}
playground();

async function get_match_state(participants, summoner_name) {
  for (let i = 0; i < 10; i++) {
    if (participants[i].summoner_name === summoner_name) {
      return participants.stats.win;
    }
  }
}

async function create_match(participants) {
  match = {
    state: get_match_state(participants),
    participants: participants,
  };

  return match;
}
//Creating match object
list_of_matches = match_objects;
match = {
  state: boolean,
  participants: list_of_participants,
};

//Get the state of the match from the participants object or list of participants

IDS.participantID;
