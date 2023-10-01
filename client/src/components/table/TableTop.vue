<template>
    <div class="table-top">
        <div class="header border"></div>
        <div class="border">
            <player-info-layout></player-info-layout>
        </div>
        <div class="center border">
            <board-layout></board-layout>
        </div>
        <div class="border">
            <token-info-layout></token-info-layout>
        </div>
        <div class="border"></div>
        <div class="border">
            <dice-layout></dice-layout>
        </div>
        <div class="border"></div>
    </div>
</template>

<script>
import BoardLayout from '../board/BoardLayout.vue';
import TokenInfoLayout from '../token-info/TokenInfoLayout.vue';
import DiceLayout  from '../dice/DiceLayout.vue';
import PlayerInfoLayout from '../player-info/PlayerInfoLayout'


export default {
    components: {
        BoardLayout,
        TokenInfoLayout,
        DiceLayout,
        PlayerInfoLayout
    },
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
    },
};
</script>

<style scoped>
.table-top {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 10vh 2fr 1fr;
    gap: 10px;
    height: calc(100vh - 20px);
    margin: 10px;
}
.header {
    grid-column: 1 / 4
}
.center {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: gray;
    padding: 10px;
}
.border {
    border:  solid black 2px;
    border-radius: 5px;
}
</style>