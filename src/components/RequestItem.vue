<template>
  <div class="request" @click="$router.push(`/${this.$route.params.id}/${this.requests.id}`)">
      <div class="request__item">
        <div>
          <h4>Задача</h4>
          Название задачи: {{requests.title}} <br>
          Описание задачи: {{requests.description}}
        </div>
        <div v-if="requests.currentStatus">
          Статус задачи: {{requests.currentStatus[0].title}}
        </div>
        <div v-else>
          У задачи пока нет статуса
        </div>
        <my-button
            v-if=" requests.project_ID === null"
            @click.stop
            @click="bind"
        >
          Прикрепить к проекту
        </my-button>
        <my-button
            v-else
            @click.stop
            @click="unBind"
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
computed: {
    refresh() {
      return this.$store.state.currentRequest
    }
},
  props: {
    requests: {
      type: Object
    }
  },
  methods: {
    bind() {
      this.$store.dispatch('bindTask', {requestID:this.requests.id})

    },
    unBind() {
      this.$store.dispatch('unbindTask', {requestID:this.requests.id, setNull: NaN})

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
.request__item:hover{
  cursor: pointer;
}
</style>
