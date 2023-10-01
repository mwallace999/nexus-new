import { createStore } from 'vuex';
import socket from '../lib/socket';
// import staticBoard from '../lib/staticBoard';

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
                hexId: 2,
                tokenLevelArray: ['red', 'blue', 'green'],
                tokenLevel: 6,
                tokenStatusArray: []
            },
            // {
            //     tokenPlayer: 1,
            //     hexId: 10,
            //     tokenLevelArray: [],
            //     tokenLevel: 3,
            //     tokenStatusArray: []
            // },
            // {
            //     tokenPlayer: 1,
            //     hexId: 8,
            //     tokenLevelArray: ['red'],
            //     tokenLevel: 2,
            //     tokenStatusArray: []
            // },
            // {
            //     tokenPlayer: 2,
            //     hexId: 2,
            //     tokenLevelArray: ['red', 'blue', 'green'],
            //     tokenLevel: 4,
            //     tokenStatusArray: []
            // },
            // {
            //     tokenPlayer: 2,
            //     hexId: 19,
            //     tokenLevelArray: ['blue', 'blue'],
            //     tokenLevel: 5,
            //     tokenStatusArray: []
            // },
            // {
            //     tokenPlayer: 1,
            //     hexId: 3,
            //     tokenLevelArray: ['red'],
            //     tokenLevel: 3,
            //     tokenStatusArray: []
            // }
        ],
        thisPlayer: 1,
        currentPlayer: 1,
        currentAction: null,
        activeHex: null,
        enemyHex: null,
        playerStyles: {
            1: {
                color: 'white',
                highlightColor: 'black'
            },
            2: {
                color: 'black',
                highlightColor: 'white'
            },
        },
        setup: {
            colors: ['red', 'green', 'blue'],
            layout: [3, 4, 5, 4, 3]
        }
    },
    getters: {
        board: (state) => {
            const boardState = state.board.map(row => row.map(hex => { return {...hex, ...state.tokens.find(token => token.hexId === hex.id)}}));
            console.log('BOARD STATE', boardState)
            return  state.thisPlayer === 1 ? boardState : invertBoard(boardState);
        },
        currentPlayer: (state) => state.currentPlayer,
        currentAction: (state) => state.currentAction,
        activeHex: (state) => state.activeHex,
        fetchTokenByHexId: (state) => (hexId) => state.tokens.find(token => token.hexId === hexId),
        fetchHexById: (state) => (hexId) => state.board.flat().find(hex => hex.id === hexId),
        playerStyles: (state) => state.playerStyles,
        setup: (state) => state.setup,
        enemyHex: (state) => state.enemyHex
    },
    mutations: {
        setBoard(state, board) {
            state.board = board;
        },
        setTokens(state, tokens) {
            state.tokens = tokens;
        },
        setAction(state, action) {
            action = action === state.currentAction ? null : action;
            state.currentAction = action;
        },
        setThisPlayer(state, player) {
            state.thisPlayer = player;
        },
        setEnemyHex(state, hexId) {
            state.enemyHex = hexId;
        },
        setActiveHex(state, hexId) {
            console.log('SET ACTIVE HEX:', hexId);
            const targetHexToken = this.getters.fetchTokenByHexId(hexId);
            if (targetHexToken?.tokenPlayer === state.thisPlayer) {
                hexId = hexId === state.activeHex ? null : hexId;
                state.activeHex = hexId;
            }
        },
        moveActiveHexToken(state, hexId) {
            console.log(`MOVE ACTIVE HEX TOKEN --> HEX: ${hexId}`)
            const activeHexToken = this.getters.fetchTokenByHexId(state.activeHex); 
            const targetHex = this.getters.fetchHexById(hexId);

            activeHexToken.hexId = hexId;
            targetHex.hexBorderColor = state.playerStyles[state.thisPlayer].color;
            state.activeHex = hexId;
            socket.emit('syncBoardState', { tokens: state.tokens, board: state.board });
        },
        mergeTokens(state, hexId) {
            console.log('MERGE TOKENS');
            const targetHexToken = this.getters.fetchTokenByHexId(hexId);
            const activeHexToken = this.getters.fetchTokenByHexId(state.activeHex);
 
            targetHexToken.tokenLevel =  Math.min(targetHexToken.tokenLevel + activeHexToken.tokenLevel, 6);
            targetHexToken.tokenLevelArray = activeHexToken.tokenLevelArray.concat(targetHexToken.tokenLevelArray).slice(-targetHexToken.tokenLevel);
            state.tokens = state.tokens.filter(token => token.hexId !== state.activeHex);
            state.activeHex = hexId;
            socket.emit('syncBoardState', { tokens: state.tokens, board: state.board });

        },
        drawLevel(state) {
            console.log('DRAW LEVEL');
            const activeHex = this.getters.fetchHexById(state.activeHex);
            const activeHexToken = this.getters.fetchTokenByHexId(state.activeHex);

            const levelColor = activeHex.hexColor;
            if (activeHexToken.tokenLevelArray.length < activeHexToken.tokenLevel) activeHexToken.tokenLevelArray.unshift(levelColor); 
            socket.emit('syncBoardState', { tokens: state.tokens, board: state.board }); 
        },
        addToken(state, hexId) {
            console.log('SUMMON TOKEN');
            const targetHex = this.getters.fetchHexById(hexId);

            targetHex.hexBorderColor = state.playerStyles[state.thisPlayer].color;
            const newToken = {
                tokenPlayer: state.thisPlayer,
                hexId,
                tokenLevelArray: [],
                tokenLevel: 1,
                tokenStatusArray: []
            }
            state.tokens.push(newToken);
            socket.emit('syncBoardState', { tokens: state.tokens, board: state.board });
        }
    },  
    actions: {
        listenToServerEvents({ commit }) {
            socket.on('boardState', (boardState) => {
                console.log('SYNCING BOARD STATE');
                const { tokens, board } = boardState;
                commit('setBoard', board);
                commit('setTokens', tokens);
            });
            socket.on('newGame', (board) => {
                console.log('NEW GAME');
                commit('setBoard', board);
                // commit('setTokens', []); XXZXX -  uncomment
                commit('setAction');
                commit('setActiveHex');
            })
        },
        handleHexClick({ commit, state }, hexId) {
            // console.log(`HEX ${hexId} CLICKED`);
            const activeHexToken = this.getters.fetchTokenByHexId(state.activeHex);
            const targetHexToken = this.getters.fetchTokenByHexId(hexId);

            // HANDLE SUMMON NEW TOKEN
            if (state.currentAction === 'SUMMON') {    
                if (!this.getters.fetchTokenByHexId(hexId)) commit('addToken', hexId);
            }

            // CORE HANDLING: MOVE, ATTACK, MERGE, SET-ACTIVE-HEX
            // If active Hex has token, and clicked hex is not active hex...
            else if (activeHexToken && hexId !== state.activeHex) {
                // ...and no token on target, then Move
                if (!targetHexToken) commit('moveActiveHexToken', hexId);
                // If token on target is...
                else {
                    // Enemy? Attack
                    if (targetHexToken.tokenPlayer !== state.thisPlayer) {
                        commit('setEnemyHex', hexId);
                    }
                    // Yours? Merge
                    else commit('mergeTokens', hexId);
                }
            } else {
                commit('setActiveHex', hexId);
            }
        },
        handleActionClick({ commit }, action) {
            if (action === 'DRAW') commit('drawLevel');
            commit('setAction', action);
        }
    },
   
});

export default store;

