<template>
  <div class="request" @click="$router.push(`/${this.$route.params.id}/${this.request.id}`)">
    <div class="request__item">
      <div>
        <h4>Задача №{{ request.id }}</h4>
        Название задачи: {{ request.title }} <br>
        Описание задачи: {{ request.description }}
      </div>
      <div v-if="!isEmpty(request.currentStatus)">
        Статус задачи: {{ request.currentStatus[0].title }}
      </div>
      <div v-else>
        У задачи пока нет статуса
      </div>
      <my-button
          v-if=" request.project_ID === null"
          @click.stop="bind"
      >
        Прикрепить к проекту
      </my-button>
      <my-button
          v-else
          @click.stop="unBind"
      >
        Открепить от проекта
      </my-button>
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
  border: 1px solid green;
  margin: 5px;
  padding: 10px;
  gap: 5px;
  width: 170px;
  min-height: 210px;
}
.request__item:hover {
  cursor: pointer;
}
</style>
