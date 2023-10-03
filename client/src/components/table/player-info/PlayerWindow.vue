<template>
    <div class="player-window">
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
            this.$socket.emit('syncNewGame', this.$store.state.setup);
        }
    },
};
</script>

<style scoped>
.player-window {
    height: 100%;
    background-color: gray;
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