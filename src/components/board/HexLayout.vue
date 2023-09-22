<template>
  <div :style="{ backgroundColor: borderColor }" class="hexagon border">
    <div :style="{ backgroundColor: hexColor }" class="hexagon inner" />
  </div>
</template>

<script>
export default {
  props: {
    hexColor: String,
    borderColor: String
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
  position: relative;
  
}
.inner {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 5px;
  left: 5px;
}
</style>