<template>
    <div> 
        Dice Roller
        <dice-row :dice-data="enemyDiceData"></dice-row>
        <dice-row :dice-data="playerDiceData"></dice-row>
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
        ...mapGetters(['activeHex', 'enemyHex', 'fetchTokenByHexId']),
        playerDiceData() { return this.fetchTokenByHexId(this.activeHex)?.tokenLevelArray; },
        enemyDiceData() { 
            console.log(this.enemyHex)
            return this.fetchTokenByHexId(this.enemyHex)?.tokenLevelArray; 
        }
    },
    methods: {
        ...mapActions([]),
    }
};
</script>

<style scoped>
</style>