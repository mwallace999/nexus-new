<template>
    <div class="dice-row">
        <die-roll v-for="(die, i) in diceData" :key="`die${i}`" :die-data="die"></die-roll>
    </div>
</template>

<script>
import DieRoll from './DieRoll.vue'
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        DieRoll
    },
    props: {
        diceData: Array
    },
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters([])
    },
    methods: {
        ...mapActions([]),
    },
};
</script>

<style scoped>
.dice-row {
    width: calc(100% - 20px);
    background-color: gray;
    border-radius: 5px;
    height: 10vh;
    margin: 10px;
    display: flex;
    justify-content: space-around;;
    align-items: center;
}
</style>