<template>
    <div class="player-window">
        <div>
            <button @click="newGame" class="custom-button"> NEW GAME </button>
            <button @click="onEndTurn" class="custom-button" style="background-color: blue;"> END TURN </button>
        </div>
        THIS PLAYER:
        <select v-model.number="thisPlayer" :items="[1, 2]">
            <option value="1">Player 1</option>
            <option value="2">Player 2</option>
        </select>
        <div>
            CURRENT PLAYER: {{ currentPlayer }}
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
        };
    },
    computed: {
        ...mapGetters(['currentPlayer']),
       thisPlayer: {
            get() { return this.$store.state.thisPlayer; }, // Get the value from Vuex
            set(value) { this.$store.commit('setThisPlayer', value); } // Update the value in Vuex
        },
    },
    methods: {
        ...mapActions(['endTurn', 'syncNewGame']),
        newGame() {
            this.syncNewGame();
        },
        onEndTurn() {
            this.endTurn();
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
  margin: 5px;
}
</style>