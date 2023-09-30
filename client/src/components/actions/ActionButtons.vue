<template>
    <div class="actions-grid">
        <button v-for="action in actions" :key="action" 
            :class="{
                'action-button':  true,
                'active': action === currentAction
            }"
            @click="handleActionClick(action)"
            :disabled="action === 'DRAW' && !activeHex"
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
            actions: ['SUMMON', 'DRAW', '???', '???']
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