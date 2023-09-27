import { createStore } from 'vuex';
import io from 'socket.io-client';
// import staticBoard from '../lib/staticBoard'

const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

const store = createStore({
    state: {
        board: [],
        currentPlayer: 1,
        currentAction: '',
        setup: {
            colors: ['red', 'green', 'blue'],
            layout: [3, 4, 5, 4, 3]
        }
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
        listenToServerEvents(/*{ commit }*/) {     
            socket.on('moveReceived', (data) => {
                console.log('MOVE RECEIVED', data)
                // commit('SET_EVENT1_DATA', data);
            });
          },
        generateBoard({ commit, state }) {
            const { layout, colors } = state.setup;
            const hexCount = layout.reduce((acc, h) => acc + h, 0);
            const minCount = Math.floor(hexCount / colors.length);
            let extra = hexCount % colors.length;
            const countObj = {};

            colors.map(c => countObj[c] = minCount);
            while (extra) {
                const randColor = colors[ Math.floor(Math.random() * colors.length)];
                if (countObj[randColor] === minCount) {
                    countObj[randColor]++;
                    extra--;
                }
            }
            const fetchColor = () => {
                const randColor =  Object.keys(countObj)[ Math.floor(Math.random() * Object.keys(countObj).length)];
                countObj[randColor]--;
                if (!countObj[randColor]) delete countObj[randColor];
                return randColor;
            }
            const board = [];
            let hexId = 1;
            layout.forEach((rowCount, r) => {
                const hexRowArr = [];
                for (let i = 0; i < rowCount; i++) {
                    const hexColor = fetchColor();
                    hexRowArr.push({
                        id: hexId++,
                        row: r,
                        index: i,
                        hexColor,
                        // hexBorderColor: hexColor
                        tokenPlayer: 1
                    })
                }
                board.push(hexRowArr);
            })
            
            console.log('BOARD', board)
            commit('setBoard', board);
        },
        selectAction({ commit, state }, action) {
            action = action === state.currentAction ? '' : action;
            socket.emit('makeMove', action);
            commit('setAction', action);
        }
    },
   
});

export default store

