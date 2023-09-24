<template>
  <div class="token" :style="{ background: tokenLevelGradient, /* visibility: tokenLevelArray?.length ? 'visibile' : 'hidden' */ }">
    <div class="inner-token" :style="{ backgroundColor: tokenPlayer === 1 ? 'black' : 'white', visibility: 'visible'}">
      <h1 :style="{ color: tokenPlayer === 1 ? 'white' : 'black'}">
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
    tokenLevelGradient() {
      const gradArray = [];
      for (let i = 0; i < 6; i++) {
        const levelColor = this.tokenLevelArray?.[i] ?? 'silver';
        // Styling for each wedge of token
        gradArray.push(`black ${i * 60}deg ${i * 60 + 5}deg, ${levelColor} ${i * 60 + 5}deg ${i * 60 + 60}deg`);
      }
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
  box-shadow: 0 0 0px 5px yellow;
}
.inner-token {
  --innerTokenSize: 40px;
  width: var(--innerTokenSize);
  height: var(--innerTokenSize);
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid black 2px
}
</style>