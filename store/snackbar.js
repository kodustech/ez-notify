export const strict = false

export const state = () => ({
  snackbar: {
    message: '',
    open: false,
    timeout: 6000,
    position: 'top',
    type: 'success' // 'success', 'info', 'error'
  }
})

export const getters = {
  getMessage: ({ snackbar }) => snackbar
}

export const actions = {
  showErrorMessage({state, commit}, payload) {
    commit('showMessage', { ...state.snackbar, ...payload, type: 'error', open: true })
    setTimeout(() => {
      commit('resetMessage')
    }, 6000)
  },
  showSuccessMessage({state, commit}, payload) {
    commit('showMessage', { ...state.snackbar, ...payload, type: 'success', open: true })
    setTimeout(() => {
      commit('resetMessage')
    }, 6000)
  },
  showInfoMessage({state, commit}, payload) {
    commit('showMessage', { ...state.snackbar, ...payload, type: 'info', open: true })
    setTimeout(() => {
      commit('resetMessage')
    }, 6000)
  },
  closeMessage({state, commit}) {
    commit('closeMessage')
  }
}

export const mutations = {
  showMessage(state, payload) {
    state.snackbar = payload
  },
  closeMessage(state, payload) {
    state.snackbar.open = false
  },
  resetMessage(state) {
    state.snackbar = { 
      message: '',
      open: false,
      timeout: 6000,
      position: 'top',
      type: 'success'
    }
  }
}
