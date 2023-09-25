import { createStore } from 'vuex';
import staticBoard from './staticBoard'

const store = createStore({
    state: {
        board: [],
        currentPlayer: 1
    },
    getters: {
        board: (state) => state.board,
        currentPlayer: (state) => state.currentPlayer,
    },
    mutations: {
        setBoard(state, data) {
            state.board = data;
        },
    },  
    actions: {
        generateBoard({ commit }) {
            commit('setBoard', staticBoard);
        },
    },
   
});

export default store

