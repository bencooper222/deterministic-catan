<template>
    <div class="scrolling-wrapper" v-touch:swipe.left="swipeleft" v-touch:swipe.right="swipeRight">
        <div class="card" id="rnged">
            <div class="inputWrapper">
                <input v-model="seed" placeholder="Seed me!">
                <button v-on:click="fillTable">
                    Generate!
                </button>
            </div>
            <div class="inputWrapper">
                <input v-model="rolls">
                <label>Use next ? rolls</label>
            </div>
            <div class="inputWrapper">
                <input v-model="players">
                <label>Total players</label>
            </div>
            <p v-if="this.generatedHash !== ''" id="hash">Hash: {{generatedHash}}</p>
            <table id="table">
                <tbody>
                    <tr>
                        <th>
                            Rolls
                        </th>
                    </tr>

                    <template v-for="roll in generatedRolls">
                        <tr :key="roll.num + Math.random()">
                            <td :class="{blackCell: roll.isUsed}" v-on:click="roll.isUsed = !roll.isUsed">{{roll.num}}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div id="chanceTable" class="card">
            <table>
                <thead>
                    <tr>
                        <th>Result</th>
                        <th>Normal Chance</th>
                        <th>Adjusted Chances</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="chanceObj in calculatedChances">
                        <tr :key="chanceObj.roll">
                            <td>{{chanceObj.roll}}</td>
                            <td>{{chanceObj.normal}}</td>
                            <td>{{chanceObj.actual}}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import sha1 from 'sha1';
import seedrandom from 'seedrandom';
import randomWords from 'random-words';

const NUMBERS_TO_GENERATE = 100;
export default {
  name: 'app',
  data() {
    return {
      generatedRolls: [],
      generatedHash: '',
      seed: randomWords(),
      rolls: 10,
      players: 4,
    };
  },
  mounted: function() {
    this.fillTable();
  },
  computed: {
    calculatedChances: function() {
      const toPercent = decimal => `${(decimal * 100).toFixed(2)}%`;
      const normalChances = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];

      return this.generatedRolls.length === 0
        ? normalChances.map((chance, i) => ({
            roll: i + 2,
            normal: toPercent(chance / 36),
          }))
        : this.generatedRolls
            .filter(el => !el.isUsed)
            .slice(0, this.rolls)
            .reduce((acc, roll) => {
              acc[roll.num - 2] += 36 / this.rolls;
              return acc;
            }, normalChances.map(chance => (this.players - 1) * chance))
            .map(el => toPercent(el / (this.players * 36)))
            .map((percent, i) => ({
              roll: i + 2,
              actual: percent,
              normal: toPercent(normalChances[i] / 36),
            }));
    },
  },
  methods: {
    fillTable: function() {
      this.generatedRolls = [];

      const randomGen = new seedrandom(this.seed);
      const roll = () => Math.floor(randomGen() * 6) + 1;

      for (let i = 0; i < NUMBERS_TO_GENERATE; i++)
        this.generatedRolls.push({ num: roll() + roll(), isUsed: false });

      this.generatedHash = `sha1-${sha1(JSON.stringify(this.generatedRolls))}`;
    },
    swipeleft: function() {
      if (/Mobi/.test(navigator.userAgent)) location.hash = 'chanceTable';
    },
    swipeRight: function() {
      if (/Mobi/.test(navigator.userAgent)) location.hash = 'rnged';
    },
  },
};
</script>

<style>
table {
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid black;
}

td,
th {
  padding: 6px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#hash {
  font-family: 'Courier New', Courier, monospace;
  font-size: 15px;
}

.inputWrapper {
  margin-bottom: 4px;
}

.blackCell {
  background-color: black;
  color: white;
}

.scrolling-wrapper {
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
}
.card {
  display: inline-block;
  vertical-align: top;
}
</style>
