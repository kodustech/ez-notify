export const state = () => ({
  organization: {
    uid: '',
    name: ''
  }
})

export const getters = {
  getOrganization: ({ organization }) => organization
}

export const mutations = {
  setOrganization(state, payload) {
    state.organization = payload
  }
}
