import { createStore } from 'vuex';
import socket from '../lib/socket';
// import staticBoard from '../lib/staticBoard'

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
        listenToServerEvents({ commit }) {

            socket.on('newAction', (data) => {
                console.log('ACTION RECEIVED', data);
                // commit('SET_EVENT1_DATA', data);
            });

            socket.on('newBoard', (board) => {
                commit('setBoard', board);
            });

          },
        selectAction({ commit, state }, action) {
            action = action === state.currentAction ? '' : action;
            socket.emit('selectAction', action);
            commit('setAction', action);
        }
    },
   
});

export default store;

