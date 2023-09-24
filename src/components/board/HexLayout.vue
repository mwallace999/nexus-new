<template>
  <div :style="{ backgroundColor: 'black' }" class="hexagon outer-border">
    <div :v-if="hexBorderColor" :style="{ backgroundColor: hexBorderColor }" class="hexagon inner-border">
      <div :style="{ backgroundColor: hexColor }" class="hexagon inner-hex">
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
  props: {
    hexColor: String,
    hexBorderColor: String,
    tokenLevelArray: Array,
    tokenPlayer: Number
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
.outer-border {
  width: 100px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  
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