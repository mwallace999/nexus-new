<template>
    <div class="actions-grid">
        <button v-for="action in actions" :key="action" 
            :class="{
                'action-button':  true,
                'active': action === currentAction
            }"
            @click="setAction(action)"
            :disabled="!activeHex"
        >
            {{ action }}
        </button>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    components: {
    },
    data() {
        return {
            actions: ['MOVE', 'DRAW', 'SUMMON', '???']
        };
    },
    computed: {
        ...mapGetters(['currentAction', 'activeHex'])
    },
    methods: {
        ...mapMutations(['setAction']),
    },
};
</script>

<style scoped>

.actions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;
}
.action-button{
    height: 100%;
    background-color: green;
    border: solid black 2px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.action-button.active {
    background-color: yellow;
}
</style>