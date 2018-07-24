<template>
<div>
 <div class="float">
        <div class="inputWrapper">
            <input v-model="seed" placeholder="Seed me!">

            <button v-on:click="fillTable">
                Generate!
            </button>
        </div>
        <div class="inputWrapper">
            <input v-model="rolls" >
            <label>Use next ? rolls</label>

        </div>
        <div class="inputWrapper">
            <input v-model="players" >
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
            
                <template v-for="roll in generatedRolls" >
                  <tr :key= "roll.num + Math.random()">
                    <td v-bind:class="{blackCell: roll.isUsed}" v-on:click="roll.isUsed = !roll.isUsed">{{roll.num}}</td>
                    </tr>
                  </template>
            </tbody>

        </table>
    </div>
    <div id="right" class="float">
        <table>
            <thead>
                <tr>
                    <th>Result</th>
                    <th>Normal Chance</th>
                    <th>Adjusted Chances</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2</td>
                    <td>2.78%</td>
                    <td class="calcChances">{{calculatedChances[0] < 0 ? "": calculatedChances[0]}}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>5.56%</td>
                    <td class="calcChances">{{calculatedChances[1] < 0 ? "": calculatedChances[1]}}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>8.33%</td>
                    <td class="calcChances">{{calculatedChances[2] < 0 ? "": calculatedChances[2]}}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>11.11%</td>
                    <td class="calcChances">{{calculatedChances[3] < 0 ? "": calculatedChances[3]}}</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>13.89%</td>
                    <td class="calcChances">{{calculatedChances[4] < 0 ? "": calculatedChances[4]}}</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>16.67%</td>
                    <td class="calcChances">{{calculatedChances[5] < 0 ? "": calculatedChances[5]}}</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>13.89%</td>
                    <td class="calcChances">{{calculatedChances[6] < 0 ? "": calculatedChances[6]}}</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>11.11%</td>
                    <td class="calcChances">{{calculatedChances[7] < 0 ? "": calculatedChances[7]}}</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>8.33%</td>
                    <td class="calcChances">{{calculatedChances[8] < 0 ? "": calculatedChances[8]}}</td>
                </tr>
                <tr>
                    <td>11</td>
                    <td>5.56%</td>
                    <td class="calcChances">{{calculatedChances[9] < 0 ? "": calculatedChances[9]}}</td>
                </tr>
                <tr>
                    <td>12</td>
                    <td>2.78%</td>
                    <td class="calcChances">{{calculatedChances[10] < 0 ? "": calculatedChances[10]}}</td>
                </tr>
  
            </tbody>
        </table>
    </div>

</div>
</template>

<script>
import sha1 from 'sha1';
import seedrandom from 'seedrandom';

const NUMBERS_TO_GENERATE = 100;
export default {
  name: 'app',
  data() {
    return {
      normalRollDistribution: {
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
      },
      generatedRolls: [],
      generatedHash: '',
      seed: '',
      rolls: 10,
      players: 4
    };
  },
  computed: {
    calculatedChances: function() {
      return this.generatedRolls
        .filter(el => !el.isUsed)
        .slice(0, this.rolls)
        .reduce(
          (acc, roll) => {
            acc[roll.num - 2] += 36 / this.rolls;
            return acc;
          },
          [
            this.players - 1,
            (this.players - 1) * 2,
            (this.players - 1) * 3,
            (this.players - 1) * 4,
            (this.players - 1) * 5,
            (this.players - 1) * 6,
            (this.players - 1) * 5,
            (this.players - 1) * 4,
            (this.players - 1) * 3,
            (this.players - 1) * 2,
            this.players - 1
          ]
        )
        .map(el => {
          return `${((100 * el) / (this.players * 36)).toFixed(2)}%`;
        });
    }
  },
  methods: {
    fillTable: function() {
      this.generatedRolls = [];

      const randomGen = new seedrandom(this.seed);
      const roll = () => Math.floor(randomGen() * 6) + 1;

      for (let i = 0; i < NUMBERS_TO_GENERATE; i++) {
        const thisRoll = roll() + roll();
        this.generatedRolls.push({ num: thisRoll, isUsed: false });
      }

      this.generatedHash = sha1(JSON.stringify(this.generatedRolls));
    }
  }
};
</script>

<style scoped>
#table {
  margin-top: 20px;
}

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
  font-size: 14px;
}

.float {
  float: left;
}

#right {
  margin-left: 10px;
}

.inputWrapper {
  margin-bottom: 4px;
}

.blackCell {
  background-color: black;
  color: white;
}
</style>
