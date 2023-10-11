<template>
    <div class="die" :style="dieStyle"> 
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
        ...mapGetters([]),
        dieStyle() {
            const textColor = ['white'].includes(this.dieData.color) ? 'black' : 'white' ;
            return {
                'background-color': this.dieData.color,
                'color': textColor,
                'border-color': textColor
            };
        }
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
    border: solid 2px black; 
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    font-weight: 800;
    margin: 0 1%;
}
</style>