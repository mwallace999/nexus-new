<template>
  <div class="token" :style="{ backgroundColor: tokenColor }">
    <div class="inner-token">
      <h1>{{tokenLevel}}</h1>
    </div>    
  </div>
</template>

<script>


export default {
  props: {
    tokenColor: String,
    tokenLevel: String
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
  --tokenSize: 60px;
  width: var(--tokenSize);
  height: var(--tokenSize);
  border-radius: 50%;
  border: solid black 3px;
  display: flex;
  justify-content: center;
  align-items: center;
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
}
</style>