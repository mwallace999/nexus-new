<template>
    <div class="actions">
        <action-window></action-window>
        <action-buttons></action-buttons>
    </div>
</template>

<script>
import ActionButtons from './ActionButtons.vue';
import ActionWindow from './ActionWindow.vue'

export default {
    components: {
        ActionButtons,
        ActionWindow
    },
    data() {
        return {
        };
    },
    computed: {

    },
    methods: {
    },
};
</script>

<style scoped>
.actions {
    height: 100%;
    display: grid;
    grid-template-rows: 2fr 1fr;
}
</style>