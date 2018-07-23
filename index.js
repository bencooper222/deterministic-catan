const seedrandom = require('seedrandom');
const sha1 = require('sha1');

const table = document.getElementById('table');
const NUMBERS_TO_GENERATE = 200;

const fillTable = randomGen => {
  document.getElementsByTagName('tbody')[0].innerHTML = table.rows[0].innerHTML;
  const rollRecord = [];
  for (let i = 0; i < NUMBERS_TO_GENERATE; i++) {
    const cell = table.insertRow(-1).insertCell(-1);

    const roll = () => Math.floor(randomGen() * 6) + 1;
    const thisRoll = roll() + roll();

    cell.innerHTML = thisRoll;

    cell.addEventListener('click', () => {
      if (
        cell.style.backgroundColor === 'white' ||
        !cell.style.backgroundColor
      ) {
        cell.style.backgroundColor = 'black';
        cell.style.color = 'white';
      } else if (cell.style.backgroundColor === 'black') {
        cell.style.backgroundColor = 'white';
        cell.style.color = 'black';
      }
    });

    rollRecord.push(thisRoll);
  }
  document.getElementById('hash').innerHTML = `Hash: ${sha1(
    JSON.stringify(rollRecord)
  )}`;

  const numPlayers = document.getElementById('numPlayers').value;
  const totalRolls = document.getElementById('rollTotal').value;

  const adjustedRolls = rollRecord.slice(0, totalRolls).reduce(
    (acc, roll) => {
      acc[roll] += 36 / totalRolls;
      return acc;
    },
    { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 }
  );

  const normRolls = {
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 5,
    9: 4,
    10: 3,
    11: 2,
    12: 1
  };

  Object.keys(normRolls).forEach(key => {
    adjustedRolls[key] += (numPlayers - 1) * normRolls[key];
    adjustedRolls[key] /= numPlayers;
  });

  Array.from(document.getElementsByClassName('calcChances')).forEach(
    (cell, i) => {
      cell.innerHTML = adjustedRolls[i + 2].toFixed(2);
    }
  );
};

document.getElementById('generate').addEventListener('click', () => {
  fillTable(seedrandom(document.getElementById('seed').value));
});
