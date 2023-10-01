<template>
    <div class="player-info-layout">
        <player-window></player-window>
        <player-actions></player-actions>
    </div>
</template>

<script>
import PlayerActions from './PlayerActions.vue';
import PlayerWindow from './PlayerWindow.vue'

export default {
    components: {
        PlayerActions,
        PlayerWindow
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
.player-info-layout {
    height: 100%;
    display: grid;
    grid-template-rows: 80% 20%;
}
</style>