import { createStore } from 'vuex'

export default createStore({
  state: () => {
    return {
      userName: '',
      userId: null,
      messages: []
    }
  },
  getters: {
    getMessages (state) {
      return state.messages
    },
    getUserName (state) {
      return state.userName
    }
  },
  mutations: {
    setUser (state, name) {
      state.userName = name
    },
    setUserId (state, id) {
      state.userId = id
    },
    addMessage (state, msg) {
      state.messages.push(msg)
    },
    clearData (state) {
      state.userName = ''
      state.userId = null
      state.messages = []
      debugger
    }
  },
  actions: {
  },
  modules: {
  }
})
