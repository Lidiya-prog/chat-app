import { createStore } from 'vuex'

export default createStore({
  state: () => {
    return {
      userName: ''
    }
  },
  getters: {
    getUserName (state) {
      return state.userName
    }
  },
  mutations: {
    setUser (state, name) {
      state.userName = name
    },
    clearData (state) {
      state.userName = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
