<template>
  <v-card>
    <v-card-title> Создание Задачи</v-card-title>
    <div class="v-container">
      <v-form
          ref="form"
      >

        <v-text-field
            v-model="title"
            label="Название"
            :rules="titleRules"
            required
        />
        <v-text-field
            v-model="description"
            label="Описание задачи"
            :rules="descriptionRules"
            required
        />
        <v-row justify="end" class="mb-2">
          <v-btn
              @click="validate"

          >
            Создать задачу
          </v-btn>
        </v-row>
      </v-form>
    </div>
  </v-card>

</template>

<script>

import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {MyButton, MyInput},
  mounted() {
    this.isUnexpected = this.$store.state.addNewUnexpectedTask
  },
  data: () => ({
    valid: true,
    title: '',
    titleRules: [
      v => !!v || 'Название обязательно',
    ],
    description: '',
    descriptionRules: [
      v => !!v || 'Название обязательно',
    ],
    isUnexpected: null
  }),

  methods: {
    async validate() {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        this.$store.commit('toggleAddUnexpectedTask', false);
        this.$store.dispatch('createTask', {title: this.title, description: this.description});
        this.$store.commit('toggleAddTask', false);
      }
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
