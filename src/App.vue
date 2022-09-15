<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>


export default {
  name: 'App'

}
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
}

* {
  box-sizing: border-box;
}

#app {
  height: 100%;
}
</style>
