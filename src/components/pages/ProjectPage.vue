<template>
  <div v-if="projects.length" class="container">
    <div class="container__wrapper">
      <my-button @click="this.$router.push('/')">На главную страницу </my-button>
      <ProjectItem
          v-for="project in projects"
          :key="project.id"
          :project="project"
      />
    </div>

  </div>

  <h2 v-else class="color-red" >
    Такого проекта не существует
  </h2>

  <h2>Необработанные заявки</h2>
  <div
      v-if="$store.state.unexpectedRequests"
      class="unexpectedRequests"
  >
    <request-item
        v-for="request in requests"
        :requests="request"
        :key="request.id"
    ></request-item>

  </div>
  <div v-else></div>
</template>

<script>

import ProjectItem from "@/components/ProjectItem";
import MyButton from "@/components/UI/MyButton";
import RequestItem from "@/components/RequestItem";


export default {

  components: {
    MyButton,
    ProjectItem,
    RequestItem
  },
  computed: {
    projects() {
        const id = this.$route.params.id
        const item = []
        this.$store.state.projects.map(i => {
          if (i.id === Number(id)) {
           item.push(i)
          }
        })
      return item
    },
    requests() {
      return this.$store.state.unexpectedRequests
    },
  },
  mounted() {
    this.$store.commit('setCurrentId', Number(this.$route.params.id))
    this.$store.dispatch('fetchProjects')
  },
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
.unexpectedRequests {
  display: flex;
  flex-wrap: wrap;
}
</style>
