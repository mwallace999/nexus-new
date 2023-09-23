<template>
  <div class="token" :style="{ backgroundColor: tokenColor, borderColor: 'black' }">
    <div class="inner-token">
      <h1>{{tokenLevel}}</h1>
    </div>    
  </div>
</template>

<script>


export default {
  props: {
    tokenColor: String,
    tokenLevel: String,
    player: String,
    tokenBorderColor: String
  },
  data() {
    return {
    };
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
  border: solid 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: conic-gradient(
        black 0deg 5deg,
        red 5deg 60deg,
        black 60deg 65deg,
        orange 60deg 120deg,
        black 120deg 125deg,
        yellow 120deg 180deg,
        black 180deg 185deg,
        green 180deg 240deg,
        black 240deg 245deg,
        blue 240deg 300deg,
        black 300deg 305deg,
        purple 300deg 360deg
      );
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