<template>
  <div class="main">
    <div class="main__projects">
      <h1>Все проекты </h1>
      <v-btn
          color="#99d8ea"
          class="main__projects btn"
          @click="showDialog"
      >
        <span> Новый проект </span>
      </v-btn>
      <v-btn
          color="#a1d3e1"
          class="pa-3"
          @click="newTask"
      >
        Новая задача
      </v-btn>
      <my-button @click="this.$store.dispatch('statusPost')" v-if="isEmpty(this.$store.state.statuses)">Создать статусы
        (просто ради удобства)
      </my-button>
    </div>
    <v-dialog
        v-model="this.$store.state.addNewUnexpectedTask"
    >
      <RequestForm/>
    </v-dialog>
    <v-dialog
        v-model="this.$store.state.dialogVisible"
    >
      <project-form/>
    </v-dialog>
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
import AllProjects from "@/components/AllProjects.vue";

export default {
  data() {
    return {
      dialog: false,
    }
  },
  components: {
    MyButton,
    MyDialog,
    ProjectForm,
    RequestForm,
    RequestItem,
    AllProjects,
  },
  methods: {
    showDialog() {
      this.$store.commit('toggleDialog', true);
    },
    newTask() {
      this.$store.commit('toggleAddUnexpectedTask', true);
    },
    isEmpty(obj) {
      for (let key in obj) {
        return false;
      }
      return true;
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchProjects');
    await this.$store.dispatch('fetchUnexpectedRequests');
    await this.$store.dispatch('fetchStatuses');
    this.$store.commit('setCurrentId', false);
  },
  computed: {
    projects() {
      return this.$store.state.projects
    },
  },
}
</script>
<style scoped>
.main {
  padding: 20px;
}
.main__projects {
  display: flex;
}

.main__projects h1 {
  width: 100%;
}

.main__projects .btn {
  max-width: 20%;
}

button {
  margin-right: 10px;
  min-height: 50px;
  min-width: 100px;
}
button span {
  white-space: normal;
}
</style>
