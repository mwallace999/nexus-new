<template>
  <div class="hexagon outer-border">
    <div :v-if="hexBorderColor" class="hexagon inner-border" :style="{ backgroundColor: hexBorderColor }" >
      <div class="hexagon inner-hex" :style="{ backgroundColor: hexColor }" >
        <token-layout
          v-if="tokenPlayer"
          :token-player="tokenPlayer"
          :token-level-array="tokenLevelArray"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TokenLayout from './TokenLayout.vue'

export default {
  components: {
    TokenLayout
  },
  props: {
    hexColor: String,
    hexBorderColor: String,
    tokenLevelArray: Array,
    tokenPlayer: Number
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
.outer-border {
  width: 100px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  
}
.inner-border {
  width: 96px;
  height: 106px;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.inner-hex {
  width: 86px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* .inner:hover {
  background-color: red !important;
} */
</style>