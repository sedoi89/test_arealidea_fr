<template>
  <div class="project">
    <div class="project__wrapper">
      <div >
        <div><strong>ID проекта: </strong>{{ project.id }}</div>
        <div v-if="!isEditing"><strong>Название: </strong>{{ project.title }}</div>
        <my-input
            v-else
            v-model="newValue"
        />
      </div>
      <my-button
      @click="newTask"
      >
        Новая задача проекта
      </my-button>
      <my-dialog
      :show="$store.state.addNewTask"
      :key="project.id"
      >
        <RequestForm
            :key="project.id"
        />
      </my-dialog>
    </div>
    <div class="project__requests" >
      <div class="request_item">
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
      </div>
    </div>
    <div class="project__buttons">
      <my-button
          @click="removeProject"
          style="align-self: center"
      >
        Удалить <br> проект
      </my-button>

      <my-button
        @click="editingProject"
        v-if="!isEditing"
      >
        Изменить название проекта
      </my-button>
      <my-button
      v-else
      @click="saveEditing"
      >
      Сохранить изменения
      </my-button>
    </div>
  </div>
</template>
<script>
import MyButton from "@/components/UI/MyButton";
import RequestItem from "@/components/RequestItem";
import MyInput from "@/components/UI/MyInput";
import MyDialog from "@/components/UI/MyDialog";
import RequestForm from "@/components/RequestForm";
export default {
  components: {MyDialog, MyInput, MyButton, RequestItem, RequestForm},
  data () {
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
  border: 1px solid green;
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
.project__buttons {
  display: flex;
  gap: 5px;
}
.project__wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.project__wrapper button {
  max-width: 20%;
}
.exception {
  margin: 15px;
}
.request_item {
  display: flex;
  flex-wrap: wrap;
}
</style>
