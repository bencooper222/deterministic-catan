<template>
<div>
 <div class="float">
        <div class="inputWrapper">
            <input id="seed" placeholder="Seed me!">

            <button v-on:click="fillTable">
                Generate!
            </button>
        </div>
        <div class="inputWrapper">
            <input id="rollTotal" value="15">
            <label>Total rolls</label>

        </div>
        <div class="inputWrapper">
            <input id="numPlayers" value="4">
            <label>Total players</label>

        </div>
        <p id="hash"> </p>
        <table id="table">

            <tbody>
                <tr>
                    <th>
                        Rolls
                    </th>
                </tr>
                // TODO: HERE TOMORROW
                <!-- <template v-for="roll in generatedRolls">
                  <tr>
                    <td>{{roll}}</td>
                    </tr>
                  </template> -->
            </tbody>

        </table>
    </div>
    <div id="right" class="float">
        <table>
            <thead>
                <tr>
                    <th>Result</th>
                    <th>Normal Chance</th>
                    <th>Your Chances</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2</td>
                    <td>1</td>
                    <td class="calcChances"></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>2</td>
                    <td class="calcChances"></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>3</td>
                    <td class="calcChances"></td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>4</td>
                    <td class="calcChances"></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>5</td>
                    <td class="calcChances"></td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>6</td>
                    <td class="calcChances"></td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>5</td>
                    <td class="calcChances"></td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>4</td>
                    <td class="calcChances"></td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>3</td>
                    <td class="calcChances"></td>
                </tr>
                <tr>
                    <td>11</td>
                    <td>2</td>
                    <td class="calcChances"></td>
                </tr>
                <tr>
                    <td>12</td>
                    <td>1</td>
                    <td class="calcChances"></td>
                </tr>
            </tbody>
        </table>
    </div>

</div>
</template>

<script>
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
      generatedRolls: [2,3]
    };
  },
  methods: {
    fillTable: {

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
</style>
