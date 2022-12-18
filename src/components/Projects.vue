<template>
  <div v-if="projects.length" class="container">
    <div class="container__wrapper">
      <ProjectItem
          v-for="project in projects"
          :key="project.id"
          :project="project"
      />
    </div>

  </div>

  <h2 v-else class="color-red">
    Список проектов пуст
  </h2>
</template>

<script>

import ProjectItem from "@/components/ProjectItem";

export default {
  components: {
    ProjectItem
  },
  computed: {
    projects() {
      return this.$store.state.projects
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.container__wrapper {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  flex-direction: column;
}
.color-red {
  color: red
}
</style>
