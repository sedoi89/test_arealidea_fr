<template>
  <div class="request" @click="$router.push(`/${this.$route.params.id}/${this.request.id}`)">
    <div class="request__item">

        <v-card-title>Задача №{{ request.id }}</v-card-title>

      <v-card-subtitle>Название задачи:</v-card-subtitle>
      <v-card-text>{{ request.title }} </v-card-text>

        <v-card-subtitle>Описание задачи:</v-card-subtitle>
      <v-card-text> {{ request.description }}</v-card-text>


      <div v-if="!isEmpty(request.currentStatus)">
       <v-card-subtitle> Статус задачи:</v-card-subtitle>
        <v-card-text> {{ request.currentStatus[0].title }}</v-card-text>

      </div>
      <div v-else>
        У задачи пока нет статуса
      </div>
      <v-btn
          color="green"
          v-if=" request.project_ID === null"
          @click.stop="bind"
      >
        Прикрепить к проекту
      </v-btn>
      <v-btn
          variant="tonal"
          v-else
          @click.stop="unBind"
      >
        Открепить от проекта
      </v-btn>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";

export default {
  name: 'request-item',
  components: {MyButton},
  props: {
    request: {
      type: Object
    }
  },
  methods: {
    bind() {
      this.$store.dispatch('bindTask', {requestID: this.request.id});
    },
    unBind() {
      this.$store.dispatch('unbindTask', {requestID: this.request.id, setNull: NaN});
    },
    isEmpty(obj) {
      for (let key in obj) {
        return false;
      }
      return true;
    }
  }
}
</script>
<style scoped>
.request__item {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0,0,0, 0.2);
  border-radius: 10px;
  margin: 5px;
  padding: 10px;
  gap: 5px;

  min-height: 210px;
}
.request__item:hover {
  cursor: pointer;
}
</style>
