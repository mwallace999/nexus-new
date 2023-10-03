<template>
    <v-dialog class="dice-container" v-model="fixedTrue"> 
        Dice Roller
        <button @click="rollDice" class="custom-button"> ROLL </button>
        <dice-row :dice-data="fetchDiceByHexId(this.enemyHex)"></dice-row>
        <dice-row :dice-data="fetchDiceByHexId(this.activeHex)"></dice-row>
    </v-dialog>
</template>

<script>
import DiceRow from './DiceRow.vue'
import { mapGetters, mapActions } from 'vuex';
import { VDialog } from 'vuetify/lib/components/VDialog';

export default {
    components: {
        DiceRow,
        VDialog,
    },
    data() {
        return {
            fixedTrue: true
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
    width: 100px;
}
.dice-container {
    background-color: white;
    height: 600px;
    width: 800px;
    border: 5px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>