<template>
  <div
    class="token" 
    :style="{
      background: tokenLevelGradient,
      visibility: showLevels,
      borderColor: playerColor
    }"
  >
    <div
      class="inner-token"
      :style="{
        backgroundColor: playerColorInvert,
        visibility: 'visible',
        borderColor: playerColor
      }"
    >
      <h1 :style="{ color: playerColor}">
        {{ this.tokenLevelArray?.length }}
      </h1>
    </div>    
  </div>
</template>

<script>

export default {
  props: {
    tokenPlayer: Number,
    tokenLevelArray: Array
  },
  data() {
    return {
    };
  },
  computed: {
    playerColor() { return this.tokenPlayer === 1 ? 'white' : 'black' },
    playerColorInvert() { return this.tokenPlayer === 1 ? 'black' : 'white' },
    showLevels() { return this.tokenLevelArray?.length ? 'visibile' : 'hidden'},
    tokenLevelGradient() {
      const gradArray = [];
      for (let i = 0; i < 6; i++) {
        const levelColor = this.tokenLevelArray?.[i] || this.playerColorInvert;
        // Styling for each wedge of token
        gradArray.push(`${levelColor} ${i * 60}deg ${i * 60 + 55}deg`);
        // Styling for wedge divider
        if (this.tokenLevelArray?.[i]) gradArray.push(`${this.playerColor} ${i * 60 + 55}deg ${(i + 1) * 60}deg`)
      }
      if (this.tokenLevelArray?.length) gradArray.push(`${this.playerColor} 355deg 360deg`)
      const returnStr = 'conic-gradient(' + gradArray.join(',') + ')';
      return returnStr;
    }
  },
  methods: {},
};
</script>

<style scoped>
.token {
  --tokenSize: 70px;
  width: var(--tokenSize);
  height: var(--tokenSize);
  border-radius: 50%;
  border: solid black 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.token:hover {
  box-shadow: 0 0 0px 4px yellow;
}
.inner-token {
  --innerTokenSize: 40px;
  width: var(--innerTokenSize);
  height: var(--innerTokenSize);
  border: solid 2px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>