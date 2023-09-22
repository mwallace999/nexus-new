<template>
  <div>
  <div class="hex-container">
    <div class="hex-row">
      <hex-layout v-for="(x, i) in [1, 2, 3]" :key=i hex-color="white" border-color="blue"/>
    </div>
  </div>
  <div class="hex-container">
    <div class="hex-row">
      <hex-layout v-for="(x, i) in [1, 2, 3, 4]" :key=i hex-color="red" border-color="blue"/>
    </div>
  </div>
  <div class="hex-container">
    <div class="hex-row">
      <hex-layout v-for="(x, i) in [1, 2, 3, 4, 5]" :key=i hex-color="red" border-color="blue"/>
    </div>
  </div>
  <div class="hex-container">
    <div class="hex-row">
      <hex-layout v-for="(x, i) in [1, 2, 3, 4]" :key=i hex-color="red" border-color="blue"/>
    </div>
  </div>
  <div class="hex-container">
    <div class="hex-row">
      <hex-layout v-for="(x, i) in [1, 2, 3]" :key=i hex-color="red" border-color="blue"/>
    </div>
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
    };
  },
  methods: {

  },
};
</script>

<style scoped>
.hex-container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center;
}
.hex-row {
  display: flex;
  gap: 5px;
  margin-bottom: -22px;
}
</style>