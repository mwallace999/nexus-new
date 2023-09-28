import { createStore } from 'vuex';
import socket from '../lib/socket';
// import staticBoard from '../lib/staticBoard'

function invertBoard(board) {
    return board.map(row => row.reverse()).reverse();
}

const store = createStore({
    state: {
        board: [],
        tokens: [
            {
                tokenPlayer: 1,
                hexId: 1,
                tokenLevelArray: ['red', 'red', 'green'],
                tokenLevel: 4,
                tokenStatusArray: []
            },
            {
                tokenPlayer: 2,
                hexId: 13,
                tokenLevelArray: ['red', 'blue', 'green'],
                tokenLevel: 6,
                tokenStatusArray: []
            },
            {
                tokenPlayer: 2,
                hexId: 10,
                tokenLevelArray: ['red', 'blue', 'green'],
                tokenLevel: 0,
                tokenStatusArray: []
            },
            {
                tokenPlayer: 1,
                hexId: 8,
                tokenLevelArray: ['red'],
                tokenLevel: 1,
                tokenStatusArray: []
            }
        ],
        thisPlayer: 1,
        currentPlayer: 1,
        currentAction: '',
        activeHex: null
    },
    getters: {
        board: (state) => {
            const boardState = state.board.map(row => row.map(hex => { return {...hex, ...state.tokens.find(token => token.hexId === hex.id)}}));
            console.log('BOARD STATE', boardState);
            return  state.thisPlayer === 1 ? boardState : invertBoard(boardState);
        },
        currentPlayer: (state) => state.currentPlayer,
        currentAction: (state) => state.currentAction,
        activeHex: (state) => state.activeHex
    },
    mutations: {
        setBoard(state, data) {
            state.board = data;
        },
        setAction(state, data) {
            data = data === state.currentAction ? '' : data;
            state.currentAction = data;
        },
        setThisPlayer(state, data) {
            state.thisPlayer = data;
        },
        setActiveHex(state, data) {
            data = data === state.activeHex ? '' : data;
            state.activeHex = data;
            console.log('ACTIVE TOKEN', data)
        },
        moveActiveHexToken(state, data) {
            const tokenIndex = state.tokens.findIndex(token => token.hexId === state.activeHex);
            state.tokens[tokenIndex].hexId = data;
            state.activeHex = data;
        },
    },  
    actions: {
        listenToServerEvents({ commit }) {
            socket.on('newBoard', (board) => {
                commit('setBoard', board);
            });
        },
        handleHexClick({ commit, state }, hexId) {
            console.log(hexId);
            if (!state.currentAction) commit('setActiveHex', hexId);
            else if (state.currentAction === 'MOVE') commit('moveActiveHexToken', hexId)     
        }
    },
   
});

export default store;

