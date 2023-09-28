export function generateBoard(setup) {
    const { layout, colors } = setup;
        const hexCount = layout.reduce((acc, h) => acc + h, 0);
        const minCount = Math.floor(hexCount / colors.length);
        let extra = hexCount % colors.length;
        let hexId = 1;
        const countObj = {};
        const board = [];
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
        return board;
}