<template>
  <div :style="{ backgroundColor: borderColor }" class="hexagon border">
    <div :style="{ backgroundColor: hexColor }" class="hexagon inner">
      <token-layout :token-color="'red'" :token-level="2"></token-layout>
    </div>
  </div>
</template>

<script>
import TokenLayout from './TokenLayout.vue'

export default {
  props: {
    hexColor: String,
    borderColor: String
  },
  components: {
    TokenLayout
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.hexagon {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}
.border {
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.inner {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner:hover {
  background-color: red !important;
}
</style>