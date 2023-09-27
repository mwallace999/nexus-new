<template>
    <div class="actions-grid">
        <div v-for="action in actions" :key="action" 
            :class="{
                'action-button':  true,
                'active': action === currentAction
            }"
            @click="selectAction(action)"
        >
            {{ action }}
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
    },
    data() {
        return {
            actions: ['MOVE', 'DRAW', 'SUMMON', '???']
        };
    },
    computed: {
        ...mapGetters(['currentAction'])
    },
    methods: {
        ...mapActions(['selectAction']),
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