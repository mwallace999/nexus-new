<template>
  <div class="row-container" v-for="(row, r) in board" :key="`row${r}`">
    <div class="hex-row">
      <hex-layout v-for="(hex, h) in row" :key="`hex${r}-${h}`" hex-color="white" border-color="blue"/>
    </div>
  </div>
</template>

<script>
import HexLayout from './HexLayout.vue'

export default {
  components: {
    HexLayout
  },
  data() {
    return {
      board: [
        [1, 2, 3],
        [1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4],
        [1, 2, 3]
      ]
    };
  },
  methods: {

  },
};
</script>

<style scoped>
.row-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hex-row {
  display: flex;
  gap: 5px;
  margin-bottom: -22px;
}
</style>