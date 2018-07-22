const seedrandom = require("seedrandom");
const sha1 = require("sha1");

const table = document.getElementById("table");
const NUMBERS_TO_GENERATE = 200;

const fillTable = randomGen => {
  document.getElementsByTagName("tbody")[0].remove();
  const rollRecord = [];
  for (let i = 0; i < NUMBERS_TO_GENERATE; i++) {
    const cell = table.insertRow(-1).insertCell(-1);
    const roll = () => Math.floor(randomGen() * 5) + 1;
    const thisRoll = roll() + roll();
    cell.innerHTML = thisRoll;
    rollRecord.push(thisRoll);
  }
  document.getElementById("hash").innerHTML = `Hash: ${sha1(JSON.stringify(rollRecord))}`;
};

document.getElementById("btn").addEventListener("click", () => {
  fillTable(seedrandom(document.getElementById("seed").value));
});
