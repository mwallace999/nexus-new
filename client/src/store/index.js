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
            tokenLevelArray: ['red', 'red', 'green'],
            tokenLevel: 4,
            tokenStatusArray: []
        }],
        thisPlayer: 1,
        currentPlayer: 1,
        currentAction: ''
    },
    getters: {
        board: (state) => {
            const boardState = state.board.map(row => row.map(hex => { return {...hex, ...state.tokens.find(token => token.hexId === hex.id)}}));
            console.log('BOARD STATE', boardState);
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
            data = data === state.currentdata ? '' : data;
            state.currentAction = data;
        },
        setThisPlayer(state, data) {
            state.thisPlayer = data;
        }
    },  
    actions: {
        listenToServerEvents({ commit }) {
            socket.on('newBoard', (board) => {
                commit('setBoard', board);
            });
          },
    },
   
});

export default store;

