<template>
  <div class="request">
    <div class="request__item">
      <div>
        <h4>Задача</h4>
        Название задачи: {{request.title}} <br>
        Описание задачи: {{request.description}}
      </div>
      <div v-if="request.currentStatus">
        Статус задачи: {{request.currentStatus[0].title}}
      </div>
      <div v-else>
        У задачи пока нет статуса
      </div>
      <my-button
          v-if="request.project_ID === 'new value' "
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
async mounted() {
  this.$store.dispatch('fetchRequest',this.$route.params.requestId)
  this.$store.commit('setCurrentId', this.$route.params.id)
},
computed: {
  request() {
    return this.$store.state.currentRequest
  }
},
  methods: {
    bind() {

      this.$store.dispatch('bindTask', {requestID:this.$route.params.requestId, setNull: this.$route.params.id})
    },
    unBind() {
      this.$store.dispatch('unbindTask', {requestID:this.$route.params.requestId, setNull:null})
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


}
</style>
