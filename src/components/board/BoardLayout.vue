<template>
    <div class="board">
        <div class="row-container" v-for="(row, r) in board" :key="`row${r}`">
            <div class="hex-row">
                <hex-layout v-for="(hex, h) in row" :key="`hex${r}-${h}`" :hex-data="hex"/>
            </div>
        </div>
    </div>
</template>

<script>
import HexLayout from './HexLayout.vue'
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        HexLayout
    },
    data() {
        return {
        };
    },
    created() {
        this.generateBoard
    },
    computed: {
        ...mapGetters(['board']),
        ...mapActions(['generateBoard'])
    },
    methods: {
    },
};
</script>

<style scoped>
.row-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.hex-row {
    display: flex;
    gap: 3px;
    margin-bottom: -25px;
}
</style>