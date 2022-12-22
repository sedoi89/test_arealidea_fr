<template>
  <div v-if="projects.length" class="container">
    <v-container class="container__wrapper">
      <v-btn variant="outlined" @click="this.$router.push('/')">На главную страницу</v-btn>
      <ProjectItem
          v-for="project in projects"
          :key="project.id"
          :project="project"
      />
    </v-container>
  </div>
  <h2 v-else class="color-red">
    Такого проекта не существует
  </h2>
<v-container>
  <h2>Необработанные заявки</h2>
</v-container>

  <v-container

      v-if="$store.state.unexpectedRequests"
      class="unexpectedRequests"
  >

    <request-item
        v-for="request in requests"
        :key="request.id"
        :request="request"
    />
  </v-container>
  <div v-else>Все заявки в работе</div>
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
  async mounted() {
    this.$store.commit('setCurrentId', Number(this.$route.params.id));
    await this.$store.dispatch('fetchProjects');
    await this.$store.dispatch('fetchUnexpectedRequests');
  },
  computed: {
    projects() {
      let arr = [];
      this.$store.state.projects.map(i => {
        if (i.id === Number(this.$route.params.id)) {
          arr.push(i);
        }
      })
      return arr
    },
    requests() {
      return this.$store.state.unexpectedRequests;
    },
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
