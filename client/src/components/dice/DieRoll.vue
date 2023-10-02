<template>
    <div class="die" :style="{'background-color': dieData.color}"> 
        {{ dieData.value }}
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
    },
    props: {
        dieData: Object
    },
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters([])
    },
    methods: {
        ...mapActions([]),
    },
};
</script>

<style scoped>
.die {
    height: 80px;
    width: 80px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    font-weight: 800;
}
</style>