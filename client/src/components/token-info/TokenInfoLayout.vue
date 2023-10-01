<template>
    <div v-if="activeHex" class="token-info-layout">
        <token-window></token-window>
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
        ...mapGetters(['activeHex'])
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