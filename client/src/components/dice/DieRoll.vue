<template>
    <div class="die" :style="{'background-color': dieData}"> 
        Die
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
    },
    props: {
        dieData: String
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
}
</style>