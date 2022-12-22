<template>
  <v-card class="project">
    <v-container class="project__wrapper">
      <div>
        <div
            class="for_edit"
            v-if="!isEditing">
          <v-icon
              @click="editingProject"
          >
            mdi-pencil
          </v-icon>
          <v-card-title
              class="flex-shrink-1"
          >
            <strong>Название: </strong>
           <span>{{ project.title }}</span>
          </v-card-title>
        </div>
        <div
            v-else
            class="for_save">
          <v-icon
              @click="saveEditing"
          >mdi-content-save</v-icon>
          <v-text-field
              v-model="newValue"
              bg-color="none"
              hide-details="auto"
              :messages="['Введите новое название']"
          />
        </div>

        <v-card-text><strong>ID проекта: </strong>{{ project.id }}</v-card-text>
      </div>
      <v-btn
          class="border-b"
          @click="newTask"
          max-width="30%"
      >
        <span>Новая задача проекта</span>
      </v-btn>
      <v-dialog
          v-model="$store.state.addNewTask"
          :key="project.id"
      >
        <RequestForm
            :key="project.id"
        />
      </v-dialog>
    </v-container>
    <div class="project__requests">
      <v-card class="request_item align-center justify-center">
        <RequestItem
            v-if="!isEmpty(project.requests) "
            v-for="request in project.requests"
            :request="request"
            :key="project.id"
            :isEditing="isEditing"
        />
        <div v-else class="exception">
          <strong> У проекта пока нет задач </strong>
        </div>
      </v-card>
    </div>

      <v-btn
          class="align-self-end"
          color="red"
          @click="removeProject"
          style="align-self: center"
          max-width="30%"
      >

        <span> Удалить проект </span>
      </v-btn>

  </v-card>
</template>
<script>
import MyButton from "@/components/UI/MyButton";
import RequestItem from "@/components/RequestItem";
import MyInput from "@/components/UI/MyInput";
import MyDialog from "@/components/UI/MyDialog";
import RequestForm from "@/components/RequestForm";

export default {
  components: {MyDialog, MyInput, MyButton, RequestItem, RequestForm},
  data() {
    return {
      newTaskEditing: false,
      isEditing: false,
      newValue: this.project.title,
    }
  },
  props: {
    project: {
      type: Object,
      required: true
    },
  },
  methods: {
    async removeProject() {
      this.$router.push('/');
      await this.$store.dispatch('deleteProject', this.project.id);
    },
    editingProject() {
      this.isEditing = true;
      this.$store.commit('setCurrentId', this.project.id);
    },
    newTask() {
      this.$store.commit('setCurrentId', this.project.id);
      this.$store.commit('toggleAddTask', true);
    },
    saveEditing() {
      this.$store.dispatch('updateProject', this.newValue);
      this.isEditing = false;
    },
    isEmpty(obj) {
      for (let key in obj) {
        return false;
      }
      return true;
    }
  },
}
</script>

<style scoped>
.project {
  padding: 15px 20px;
  border: 1px solid black;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.project button {
  width: 50%;
  min-height: 55px;
  margin-bottom: 5px;
}


.project__wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.project__wrapper button {

}

.exception {
  margin: 15px;
}

.request_item {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

button span {
  white-space: normal
}

.for_edit, .for_save {
  display: flex;
  align-items: flex-start;
}
div span {
  white-space: normal;
}
@media (max-width: 375px) {
  .project__wrapper {
    flex-direction: column;
  }
}
</style>
