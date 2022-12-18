<template>
  <form>
    <h4>Создание Задачи</h4>
    <my-input
        v-model="request.title"
        type="text"
        placeholder="Название"/>
    <my-input
        v-model="request.description"
        type="text"
        placeholder="Описание задачи"/>
    <my-button
        @click="createRequest(request.title, request.description, this.isUnexpexted)"
        style="align-self: flex-end; margin-top: 15px"
    >
      Создать задачу
    </my-button>
  </form>
</template>

<script>

export default {

  data() {
    return {
      isUnexpexted:  this.$store.state.addNewUnexpectedTask,
      request: {
        title: '',
        description: '',

      }
    }
  },
  methods: {

    createRequest(title, description) {
        this.$store.commit('toggleAddUnexpectedTask', false)
      if (!title || !description) {
        return
      }

      this.$store.dispatch('createTask', {title: title, description: description})
      this.$store.commit('toggleAddTask', false)

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
