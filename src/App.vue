<template>
  <div  class="app">
<router-view></router-view>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch('fetchProjects')
    await this.$store.dispatch('fetchUnexpectedRequests')
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>
