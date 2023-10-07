<template>
    <div class="hexagon outer-border" @click="console.log('HEX CLICKED', hexData); handleHexClick(hexData.id)">
        <div class="hexagon inner-border" :style="{ backgroundColor: hexData.hexBorderColor || hexData.hexColor}">
        <div class="hexagon inner-hex" :style="{ backgroundColor: hexData.hexColor }">
            <token-layout
                v-if="hexData.tokenPlayer"
                :token-data="hexData"
            />
        </div>
        </div>
    </div>
</template>

<script>
import TokenLayout from './TokenLayout.vue'
import { mapActions } from 'vuex';


export default {
    components: {
        TokenLayout
    },
    props: {
        hexData: Object,
    },
    data() {
        return {};
    },
    methods: {
        ...mapActions(['handleHexClick'])
    },
};
</script>

<style scoped>
.hexagon {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}
.outer-border {
    width: 100px;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
  
}
.inner-border {
    width: 96px;
    height: 106px;
    display: flex;
    justify-content: center;
    align-items: center;
  
}
.inner-hex {
    width: 86px;
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>