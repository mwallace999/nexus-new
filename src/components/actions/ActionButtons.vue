<template>
    <div class="actions-grid">
        <div v-for="act in actions" :key="act" 
            :class="{
                'action-button':  true,
                'active': act === this.action
            }"
            @click="selectAction(act)"
        >
            {{ act }}
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
        ...mapGetters(['action'])
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