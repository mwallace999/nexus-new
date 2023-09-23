<template>
  <div :style="{ backgroundColor: hexBorderColor }" class="hexagon border">
    <div :style="{ backgroundColor: hexColor }" class="hexagon inner">
      <token-layout
        :token-color="tokenColor"
        :token-border-color="tokenBorderColor"
        :token-level="tokenLevel"
        :player="player"
      />
    </div>
  </div>
</template>

<script>
import TokenLayout from './TokenLayout.vue'

export default {
  props: {
    hexColor: String,
    hexBorderColor: String,
    tokenColor: String,
    tokenBorderColor: String,
    tokenLevel: String
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
  width: 100px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.inner {
  width: 90px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner:hover {
  background-color: red !important;
}
</style>