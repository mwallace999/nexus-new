<template>
    <div class="token-actions-grid">
        <button v-for="action in actions" :key="action" 
            :class="{
                'token-action-button':  true,
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
            actions: ['DRAW', '???']
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

.token-actions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    overflow: hidden;
}
.token-action-button{
    height: 100%;
    background-color: green;
    border: solid black 2px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.token-action-button.active {
    background-color: yellow;
}
</style>