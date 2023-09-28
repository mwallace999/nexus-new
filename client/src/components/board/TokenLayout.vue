<template>
  <div
    :class="{
        token: true,
        active: this.activeToken === hexData.id
    }" 
    :style="{
        background: tokenLevelGradient,
        visibility: showLevels,
        borderColor: playerColor
    }"
    @click="setActiveToken(hexData.id)"
  >
    <div
        :class="{
            'inner-token': true,
            'inner-hover-border': !tokenLevel
        }"
        :style="{
            backgroundColor: playerColorHighlight,
            visibility: 'visible',
            borderColor: playerColor
        }"
    >
        <h1 :style="{ color: playerColor}">
            {{ tokenLevel }}
        </h1>
    </div>    
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    props: {
        hexData: Object
    },
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters(['activeToken']),
        tokenPlayer() { return this.hexData.tokenPlayer },
        tokenLevelArray() { return this.hexData.tokenLevelArray },
        tokenLevel() { return this.hexData.tokenLevel },
        tokenStatus() { return this.hexData.tokenStatus },
        showLevels() { return this.tokenLevel ? 'visibile' : 'hidden'},
        playerColor() { return this.tokenPlayer === 1 ? 'white' : 'black' },
        playerColorHighlight() { return this.tokenPlayer === 1 ? 'black' : 'white' },
        tokenLevelGradient() {
            const gradArray = [];
            for (let i = 0; i < 6; i++) {
                const wedgeColor = () => {
                    if (i + 1 > this.tokenLevel) return this.playerColorHighlight
                    else return this.tokenLevelArray?.[i] || 'gray';
                }
                // Styling for each wedge of token
                gradArray.push(`${wedgeColor()} ${i * 60}deg ${i * 60 + 55}deg`);
                // Styling for wedge divider
                if (i + 1 <= this.tokenLevel) gradArray.push(`${this.playerColor} ${i * 60 + 55}deg ${(i + 1) * 60}deg`)
            }
            if (this.tokenLevel) gradArray.push(`${this.playerColor} 355deg 360deg`)
            const returnStr = 'conic-gradient(' + gradArray.join(',') + ')';
            return returnStr;
        }
    },
    methods: {
        ...mapMutations(['setActiveToken'])
    },
};
</script>

<style scoped>
.token {
    --tokenSize: 70px;
    width: var(--tokenSize);
    height: var(--tokenSize);
    border-radius: 50%;
    border: solid black 2px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.token:hover {
    box-shadow: 0 0 0px 4px yellow;
}
.inner-token {
    --innerTokenSize: 40px;
    width: var(--innerTokenSize);
    height: var(--innerTokenSize);
    border: solid 2px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.inner-hover-border:hover {
    box-shadow: 0 0 0 4px yellow;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0px #00ff48;
  }
  50% {
    box-shadow: 0 0 0 4px #00ff48;
  }
  100% {
    box-shadow: 0 0 0 0px #00ff48;
  }
}
.active {
    /* box-shadow: 0 0 0 4px #00ff48; */
    animation: pulse 1s infinite;
}
</style>