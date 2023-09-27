import { createStore } from 'vuex';
import staticBoard from '../lib/staticBoard'

const store = createStore({
    state: {
        board: [],
        currentPlayer: 1,
        currentAction: ''
    },
    getters: {
        board: (state) => state.board,
        currentPlayer: (state) => state.currentPlayer,
        currentAction: (state) => state.currentAction
    },
    mutations: {
        setBoard(state, data) {
            state.board = data;
        },
        setAction(state, data) {
            state.currentAction = data;
            console.log('ACTION SET', state.currentAction);
        }
    },  
    actions: {
        generateBoard({ commit }) {
            commit('setBoard', staticBoard);
        },
        selectAction({ commit, state }, action) {
            action = action === state.currentAction ? '' : action;
            commit('setAction', action);
        }
    },
   
});

export default store

