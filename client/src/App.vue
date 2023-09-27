<template>
    <table-top/>
</template>

<script>
import TableTop from './components/table/TableTop.vue'

export default {
    name: 'App',
    components: {
        TableTop
    }
}
</script>

<style>
body {
    margin: 0;
    height: 100vh;
    overflow: hidden;
    background-color: silver; 
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    height: inherit;
}
</style>
