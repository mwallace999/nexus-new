<template>
    <div v-if="isCurrentPlayer && activeHex || enemyHex" class="token-info-layout">
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
        ...mapGetters(['activeHex', 'enemyHex', 'fetchTokenByHexId', 'isCurrentPlayer']),
        tokenData() {
            if (this.isCurrentPlayer && this.activeHex) return  this.fetchTokenByHexId(this.activeHex);
            else if (this.enemyHex) return this.fetchTokenByHexId(this.enemyHex);
            return null;
        },
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