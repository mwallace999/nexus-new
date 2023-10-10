import { createStore } from 'vuex';
import socket from '../lib/socket';

function invertBoard(board) {
    return board.map(row => row.reverse()).reverse();
}

const store = createStore({
    state: {
        board: [],
        tokens: [
            // {
            //     tokenPlayer: 1,
            //     hexId: 1,
            //     tokenLevelArray: ['red', 'red', 'green', 'red', 'red', 'red'],
            //     tokenLevel: 6,
            //     tokenStatusArray: []
            // },
            // {
            //     tokenPlayer: 2,
            //     hexId: 2,
            //     tokenLevelArray: ['red', 'blue', 'green', 'blue', 'green'],
            //     tokenLevel: 6,
            //     tokenStatusArray: []
            // },
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
        },
        activeModal: null, // 'diceRoller'
        rollResult: null  // { activeHexId: [3, 4, 5, 2], enemyHexId: [1, 6, 6] }
    },
    getters: {
        board: (state) => {
            const boardState = state.board.map(row => row.map(hex => { return {...hex, ...state.tokens.find(token => token.hexId === hex.id)}}));
            return  state.thisPlayer === 1 ? boardState : invertBoard(boardState);
        },
        currentPlayer: (state) => state.currentPlayer,
        currentAction: (state) => state.currentAction,
        activeHex: (state) => state.activeHex,
        fetchTokenByHexId: (state) => (hexId) => state.tokens.find(token => token.hexId === hexId),
        fetchHexById: (state) => (hexId) => state.board.flat().find(hex => hex.id === hexId),
        playerStyles: (state) => state.playerStyles,
        setup: (state) => state.setup,
        rollResult: (state) => state.rollResult,
        enemyHex: (state) => state.enemyHex,
        fetchDiceByHexId: (state, getters) => (hexId) => {
            const tokenInfo = getters.fetchTokenByHexId(hexId);
            if (tokenInfo) {
                const playerColor = state.playerStyles[tokenInfo.tokenPlayer].color;
                const colorArray = [...getters.fetchTokenByHexId(hexId)?.tokenLevelArray];
                colorArray.unshift(playerColor)
                const diceArray = colorArray?.map((level, i) => {
                    return {
                        color: level,
                        value: state.rollResult?.[hexId]?.[i] || '?'
                    }
                })
                return diceArray
            } else {
                return [];
            }
        },
        activeModal: (state) => state.activeModal,
        thisPlayer: (state) => state.thisPlayer,
        isCurrentPlayer: (state) => state.thisPlayer === state.currentPlayer
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
        setRollResult(state, result) {
            state.rollResult = result;
        },
        setActiveModal(state, activeModal) {
            state.activeModal = activeModal;
        },
        setCurrentPlayer(state, currentPlayer) {
            state.currentPlayer = currentPlayer
        },
        drawLevel(state) {
            console.log('DRAW LEVEL');
            const activeHex = this.getters.fetchHexById(state.activeHex);
            const activeHexToken = this.getters.fetchTokenByHexId(state.activeHex);
            const levelColor = activeHex.hexColor;
            if (activeHexToken.tokenLevelArray.length < activeHexToken.tokenLevel) {
                if (activeHexToken.tokenLevel === 0) activeHexToken.tokenLevel = 1;
                activeHexToken.tokenLevelArray.unshift(levelColor);
            }
        },
        // ON HEX CLICK
        setActiveHex(state, hexId) {
            console.log('SET ACTIVE HEX:', hexId);
            state.activeHex = hexId;
        },
        setEnemyHex(state, hexId) {
            state.enemyHex = hexId;
        },
        moveActiveHexToken(state, hexId) {
            console.log(`MOVE ACTIVE HEX TOKEN --> HEX: ${hexId}`)
            const activeHexToken = this.getters.fetchTokenByHexId(state.activeHex); 
            const targetHex = this.getters.fetchHexById(hexId);

            activeHexToken.hexId = hexId;
            targetHex.hexBorderColor = state.playerStyles[state.thisPlayer].color;
            state.activeHex = hexId;
        },
        mergeTokens(state, hexId) {
            console.log('MERGE TOKENS');
            const targetHexToken = this.getters.fetchTokenByHexId(hexId);
            const activeHexToken = this.getters.fetchTokenByHexId(state.activeHex);

            if (targetHexToken.tokenLevel === 0 || activeHexToken.tokenLevel === 0) targetHexToken.tokenLevel++;

            targetHexToken.tokenLevel =  Math.min(targetHexToken.tokenLevel + activeHexToken.tokenLevel, 6);

            targetHexToken.tokenLevelArray = activeHexToken.tokenLevelArray.concat(targetHexToken.tokenLevelArray).slice(-targetHexToken.tokenLevel);
            state.tokens = state.tokens.filter(token => token.hexId !== state.activeHex);
            state.activeHex = hexId;
        },
        addToken(state, hexId) {
            console.log('SUMMON TOKEN');
            const targetHex = this.getters.fetchHexById(hexId);

            targetHex.hexBorderColor = state.playerStyles[state.thisPlayer].color;
            const newToken = {
                tokenPlayer: state.thisPlayer,
                hexId,
                tokenLevelArray: [],
                tokenLevel: 0,
                tokenStatusArray: []
            }
            state.tokens.push(newToken);
        },
        addHexClass(state, hexId, className) {
            const targetHex = this.getters.fetchHexById(hexId);
            targetHex.hexStatusArray.push(className);

        },
        removeHexClass(state,{ hexId, className }) {
            const targetHex = this.getters.fetchHexById(hexId);
            targetHex.hexStatusArray = targetHex.hexStatusArray.filter(item => item !== className);
        }
    },  
    actions: {
        listenToServerEvents({ commit }) {
            socket.on('boardState', (boardState) => {
                console.log('SYNCING BOARD STATE', boardState);
                const { tokens, board, enemyHex, activeHex } = boardState;
                commit('setBoard', board);
                commit('setTokens', tokens);
                commit('setEnemyHex', enemyHex);
                commit('setActiveHex', activeHex);
            });
            socket.on('rollResult', (result) => {
                console.log('SYNCING ROLL RESULT');
                commit('setRollResult', result);
            });
            socket.on('activeModal', (activeModal) => {
                console.log('SYNCING ACTIVE MODAL');
                commit('setActiveModal', activeModal);
            });
            socket.on('currentPlayer', (nextPlayer) => {
                console.log('SYNCING CURRENT PLAYER');
                commit('setCurrentPlayer', nextPlayer);
            });
            socket.on('thisPlayer', (thisPlayer) => {
                console.log('SETTING THIS PLAYER');
                commit('setThisPlayer', thisPlayer);
            });
        },
        handleHexClick({ commit, state }, hexId) {
            // console.log(`HEX ${hexId} CLICKED`);
            const activeHexToken = this.getters.fetchTokenByHexId(state.activeHex);
            const targetHexToken = this.getters.fetchTokenByHexId(hexId);

            // HANDLE SUMMON NEW TOKEN
            if (state.currentAction === 'SUMMON') {    
                if (!this.getters.fetchTokenByHexId(hexId)) {
                    commit('addToken', hexId);
                    commit('removeHexClass', { hexId, className: 'hidden' })
                }
            } 
            // If clicked hex is enemy hex, de-select enemy
            else if (hexId === state.enemyHex) {
                commit('setEnemyHex');
            }

            // CORE HANDLING: MOVE, ATTACK, MERGE, SET-ACTIVE-HEX
            // If active hex has token, and clicked hex is not active hex...
            else if (activeHexToken && hexId !== state.activeHex) {
                // ...and no token on target, then Move
                if (!targetHexToken) {
                    commit('moveActiveHexToken', hexId);
                    commit('removeHexClass', { hexId, className: 'hidden' })
                }
                // If token on target is...
                else {
                    // Enemy? Attack
                    if (targetHexToken.tokenPlayer !== state.thisPlayer) {
                        commit('setEnemyHex', hexId);
                        commit('setActiveModal', 'diceRoller');
                        socket.emit('syncActiveModal', 'diceRoller');
                    }
                    // Yours? Merge
                    else commit('mergeTokens', hexId);
                }
            } else {
                hexId = hexId === state.activeHex ? null : hexId;
                if (targetHexToken?.tokenPlayer === state.thisPlayer) {
                    commit('setActiveHex', hexId);
                    commit('setEnemyHex');
                }
            }
            socket.emit('syncBoardState', { 
                tokens: state.tokens, 
                board: state.board, 
                enemyHex: state.enemyHex,
                activeHex: state.activeHex
            });
        },
        handleActionClick({ commit, state }, action) {
            if (action === 'DRAW') {
                commit('drawLevel');
                socket.emit('syncBoardState', { 
                    tokens: state.tokens,
                    board: state.board,
                    enemyHex: state.enemyHex,
                    activeHex: state.activeHex
                }); 
            }
            commit('setAction', action);
        },
        rollDice({ commit, state, getters }) {
            console.log('ROLLING DICE!!!!');

            const rolling = () => {
                const playerColorArray = getters.fetchTokenByHexId(state.activeHex)?.tokenLevelArray;
                const enemyColorArray =  getters.fetchTokenByHexId(state.enemyHex)?.tokenLevelArray;
                const result = {
                    [state.activeHex]: Array.from({ length: playerColorArray.length + 1 }, () => Math.ceil(Math.random() * 6)),
                    [state.enemyHex]: Array.from({ length: enemyColorArray.length + 1 }, () => Math.ceil(Math.random() * 6))
                }
                commit('setRollResult', result);
                socket.emit('syncRollResult', result);
            }

            // UNCOMMMENT FOR ROLLING ANIMATION
            // const per = 8; // Rolls per second
            // const secs = 1.5; // Duration in seconds
            // const interval = 1000 / per;
            // let executionCount = 0;
            // const startRoll = () => {
            //     if (executionCount < per * secs) {
            //         rolling();
            //         executionCount++;
            //         setTimeout(startRoll, interval);
            //     }
            // }

            // startRoll();

            rolling();

        },
        resetDice({ commit }) {
            commit('setRollResult')
            socket.emit('syncRollResult');
        },
        syncActiveModal({ commit }, activeModal) {
            console.log('SYNCING ACTIVE MODAL', activeModal)
            commit('setActiveModal', activeModal);
            socket.emit('syncActiveModal', activeModal);
        },
        endTurn({ commit, getters, state }) {
            const nextPlayer = getters.currentPlayer === 1 ? 2 : 1; // Handle multiplayer?
            commit('setCurrentPlayer', nextPlayer);
            socket.emit('syncCurrentPlayer', nextPlayer);
            socket.emit('syncBoardState', { 
                tokens: state.tokens, 
                board: state.board, 
                enemyHex: null,
                activeHex: null
            });
        },
        syncNewGame({state}) {
            socket.emit('syncNewGame', state.setup);
        }

    },
   
});

export default store;

