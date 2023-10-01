<template>
    <div> 
        Dice Roller
        <dice-row :dice-data="diceData"></dice-row>
        <dice-row :dice-data="diceData"></dice-row>
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
        ...mapGetters(['activeHex', 'fetchTokenByHexId']),
        diceData() { return this.fetchTokenByHexId(this.activeHex)?.tokenLevelArray; }
    },
    methods: {
        ...mapActions([]),
    },
    created() {
        // XXZXX - NOT Hitting socket
        console.log('HERERE', this.$socket)
        this.$socket.on('attackHex', (hexId) => {
            console.log(`ATTACK HEX ORDER RECEIVED: ${hexId}`);
        });
    }
};
</script>

<style scoped>
</style>