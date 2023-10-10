<template>
    <div
        :class="{
            'token': true,
            'active': activeHex === tokenData.hexId && isAnimated,
            'enemy': enemyHex === tokenData.hexId,
        }" 
        :style="{
            background: tokenLevelGradient,
            visibility: showLevels,
            borderColor: playerColorHighlight
        }"
    >
        <div
            :class="{
                'inner-token': true,
                'inner-hover-border': !tokenLevel,
                'active': !tokenLevel && activeHex === tokenData.hexId && isAnimated,
                'enemy': !tokenLevel && enemyHex === tokenData.hexId
            }"
            :style="{
                backgroundColor: playerColor,
                visibility: 'visible',
                borderColor: playerColorHighlight
            }"
        >
            <h1 :style="{ color: playerColorHighlight}">
                {{ tokenLevel }}
            </h1>
        </div>    
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        tokenData: Object,
        isAnimated: Boolean
    },
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters(['activeHex', 'enemyHex', 'playerStyles']),
        tokenPlayer() { return this.tokenData.tokenPlayer },
        tokenLevelArray() { return this.tokenData.tokenLevelArray },
        tokenLevel() { return this.tokenData.tokenLevel ? this.tokenData.tokenLevel : ''},
        tokenStatus() { return this.tokenData.tokenStatus },
        showLevels() { return this.tokenLevel ? 'visible' : 'hidden'},
        playerColor() { return this.playerStyles[this.tokenPlayer].color },
        playerColorHighlight() { return this.playerStyles[this.tokenPlayer].highlightColor },
        tokenLevelGradient() {
            const gradArray = [];
            for (let i = 0; i < 6; i++) {
                const wedgeColor = () => {
                    if (i + 1 > this.tokenLevel) return 'gray';
                    else return this.tokenLevelArray?.[i] || this.playerColor;
                }
                // Styling for each wedge of token
                gradArray.push(`${wedgeColor()} ${i * 60}deg ${i * 60 + 55}deg`);
                // Styling for wedge divider
                if (i + 1 <= this.tokenLevel) gradArray.push(`${this.playerColorHighlight} ${i * 60 + 55}deg ${(i + 1) * 60}deg`)
            }
            if (this.tokenLevel) gradArray.push(`${this.playerColorHighlight} 355deg 360deg`)
            const returnStr = 'conic-gradient(' + gradArray.join(',') + ')';
            return returnStr;
        }
    },
    methods: {
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
        box-shadow: 0 0 0 0px var(--pulse-color);
    }
    50% {
        box-shadow: 0 0 0 4px var(--pulse-color);
    }
    100% {
        box-shadow: 0 0 0 0px var(--pulse-color);
    }
}

.active {
    --pulse-color:  #00ff48;
    animation: pulse 1s infinite;
}

.enemy {
    --pulse-color: #ffc800;
    animation: pulse 1s infinite;
}
</style>