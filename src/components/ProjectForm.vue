<template>
  <form>
    <h4>Создание проекта</h4>
    <my-input
        v-model="project.title"
        type="text"
        placeholder="Название"/>
    <my-button
        @click="createProject(project.title)"
        style="align-self: flex-end; margin-top: 15px"
    >
      Создать проект
    </my-button>
  </form>
</template>

<script>

export default {

  data() {
    return {
      project: {
        title: '',
        id: ''
      }
    }
  },
  methods: {
    createProject(title) {
      if (!title) {
        return
      }
      this.$store.dispatch('createProject', title)
      this.$store.commit('toggleDialog', false)
    },
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
