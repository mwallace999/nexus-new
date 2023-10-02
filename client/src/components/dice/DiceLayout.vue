<template>
    <div> 
        Dice Roller
        <button @click="rollDice" class="custom-button"> ROLL </button>
        <dice-row :dice-data="fetchDiceByHexId(this.enemyHex)"></dice-row>
        <dice-row :dice-data="fetchDiceByHexId(this.activeHex)"></dice-row>
    </div>
</template>

<script>
import DiceRow from './DiceRow.vue'
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        DiceRow
    },
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters(['activeHex', 'enemyHex', 'fetchDiceByHexId']),
    },
    methods: {
        ...mapActions(['rollDice']),
    }
};
</script>

<style scoped>
.custom-button {
  background-color: gray;
  color: white;
  padding: 3px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
}
</style>