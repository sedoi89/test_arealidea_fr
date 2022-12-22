<template>
  <div class="nav_buttons">
    <v-btn variant="outlined" @click="$router.push(`/${this.$route.params.id}`)">К проекту</v-btn>
    <v-btn variant="outlined" @click="$router.push('/')">На главную</v-btn>
  </div>


  <div class="request" @click.stop="changeStatus = false">
    <v-card class="request__item">
      <div v-if="!changeRequestTexts">
        <v-card-title>Задача № {{ request.id }}</v-card-title>
        <v-card-subtitle>
          Название задачи:
        </v-card-subtitle>
        <v-card-item>
          {{ request.title }}
        </v-card-item>
        <v-card-subtitle>
          Описание задачи:
        </v-card-subtitle>
        <v-card-item>
          {{ request.description }}
        </v-card-item>
      </div>
      <div v-else>
        <v-card-title>
          Задача № {{ request.id }}
        </v-card-title>
        <v-card-subtitle>
          Название задачи:
        </v-card-subtitle>
        <v-card-item>
          <v-text-field
              v-model="newRequestTitle"
              bg-color="none"
              hide-details="auto"
              :messages="['Введите новое название задачи']"
          />
        </v-card-item>
        <v-card-subtitle>
          Описание задачи:
        </v-card-subtitle>
        <v-card-item>
          <v-text-field
              v-model="newRequestDescription"
              bg-color="none"
              hide-details="auto"
              :messages="['Введите новое описание задачи']"
          />
        </v-card-item>

      </div>
      <div v-if="request.currentStatus && !changeStatus" @click.stop>
        <v-card-subtitle>
          Статус задачи:
        </v-card-subtitle>
        <v-card-item>
          {{ request.currentStatus[0].title }}
        </v-card-item>
      </div>
      <v-card-item v-else-if="model === 'preform'" @click.stop>
        <div>
          <v-card-subtitle>
            Статус задачи:
          </v-card-subtitle>
          <select
              v-model="model"
              @change="forApproval">
            <option
                v-for="status in this.$store.state.statuses.filter(
                i => i.cod !== model && i.cod !== 'accepted' && i.cod !== 'rejected').slice(0,1)"
                v-bind:value="status.cod"
            >{{ status.title }}
            </option>
          </select>
        </div>
      </v-card-item>

      <div v-else-if="model === 'for_approval'" @click.stop>
        <v-card-subtitle>
          Статус задачи:
        </v-card-subtitle>
        <v-card-item>
          <select
              v-model="model"
              @change="forApproval"
          >
            <option
                v-for="status in this.$store.state.statuses.filter(i => i.cod !== model && i.cod !== 'preform')"
                v-bind:value="status.cod"
            >{{ status.title }}
            </option>
          </select>
        </v-card-item>

      </div>
      <v-card-item v-else-if="model === 'accepted' || model === 'rejected'" @click.stop>

        <div>
          <v-card-subtitle>
            Статус задачи:
          </v-card-subtitle>
          <select
              v-model="model"
              @change="forApproval">
            <option
                v-for="status in this.$store.state.statuses.filter(
                i => i.cod !== model && i.cod !== 'accepted' && i.cod !== 'rejected' && i.cod !== 'for_approval' ).slice(1,3)"
                v-bind:value="status.cod"
            >{{ status.title }}
            </option>
          </select>
        </div>
      </v-card-item>
      <v-card-item v-else @click.stop>

        <div>
          <v-card-subtitle>
            Статус задачи:
          </v-card-subtitle>
          <select
              v-model="model"
              @change="forApproval">
            <option
                v-for="status in this.$store.state.statuses.filter(
                i => i.cod !== model && i.cod !== 'accepted' && i.cod !== 'rejected' ).slice(1,3)"
                v-bind:value="status.cod"
            >{{ status.title }}
            </option>
          </select>
        </div>
      </v-card-item>

      <div class="buttons">
        <v-btn
            @click.stop="this.changeStatus  = !this.changeStatus"
            color="blue"
        >
         <span>
           {{ this.changeStatus ? 'Отменить изменение' : 'Изменить статус' }}
         </span>
        </v-btn>

        <v-btn
            color="green accent-3"
            v-if="!request.project_ID"
            @click.stop="bind"
        >
         <span>
           Прикрепить к проекту
         </span>
        </v-btn>
        <v-btn
            color="orange"
            v-else
            @click.stop="unBind"
        >
         <span>
           Открепить от проекта
         </span>
        </v-btn>
        <v-btn
            color="indigo lighten-3"
            @click="changeRequestTexts = !changeRequestTexts"
            v-if="!changeRequestTexts">
          <span>
            Изменить задачу
          </span>
        </v-btn>
        <v-btn
            color="green"
            @click="changeRequestTextContent" v-else>
          <span>Сохранить изменения </span>
        </v-btn>
        <v-btn

            color="red"
            @click="deleteTask">
         <span>
           Удалить задачу
         </span>
        </v-btn>
      </div>
    </v-card>
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
      newRequestDescription: '',


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
.nav_buttons {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
}

.request__item {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin: 5px;
  padding: 10px;
  gap: 5px;
}

.buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.buttons button:hover {
  cursor: pointer;
}

select {
  min-width: 150px;
  border: 1px solid black;
  background-color: white;
  border-radius: 5px;
  width: 100%;
  padding: 5px;
}

select:focus {
  outline: none;
}
button {
  margin: 10px;
  min-width: 226px;
}
button span {
  white-space: normal;
}
@media (max-width: 375px) {
  .buttons {
    flex-direction: column;
  }
  button {
    min-height: 50px;
  }
}
</style>
