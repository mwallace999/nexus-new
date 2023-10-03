<template>
    <div class="player-actions-grid">
        <button v-for="action in actions" :key="action" 
            :class="{
                'player-action-button':  true,
                'active': action === currentAction
            }"
            @click="handleActionClick(action)"
        >
            {{ action }}
        </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
    },
    data() {
        return {
            actions: ['SUMMON', '???']
        };
    },
    computed: {
        ...mapGetters(['currentAction', 'activeHex'])
    },
    methods: {
        ...mapActions(['handleActionClick']),
    },
};
</script>

<style scoped>

.player-actions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    overflow: hidden;
}
.player-action-button{
    height: 100%;
    background-color: green;
    border: solid black 2px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.player-action-button.active {
    background-color: yellow;
}
</style>