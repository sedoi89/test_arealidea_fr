<template>
  <div class="main">
    <div class="main__projects">
      <h1>Все проекты </h1>
      <my-button
          class="main__projects btn"
          @click="showDialog"
      >
        Создать новый проект
      </my-button>
      <my-button
          @click="newTask"
      >
        Новая задача
      </my-button>
      <my-button v-if="isEmpty(this.$store.state.statuses)">Создать статусы (просто ради удобства)</my-button>
    </div>
    <my-dialog
        :show="$store.state.addNewUnexpectedTask"
    >
      <RequestForm
      />
    </my-dialog>
    <my-dialog
        :show="$store.state.dialogVisible"
    >
      <project-form/>
    </my-dialog>
    <all-projects
        v-if="projects.length"
    />
    <h2 v-else class="color-red">
      Список проектов пуст</h2>
  </div>
</template>

<script>

import ProjectForm from "@/components/ProjectForm";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import RequestForm from "@/components/RequestForm";
import RequestItem from "@/components/RequestItem";
import allProjects from "@/components/allProjects";

export default {
  components: {
    MyButton,
    MyDialog,
    ProjectForm,
    RequestForm,
    RequestItem,
    allProjects
  },
  methods: {
    showDialog() {
      this.$store.commit('toggleDialog', true)
    },
    newTask() {
      this.$store.commit('toggleAddUnexpectedTask', true)
    },
    isEmpty(obj) {
      for (let key in obj) {
        return false;
      }
      return true;
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchProjects')
    await this.$store.dispatch('fetchUnexpectedRequests')
    await this.$store.dispatch('fetchStatuses')
    this.$store.commit('setCurrentId', false)
  },
  computed: {
    projects() {
      return this.$store.state.projects
    },
  },
}
</script>
<style>
.main {
  padding: 20px;
}
.main__projects {
  display: flex;
  width: 100%;
}
.main__projects h1 {
  width: 100%;
}
.main__projects .btn {
  align-self: flex-end;
  max-width: 20%;
}
button {
  margin-right: 10px;
  min-height: 50px;
  min-width: 100px;
}
</style>
