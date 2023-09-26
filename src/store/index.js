import { createStore } from 'vuex';
import staticBoard from '../lib/staticBoard'

const store = createStore({
    state: {
        board: [],
        currentPlayer: 1,
        action: ''
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

