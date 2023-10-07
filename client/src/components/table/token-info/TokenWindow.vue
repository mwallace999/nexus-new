<template>
    <div class="token-window">
        <token-layout v-if="hexData" :hex-data="hexData" class="token-scale"></token-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TokenLayout from '../board/TokenLayout.vue'

export default {
    components: {
        TokenLayout
    },
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters(['activeHex', 'fetchTokenByHexId']),
        hexData() { return this.activeHex ? this.fetchTokenByHexId(this.activeHex) : null }
    },
    methods: {
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
.custom-button {
  background-color: rgb(225, 14, 14);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@keyframes scaleAnimation {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(2.5);
  }
}

.token-scale {
  transform: scale(1);
  animation: scaleAnimation 0.3s forwards;
}

</style>