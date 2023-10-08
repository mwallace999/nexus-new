<template>
    <v-dialog class="dice-container" v-model="fixedTrue" @click:outside="closeDialog"> 
        ENEMY
        <dice-row :dice-data="fetchDiceByHexId(isCurrentPlayer ? enemyHex : activeHex)"></dice-row>
        <dice-row :dice-data="fetchDiceByHexId(isCurrentPlayer ? activeHex : enemyHex)"></dice-row>
        PLAYER
        <button v-if="isCurrentPlayer" @click="rollDice" class="custom-button"> ROLL </button>
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
        ...mapGetters(['activeHex', 'enemyHex', 'fetchDiceByHexId', 'isCurrentPlayer']),
    },
    methods: {
        ...mapActions(['rollDice', 'syncActiveModal', 'resetDice']),
        closeDialog() {
            this.resetDice();
            this.syncActiveModal();
        }
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
    border: 4px solid black;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>