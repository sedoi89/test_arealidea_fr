<template>
    <v-card>
      <v-card-title>Создание проекта</v-card-title>
      <div class="v-container">
        <v-form
            ref="form"
        >
          <v-text-field
              v-model="title"
              label="Название проекта"
              :rules="titleRules"
              required
          ></v-text-field>
          <v-row
              justify="end"
              class="mb-2"
          >
            <v-btn
                max-width="17%"
                @click="validate"
            >Создать</v-btn>
          </v-row>
        </v-form>
      </div>

    </v-card>

</template>

<script>

export default {

  data: () => ({
    valid: true,
    title: '',
    titleRules: [
      v => !!v || 'Название обязательно',
    ],
  }),
  methods: {
    async validate () {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.$store.dispatch('createProject', this.title);
        this.$store.commit('toggleDialog', false);
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
