import {createStore} from "vuex";
import axios from "axios";


export default createStore({
    state: {
        projects: [],
        unexpectedRequests: [],
        dialogVisible: false,
        addNewTask: false,
        addNewUnexpectedTask: false,
        currentId: {
            type: Number
        },
        currentRequest: [],
        statuses: []

    },
    getters: {},
    mutations: {
        updateProjects(state, payload) {
            state.projects = payload;
        },
        updateUnexpectedRequests(state, payload) {
            state.unexpectedRequests = payload;
        },
        filterProject(state, payload) {
            state.projects = state.projects.filter(p => p.id !== payload);
        },
        addProject(state, payload) {
            state.projects.push(payload);
        },
        toggleDialog(state, payload) {
            state.dialogVisible = payload;
        },
        toggleAddTask(state, payload) {
            state.addNewTask = payload;
        },
        toggleAddUnexpectedTask(state, payload) {
            state.addNewUnexpectedTask = payload;
        },
        setCurrentId(state, payload) {
            state.currentId = payload;
        },
        addTask(state, payload) {
            payload.project_ID = state.currentId
            state.projects.map(i => {
                if (i.id === state.currentId) {
                    if (i.requests) {
                        i.requests.unshift(payload);
                    }
                   else {i.requests = [payload]}
                }
                return i;
            })
        },
        editProject(state, payload) {
            state.projects.map(i => {
                if (i.id === payload.id) {
                    i.title = payload.title;
                }
                return i;
            })
        },
        setNewUnexpectedRequest(state, payload) {
            state.unexpectedRequests.push(payload);
        },
        deleteUnexpectedTask(state, payload) {
            let item = null
           state.unexpectedRequests = state.unexpectedRequests.filter(i =>
           {
              if (i.id !== payload.id) {
                  return i;
              }
              item = i;
           })
            item.project_ID = state.currentId;
        },
        deleteTaskFromProject(state, payload) {
            let item = null
           state.projects.map(i => {
               if (i.id === payload.projectId) {
                   i.requests = i.requests.filter(e => {
                      if (e.id !== payload.requestId) {
                          return e
                      }
                      item = e
                   })
                   item.project_ID = null;
                   state.unexpectedRequests.unshift(item);
               }
           })
        },
        setRequest(state, payload) {
            state.currentRequest = payload;
        },
        setNull(state, payload) {
            state.currentRequest.project_ID = payload;
        },
        setId(state, payload) {
            state.currentRequest.project_ID = payload;
        },
        fetchStatus(state, payload) {
            state.statuses = payload;
        },
        setNewStatus(state, payload) {
          state.currentRequest.currentStatus[0].cod = payload.cod;
            state.currentRequest.currentStatus[0].title = payload.title;
        },
        updateRequest(state, payload) {
          state.currentRequest.title = payload.title;
          state.currentRequest.description = payload.description;
        },
        getRequests(state, payload) {
            return  state.projects.map(i => {
                if (i.id === payload) {
                    return i.requests;
                }
            })
        }

    },
    actions: {
        async fetchProjects({commit}) {
            const response = (await axios.get('http://localhost:3000/project'))
            commit('updateProjects', response.data);
        },
        async fetchUnexpectedRequests({commit}) {
            const response = (await axios.get('http://localhost:3000/requests'))
            commit('updateUnexpectedRequests', response.data);
        },
        async deleteProject({commit}, payload) {
            await axios.delete('http://localhost:3000/project', {
                data: {
                    projectId: payload
                }
            })
            commit('filterProject', payload);
        },
        async createProject({commit}, payload) {
            await axios.post('http://localhost:3000/project', {
                title: payload
            }).then(res => {
                commit('addProject', res.data)});
        },
        async createTask({commit}, payload) {

            await axios.post('http://localhost:3000/requests', {
                title: payload.title,
                description: payload.description,
                projectID: this.state.currentId ? this.state.currentId : null,
                bind: this.state.currentId > 0

            }).then(res => {
                if (!this.state.addNewUnexpectedTask) {

                    commit('addTask', res.data);
                    commit('setCurrentId', '');
                    return
                }
                commit('setNewUnexpectedRequest', res.data);

            })


        },
        async updateProject({commit}, payload) {
            await axios.patch('http://localhost:3000/project', {
                projectId: this.state.currentId,
                title: payload
            }).then(res => {
                    commit('editProject', {id: res.data.projectId, title: payload});
                }
            )
        },
        async bindTask({commit}, payload) {
            await axios.post('http://localhost:3000/project/bind', {
                projectID:this.state.currentId,
                requestID:payload.requestID
            }).then(res => {
                commit('addTask',res.data)
                if(payload.id) {
                    commit('setId', this.state.currentId);

                    return
                }
                commit('deleteUnexpectedTask', res.data);

            })
        },
        async unbindTask({commit}, payload) {
            await axios.post('http://localhost:3000/project/unbind', {
                projectId:this.state.currentId,
                requestId:payload.requestID
            }).then(res => {
                commit('deleteTaskFromProject', res.data);
                commit('setNull', payload.id);
            })
        },
        async fetchRequest({commit}, payload) {
            await axios.get(`http://localhost:3000/requests/${payload}`).then(
                res => commit('setRequest', res.data)
            )
        },
        async fetchStatuses({commit}) {
            await axios.get('http://localhost:3000/status').then(
                res => commit('fetchStatus', res.data)
            )
        },
        async nextStatus({commit}, payload) {
            await axios.post('http://localhost:3000/requests/status/next', {
                request_ID: payload.request_ID,
                complete: payload.complete,
                value: payload.value? payload.value : null
            })
        },
        async prevStatus({commit}, payload) {
            await axios.post('http://localhost:3000/requests/status/prev', {
                request_ID: payload.request_ID,
                complete: payload.complete
            })
        },
        async deleteTask({commit}, payload) {
            await axios.delete('http://localhost:3000/requests', {
                data: {
                    requestId: payload
                }
            })
        },
        async patchRequest ({commit}, payload) {
            await axios.patch('http://localhost:3000/requests', {
                requestId:payload.requestId,
                title: payload.title,
                description: payload.description
            }).then(res => {
                commit('updateRequest', res.data);
            })
        },
        async statusPost({commit}) {
            await axios.post('http://localhost:3000/status').then(res => {
                commit('fetchStatus', res.data);
            })
        }
    }
})

