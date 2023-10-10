<template>
    <div class="token-window">
        <div class="token-scale">
            <token-layout v-if="tokenData" :token-data="tokenData"></token-layout>
        </div>
    </div>
</template>

<script>
import TokenLayout from '../board/TokenLayout.vue'

export default {
    components: {
        TokenLayout
    },
    props: {
      tokenData: Object
    },
    data() {
        return {
            thing: true
        };
    },
    computed: {
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

</style>