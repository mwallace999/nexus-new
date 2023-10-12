<template>
    <div class="token-window">
        <div class="token-scale">
            <token-layout
                v-if="tokenData"
                :token-data="tokenData"
                :selected-slices="selectedSlices">
            </token-layout>
        </div>
        <ul class="circle" v-if="tokenData?.tokenLevel && tokenData.tokenPlayer === thisPlayer">
            <li 
                v-for="index in 6" 
                :key="`slice${index}`"
                :style="{ transform: 'rotate(' + (index * 60) + 'deg) skewY(-30deg)' }"
                @click="sliceClick(index - 1)"
            >
            </li>
        </ul>
    </div>
</template>

<script>
import TokenLayout from '../board/TokenLayout.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        TokenLayout
    },
    props: {
      tokenData: Object
    },
    data() {
        return {
            selectedSlices: []
        };
    },
    computed: {
        ...mapGetters(['thisPlayer']),
    },
    methods: {
        ...mapActions(['syncRollFilter']),
        sliceClick(sliceId) {
            if (!this.selectedSlices.includes(sliceId) && this.tokenData?.tokenLevelArray[sliceId]) this.selectedSlices.push(sliceId);
            else this.selectedSlices = this.selectedSlices.filter(slice => slice !== sliceId);
            this.syncRollFilter({[this.tokenData.hexId]: this.selectedSlices.sort()})
        }
    },
};
</script>

<style scoped>
.token-window {
    height: 100%;
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
}

@keyframes scaleAnimation {
    from {
        transform: scale(0)
    }
    to {
        transform: scale(2.5)
    }
}

.token-scale {
    transform: scale(1);
    animation: scaleAnimation 0.3s forwards;
}

.no-pulse {
    animation: none !important;
}

.circle {
  position: absolute;
  padding: 0;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  overflow: hidden;
  transform: rotate(-60deg);
}

li {
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 50%;
  transform-origin: 0% 100%;
}

.custom-button {
    background-color: white;
    color: black;
    padding: 3px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 5px;
    width: 100px;
    position: absolute;
    left: 10px;
}

</style>