<template>
    <div class="action-window">
        <select v-model.number="thisPlayer" :items="[1, 2]">
            <option value="1">Player 1</option>
            <option value="2">Player 2</option>
        </select>
        <div>
            <button @click="newGame" class="custom-button"> NEW GAME </button>
        </div>
    </div>
</template>

<script>
import socket from '../../lib/socket'
export default {
    components: {
    },
    data() {
        return {
        };
    },
    computed: {
       thisPlayer: {
            get() {
                return this.$store.state.thisPlayer; // Get the value from Vuex
            },
            set(value) {
                this.$store.commit('setThisPlayer', value); // Update the value in Vuex
            },
        },
    },
    methods: {
        newGame() {
            socket.emit('syncNewGame', {
                colors: ['red', 'green', 'blue'],
                layout: [3, 4, 5, 4, 3]
            });
        }
    },
};
</script>

<style scoped>
.action-window {
    height: 100%;
    background-color: blue;
}
.custom-button {
  background-color: rgb(225, 14, 14);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>