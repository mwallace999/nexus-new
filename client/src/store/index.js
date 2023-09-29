import { createStore } from 'vuex';
import socket from '../lib/socket';
// import staticBoard from '../lib/staticBoard'
import { reactive } from 'vue';


function invertBoard(board) {
    return board.map(row => row.reverse()).reverse();
}

const store = createStore({
    state: reactive ({
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
                tokenPlayer: 1,
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
            },
            {
                tokenPlayer: 2,
                hexId: 2,
                tokenLevelArray: ['red', 'blue', 'green'],
                tokenLevel: 6,
                tokenStatusArray: []
            },
            {
                tokenPlayer: 2,
                hexId: 19,
                tokenLevelArray: ['blue', 'blue'],
                tokenLevel: 3,
                tokenStatusArray: []
            },
            {
                tokenPlayer: 1,
                hexId: 3,
                tokenLevelArray: ['red'],
                tokenLevel: 1,
                tokenStatusArray: []
            }
        ],
        thisPlayer: 1,
        currentPlayer: 1,
        currentAction: '',
        activeHex: null
    }),
    getters: {
        board: (state) => {
            const boardState = state.board.map(row => row.map(hex => { return {...hex, ...state.tokens.find(token => token.hexId === hex.id)}}));
            return  state.thisPlayer === 1 ? boardState : invertBoard(boardState);
        },
        currentPlayer: (state) => state.currentPlayer,
        currentAction: (state) => state.currentAction,
        activeHex: (state) => state.activeHex,
        fetchTokenByHexId: (state) => (hexId) => state.tokens.find(token => token.hexId === hexId)
    },
    mutations: {
        setBoard(state, board) {
            state.board = board;
        },
        setAction(state, action) {
            action = action === state.currentAction ? '' : action;
            state.currentAction = action;
        },
        setThisPlayer(state, player) {
            state.thisPlayer = player;
        },
        setActiveHex(state, hexId) {
            console.log('SET ACTIVE HEX:', hexId);
            const targetHexToken = this.getters.fetchTokenByHexId(hexId);
            if (targetHexToken?.tokenPlayer === state.thisPlayer) {
                hexId = hexId === state.activeHex ? '' : hexId;
                state.activeHex = hexId;
            }
        },
        moveActiveHexToken(state, hexId) {
            console.log(`MOVE ACTIVE HEX TOKEN --> HEX: ${hexId}`)
            this.getters.fetchTokenByHexId(state.activeHex).hexId = hexId;
            state.activeHex = hexId;
        },
        mergeTokens(state, hexId) {
            console.log('MERGE TOKENS')
            const targetHexToken = this.getters.fetchTokenByHexId(hexId);
            const activeHexToken = this.getters.fetchTokenByHexId(state.activeHex);
        
            targetHexToken.tokenLevel =  Math.min(targetHexToken.tokenLevel + activeHexToken.tokenLevel, 6)
            targetHexToken.tokenLevelArray = targetHexToken.tokenLevelArray.concat(activeHexToken.tokenLevelArray).slice(0,  targetHexToken.tokenLevel)

            console.log('TTA', targetHexToken)
            state.tokens = state.tokens.filter(token => token.hexId !== state.activeHex);
            state.activeHex = hexId;
        }
    },  
    actions: {
        listenToServerEvents({ commit }) {
            socket.on('newBoard', (board) => {
                commit('setBoard', board);
            });
        },
        handleHexClick({ commit, state }, hexId) {
            console.log(`HEX ${hexId} CLICKED`);
            const activeHexToken = this.getters.fetchTokenByHexId(state.activeHex);
            const targetHexToken = this.getters.fetchTokenByHexId(hexId);

            console.log()
            // If active Hex has token, and clicked hex is not active hex...
            if (activeHexToken && hexId !== state.activeHex) {
                // ...and no token on target, then move
                if (!targetHexToken) commit('moveActiveHexToken', hexId);
                // If token on target is...
                else {
                    // enemy? Attack
                    if (targetHexToken.tokenPlayer !== state.thisPlayer) console.log('ATTACK!!!');
                    // Mine? Merge
                    else commit('mergeTokens', hexId);
                }
            } else {
                commit('setActiveHex', hexId);
            }
        }
    },
   
});

export default store;

