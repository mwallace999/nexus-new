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
import { mapGetters } from 'vuex';
import socket from '../../lib/socket'
// import staticBoard from '../lib/staticBoard'


export default {
    components: {
        HexLayout
    },
    data() {
        return {
            setup: {
                colors: ['red', 'green', 'blue'],
                layout: [3, 4, 5, 4, 3]
            }
        };
    },
    mounted() { 
        socket.emit('generateBoard', this.setup)
    },
    computed: {
        ...mapGetters(['board']),
    },
    methods: {
    }
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
.board {
    padding-bottom: 25px;
}
</style>