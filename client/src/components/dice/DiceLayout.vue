<template>
    <v-dialog class="dice-container" v-model="fixedTrue" @click:outside="closeDialog">
        <div class="token-container">
            <token-window :token-data="enemyTokenData"></token-window>
        </div>
        ENEMY
        <dice-row :dice-data="fetchDiceByHexId(isCurrentPlayer ? enemyHex : activeHex)"></dice-row>
        <dice-row :dice-data="fetchDiceByHexId(isCurrentPlayer ? activeHex : enemyHex)"></dice-row>
        PLAYER
        <div class="token-container">
            <token-window :token-data="tokenData"></token-window>
        </div>
        <button v-if="isCurrentPlayer" @click="rollDice" class="custom-button"> ROLL </button>
    </v-dialog>
</template>

<script>
import DiceRow from './DiceRow.vue';
import TokenWindow from '../table/token-info/TokenWindow.vue'
import { mapGetters, mapActions } from 'vuex';
import { VDialog } from 'vuetify/lib/components/VDialog';

export default {
    components: {
        DiceRow,
        TokenWindow,
        VDialog,
    },
    data() {
        return {
            fixedTrue: true
        };
    },
    computed: {
        ...mapGetters(['activeHex', 'enemyHex', 'fetchDiceByHexId', 'isCurrentPlayer', 'fetchTokenByHexId']),
        tokenData() {
            return this.isCurrentPlayer ? this.fetchTokenByHexId(this.activeHex) : this.fetchTokenByHexId(this.enemyHex);
        },
        enemyTokenData() {
            return this.isCurrentPlayer ? this.fetchTokenByHexId(this.enemyHex) : this.fetchTokenByHexId(this.activeHex);
        },
     },
    methods: {
        ...mapActions(['rollDice', 'syncActiveModal', 'resetDice', 'syncRollFilter']),
        closeDialog() {
            this.resetDice();
            this.syncActiveModal();
            this.syncRollFilter();
        }
    }
};
</script>

<style scoped>
.token-container {
    height: 14vw;
    width: 100%;
}
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
    height: 800px;
    width: 800px;
    border: 4px solid black;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* 3D Table Styling  */
    /* transform:perspective(2000px) rotateX(45deg) scale(1.2) translateY(-150px);*/ 
}
</style>