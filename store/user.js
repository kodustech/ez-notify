export const state = () => ({
  user: {
    uid: '',
    email: '',
    organizationId: ''
  }
})

export const getters = {
  getUser: ({ user }) => user
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}
