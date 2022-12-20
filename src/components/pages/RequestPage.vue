<template>
  <my-button @click="$router.push('/')">На главную</my-button>
  <my-button @click="$router.push(`/${this.$route.params.id}`)">К проекту</my-button>
  <div class="request" @click.stop="changeStatus = false">
    <div class="request__item">
      <div v-if="!changeRequestTexts">
        <h4>Задача № {{ request.id }}</h4>
        Название задачи: {{ request.title }} <br>
        Описание задачи: {{ request.description }}
      </div>
      <div v-else>
        <h4>Задача № {{ request.id }}</h4>
        Название задачи:
        <my-input v-model="newRequestTitle"></my-input>
        Описание задачи:
        <my-input v-model="newRequestDescription"></my-input>
      </div>
      <div v-if="request.currentStatus && !changeStatus" @click.stop>
        Статус задачи: {{ request.currentStatus[0].title }}
      </div>
      <div v-else-if="model === 'for_approval'" @click.stop>
        Статус задачи:
        <select v-model="model" @change="forApproval">
          <option
              v-for="status in this.$store.state.statuses.filter(i => i.cod !== model && i.cod !== 'preform')"
              v-bind:value="status.cod"
          >{{ status.title }}
          </option>
        </select>
      </div>
      <div v-else-if="model === 'preform'" @click.stop>
        Статус задачи: <select v-model="model" @change="forApproval">
        <option
            v-for="status in this.$store.state.statuses.filter(
                i => i.cod !== model && i.cod !== 'accepted' && i.cod !== 'rejected').slice(0,1)"
            v-bind:value="status.cod"
        >{{ status.title }}
        </option>
      </select>
      </div>
      <div v-else-if="model === 'accepted' || model === 'rejected'" @click.stop>
        Статус задачи: <select v-model="model" @change="forApproval">
        <option
            v-for="status in this.$store.state.statuses.filter(
                i => i.cod !== model && i.cod !== 'accepted' && i.cod !== 'rejected' && i.cod !== 'for_approval' ).slice(1,3)"
            v-bind:value="status.cod"
        >{{ status.title }}
        </option>
      </select>
      </div>
      <div v-else @click.stop>
        Статус задачи: <select v-model="model" @change="forApproval">
        <option
            v-for="status in this.$store.state.statuses.filter(
                i => i.cod !== model && i.cod !== 'accepted' && i.cod !== 'rejected' ).slice(1,3)"
            v-bind:value="status.cod"
        >{{ status.title }}
        </option>
      </select>
      </div>
      <div class="buttons">
        <my-button @click.stop="this.changeStatus  = !this.changeStatus" v-if="!this.changeStatus">Изменить статус
        </my-button>
        <my-button
            v-if="!request.project_ID"
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
        <my-button @click="deleteTask">Удалить задачу</my-button>
        <my-button @click="changeRequestTexts = !changeRequestTexts" v-if="!changeRequestTexts">Изменить заявку
        </my-button>
        <my-button @click="changeRequestTextContent" v-else>Сохранить изменения</my-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";

export default {
  name: 'request-item',
  components: {MyButton},
  async mounted() {
    await this.$store.dispatch('fetchRequest', this.$route.params.requestId);
    this.$store.commit('setCurrentId', this.$route.params.id);
    await this.$store.dispatch('fetchStatuses');
    this.model = this.$store.state.currentRequest.currentStatus[0].cod;
    this.statuses = this.$store.state.statuses;
    this.newRequestTitle = this.request.title;
    this.newRequestDescription = this.request.description;
  },
  data() {
    return {
      changeStatus: false,
      newStatus: '',
      newTitle: '',
      model: {},
      statuses: [],
      changeRequestTexts: false,
      newRequestTitle: '',
      newRequestDescription: ''
    }
  },
  computed: {
    request() {
      return this.$store.state.currentRequest;
    }
  },
  methods: {
    bind() {
      this.$store.dispatch('bindTask', {requestID: this.$route.params.requestId, id: this.$route.params.id});
    },
    unBind() {
      this.$store.dispatch('unbindTask', {requestID: this.$route.params.requestId, id: null});
    },
    forApproval(e) {
      if (this.$store.state.currentRequest.currentStatus[0].cod === 'preform' && e.target.value === 'in_work') {
        this.newTitle = e.target.options[e.target.options.selectedIndex].text;
        this.newStatus = e.target.value;
        this.model = e.target.value;
        this.$store.dispatch('nextStatus', {request_ID: Number(this.$route.params.requestId), complete: false});
        this.$store.commit('setNewStatus', {cod: this.newStatus, title: this.newTitle});
        this.changeStatus = !this.changeStatus;
        return
      }
      if (e.target.value === 'accepted') {
        this.newTitle = e.target.options[e.target.options.selectedIndex].text;
        this.newStatus = e.target.value;
        this.model = e.target.value;
        this.$store.dispatch('nextStatus', {request_ID: Number(this.$route.params.requestId), complete: true});
        this.$store.commit('setNewStatus', {cod: this.newStatus, title: this.newTitle});
        this.changeStatus = !this.changeStatus;
        return
      }
      if (e.target.value === 'rejected') {
        this.newTitle = e.target.options[e.target.options.selectedIndex].text;
        this.newStatus = e.target.value;
        this.model = e.target.value;
        this.$store.dispatch('nextStatus', {request_ID: Number(this.$route.params.requestId), complete: false});
        this.$store.commit('setNewStatus', {cod: this.newStatus, title: this.newTitle});
        this.changeStatus = !this.changeStatus;
        return
      }
      if (e.target.value === 'for_approval') {
        this.newTitle = e.target.options[e.target.options.selectedIndex].text;
        this.newStatus = e.target.value;
        this.model = e.target.value;
        this.$store.dispatch('nextStatus', {request_ID: Number(this.$route.params.requestId), complete: false});
        this.$store.commit('setNewStatus', {cod: this.newStatus, title: this.newTitle});
        this.changeStatus = !this.changeStatus;
        return;
      }
      if (e.target.value === 'in_work') {
        this.newTitle = e.target.options[e.target.options.selectedIndex].text;
        this.newStatus = e.target.value;
        this.model = e.target.value;
        this.$store.dispatch('prevStatus', {request_ID: Number(this.$route.params.requestId), complete: false});
        this.$store.commit('setNewStatus', {cod: this.newStatus, title: this.newTitle});
        this.changeStatus = !this.changeStatus;
        return;
      } else {
        this.newTitle = e.target.options[e.target.options.selectedIndex].text;
        this.newStatus = e.target.value;
        this.model = e.target.value;
        this.$store.dispatch('nextStatus', {
          request_ID: Number(this.$route.params.requestId),
          complete: false,
          value: e.target.value
        });
        this.$store.commit('setNewStatus', {cod: this.newStatus, title: this.newTitle});
        this.changeStatus = !this.changeStatus;
        return;
      }
    },
    deleteTask() {
      this.$store.dispatch('deleteTask', Number(this.$route.params.requestId));
      this.$router.push(`/${this.$route.params.id}`);
    },
    changeRequestTextContent() {
      this.$store.dispatch('patchRequest', {
        requestId: Number(this.$route.params.requestId),
        title: this.newRequestTitle,
        description: this.newRequestDescription
      });
      this.changeRequestTexts = false
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
}
.buttons {
  display: flex;
}
.buttons button:hover {
  cursor: pointer;
}
</style>
