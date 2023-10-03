<template>
    <div class="token-window">
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
        };
    },
    computed: {
       thisPlayer: {
            get() {
                return this.$store.state.thisPlayer; // Get the value from Vuex
            },
            set(value) {
                this.$store.commit('setThisPlayer', value); // Update the value in Vuex
            },
        },
    },
    methods: {
    },
};
</script>

<style scoped>
.token-window {
    height: 100%;
    background-color: gray;
}
.custom-button {
  background-color: rgb(225, 14, 14);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>