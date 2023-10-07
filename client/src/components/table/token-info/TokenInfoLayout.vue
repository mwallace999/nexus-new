<template>
    <div v-if="isCurrentPlayer && activeHex" class="token-info-layout">
        <token-window :token-data="tokenData"></token-window>
        <token-actions></token-actions>
    </div>
</template>

<script>
import TokenActions from './TokenActions.vue';
import TokenWindow from './TokenWindow.vue'
import { mapGetters } from 'vuex';

export default {
    components: {
        TokenActions,
        TokenWindow
    },
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters(['activeHex', 'fetchTokenByHexId', 'isCurrentPlayer']),
        tokenData() { return this.activeHex ? this.fetchTokenByHexId(this.activeHex) : null },
    },
    methods: {
    },
};
</script>

<style scoped>
.token-info-layout {
    height: 100%;
    display: grid;
    grid-template-rows: 80% 20%;
}
</style>