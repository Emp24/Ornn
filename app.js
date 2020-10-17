const Summoner = require("./summoner/Summoner");
const summoner = new Summoner();

async function create_summoner() {
  await summoner.init("Empti");
  console.log(summoner);
}

create_summoner();
