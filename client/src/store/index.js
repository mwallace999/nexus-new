import { createStore } from 'vuex';
import socket from '../lib/socket';
// import staticBoard from '../lib/staticBoard'

function invertBoard(board) {
    return board.map(row => row.reverse()).reverse();
}

const store = createStore({
    state: {
        board: [],
        tokens: [{
            tokenPlayer: 1,
            hexId: 1,
            tokenLevelArray: ['red', 'red', 'green']
        }],
        thisPlayer: 1,
        currentPlayer: 1,
        currentAction: ''
    },
    getters: {
        board: (state) => {
            const boardState = state.board.map(row => row.map(hex => { return {...hex, ...state.tokens.find(token => token.hexId === hex.id)}}));
            return  state.thisPlayer === 1 ? boardState : invertBoard(boardState);
        },
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
        },
        setThisPlayer(state, data) {
            state.thisPlayer = data;
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

