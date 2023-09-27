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
        action: (state) => state.action,
    },
    mutations: {
        setBoard(state, data) {
            state.board = data;
        },
        setAction(state, data) {
            state.action = data;
            console.log('ACTION SET', state.action)
        }
    },  
    actions: {
        generateBoard({ commit }) {
            commit('setBoard', staticBoard);
        },
        selectAction({ commit }, action) {
            commit('setAction', action);
        }
    },
   
});

export default store

